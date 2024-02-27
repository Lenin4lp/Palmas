import { Router } from "express";
import {
  getMonthlyFee,
  getMonthlyFees,
  createMonthlyFee,
  updateMonthlyFee,
  deleteMonthlyFee,
} from "../controllers/monthlyFee.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import {
  monthlyFeeRegisterSchema,
  monthlyFeeUpdateSchema,
} from "../schemas/monthlyFee.schema";
import { authRequired } from "../middlewares/validateToken.middleware";

const router = Router();

router.get("/monthlyFees", getMonthlyFees);
router.get("/monthlyFee/:id", getMonthlyFee);
router.post(
  "/monthlyFee",
  validateSchema(monthlyFeeRegisterSchema),
  createMonthlyFee
);
router.put(
  "/monthlyFee/:id",
  validateSchema(monthlyFeeUpdateSchema),
  updateMonthlyFee
);
router.delete("/monthlyFee/:id", deleteMonthlyFee);

export default router;
