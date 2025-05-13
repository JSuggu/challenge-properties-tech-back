import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User {
  @Column({primary: true, generated: true})
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  accountLocked: boolean;

  @DeleteDateColumn()
  deleteAt: Date;
}
