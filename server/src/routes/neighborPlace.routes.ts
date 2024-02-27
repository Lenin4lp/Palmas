import { Router } from "express";
import {
  createNeighborPlace,
  deleteNeighborPlace,
} from "../controllers/neighborPlace.controller";
import { authRequired } from "../middlewares/validateToken.middleware";

const router = Router();

router.post("/neighborPlace", createNeighborPlace);
router.delete("/neighborPlace/:place_id/:neighbor_id", deleteNeighborPlace);

export default router;
