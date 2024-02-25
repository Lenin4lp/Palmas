import {
  Model,
  DataType,
  Table,
  Column,
  AutoIncrement,
  HasMany,
  HasOne,
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
    allowNull: false,
    unique: true,
  })
  placetype_name!: string;

  @HasMany(() => Place)
  places!: Place[];
}
