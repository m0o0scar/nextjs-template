import { LoginButton } from '@components/auth/LoginButton';
import { NavMenu } from '@components/commons/NavMenu';
import { useSession } from 'next-auth/react';

export const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { status } = useSession();

  return (
    <div className="font-sans">
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
        <article className="prose max-w-full flex flex-col">
          <NavMenu />
          {children}
        </article>
      )}
    </div>
  );
};
