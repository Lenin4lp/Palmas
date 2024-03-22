import { Router } from "express";
import {
  addPlaceFromNeighbor,
  createNeighborPlace,
  deleteNeighborPlace,
  deletePlaceFromNeighbor,
} from "../controllers/neighborPlace.controller";
import { authRequired } from "../middlewares/validateToken.middleware";

const router = Router();

router.post("/neighborPlace/:id", createNeighborPlace);
router.delete("/neighborPlace/:id", deleteNeighborPlace);
router.post("/placeNeighbor/:id", addPlaceFromNeighbor);
router.delete("/placeNeighbor/:id/:place_id", deletePlaceFromNeighbor);

export default router;
