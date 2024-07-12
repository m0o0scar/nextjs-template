// if you want to protect all pages and api routes, just export default from next-auth
// export { default } from 'next-auth/middleware';

import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextResponse } from 'next/server';

export const config = {
  // matcher: ['/api/proxy/:path*'],
};

async function middleware(request: NextRequestWithAuth, event: NextFetchEvent) {
  const url = new URL(request.url);

  if (url.pathname.startsWith('/api/proxy/')) {
    const [, _api, _proxy, service, ...path] = url.pathname.split('/');
    switch (service) {
      case 'openai': {
        const headers = new Headers(request.headers);
        headers.set(`Authorization`, `Bearer ${process.env.OPENAI_API_KEY || ''}`);
        const destination = `https://api.openai.com/v1/${path.join('/')}?${url.searchParams.toString()}`;
        return NextResponse.rewrite(destination, { headers });
      }

      case 'gemini': {
        const search = url.searchParams;
        search.set('key', process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');
        const destination = `https://generativelanguage.googleapis.com/${path.join('/')}?${search.toString()}`;
        return NextResponse.rewrite(destination);
      }

      default:
        break;
    }
  }

  return NextResponse.next();
}

export default withAuth(middleware);
