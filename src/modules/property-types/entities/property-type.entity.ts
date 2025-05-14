import { Property } from "src/modules/properties/entities/property.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class PropertyType {
  @Column({primary: true, generated: true})
  id: number;

  @Column({unique: true})
  name: string;

  @OneToMany(() => Property, (property) => property.propertyType)
  properties: Property[]
}
