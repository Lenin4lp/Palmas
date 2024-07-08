import { Router } from "express";
import {
  getExtraPPayment,
  getExtraPPayments,
  createExtraPPayment,
  updateExtraPPayment,
  deleteExtraPPayment,
} from "../controllers/extraPPayment.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import {
  extraPPaymentRegisterSchema,
  ExtraPPaymentUpdateSchema,
} from "../schemas/extraPPayment.schema";

const router = Router();

router.get("/extraPPayments", getExtraPPayments);
router.get("/extraPPayment/:id", getExtraPPayment);
router.post(
  "/extraPPayment",
  validateSchema(extraPPaymentRegisterSchema),
  createExtraPPayment
);
router.put(
  "/extraPPayment/:id",
  validateSchema(ExtraPPaymentUpdateSchema),
  updateExtraPPayment
);
router.delete("/extraPPayment/:id", deleteExtraPPayment);

export default router;
