import { Router } from "express";
import {
  getVehicle,
  getVehicles,
  createVehicle,
  deleteVehicle,
  updateVehicle,
} from "../controllers/vehicle.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import {
  vehicleRegisterSchema,
  vehicleUpdateSchema,
} from "../schemas/vehicle.schema";
import { validateSchema } from "../middlewares/validator.middleware";

const router = Router();

router.get("/vehicles", getVehicles);
router.get("/vehicle/:id", getVehicle);
router.post("/vehicle", validateSchema(vehicleRegisterSchema), createVehicle);
router.put("/vehicle/:id", validateSchema(vehicleUpdateSchema), updateVehicle);
router.delete("/vehicle/:id", deleteVehicle);

export default router;
