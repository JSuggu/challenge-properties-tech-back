import { Column, Entity } from "typeorm";

@Entity()
export class Person {
  @Column({primary: true, generated: true})
  name: string;

  @Column()
  lastname: string;

  @Column()
  dni: number;
}
