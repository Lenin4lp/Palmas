import {
  Model,
  DataType,
  Table,
  Column,
  HasMany,
  AutoIncrement,
} from "sequelize-typescript";
import { Month } from "./month.model";

@Table({
  tableName: "alicuota",
  timestamps: false,
})
export class MonthlyFee extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id_alicuota",
    allowNull: false,
    unique: true,
  })
  monthlyFee_id!: number;

  @Column({
    type: DataType.DECIMAL(6, 2),
    field: "alicuota",
    allowNull: false,
  })
  monthlyFee_value!: number;

  @HasMany(() => Month)
  months!: Month[];
}
