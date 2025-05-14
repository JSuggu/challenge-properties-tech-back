import { Person } from "src/modules/persons/entities/person.entity";
import { Property } from "src/modules/properties/entities/property.entity";
import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";

@Entity()
export class Sale {
  @Column({primary: true, generated: true})
  id: number;

  @Column()
  saleType: string;

  @Column()
  saleChannel: string;

  @Column()
  amount: number;

  @Column()
  isPaid: boolean;

  @CreateDateColumn()
  saleDate: Date;

  @ManyToOne(() => Person, (person) => person.sales, {
    nullable: false,
    eager: true
  })
  person: Person;

  @ManyToOne(() => Property, (property) => property.sales, {
    nullable: false,
    eager: true
  })
  property: Property;
}
