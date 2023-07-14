import { useSession } from 'next-auth/react';

import { Header } from '@components/commons/Header';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

import { LoginButton } from '../components/commons/LoginButton';

export default function Page() {
  const { status } = useSession();
  return (
    <>
      <Header title="Hello World" emoji="😎" />

      {/* page container */}
      <article className="prose max-w-full">
        {/* drawer */}
        <div className="drawer drawer-end">
          <input id="settings-drawer" type="checkbox" className="drawer-toggle" />
          {/* page main content goes here */}
          <div className="drawer-content">
            <div className="absolute w-screen h-screen flex flex-col items-center justify-center">
              {status === 'loading' && <progress className="progress w-20"></progress>}
              {status === 'unauthenticated' && <LoginButton />}
              {status === 'authenticated' && (
                <>
                  {/* drawer toggle button */}
                  <label
                    htmlFor="settings-drawer"
                    className="btn btn-circle btn-ghost btn-active btn-sm fixed right-4 top-4 p-1"
                  >
                    <Cog6ToothIcon />
                  </label>
                  <div>Hi</div>
                </>
              )}
            </div>
          </div>
          
          {/* drawer */}
          <div className="drawer-side">
            <label htmlFor="settings-drawer" className="drawer-overlay"></label>
            <div className="!duration-300 !ease-out p-4 w-80 h-full bg-base-100 text-base-content flex flex-col">
              <h1>Settings</h1>
              <div className="grow">{/* drawer content goes here */}</div>
              <LoginButton />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
