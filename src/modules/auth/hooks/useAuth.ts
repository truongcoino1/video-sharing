import { useCallback, useState } from "react";
import { AuthService } from "../services";
import { User } from "../types/auth";
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(() => {}, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const authResponse = await AuthService.login(email, password);
      if (authResponse.success && authResponse.data) {
        setUser(authResponse.data);
      }
      setLoading(false);
    } catch (error: any) {
      setError(error)
      setLoading(false);
    }
  }, []);

  return { logout, user, loading, error, login };
};
