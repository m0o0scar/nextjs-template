import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

const { GOOGLE_CLIENT_ID = '', GOOGLE_CLIENT_SECRET = '' } = process.env;

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
          scope: 'email profile https://www.googleapis.com/auth/photoslibrary.readonly',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Initial sign in
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
      // Send properties to the client, like an access_token from a provider.
      Object.assign(session, { accessToken: token.accessToken });
      return session;
    },
  },
};

export default NextAuth(authOptions);
