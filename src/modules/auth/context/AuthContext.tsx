"use client";

import { useRouter } from "next/navigation";
import { Loading } from "@/modules/base";
import React, { useEffect, useState, useContext } from "react";
// import { User } from "../types/auth";
import {
  getAuth,
  User,
} from "firebase/auth";

type AuthContextProps = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
};
export const AuthContext = React.createContext<AuthContextProps>({
  currentUser: null,
  setCurrentUser: (user: User | null) => {},
  setLoading: (loading: boolean) => {},
});

export const useAuthContext = () => useContext<AuthContextProps>(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const {push} = useRouter();

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {     
      setCurrentUser(user);
      if(!user){
        push('/')
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setLoading, setCurrentUser }}>
      {children}
      {loading && <Loading />}
    </AuthContext.Provider>
  );
};
