import {
  Model,
  DataType,
  Table,
  Column,
  BeforeCreate,
  ForeignKey,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Place } from "./place.model";
import { Month } from "./month.model";

@Table({
  tableName: "deudores",
  timestamps: false,
})
export class MonthlyDebtors extends Model {
  @Column({
    type: DataType.STRING(10),
    primaryKey: true,
    field: "id",
    allowNull: true,
    unique: true,
  })
  id!: string;

  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: true,
    field: "deuda",
  })
  debt!: number;

  @ForeignKey(() => Place)
  @Column({
    type: DataType.INTEGER,
    field: "id_inmueble",
    allowNull: false,
  })
  place_id!: number;

  @ForeignKey(() => Month)
  @Column({
    type: DataType.STRING(15),
    field: "id_mes",
    allowNull: false,
  })
  month_id!: string;
}
