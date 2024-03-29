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
  BeforeUpdate,
} from "sequelize-typescript";
import { Year } from "./year.model";
import { Payment } from "./payment.model";
import { MonthlyFee } from "./monthlyFee.model";
import { Place } from "./place.model";
import { MonthlyDebt } from "./monthlyDebt.model";

@Table({
  tableName: "month",
  timestamps: false,
})
export class Month extends Model {
  @Column({
    type: DataType.STRING(15),
    allowNull: true,
    field: "id_mes",
  })
  month_id!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    field: "mes",
  })
  month!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "dia_pago",
  })
  pay_day!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "estado",
  })
  month_status!: boolean;

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

  @BelongsToMany(() => Place, () => MonthlyDebt)
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

  @BeforeUpdate
  static async generateDebtIfStatusFalse(month: Month) {
    if (month.changed("month_status") && month.month_status === false) {
      const placeIds = month.places.map((place) => place.place_id);
      await MonthlyDebt.bulkCreate(
        placeIds.map((placeId) => ({
          month_id: month.month_id,
          place_id: placeId,
          // Otros campos necesarios para la deuda
        }))
      );
    }
  }
}
