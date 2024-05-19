import {
  Model,
  DataType,
  Column,
  Table,
  AutoIncrement,
  AfterSync,
  HasMany,
  BeforeDestroy,
} from "sequelize-typescript";
import { ExtraPayment } from "./extraPayment.model";

@Table({
  tableName: "tipo_pago_extra",
  timestamps: false,
})
export class ExtraPType extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id_tipo_pago_extra",
    allowNull: false,
  })
  extraPType_id!: number;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
    field: "tipo",
  })
  extraPType!: string;

  @HasMany(() => ExtraPayment)
  extraPayments!: ExtraPayment[];

  @AfterSync
  static createDefaultTypes = async () => {
    const defaultTypes = [
      {
        extraPType: "Multa",
      },
      {
        extraPType: "Servicios",
      },
      {
        extraPType: "Otros",
      },
    ];
    try {
      for (const singleType of defaultTypes) {
        await ExtraPType.findOrCreate({
          where: {
            extraPType: singleType.extraPType,
          },
          defaults: singleType,
        });
      }
      console.log("Tipos de pago extra por defecto creados exitosamente");
    } catch (error) {
      console.log("Oops, algo malio sal:", error);
    }
  };

  @BeforeDestroy
  static destroyDefaultTypes = async (extraPType: ExtraPType) => {
    await ExtraPayment.destroy({
      where: { extraPType_id: extraPType.extraPType_id },
    });
  };
}
