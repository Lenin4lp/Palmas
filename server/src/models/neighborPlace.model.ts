import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
  BeforeCreate,
} from "sequelize-typescript";
import { Neighbor } from "./neighbor.model";
import { Place } from "./place.model";
import { v4 as uuidv4 } from "uuid";

@Table({
  tableName: "vecino_inmueble",
  timestamps: false,
})
export class NeighborPlace extends Model {
  @ForeignKey(() => Neighbor)
  @Column({
    type: DataType.STRING(10),
    field: "id_vecino",
    allowNull: false,
    unique: true,
  })
  neighbor_id!: string;

  @ForeignKey(() => Place)
  @Column({
    type: DataType.INTEGER,
    field: "id_inmueble",
    allowNull: false,
  })
  place_id!: number;
}
