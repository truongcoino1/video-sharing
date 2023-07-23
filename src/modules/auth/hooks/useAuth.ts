"use client";

import { useCallback, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setCurrentUser } = useAuthContext();
  const logout = useCallback(async () => {
    setUser(null);
    const auth = getAuth();
    await auth.signOut();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setCurrentUser(userCredential.user);
      setLoading(false);
    } catch (error: any) {
      if (error && error.code === "auth/user-not-found") {
        createFirebaseUser(email, password);
      }
    }
  }, []);

  const createFirebaseUser = useCallback(
    async (email: string, password: string) => {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("auth1", userCredential);
        setUser(userCredential.user);
      } catch (error: any) {
        console.log("auth1", error);
        setError(error);
      }
    },
    []
  );

  return { logout, user, loading, error, login, setUser };
};
