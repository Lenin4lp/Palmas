import {
  Model,
  DataType,
  Table,
  Column,
  AutoIncrement,
  HasMany,
} from "sequelize-typescript";

@Table({
  tableName: "estado_cuenta",
  timestamps: false,
})
export class AccountState extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id_estado",
    allowNull: false,
  })
  accountState_id!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "nombre",
  })
  accountState_name!: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    field: "archivo",
  })
  accountState_file!: string;
}
