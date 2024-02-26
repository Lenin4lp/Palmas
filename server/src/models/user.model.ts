import {
  Model,
  DataType,
  Table,
  Column,
  BeforeCreate,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({
  tableName: "usuario",
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.STRING(10),
    primaryKey: true,
    field: "id_usuario",
    allowNull: true,
    unique: true,
  })
  user_id!: string;

  @Column({
    type: DataType.STRING(50),
    field: "nombres_usuario",
    allowNull: false,
  })
  user_name!: string;

  @Column({
    type: DataType.STRING(50),
    field: "apellidos_usuario",
    allowNull: false,
  })
  user_lastname!: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
    field: "correo_usuario",
    unique: true,
  })
  user_email!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: "contrasena_usuario",
  })
  user_password!: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: true,
    field: "telefono",
  })
  user_phone!: string;

  @BeforeCreate
  static async automatizateId(user: User) {
    const generatedUuid = uuidv4().substring(0, 10);
    user.user_id = generatedUuid;
  }
}
