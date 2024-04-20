import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
  BeforeCreate,
  BeforeUpdate,
  AfterUpdate,
  AfterConnect,
  AfterSync,
  BeforeSync,
  BeforeDestroy,
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
    type: DataType.STRING(20),
    primaryKey: true,
    unique: true,
    allowNull: true,
    field: "id_deuda",
  })
  monthlyDebt_id!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "estado",
  })
  month_status!: boolean;

  @Column({
    type: DataType.DECIMAL(8, 2),
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

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: true,
    field: "abono",
  })
  early_payment!: number;

  @HasMany(() => Payment)
  payments!: Payment[];

  @BelongsTo(() => Place)
  place!: Place;

  @BelongsTo(() => Month)
  month!: Month;

  @BeforeCreate
  static generateMonthlyDebtId(monthlyDebt: MonthlyDebt) {
    const generatedUuid = uuidv4().substring(0, 5);
    monthlyDebt.monthlyDebt_id = `${
      monthlyDebt.month_id
    }-${monthlyDebt.place_id.slice(0, 2)}-${generatedUuid}`;
  }

  @BeforeUpdate
  static updateMonthlyDebtStatus(monthlyDebt: MonthlyDebt) {
    if (monthlyDebt.debt > 0) {
      monthlyDebt.month_status = false;
    } else {
      monthlyDebt.month_status = true;
    }
  }

  @AfterSync
  static async updateAutoDebt(monthlyDebt: MonthlyDebt) {
    const places = await Place.findAll();
    for (const place of places) {
      const totalDebt = await MonthlyDebt.sum("debt", {
        where: {
          place_id: place.place_id,
        },
      });
      console.log(totalDebt);

      try {
        await place.update({ pending_value: totalDebt });
      } catch (error) {
        console.log(error);
      }
    }
  }

  @AfterUpdate
  static async updateDebt(monthlyDebt: MonthlyDebt) {
    const totalDebt = await MonthlyDebt.sum("debt", {
      where: {
        place_id: monthlyDebt.place_id,
      },
    });
    const place = await Place.findByPk(monthlyDebt.place_id);
    if (place) {
      await place.update({ pending_value: totalDebt });
      place.save();
    }
  }

  @BeforeDestroy
  static async destroyMonthlyDebtRelations(monthlyDebt: MonthlyDebt) {
    await Payment.destroy({
      where: { monthlyDebt_id: monthlyDebt.monthlyDebt_id },
    });
  }
}
