import { Router } from "express";
import {
  createNeighborPlace,
  deleteNeighborPlace,
} from "../controllers/neighborPlace.controller";
import { authRequired } from "../middlewares/validateToken.middleware";

const router = Router();

router.post("/neighborPlace/:id", createNeighborPlace);
router.delete("/neighborPlace/:id", deleteNeighborPlace);

export default router;
