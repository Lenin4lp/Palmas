import { Router } from "express";
import {
  getPayment,
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "../controllers/payment.controller";
import { validateSchema} from "../middlewares/validator.middleware";
import { paymentRegisterSchema, paymentUpdateSchema } from "../schemas/payment.schema";

const router = Router();

router.get("/payments", getPayments);
router.get("/payment/:id", getPayment);
router.post("/payment", validateSchema(paymentRegisterSchema), createPayment);
router.put("/payment/:id", validateSchema(paymentUpdateSchema), updatePayment);
router.delete("/payment/:id", deletePayment);

export default router;
