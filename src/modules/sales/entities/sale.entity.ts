import { Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Sale {
  @Column({primary: true, generated: true})
  id: number;

  @Column()
  saleType: string;

  @Column()
  saleChannel: string;

  @Column()
  isPaid: boolean;

  @CreateDateColumn()
  saleDate: Date;
}
