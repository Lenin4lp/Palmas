import {
  Model,
  DataType,
  Table,
  Column,
  BeforeCreate,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Role } from "./userRole.model";

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

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "rol",
  })
  role_id!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @BeforeCreate
  static async automatizateId(user: User) {
    const generatedUuid = uuidv4().substring(0, 10);
    user.user_id = generatedUuid;
  }
}
