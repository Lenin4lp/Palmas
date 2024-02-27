import { Router } from "express";
import {
  getPlace,
  getPlaces,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/place.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { validateSchema } from "../middlewares/validator.middleware";
import { placeRegisterSchema, placeUpdateSchema } from "../schemas/place.schema";

const router = Router();

router.get("/places", getPlaces);
router.get("/place/:id", getPlace);
router.post("/place", validateSchema(placeRegisterSchema), createPlace);
router.put("/place/:id", validateSchema(placeUpdateSchema), updatePlace);
router.delete("/place/:id", deletePlace);

export default router;
