import {
  Model,
  DataType,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  BeforeCreate,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Place } from "./place.model";
import { Month } from "./month.model";
import { MonthlyDebt } from "./monthlyDebt.model";

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
    type: DataType.STRING(15),
    allowNull: true,
    field: "transferencia",
  })
  transfer!: string;

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: true,
    field: "valor",
  })
  value!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "efectivo",
  })
  cash!: boolean;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
    field: "documento_identidad",
  })
  id_document!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    field: "fecha",
  })
  date!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: "cliente",
  })
  customer!: string;

  @ForeignKey(() => MonthlyDebt)
  @Column({
    type: DataType.STRING(15),
    allowNull: false,
    field: "id_deuda",
  })
  monthlyDebt_id!: string;

  @BelongsTo(() => MonthlyDebt)
  monthlyDebt!: MonthlyDebt;

  @BeforeCreate
  static async subtractPaymentFromDebt(payment: Payment) {
    const monthlyDebt = await MonthlyDebt.findByPk(payment.monthlyDebt_id);
    if (monthlyDebt) {
      if (monthlyDebt.debt !== 0) {
        monthlyDebt.debt -= payment.value;
      } else {
        // Pago adelantado, hacer el valor negativo
        monthlyDebt.debt = -payment.value;
      }
      await monthlyDebt.save();
    }
  }
}
