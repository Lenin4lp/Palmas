import { Sequelize } from "sequelize-typescript";
import "dotenv/config";

export const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
});
