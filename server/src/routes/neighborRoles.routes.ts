import { Router } from "express";
import { getRoles, getRole } from "../controllers/neighborRole.controller";

const router = Router();

router.get("/roles", getRoles);
router.get("/role/:id", getRole);

export default router;
