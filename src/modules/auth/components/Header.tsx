"use client"
import React, { memo } from "react";
import Link from "next/link";
import Login from "./Login";
import UserAction from "./UserAction";
import { useAuthContext } from "../context";

const PATH_HOME = "/";

const Header = () => {
  const { currentUser } = useAuthContext();

  return (
    <header className="header-container lg:h-[66px] lg:flex lg:justify-between lg:items-center border-b border-gray-300">
      <h1 className="title text-[36px] font-semibold">
        <Link className="no-style hover:text-black text-light-high" href={PATH_HOME}>
          Funny Movies
        </Link>
      </h1>
      {currentUser ? <UserAction email={currentUser.email} /> : <Login />}
    </header>
  );
};

export default memo(Header);
