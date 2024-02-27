import { Router } from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { updateSchema } from "../schemas/auth.schema";
import { authRequired } from "../middlewares/validateToken.middleware";

const router = Router();

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", validateSchema(updateSchema), updateUser);
router.delete("/user/:id", deleteUser);

export default router;
