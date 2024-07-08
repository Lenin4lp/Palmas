import { Router } from "express";
import { uploaded, uploadFile } from "../controllers/upload.controller";
import {
  extraUploaded,
  extraUploadFile,
} from "../controllers/extraPaymentUpload.controller";
import {
  uploadedAccount,
  uploadFileAccount,
} from "../controllers/accouStateUpload.controller";

const router = Router();

router.post("/upload", uploaded, uploadFile);
router.post("/extraUpload", extraUploaded, extraUploadFile);
router.post("/accountUpload", uploadedAccount, uploadFileAccount);

export default router;
