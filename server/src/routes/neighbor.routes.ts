import { Router } from "express";
import {
  getNeighbor,
  getNeighbors,
  createNeighbor,
  updateNeighbor,
  deleteNeighbor,
} from "../controllers/neighbor.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import {
  neighborRegisterSchema,
  neighborUpdateSchema,
} from "../schemas/neighbor.schema";

const router = Router();

router.get("/neighbors", getNeighbors);
router.get("/neighbor/:id", getNeighbor);
router.post(
  "/neighbor",
  validateSchema(neighborRegisterSchema),
  createNeighbor
);
router.put(
  "/neighbor/:id",
  validateSchema(neighborUpdateSchema),
  updateNeighbor
);
router.delete("/neighbor/:id", deleteNeighbor);

export default router;
