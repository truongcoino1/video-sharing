import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/modules/base";
import { UserSession } from "../types/auth";
import { Middleware } from "../types/middleware";

export type NextApiRequestWithUser = NextApiRequest & {
  user: UserSession;
};

// middleware.ts
export const authMiddleware: Middleware = async <T extends ApiResponse<T>>(
  req: NextApiRequestWithUser,
  res: NextApiResponse<T>,
  next?: Middleware
) => {
  // look for access token inside cookies
  const token =
    req.cookies && req.cookies.token ? req.cookies.token.split(" ")[0] : null;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Missing token",
    } as T);
  }
  // and call next()
  if (next) await next(req, res, undefined);
  return res.status(200);
};
