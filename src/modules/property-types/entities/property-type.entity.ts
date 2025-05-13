import { Column, Entity } from "typeorm";

@Entity()
export class PropertyType {
  @Column({primary: true, generated: true})
  id: number;

  @Column()
  name: string;
}
