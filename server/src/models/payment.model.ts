import {
  Model,
  DataType,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Place } from "./place.model";
import { Month } from "./month.model";

@Table({
  tableName: "pago_alicuota",
  timestamps: false,
})
export class Payment extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id_pago",
    allowNull: false,
    unique: true,
  })
  payment_id!: number;

  @Column({
    type: DataType.STRING(15),
    allowNull: true,
    field: "deposito",
  })
  deposit!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "efectivo",
  })
  cash!: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "no_recibo",
  })
  receipt!: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    field: "fecha",
  })
  date!: string;

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
