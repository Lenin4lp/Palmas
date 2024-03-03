import { Model, DataType, Table, Column, HasMany } from "sequelize-typescript";
import { Vehicle } from "./vehicle.model";

@Table({
  tableName: "tipo_vehiculo",
  timestamps: false,
})
export class VehicleType extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id_tipo_vehiculo",
  })
  vehicleType_id!: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
    field: "tipo",
  })
  vehicleType!: string;

  @HasMany(() => Vehicle)
  vehicles!: Vehicle[];
}
