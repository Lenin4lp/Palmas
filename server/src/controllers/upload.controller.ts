import { Request, Response } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export const uploaded = upload.single("myFile");

export const uploadFile = (req: Request, res: Response) => {
  const file = req.file;
  if (!file) return res.status(400).send("Please upload a file");

  const fileLocation = `https://api.istvc.edu.ec/uploads/${file.originalname}`;
  res.send({ location: fileLocation });
};
