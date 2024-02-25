import {
  Model,
  DataType,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  HasMany,
  BelongsToMany,
  BeforeCreate,
} from "sequelize-typescript";
import { Year } from "./year.model";
import { Payment } from "./payment.model";
import { MonthlyFee } from "./monthlyFee.model";
import { Place } from "./place.model";

@Table({
  tableName: "month",
  timestamps: false,
})
export class Month extends Model {
  @Column({
    type: DataType.STRING(15),
    allowNull: false,
    field: "id_mes",
  })
  month_id!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    field: "mes",
  })
  month!: string;

  @ForeignKey(() => Year)
  @Column({
    type: DataType.STRING(4),
    allowNull: false,
    field: "year",
  })
  month_year!: string;

  @ForeignKey(() => MonthlyFee)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "id_alicuota",
  })
  monthlyFee_id!: number;

  @BelongsToMany(() => Place, () => Payment)
  places!: Place[];

  @BelongsTo(() => MonthlyFee)
  monthlyFee!: MonthlyFee;

  @BelongsTo(() => Year)
  year!: Year;

  @BeforeCreate
  static async automatizeId(month: Month) {
    const monthName = month.month;
    const year = month.month_year;
    monthName.toUpperCase();
    month.month_id = `${monthName}${year}`;
  }
}
