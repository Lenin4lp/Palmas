import { Router } from "express";
import {
  getMonthlyDebts,
  getMonthlyDebt,
} from "../controllers/monthlyDebt.controller";
import { authRequired } from "../middlewares/validateToken.middleware";

const router = Router();

router.get("/monthlyDebts", getMonthlyDebts);
router.get("/monthlyDebt/:id", getMonthlyDebt);

export default router;
