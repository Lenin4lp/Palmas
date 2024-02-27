import { Router } from "express";
import {
  getYear,
  getYears,
  createYear,
  deleteYear,
} from "../controllers/year.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { yearRegisterSchema } from "../schemas/year.schema";
import { authRequired } from "../middlewares/validateToken.middleware";

const router = Router();

router.get("/years", getYears);
router.get("/year/:id", getYear);
router.post("/year", validateSchema(yearRegisterSchema), createYear);
router.delete("/year/:id", deleteYear);

export default router;
