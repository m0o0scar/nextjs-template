// if you want to protect all pages and api routes, just export default from next-auth
// export { default } from 'next-auth/middleware';

import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextResponse } from 'next/server';

export const config = {
  // Due to this issue (https://github.com/vercel/next.js/issues/38461#issuecomment-1183265400),
  // matcher "values to be constant so it can be statically analyzed at build-time. Otherwise, it will be ignored".
  // So I use /api/proxy here to match all related requests
  matcher: ['/api/proxy/:path*'],
};

async function middleware(request: NextRequestWithAuth, event: NextFetchEvent) {
  return NextResponse.next();
}

export default withAuth(middleware);
