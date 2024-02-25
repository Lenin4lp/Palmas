//@ts-check
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config";

export function createAccesToken(payload: object) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "2d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
