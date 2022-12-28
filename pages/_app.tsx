import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="font-sans">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
