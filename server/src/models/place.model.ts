import {
  Model,
  DataType,
  Table,
  Column,
  AutoIncrement,
  HasOne,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { PlaceType } from "./placeType.model";
import { Payment } from "./payment.model";
import { Month } from "./month.model";
import { Neighbor } from "./neighbor.model";
import { NeighborPlace } from "./neighborPlace.model";
import { MonthlyDebtors } from "./montlyDebtors.model";

@Table({
  tableName: "inmueble",
  timestamps: false,
})
export class Place extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id_inmueble",
    allowNull: false,
  })
  place_id!: number;

  @Column({
    type: DataType.STRING(50),
    field: "nombre_inmueble",
    allowNull: false,
    unique: true,
  })
  place_name!: string;

  @Column({
    type: DataType.DECIMAL(6, 2),
    field: "valor_pendiente",
    allowNull: false,
  })
  pending_value!: number;

  @ForeignKey(() => PlaceType)
  @Column({
    type: DataType.INTEGER,
    field: "id_tipo",
    allowNull: false,
  })
  placeType_id!: number;

  @BelongsTo(() => PlaceType)
  placeType!: PlaceType;

  @BelongsToMany(() => Neighbor, () => NeighborPlace)
  neighbors!: Neighbor[];

  @BelongsToMany(() => Month, () => MonthlyDebtors)
  months!: Month[];

  @HasMany(() => Payment)
  payments!: Payment[];
}
