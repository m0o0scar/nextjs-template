import { signOut, useSession } from 'next-auth/react';

import { Avatar } from '@components/auth/Avatar';
import { LoginButton } from '@components/auth/LoginButton';

export const Navbar = () => {
  const { status } = useSession();

  return (
    <div className="navbar bg-base-100 border-b border-neutral-100 items-stretch py-0 h-12 min-h-0 gap-2 not-prose">
      {/* app name on the left */}
      <div className="flex-none">
        <a className="btn btn-sm btn-ghost normal-case text-xl">🌳 Hello</a>
      </div>

      {/* controls */}
      <div className="flex-1 gap-2 justify-between">
        {/* tabs */}
        <div className="tabs h-full [&>a]:h-full">
          <a className="tab tab-bordered tab-active">Tab 1</a>
          <a className="tab tab-bordered">Tab 2</a>
          <a className="tab tab-bordered">Tab 3</a>
        </div>

        {/* avatar and dropdown */}
        <div className="dropdown dropdown-end">
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
      </div>
    </div>
  );
};
