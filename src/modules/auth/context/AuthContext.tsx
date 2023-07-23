"use client";

import { Loading, setToken } from "@/modules/base";
import React, { useEffect, useState, useContext } from "react";
import { User } from "../types/auth";
import { useRouter } from "next/navigation";

type AuthContextProps = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
};
export const AuthContext = React.createContext<AuthContextProps>({
  currentUser: null,
  setCurrentUser: (_: User | null) => {},
  setLoading: (_: boolean) => {},
  loading: false
});

export const useAuthContext = () => useContext<AuthContextProps>(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authString = localStorage.getItem("auth");
    if (authString) {
      const auth = JSON.parse(authString);
      setCurrentUser(auth);
      setToken(auth.token);
    } else {
      router.push("/");
    }
    setLoading(false);
    console.log('vao day roi ne')
  }, []);

  return (
    <AuthContext.Provider value={{ loading, currentUser, setLoading, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
