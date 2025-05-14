import { Person } from "src/modules/persons/entities/person.entity";
import { Property } from "src/modules/properties/entities/property.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity()
export class Address {
  @Column({primary: true, generated: true})
  id: number;

  @Column({nullable: true})
  country: string;

  @Column({nullable: true})
  state: string;

  @Column({nullable: true})
  city: string;

  @Column({nullable: true})
  street: string;

  @Column({nullable: true})
  number: string;

  @Column({nullable: true})
  zipCode: string;

  @OneToOne(() => Property, (property) => property.address)
  property: Property;

  @OneToOne(() => Person, (person) => person.address)
  person: Person;
}
