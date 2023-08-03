import { signOut, useSession } from 'next-auth/react';

import { Avatar } from '@components/auth/Avatar';
import { LoginButton } from '@components/auth/LoginButton';

export const NavMenu = () => {
  const { status } = useSession();

  return (
    <div className="not-prose dropdown dropdown-end fixed right-2 top-2">
      {/* login button */}
      {status === 'unauthenticated' && <LoginButton className="btn-sm" />}

      {/* avatar & dropdown menu */}
      {status !== 'unauthenticated' && (
        <>
          <Avatar tabIndex={0} className="btn btn-ghost btn-circle min-h-0" />
          <ul
            tabIndex={0}
            className="mt-1 z-[1] p-2 shadow menu dropdown-content bg-base-100 rounded-xl"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={() => signOut()}>Logout</a>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};
