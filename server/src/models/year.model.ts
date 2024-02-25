import { Model, DataType, Table, Column, HasMany } from "sequelize-typescript";
import { Month } from "./month.model";

@Table({
  tableName: "year",
  timestamps: false,
})
export class Year extends Model {
  @Column({
    type: DataType.STRING(4),
    primaryKey: true,
    field: "year",
  })
  year!: string;

  @HasMany(() => Month)
  months!: Month[];
}
