import React, { memo } from 'react';
import Link from 'next/link';
import {useAuth} from "../hooks/useAuth"

const PATH_SHARE = '/share';

type UserActionProps = {
  email?: string;
};
const UserAction = ({email}: UserActionProps) => {
  const {logout} = useAuth();

  return (
    <div className="user-action-container">
      <span className="txt-welcome">Welcome {email}</span>
      <button
        className="btn-share-movie ml-12"
        disabled={window.location.pathname === PATH_SHARE}
      >
        {window.location.pathname === PATH_SHARE ? (
          'Share a movie'
        ) : (
          <Link href={PATH_SHARE}>Share a movie</Link>
        )}
      </button>
      <button className="btn-logout ml-12" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default memo(UserAction);
