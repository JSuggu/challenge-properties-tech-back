import { Column, Entity } from "typeorm";

@Entity()
export class Address {
  @Column({primary: true, generated: true})
  id: number;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  zipCode: string;
}
