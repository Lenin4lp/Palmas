import { Router } from "express";
import {
  getVehicleTypes,
  getVehicleType,
  createVehicleType,
  updateVehicleType,
  deleteVehicleType,
} from "../controllers/vehicleType.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import {
  vehicleTypeRegisterSchema,
  vehicleTypeUpdateSchema,
} from "../schemas/vehicleType.schema";
import { validateSchema } from "../middlewares/validator.middleware";

const router = Router();

router.get("/vehicleTypes", getVehicleTypes);
router.get("/vehicleType/:id", getVehicleType);
router.post(
  "/vehicleType",
  validateSchema(vehicleTypeRegisterSchema),
  createVehicleType
);
router.put(
  "/vehicleType/:id",
  validateSchema(vehicleTypeUpdateSchema),
  updateVehicleType
);
router.delete("/vehicleType/:id", deleteVehicleType);

export default router;
