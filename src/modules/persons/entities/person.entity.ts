import { Address } from "src/modules/addresses/entities/address.entity";
import { Sale } from "src/modules/sales/entities/sale.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity()
export class Person {
  @Column({primary: true, generated: true})
  id: number;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  lastname: string;

  @Column({nullable: true, unique: true})
  dni: number;

  @OneToOne(() => User, (user) => user.id, {
    nullable: false
  })
  user: User;

  @OneToOne(() => Address, (address) => address.person, {
    nullable: false,
    cascade: true,
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Sale, (sale) => sale.person)
  sales: Sale[];
}
