import { useSession } from 'next-auth/react';

import { Header } from '@components/commons/Header';

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
                    className="btn btn-circle btn-ghost btn-active btn-sm fixed right-4 top-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                  <div>Hi</div>
                </>
              )}
            </div>
          </div>
          {/* drawer */}
          <div className="drawer-side">
            <label htmlFor="settings-drawer" className="drawer-overlay"></label>
            <div className="p-4 w-80 bg-base-100 text-base-content flex flex-col">
              <h1>⚙️ Settings</h1>
              <div className="grow">{/* drawer content goes here */}</div>
              <LoginButton />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
