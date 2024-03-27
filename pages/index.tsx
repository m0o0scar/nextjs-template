import { useSession } from 'next-auth/react';

import { LoginButton } from '@components/auth/LoginButton';
import { Header } from '@components/commons/Header';
import { NavMenu } from '@components/commons/NavMenu';

export default function Page() {
  const { status } = useSession();
  return (
    <>
      <Header title="Hello World" emoji="😎" />

      {status === 'loading' && (
        <div className="w-screen h-screen flex items-center justify-center">
          <span className="loading loading-spinner"></span>
        </div>
      )}

      {status === 'unauthenticated' && (
        <div className="w-screen h-screen flex items-center justify-center">
          <LoginButton />
        </div>
      )}

      {status === 'authenticated' && (
        <article className="prose max-w-full w-screen h-screen flex flex-col">
          <NavMenu />
          <div className="flex-1 p-4">Hello World</div>
        </article>
      )}
    </>
  );
}
