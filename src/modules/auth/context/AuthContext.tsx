"use client";

import { Loading, setToken } from "@/modules/base";
import React, { useEffect, useState, useContext } from "react";
import { User } from "../types/auth";

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

  useEffect(() => {
    const authString = localStorage.getItem("auth");
    if (authString) {
      const auth = JSON.parse(authString);
      setCurrentUser(auth);
      setToken(auth.token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setLoading, setCurrentUser }}>
      {children}
      {loading && <Loading />}
    </AuthContext.Provider>
  );
};
