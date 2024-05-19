import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
} from "sequelize-typescript";
import { ExtraPType } from "./extraPType.model";
import { MonthlyDebt } from "./monthlyDebt.model";
import { v4 as uuidv4 } from "uuid";

@Table({
  tableName: "pago_extra",
  timestamps: false,
})
export class ExtraPayment extends Model {
  @Column({
    type: DataType.STRING(15),
    primaryKey: true,
    field: "id_pago_extra",
    allowNull: true,
    unique: true,
  })
  extra_payment_id!: string;

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: false,
    field: "valor",
  })
  value!: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    field: "fecha",
  })
  date!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: "descripcion",
  })
  description!: string;

  @ForeignKey(() => ExtraPType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "id_tipo_pago_extra",
  })
  extraPType_id!: number;

  @ForeignKey(() => MonthlyDebt)
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    field: "id_deuda",
  })
  monthlyDebt_id!: string;

  @BelongsTo(() => ExtraPType)
  extraPType!: ExtraPType;

  @BelongsTo(() => MonthlyDebt)
  monthlyDebt!: MonthlyDebt;

  @BeforeCreate
  static generateExtraPaymentId(extraPayment: ExtraPayment) {
    const generatedUuid = uuidv4().substring(0, 7);
    const extraPType = ExtraPType.findByPk(extraPayment.extraPType_id);
    extraPayment.extra_payment_id = `EP${generatedUuid}-${extraPayment.monthlyDebt_id.substring(
      0,
      4
    )}`;
  }
}
