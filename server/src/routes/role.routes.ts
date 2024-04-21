import { Router } from "express";
import { getRole, getRoles } from "../controllers/role.controller";

const router = Router();

router.get("/userRole/:id", getRole);
router.get("/userRoles", getRoles);

export default router;
