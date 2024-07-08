import { Request, Response } from "express";
import multer from "multer";
import { PDFDocument } from "pdf-lib";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `estadoCuenta.pdf`);
  },
});

const upload = multer({ storage: storage });

export const uploadedAccount = upload.single("myFile");

export const uploadFileAccount = (req: Request, res: Response) => {
  const file = req.file;
  if (!file) return res.status(400).send("Please upload a file");

  const fileLocation = `uploads/estadoCuenta.pdf`;
  // Reemplazar `https://dominio.com/uploads/estadoCuenta.pdf`
  res.send({ location: fileLocation });
};
