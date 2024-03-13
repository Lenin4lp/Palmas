import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Place } from "./place.model";
import { Month } from "./month.model";
import { Payment } from "./payment.model";

@Table({
  tableName: "deuda_mensual",
  timestamps: false,
})
export class MonthlyDebt extends Model {
  @Column({
    type: DataType.STRING(15),
    primaryKey: true,
    unique: true,
    allowNull: false,
    field: "id_deuda",
  })
  monthlyDebt_id!: string;

  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: true,
    field: "deuda",
  })
  debt!: number;

  @ForeignKey(() => Place)
  @Column({
    type: DataType.STRING(15),
    allowNull: false,
    field: "id_lugar",
  })
  place_id!: string;

  @ForeignKey(() => Month)
  @Column({
    type: DataType.STRING(15),
    allowNull: false,
    field: "id_mes",
  })
  month_id!: string;

  @HasMany(() => Payment)
  payments!: Payment[];
}
