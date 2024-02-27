import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config";

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Req.headers es la ubicacion en donde se almacenan los cookies y por ende el token
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(
    token,
    TOKEN_SECRET,
    (err: jwt.VerifyErrors | null, user: object | any) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = user;
    }
  );

  next();
};
