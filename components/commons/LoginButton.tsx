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
        <a className="btn btn-error" onClick={() => signOut()}>
          Logout
        </a>
      );

    default:
      return null;
  }
};
