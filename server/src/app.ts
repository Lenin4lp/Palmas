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
import cron from "node-cron";
import { Month } from "./models/month.model";
import { MonthlyDebt } from "./models/monthlyDebt.model";
import { MonthlyFee } from "./models/monthlyFee.model";
import { Place } from "./models/place.model";
import MonthlyDebtRoutes from "./routes/monthlyDebt.routes";

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

app.get("/", (_req, res) => {
  res.send("Hola mundo");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
connectionDB();
export default app;

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
    const monthFound = await Month.findOne({
      where: { month_id: `${currentMonth}-${currentYear}` },
      include: { model: MonthlyFee },
    });
    if (monthFound) {
      console.log(monthFound.monthlyFee?.monthlyFee_value);
      try {
        const monthlyDebts = await MonthlyDebt.findAll({
          where: { month_id: monthFound.month_id },
        });
        if (monthlyDebts) {
          for (const monthlyDebt of monthlyDebts) {
            monthlyDebt.debt = 0;
            await monthlyDebt.save();
          }
          return "Se han cambiado los deudas";
        }
      } catch (error) {
        return error;
      }
    } else {
      return "No hay ese mes perro";
    }
  } catch (error) {
    console.log(error);
  }
};

// ? Prueba node-cron
cron.schedule(" */5 * * * * *", async () => {
  const currentDateString = new Date().toString();
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = ObtainMonth(currentDateString);
  const mesprueba = await ChangeMonth(currentMonth, currentYear);

  console.log(mesprueba);
  console.log(`${currentMonth}-${currentYear}`);
});
