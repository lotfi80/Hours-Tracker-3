import { verifyJwt } from "../libs/jwt";
import { Request, Response, NextFunction } from "express";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export function authorizeJwt(req: Request, res: Response, next: NextFunction) {
  console.log(req.cookies);
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  const payload = verifyJwt(token) as { user?: { id?: string } } | null;
  if (!payload || !payload.user?.id) {
    return res.status(401).json({ msg: "Unauthorized: Invalid token" });
  }
  req.user = { id: payload.user.id };
  next();
}
