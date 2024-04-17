import { Router } from "express";
import { uploaded, uploadFile } from "../controllers/upload.controller";

const router = Router();

router.post("/upload", uploaded, uploadFile);

export default router;
