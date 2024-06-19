import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';

import { DarkModeContextProvider } from '@components/commons/DarkModeContext';
import { ToastContainer } from '@components/commons/ToastContainer';

import type { AppProps } from 'next/app';
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <DarkModeContextProvider>
        <div className="font-sans">
          <Component {...pageProps} />
        </div>
        <ToastContainer />
      </DarkModeContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
