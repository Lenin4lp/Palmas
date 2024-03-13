import { Router } from "express";
import {
  getPlaceTypes,
  getPlaceType,
  createPlaceType,
  updatePlaceType,
  deletePlaceType,
} from "../controllers/placeType.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import {
  placeTypeRegisterSchema,
  placeTypeUpdateSchema,
} from "../schemas/placeType.schema";
import { validateSchema } from "../middlewares/validator.middleware";

const router = Router();

router.get("/placeTypes", getPlaceTypes);
router.get("/placeType/:id", getPlaceType);
router.post(
  "/placeType",
  validateSchema(placeTypeRegisterSchema),
  createPlaceType
);
router.put(
  "/placeType/:id",
  validateSchema(placeTypeUpdateSchema),
  updatePlaceType
);
router.delete("/placeType/:id", deletePlaceType);

export default router;
