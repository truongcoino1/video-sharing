"use client";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { AuthService } from "../services";
import { User } from "../types/auth";
import { useAuthContext } from "../context/AuthContext";
import { setToken } from "@/modules/base";
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setCurrentUser } = useAuthContext();
  const logout = useCallback(() => {
    setUser(null);
    setCurrentUser(null);
    localStorage.removeItem("user");
    AuthService.logout();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const authResponse = await AuthService.login(email, password);
      if (authResponse.status === "success" && authResponse.result) {
        toast("Login successfully", {
          type: "success",
        });
        setUser(authResponse.result);
        setCurrentUser(authResponse.result);
        setToken(authResponse.result.token);
        localStorage.setItem("user", JSON.stringify(authResponse.result));
      }
      setLoading(false);
    } catch (error: any) {
      toast(error.message, {
        type: "error",
      });
      setError(error);
      setLoading(false);
    }
  }, []);

  return { logout, user, loading, error, login, setUser };
};
