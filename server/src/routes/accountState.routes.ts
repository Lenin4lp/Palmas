import { Router } from "express";
import {
  getAccountStates,
  getAccountState,
} from "../controllers/accountState.controller";

const router = Router();

router.get("/accountStates", getAccountStates);
router.get("/accountState", getAccountState);

export default router;
