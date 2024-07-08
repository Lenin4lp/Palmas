import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
  BeforeCreate,
  BeforeDestroy,
} from "sequelize-typescript";
import { PlaceType } from "./placeType.model";
import { Payment } from "./payment.model";
import { Month } from "./month.model";
import { Neighbor } from "./neighbor.model";
import { NeighborPlace } from "./neighborPlace.model";
import { Vehicle } from "./vehicle.model";
import { v4 as uuidv4 } from "uuid";
import { MonthlyDebt } from "./monthlyDebt.model";
import { ExtraPayment } from "./extraPayment.model";

@Table({
  tableName: "inmueble",
  timestamps: false,
})
export class Place extends Model {
  @Column({
    type: DataType.STRING(11),
    primaryKey: true,
    field: "id_inmueble",
    allowNull: true,
  })
  place_id!: string;

  @Column({
    type: DataType.STRING(50),
    field: "nombre_inmueble",
    allowNull: true,
    unique: true,
  })
  place_name!: string;

  @Column({
    type: DataType.DECIMAL(8, 2),
    field: "valor_pendiente",
    allowNull: false,
  })
  pending_value!: number;

  @ForeignKey(() => PlaceType)
  @Column({
    type: DataType.INTEGER,
    field: "id_tipo",
    allowNull: false,
  })
  placeType_id!: number;

  @BelongsTo(() => PlaceType)
  placeType!: PlaceType;

  @BelongsToMany(() => Neighbor, () => NeighborPlace)
  neighbors!: Neighbor[];

  @BelongsToMany(() => Month, () => MonthlyDebt)
  months!: Month[];

  @HasMany(() => ExtraPayment)
  extraPayments!: ExtraPayment[];

  @HasMany(() => Vehicle)
  vehicles!: Vehicle[];

  @BeforeCreate
  static async generateId(place: Place) {
    const placeType = await PlaceType.findByPk(place.placeType_id);
    const generatedUuid = uuidv4().substring(0, 4);

    if (placeType) {
      const prefix = placeType.placetype_name.substring(0, 3);
      const count = await Place.count({
        where: { placeType_id: place.placeType_id },
      });
      place.place_id = prefix + `${count + 1}` + generatedUuid;
      place.place_name = `${placeType.placetype_name} ${count + 1}`;
    }
  }
  @BeforeDestroy
  static async destroyPlaceRelations(place: Place) {
    await NeighborPlace.destroy({
      where: { place_id: place.place_id },
    });

    await MonthlyDebt.destroy({
      where: { place_id: place.place_id },
    });

    await ExtraPayment.destroy({
      where: { place_id: place.place_id },
    });
  }
}
