import { truncate } from "fs";
import {
  Model,
  DataType,
  Table,
  Column,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { v4 as uuidv4 } from "uuid";
import { Month } from "./month.model";
import { Place } from "./place.model";
import { Payment } from "./payment.model";

@Table({
  tableName: "pago_dia",
  timestamps: false,
})
export class PayDay extends Model {
  @Column({
    type: DataType.STRING(10),
    primaryKey: true,
    field: "id",
    allowNull: true,
    unique: true,
  })
  day_id!: string;

  @Column({
    type: DataType.DATE,
    field: "fecha",
    allowNull: false,
  })
  date!: Date;

  @HasMany(() => Month)
  months!: Month[];

  @BelongsToMany(() => Place, () => Payment)
  places!: Place[];
}
