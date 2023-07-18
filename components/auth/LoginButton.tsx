import cls from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FC, HTMLAttributes } from 'react';

export const LoginButton: FC<HTMLAttributes<HTMLAnchorElement>> = ({ className, ...props }) => {
  // you can get user name by session.user?.name
  const { status } = useSession();

  switch (status) {
    case 'loading':
      return (
        <a className={cls('btn btn-disabled', className)} {...props}>
          ...
        </a>
      );

    case 'unauthenticated':
      return (
        <a className={cls('btn', className)} onClick={() => signIn('google')} {...props}>
          Login
        </a>
      );

    case 'authenticated':
      return (
        <a className={cls('btn btn-error', className)} onClick={() => signOut()} {...props}>
          Logout
        </a>
      );

    default:
      return null;
  }
};
