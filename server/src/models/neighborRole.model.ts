import {
  Model,
  DataType,
  Table,
  Column,
  AutoIncrement,
  HasMany,
  AfterSync,
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

  @AfterSync
  static createDefaultRoles = async () => {
    const defaultRoles = [
      {
        role_name: "Propietario",
      },
      {
        role_name: "Arrendatario",
      },
    ];
    try {
      for (const singleRole of defaultRoles) {
        await NeighborRole.findOrCreate({
          where: {
            role_name: singleRole.role_name,
          },
          defaults: singleRole,
        });
      }
      console.log("Roles por defecto creados exitosamente");
    } catch (error) {
      console.log("Oops, algo malio sal: ", error);
    }
  };
}
