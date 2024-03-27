import {
  Model,
  DataType,
  Table,
  Column,
  AutoIncrement,
  HasMany,
  AfterSync,
} from "sequelize-typescript";
import { Place } from "./place.model";

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

  @HasMany(() => Place)
  places!: Place[];

  @AfterSync
  static createDefaultTypes = async () => {
    const defaultTypes = [
      {
        placetype_name: "Casa",
      },
      {
        placetype_name: "Local",
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
