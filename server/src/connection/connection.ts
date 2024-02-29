import { Sequelize } from "sequelize-typescript";
import "dotenv/config";
import { User } from "../models/user.model";
import { Place } from "../models/place.model";
import { Neighbor } from "../models/neighbor.model";
import { NeighborRole } from "../models/neighborRole.model";
import { PlaceType } from "../models/placeType.model";
import { Month } from "../models/month.model";
import { Year } from "../models/year.model";
import { MonthlyFee } from "../models/monthlyFee.model";
import { Payment } from "../models/payment.model";
import { NeighborPlace } from "../models/neighborPlace.model";
import { MonthlyDebtors } from "../models/montlyDebtors.model";

export const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: process.env.DB_PASSWORD,
  database: "palmas",
  port: 3306,
  models: [
    User,
    Place,
    Neighbor,
    NeighborPlace,
    NeighborRole,
    PlaceType,
    Month,
    Year,
    MonthlyFee,
    Payment,
    MonthlyDebtors,
  ],
  sync: { alter: true },
});

export async function connectionDB() {
  try {
    await connection.sync();
    console.log("Si funca");
  } catch (error) {
    console.log(error);
  }
}
