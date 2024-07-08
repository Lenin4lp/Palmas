import {
  Model,
  DataType,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  BeforeCreate,
  AutoIncrement,
} from "sequelize-typescript";
import { ExtraPayment } from "./extraPayment.model";

@Table({
  tableName: "pago_pago_extra",
  timestamps: false,
})
export class ExtraPPayment extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id_pago_pago_extra",
    allowNull: false,
    unique: true,
  })
  extraPPayment_id!: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
    field: "deposito",
  })
  deposit!: string;

  @Column({
    type: DataType.STRING(20),
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

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    field: "archivo",
  })
  file!: string;

  @ForeignKey(() => ExtraPayment)
  @Column({
    type: DataType.STRING(15),
    allowNull: false,
    field: "id_pago_extra",
  })
  extraPayment_id!: string;

  @BelongsTo(() => ExtraPayment)
  extraPayment!: ExtraPayment;
}
