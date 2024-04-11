import {
  Model,
  DataType,
  Table,
  Column,
  HasMany,
  AfterSync,
  AutoIncrement,
  BeforeDestroy,
} from "sequelize-typescript";
import { Vehicle } from "./vehicle.model";

@Table({
  tableName: "tipo_vehiculo",
  timestamps: false,
})
export class VehicleType extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id_tipo_vehiculo",
    allowNull: false,
  })
  vehicleType_id!: number;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
    field: "tipo",
  })
  vehicleType!: string;

  @HasMany(() => Vehicle)
  vehicles!: Vehicle[];

  @AfterSync
  static createDefaultTypes = async () => {
    const defaultTypes = [
      {
        vehicleType: "Automóvil",
      },
      {
        vehicleType: "Motocicleta",
      },
    ];
    try {
      for (const singleType of defaultTypes) {
        await VehicleType.findOrCreate({
          where: {
            vehicleType: singleType.vehicleType,
          },
          defaults: singleType,
        });
      }
      console.log("Tipos de vehículo por defecto creados exitosamente");
    } catch (error) {
      console.log("Oops, algo malio sal:", error);
    }
  };
  @BeforeDestroy
  static async destroyTypeRelations(vehicleType: VehicleType) {
    await Vehicle.destroy({
      where: {
        vehicleType_id: vehicleType.vehicleType_id,
      },
    });
  }
}
