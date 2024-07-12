import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { DarkModeContextProvider } from '@components/commons/DarkModeContext';
import { ToastContainer } from '@components/commons/ToastContainer';
import { RootLayout } from './layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <DarkModeContextProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
        <ToastContainer />
      </DarkModeContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
