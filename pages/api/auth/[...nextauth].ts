import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

const { GOOGLE_CLIENT_ID = '', GOOGLE_CLIENT_SECRET = '' } = process.env;

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

interface Tokens {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  expires_at?: number;
}

function parseTokens(tokens: Tokens) {
  const {
    access_token: accessToken = '',
    refresh_token: refreshToken = '',
    expires_in = 0,
    expires_at = 0,
  } = tokens;
  const expires = expires_at * 1000 || Date.now() + expires_in * 1000;
  return { accessToken, refreshToken, expires };
}

async function refreshAccessToken(token: JWT) {
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken as string,
      });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    const { accessToken, refreshToken, expires } = parseTokens(refreshedTokens);

    return {
      ...token,
      accessToken: accessToken,
      accessTokenExpires: expires,
      refreshToken: refreshToken || token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: scopes.join(' '),
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      // Include granted scopes to be available in the client,
      // so that later in session callback, we can determine if user has granted us the required scopes
      if (account?.scope) {
        token.scope = account.scope;
      }

      // Allow client to access the access token
      if (account?.access_token) {
        const { accessToken, refreshToken, expires } = parseTokens(account);
        token.accessToken = accessToken;
        token.accessTokenExpires = expires;
        token.refreshToken = refreshToken;
        return token;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to update it
      const newToken = await refreshAccessToken(token);
      return newToken;
    },

    async session({ session, token, user }) {
      const { accessToken = '', scope = '' } = token as { accessToken?: string; scope?: string };

      // Make sure user has granted us all the required scopes, otherwise login should fail
      const grantedScopes = scope.split(' ');
      const hasRequiredScopes = scopes.every((requiredScope) =>
        grantedScopes.includes(requiredScope)
      );
      if (!hasRequiredScopes) {
        throw new Error('Access denied: required scope not granted');
      }

      // Send properties to the client, like an access_token from a provider.
      Object.assign(session, { accessToken });
      return session;
    },
  },
};

export default NextAuth(authOptions);
