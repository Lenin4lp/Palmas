import { Request, Response } from "express";
import multer from "multer";
import { Resend } from "resend";
import { Payment } from "../models/payment.model";
import { MonthlyDebt } from "../models/monthlyDebt.model";
import { Place } from "../models/place.model";
import { Neighbor } from "../models/neighbor.model";
import { readFile } from "fs/promises";
import { PDFDocument } from "pdf-lib";

const resend = new Resend(process.env.RESEND_API);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/comprobantes");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export const uploaded = upload.single("myFile");

export const uploadFile = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) return res.status(400).send("Please upload a file");

  const fileLocation = `uploads/comprobantes/${file.originalname}`;
  // Reemplazar `https://dominio.com/uploads/comprobantes/${file.originalname}`

  const fileName = file.originalname;
  const paymentId = fileName.match(/\d+/g)?.join("");
  const pdfBytes = await readFile(`uploads/comprobantes/${file.originalname}`);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const buffer = await pdfDoc.save();
  const bu = Buffer.from(buffer);

  const payment = await Payment.findByPk(paymentId, {
    include: [
      {
        model: MonthlyDebt,
        include: [{ model: Place, include: [{ model: Neighbor }] }],
      },
    ],
  });
  if (payment) {
    const neighborEmails = payment.monthlyDebt.place.neighbors.map(
      (neighbor) => neighbor.neighbor_email
    );

    if (neighborEmails) {
      neighborEmails.forEach(async (email) => {
        try {
          const { data, error } = await resend.emails.send({
            from: "LasPalmas <aliquot@aliquopalmas.co.uk>",
            to: email,
            subject: `Envío de comprobante de pago: ${file.originalname}`,
            text: "Buen día vecino. A continuación se adjunta el comprobante de pago. Gracias por su colaboración.\n\nAtentamente,\nAdministración de Conjunto Casa Club las Palmas",
            attachments: [
              {
                filename: `${file.originalname}`,
                content: bu,
              },
            ],
          });
        } catch (error) {
          console.log(error);
        }
      });
    }
  }

  res.send({ location: fileLocation });
};
