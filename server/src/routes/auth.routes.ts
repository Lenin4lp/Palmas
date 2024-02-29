import { Router } from "express";
import {
  login,
  logout,
  userRegister,
  verifyToken,
} from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { authRequired } from "../middlewares/validateToken.middleware";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);
router.get("/logout", logout);
router.post("/register", validateSchema(registerSchema), userRegister);
router.get("/verify", verifyToken);

export default router;
