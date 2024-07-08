import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  AfterUpdate,
  AfterCreate,
  AfterSync,
  BeforeUpdate,
  HasMany,
} from "sequelize-typescript";
import { ExtraPType } from "./extraPType.model";
import { MonthlyDebt } from "./monthlyDebt.model";
import { v4 as uuidv4 } from "uuid";
import { Place } from "./place.model";
import { ExtraPPayment } from "./extraPPayment.model";

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

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: "estado",
  })
  status!: boolean;

  @ForeignKey(() => ExtraPType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "id_tipo_pago_extra",
  })
  extraPType_id!: number;

  @ForeignKey(() => Place)
  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    field: "id_inmueble",
  })
  place_id!: string;

  @BelongsTo(() => ExtraPType)
  extraPType!: ExtraPType;

  @BelongsTo(() => Place)
  place!: Place;

  @HasMany(() => ExtraPPayment)
  extraPPayments!: ExtraPPayment[];

  @BeforeCreate
  static generateExtraPaymentId(extraPayment: ExtraPayment) {
    const generatedUuid = uuidv4().substring(0, 7);
    const extraPType = ExtraPType.findByPk(extraPayment.extraPType_id);
    extraPayment.extra_payment_id = `EP${generatedUuid}-${extraPayment.place_id.substring(
      0,
      4
    )}`;
  }

  @BeforeUpdate
  static updateExtraPaymentStatus(extraPayment: ExtraPayment) {
    if (extraPayment.value > 0) {
      extraPayment.status = true;
    } else {
      extraPayment.status = false;
    }
  }

  @AfterCreate
  @AfterUpdate
  static async updateDebt(extraPayment: ExtraPayment) {
    const feeDebt =
      (await MonthlyDebt.sum("debt", {
        where: { place_id: extraPayment.place_id },
      })) ?? 0;

    const extraDebt = await ExtraPayment.sum("value", {
      where: { place_id: extraPayment.place_id },
    });

    const totalDebt = feeDebt + extraDebt;
    const place = await Place.findByPk(extraPayment.place_id);
    if (place) {
      await place.update({ pending_value: totalDebt });
      place.save();
    }
  }
}
