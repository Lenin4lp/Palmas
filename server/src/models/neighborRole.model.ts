import {
  Model,
  DataType,
  Table,
  Column,
  AutoIncrement,
  HasMany,
} from "sequelize-typescript";
import { Neighbor } from "./neighbor.model";

@Table({
  tableName: "rol_vecino",
  timestamps: false,
})
export class NeighborRole extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id_rol",
    allowNull: false,
  })
  role_id!: number;

  @Column({
    type: DataType.STRING(30),
    field: "nombre_rol",
    allowNull: false,
    unique: true,
  })
  role_name!: string;

  @HasMany(() => Neighbor)
  neighbors!: Neighbor[];
}
