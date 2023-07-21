import React, { memo } from "react";
import Link from "next/link";
import Login from "./Login";
import UserAction from "./UserAction";
import { useAuth } from "../hooks/useAuth";

const PATH_HOME = "/";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header-container lg:h-[66px] lg:flex lg:justify-between lg:items-center">
      <h1 className="title">
        <Link className="no-style hover:text-black" href={PATH_HOME}>
          Funny Movies
        </Link>
      </h1>
      {user ? <UserAction email={user.email} /> : <Login />}
    </header>
  );
};

export default memo(Header);
