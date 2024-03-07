import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextResponse } from 'next/server';

export const config = {
  // Due to this issue (https://github.com/vercel/next.js/issues/38461#issuecomment-1183265400),
  // matcher "values to be constant so it can be statically analyzed at build-time. Otherwise, it will be ignored".
  // So I use /api/proxy here to match all related requests
  matcher: ['/api/proxy/:path*'],
};

async function middleware(request: NextRequestWithAuth, event: NextFetchEvent) {
  const url = new URL(request.url);

  if (url.pathname.startsWith('/api/proxy/')) {
    const [, _api, _proxy, service, ...path] = url.pathname.split('/');
    switch (service) {
      case 'openai': {
        const headers = new Headers(request.headers);
        headers.set(`Authorization`, `Bearer ${process.env.OPENAI_API_TOKEN}`);
        const destination = `https://api.openai.com/v1/${path.join('/')}?${url.searchParams.toString()}`;
        return NextResponse.rewrite(destination, { headers });
      }

      case 'anthropic': {
        const headers = new Headers(request.headers);
        headers.set(`x-api-key`, process.env.ANTHROPIC_API_TOKEN!);
        const destination = `https://api.anthropic.com/${path.join('/')}?${url.searchParams.toString()}`;
        return NextResponse.rewrite(destination, { headers });
      }

      default:
        break;
    }
  }

  return NextResponse.next();
}

export default withAuth(middleware);
