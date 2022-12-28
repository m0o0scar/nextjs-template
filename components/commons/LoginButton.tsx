import { useSession, signIn, signOut } from 'next-auth/react';

export const LoginButton = () => {
  // you can get user name by session.user?.name
  const { data: session, status } = useSession();

  switch (status) {
    case 'loading':
      return <a className="btn btn-disabled">...</a>;

    case 'unauthenticated':
      return (
        <a className="btn" onClick={() => signIn('google')}>
          Login
        </a>
      );

    case 'authenticated':
      return (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1">
            Hello {session.user?.name}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"
          >
            <li>
              <a onClick={() => signOut()}>Logout</a>
            </li>
          </ul>
        </div>
      );

    default:
      return null;
  }
};
