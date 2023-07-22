'use client'

import { useCallback, useState } from "react";
import { AuthService } from "../services";
import { User } from "../types/auth";
import {useAuthContext} from "../context/AuthContext"
import { setToken } from "@/modules/base";
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {setCurrentUser} = useAuthContext();
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const authResponse = await AuthService.login(email, password);
      if (authResponse.success && authResponse.data) {        
        setUser(authResponse.data);
        setCurrentUser(authResponse.data);
        setToken(authResponse.data.token);
        localStorage.setItem("user", JSON.stringify(authResponse.data));
      }
      setLoading(false);
    } catch (error: any) {
      setError(error)
      setLoading(false);
    }
  }, []);

  return { logout, user, loading, error, login, setUser };
};
