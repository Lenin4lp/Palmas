import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectionDB } from "./connection/connection";
import authRoutes from "./routes/auth.routes";
import neighborRoutes from "./routes/neighbor.routes";
import placeRoutes from "./routes/place.routes";
import neighborPlaceRoutes from "./routes/neighborPlace.routes";
import monthlyFeeRoutes from "./routes/monthlyFee.routes";
import yearRoutes from "./routes/year.routes";
import rolesRoutes from "./routes/neighborRoles.routes";
import placeTypesRoutes from "./routes/placeTypes.routes";
import vehicleTypeRoutes from "./routes/vehicleTypes.routes";
import vehicleRoutes from "./routes/vehicle.routes";
import cron from "node-cron";
import { Month } from "./models/month.model";
import { MonthlyDebt } from "./models/monthlyDebt.model";
import { MonthlyFee } from "./models/monthlyFee.model";
import { Place } from "./models/place.model";
import MonthlyDebtRoutes from "./routes/monthlyDebt.routes";
import { Year } from "./models/year.model";
import { PlaceType } from "./models/placeType.model";
import PaymentRoutes from "./routes/payment.routes";
import uploadRoutes from "./routes/upload.routes";
import userRoutes from "./routes/user.routes";
import userRolesRoutes from "./routes/role.routes";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { readFile } from "fs/promises";
import { writeFile } from "fs/promises";
import { Neighbor } from "./models/neighbor.model";
import { Resend } from "resend";
import { Model } from "sequelize";

const app = express();

app.use(morgan("dev"));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", neighborRoutes);
app.use("/api", placeRoutes);
app.use("/api", neighborPlaceRoutes);
app.use("/api", monthlyFeeRoutes);
app.use("/api", yearRoutes);
app.use("/api", rolesRoutes);
app.use("/api", placeTypesRoutes);
app.use("/api", vehicleTypeRoutes);
app.use("/api", MonthlyDebtRoutes);
app.use("/api", vehicleRoutes);
app.use("/api", PaymentRoutes);
app.use("/api", uploadRoutes);
app.use("/api", userRoutes);
app.use("/api", userRolesRoutes);

app.get("/", (_req, res) => {
  res.send("Hola mundo");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
connectionDB();
export default app;

const resend = new Resend(process.env.RESEND_API);

async function ModifyPDF(
  month: string,
  year: string,
  place: string,
  amount: number,
  debt: number
) {
  const filePath = "public/uploads/estadoCuenta.pdf";
  const existingPdfBytes = await readFile(filePath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const width = firstPage.getWidth();
  const height = firstPage.getHeight();

  const centerX = width / 2;

  function textStartX(textWidth: number) {
    return centerX - textWidth / 2;
  }

  function translateAbreviations(month: string) {
    if (month.startsWith("JAN")) {
      return "ENE" + month.substring(3);
    } else if (month.startsWith("APR")) {
      return "ABR" + month.substring(3);
    } else if (month.startsWith("AUG")) {
      return "AGO" + month.substring(3);
    } else if (month.startsWith("DEC")) {
      return "DIC" + month.substring(3);
    } else {
      return month;
    }
  }

  firstPage.drawRectangle({
    x: 75,
    y: 190,
    width: 70,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  firstPage.drawRectangle({
    x: 75,
    y: 160,
    width: 70,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });

  firstPage.drawText("Inmueble", {
    x: 90,
    y: 200,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(`${place}`, {
    x: 90,
    y: 170,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  firstPage.drawRectangle({
    x: 145,
    y: 190,
    width: 120,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  firstPage.drawRectangle({
    x: 145,
    y: 160,
    width: 120,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });

  firstPage.drawText("Saldo pendiente", {
    x: 168,
    y: 200,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(`$${(amount - debt).toFixed(2)}`, {
    x: 190,
    y: 170,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  firstPage.drawRectangle({
    x: 265,
    y: 190,
    width: 145,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  firstPage.drawRectangle({
    x: 265,
    y: 160,
    width: 145,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });

  firstPage.drawText(`Valor alicuota ${translateAbreviations(month)}-${year}`, {
    x: 285,
    y: 200,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(`$${debt}`, {
    x: 318,
    y: 170,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  firstPage.drawRectangle({
    x: 410,
    y: 190,
    width: 120,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  firstPage.drawRectangle({
    x: 410,
    y: 160,
    width: 120,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });

  firstPage.drawText(`Total`, {
    x: 460,
    y: 200,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(`$${amount}`, {
    x: 450,
    y: 170,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  const modifiedPdfBytes = await pdfDoc.save();

  await writeFile(
    `public/uploads/EstadoDeCuenta-${month}-${year}-${place}.pdf`,
    modifiedPdfBytes
  );

  return modifiedPdfBytes;
}

cron.schedule("2 51 19 * * *", async () => {
  const currentDateString = new Date().toString();
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = ObtainMonth(currentDateString);

  const monthId = `${currentMonth}-${currentYear}`;

  const places = await Place.findAll({
    include: [{ model: Neighbor }, { model: Month }],
  });

  places.forEach(async (place) => {
    const monthlyDebt = await MonthlyDebt.findOne({
      where: {
        place_id: place.place_id,
        month_id: monthId,
      },
    });
    if (monthlyDebt) {
      ModifyPDF(
        currentMonth,
        currentYear,
        place.place_name,
        place.pending_value,
        monthlyDebt.debt
      ).then((modifiedPdfBytes) => {
        const pdfBuffer = Buffer.from(modifiedPdfBytes);
        place.neighbors.forEach(async (neighbor) => {
          console.log(neighbor.neighbor_id, monthId);
          if (neighbor.neighbor_email !== null) {
            try {
              const { data, error } = await resend.emails.send({
                from: "LasPalmas <aliquot@softdeveral.com>",
                to: neighbor.neighbor_email,
                subject: `Estado de cuenta Conjunto Las Palmas - ${currentMonth} - ${currentYear}`,
                text: "Buen día vecino. A continuación se adjunta su estado de cuenta. Gracias por su colaboración.\n\nAtentamente,\nAdministración de Cnjto. las Palmas",
                attachments: [
                  {
                    filename: `Estado de cuenta ${currentMonth}-${currentYear}-${place.place_name}.pdf`,

                    content: pdfBuffer,
                  },
                ],
              });
            } catch (error) {
              console.log("Algo malio sal", error);
            }
          } else {
            console.log("No hay correo mijooo");
          }
        });
        console.log("Si se hizo la carnita :)");
      });
      console.log("Mensaje de comprobaciones");
    }
  });
});

// ? ObtainMonth
function ObtainMonth(date: string): string {
  const month = date.split(" ");
  if (month.length >= 2) {
    return month[1].toUpperCase();
  } else {
    return "NO SE PUEDE";
  }
}

// ? MonthlyDebt
const ChangeMonth = async (currentMonth: string, currentYear: string) => {
  try {
    const places = await Place.findAll({
      include: [
        { model: PlaceType, include: [{ model: MonthlyFee }] },
        { model: Month },
      ],
    });
    if (places) {
      for (const place of places) {
        const monthlyDebt = await MonthlyDebt.findOne({
          where: {
            place_id: place.place_id,
            month_id: `${currentMonth}-${currentYear}`,
          },
        });
        if (monthlyDebt) {
          const monthlyFee = await MonthlyFee.findOne({
            where: { monthlyFee_id: place.placeType.monthly_fee },
          });
          if (monthlyFee) {
            const totalDebt =
              Number(monthlyDebt.debt) +
              Number(place.placeType.monthlyFee.monthlyFee_value);
            monthlyDebt.debt = totalDebt;

            if (monthlyDebt.early_payment !== null) {
              if (monthlyDebt.debt >= monthlyDebt.early_payment) {
                monthlyDebt.debt -= monthlyDebt.early_payment;
                monthlyDebt.early_payment -= monthlyDebt.early_payment;
              }
            }

            await monthlyDebt.save();
          }
          console.log(monthlyDebt);
        } else {
          return "No hay ese mes";
        }
      }
    }
  } catch (error) {
    return error;
  }
};

// ? Prueba node-cron
cron.schedule(" 1 20 4 5 * *", async () => {
  const currentDateString = new Date().toString();
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = ObtainMonth(currentDateString);
  const mesprueba = await ChangeMonth(currentMonth, currentYear);
  console.log(currentDateString);
  console.log(mesprueba);

  console.log(`${currentMonth}-${currentYear}`);
});

cron.schedule("1 20 4 2 1 *", async () => {
  const currentYear = new Date().getFullYear().toString();
  const foundYear = await Year.findOne({ where: { year: currentYear } });

  if (!foundYear) {
    try {
      const newYear = await Year.create({
        year: currentYear,
      });

      if (newYear) {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        for (const month of months) {
          const newMonth = await Month.create({
            month,
            month_year: newYear.year,
          });
          const places = await Place.findAll();
          for (const place of places) {
            await MonthlyDebt.create({
              debt: 0,
              month_id: newMonth.month_id,
              place_id: place.place_id,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    return "Ya existe el año";
  }
});
