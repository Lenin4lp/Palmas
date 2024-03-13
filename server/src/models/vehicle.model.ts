import {
  Model,
  DataType,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { VehicleType } from "./vehicleType.model";
import { Place } from "./place.model";

@Table({
  tableName: "vehiculo",
  timestamps: false,
})
export class Vehicle extends Model {
  @Column({
    type: DataType.STRING(10),
    primaryKey: true,
    field: "placa",
    unique: true,
  })
  plate!: string;

  @ForeignKey(() => Place)
  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    field: "id_inmueble",
  })
  place_id!: string;

  @ForeignKey(() => VehicleType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "tipo_vehiculo",
  })
  vehicleType_id!: string;

  @BelongsTo(() => VehicleType)
  vehicleType!: VehicleType;
}
