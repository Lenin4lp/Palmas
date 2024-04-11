import {
  Model,
  DataType,
  Table,
  Column,
  BeforeCreate,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  BeforeDestroy,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { NeighborRole } from "./neighborRole.model";
import { Place } from "./place.model";
import { NeighborPlace } from "./neighborPlace.model";

@Table({
  tableName: "vecino",
  timestamps: false,
})
export class Neighbor extends Model {
  @Column({
    type: DataType.STRING(10),
    primaryKey: true,
    field: "id_vecino",
    allowNull: true,
    unique: true,
  })
  neighbor_id!: string;

  @Column({
    type: DataType.STRING(50),
    field: "nombres_vecino",
    allowNull: false,
  })
  neighbor_name!: string;

  @Column({
    type: DataType.STRING(50),
    field: "apellidos_vecino",
    allowNull: false,
  })
  neighbor_lastname!: string;

  @Column({
    type: DataType.STRING(40),
    field: "correo_vecino",
    unique: true,
  })
  neighbor_email!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    field: "telefono",
  })
  neighbor_phone!: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    field: "documento_identidad",
  })
  identity_document!: string;

  @ForeignKey(() => NeighborRole)
  @Column({
    type: DataType.INTEGER,
    field: "id_rol",
    allowNull: false,
  })
  role_id!: number;

  @BelongsTo(() => NeighborRole)
  neighborRole!: NeighborRole;

  @BelongsToMany(() => Place, () => NeighborPlace)
  places!: Place[];

  @BeforeCreate
  static async automatizateId(neighbor: Neighbor) {
    const generatedUuid = uuidv4().substring(0, 10);
    neighbor.neighbor_id = generatedUuid;
  }
  @BeforeDestroy
  static async destroyNeighborRelations(neighbor: Neighbor) {
    await NeighborPlace.destroy({
      where: { neighbor_id: neighbor.neighbor_id },
    });
  }
}
