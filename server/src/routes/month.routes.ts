import { Router } from "express";
import {
  getMonth,
  getMonths,
  createMonth,
  updateMonth,
  deleteMonth,
} from "../controllers/month.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import {
  monthRegisterSchema,
  monthUpdateSchema,
} from "../schemas/month.schema";
import { authRequired } from "../middlewares/validateToken.middleware";

const router = Router();

router.post(
  "/month",
  authRequired,
  validateSchema(monthRegisterSchema),
  createMonth
);
router.put(
  "/month/:id",
  authRequired,
  validateSchema(monthUpdateSchema),
  updateMonth
);
router.get("months", getMonths);
router.get("/month/:id", getMonth);
router.delete("/month/:id", authRequired, deleteMonth);

export default router;
