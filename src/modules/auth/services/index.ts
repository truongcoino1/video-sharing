import { api, ApiResponse } from "@/modules/base";
import { User } from "../types/auth";

export const AuthService = {
  login: async (
    email: string,
    password: string
  ): Promise<ApiResponse<User>> => {
    return await api.post("/auth/login", { email, password });
  },
};
