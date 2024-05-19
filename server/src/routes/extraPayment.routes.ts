import { Router } from "express";
import {
  getExtraPayment,
  getExtraPayments,
  createExtraPayment,
  updateExtraPayment,
  deleteExtraPayment,
} from "../controllers/extraPayment.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import {
  extraPaymentRegisterSchema,
  extraPaymentUpdateSchema,
} from "../schemas/extraPayment.schema";

const router = Router();

router.get("/extraPayments", getExtraPayments);
router.get("/extraPayment/:id", getExtraPayment);
router.post(
  "/extraPayment",
  validateSchema(extraPaymentRegisterSchema),
  createExtraPayment
);
router.put(
  "/extraPayment/:id",
  validateSchema(extraPaymentUpdateSchema),
  updateExtraPayment
);
router.delete("/extraPayment/:id", deleteExtraPayment);

export default router;
