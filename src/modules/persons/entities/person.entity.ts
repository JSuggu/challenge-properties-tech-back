import { Column, Entity } from "typeorm";

@Entity()
export class Person {
  @Column({primary: true, generated: true})
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  dni: number;
}
