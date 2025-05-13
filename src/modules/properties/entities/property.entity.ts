import { Column, Entity } from "typeorm";

@Entity()
export class Property {
  @Column({primary: true, generated: true})
  id: number;
  
  @Column()
  rooms: number;

  @Column()
  bath: number;

  @Column()
  area: number;

  @Column()
  deparments: number;

  @Column()
  isDisponible: boolean;

  @Column()
  price: number;
}
