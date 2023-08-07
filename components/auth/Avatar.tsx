/* eslint-disable @next/next/no-img-element */

import cls from 'classnames';
import { useSession } from 'next-auth/react';
import { FC, HTMLAttributes, useState } from 'react';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {}

export const Avatar: FC<AvatarProps> = ({ className, ...props }) => {
  const { status, data } = useSession();

  const [imgLoadFailed, setImgLoadFailed] = useState(false);

  // show placeholder if not logged in or fail to load avatar image
  const placeholder = status !== 'authenticated' || imgLoadFailed;
  const label = (data?.user?.name || data?.user?.email || '')[0];

  return (
    <div
      className={cls(
        'avatar not-prose w-8 h-8 rounded-full overflow-hidden bg-neutral-200 text-neutral-700',
        { placeholder },
        className,
      )}
      {...props}
    >
      {status === 'authenticated' && imgLoadFailed && <span>{label}</span>}
      {status === 'authenticated' && !imgLoadFailed && (
        <img
          alt="avatar"
          src={data.user?.image!}
          onError={() => setImgLoadFailed(true)}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};
