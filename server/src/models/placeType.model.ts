import {
  Model,
  DataType,
  Table,
  Column,
  AutoIncrement,
  HasMany,
  AfterSync,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Place } from "./place.model";
import { MonthlyFee } from "./monthlyFee.model";

@Table({
  tableName: "tipo_inmueble",
  timestamps: false,
})
export class PlaceType extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id_tipo",
    allowNull: false,
  })
  placetype_id!: number;

  @Column({
    type: DataType.STRING(30),
    field: "nombre_tipo",
    allowNull: true,
    unique: true,
  })
  placetype_name!: string;

  @ForeignKey(() => MonthlyFee)
  @Column({
    type: DataType.INTEGER,
    field: "alicuota",
    allowNull: false,
  })
  monthly_fee!: number;

  @HasMany(() => Place)
  places!: Place[];

  @BelongsTo(() => MonthlyFee)
  monthlyFee!: MonthlyFee;

  @AfterSync
  static createDefaultTypes = async () => {
    const defaultTypes = [
      {
        placetype_name: "Casa",
        monthly_fee: 1,
      },
      {
        placetype_name: "Local",
        monthly_fee: 1,
      },
    ];
    try {
      for (const singleType of defaultTypes) {
        await PlaceType.findOrCreate({
          where: {
            placetype_name: singleType.placetype_name,
          },
          defaults: singleType,
        });
      }
      console.log("Tipos de inmueble por defecto creados exitosamente");
    } catch (error) {
      console.log("Oops, algo malio sal: ", error);
    }
  };
}
