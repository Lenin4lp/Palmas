import {
  Model,
  DataType,
  Table,
  Column,
  HasMany,
  AutoIncrement,
  AfterSync,
} from "sequelize-typescript";
import { Month } from "./month.model";
import { PlaceType } from "./placeType.model";

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
    allowNull: true,
  })
  monthlyFee_value!: number;

  @HasMany(() => PlaceType)
  placeTypes!: PlaceType[];

  @AfterSync
  static createDefaultMonthlyFee = async () => {
    const defaultMonthlyFee = {
      monthlyFee_value: 30,
    };
    try {
      await MonthlyFee.findOrCreate({
        where: {
          monthlyFee_value: defaultMonthlyFee.monthlyFee_value,
        },
        defaults: defaultMonthlyFee,
      });
      console.log("Alicuota inicial creada exitosamente");
    } catch (error) {
      console.log("Oops, algo malio sal: ", error);
    }
  };
}
