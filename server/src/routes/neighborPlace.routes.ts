import { Router } from "express";
import {
  addPlaceFromNeighbor,
  createNeighborPlace,
  deleteNeighborPlace,
} from "../controllers/neighborPlace.controller";
import { authRequired } from "../middlewares/validateToken.middleware";

const router = Router();

router.post("/neighborPlace/:id", createNeighborPlace);
router.delete("/neighborPlace/:id", deleteNeighborPlace);
router.post("/placeNeighbor/:id", addPlaceFromNeighbor);

export default router;
