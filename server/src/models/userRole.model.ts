import { log } from "console";
import {
  Model,
  DataType,
  Table,
  Column,
  AutoIncrement,
  AfterSync,
  HasMany,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: "rol",
  timestamps: false,
})
export class Role extends Model {
  static SUPERADMIN_ROLE: string = "superadmin";
  static ADMIN_ROLE: string = "admin";
  static ASSISTANT_ROLE: string = "assistant";

  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id_rol",
    unique: true,
  })
  role_id!: number;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
    unique: true,
    field: "rol",
  })
  role!: string;

  @HasMany(() => User)
  users!: User[];

  @AfterSync
  static createDefaultRoles = async () => {
    const defaultRoles = [
      {
        role: Role.SUPERADMIN_ROLE,
      },
      {
        role: Role.ADMIN_ROLE,
      },
      {
        role: Role.ASSISTANT_ROLE,
      },
    ];
    try {
      for (const singleRole of defaultRoles) {
        await Role.findOrCreate({
          where: {
            role: singleRole.role,
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
