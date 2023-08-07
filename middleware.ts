import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextMiddleware, NextResponse } from 'next/server';

export const config = {
  // Due to this issue (https://github.com/vercel/next.js/issues/38461#issuecomment-1183265400),
  // matcher "values to be constant so it can be statically analyzed at build-time. Otherwise, it will be ignored".
  // So I use /api/proxy here to match all related requests
  matcher: ['/api/proxy/:path*'],
};

// Put your proxy middleware here
const proxyMiddlewares: NextMiddleware[] = [];

async function middleware(request: NextRequestWithAuth, event: NextFetchEvent) {
  // is this a request to /api/proxy?
  const url = new URL(request.url);
  const [, , name] = url.pathname.split('/');
  if (name === 'proxy') {
    // see if any middleware can handle the request
    for (const proxy of proxyMiddlewares) {
      const response = await proxy(request, event);
      if (response) return response;
    }
  }

  return NextResponse.next();
}

export default withAuth(middleware);
