import { Router } from "express";
import {
  getExtraPTypes,
  getExtraPType,
  createExtraPType,
  updateExtraPType,
  deleteExtraPType,
} from "../controllers/extraPType.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import {
  extraPTypeRegisterSchema,
  extraPTypeUpdateSchema,
} from "../schemas/extraPType.schema";

const router = Router();

router.get("/extraPTypes", getExtraPTypes);
router.get("/extraPType/:id", getExtraPType);
router.post(
  "/extraPType",
  validateSchema(extraPTypeRegisterSchema),
  createExtraPType
);
router.put(
  "/extraPType/:id",
  validateSchema(extraPTypeUpdateSchema),
  updateExtraPType
);
router.delete("/extraPType/:id", deleteExtraPType);

export default router;
