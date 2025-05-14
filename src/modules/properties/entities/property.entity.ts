import { Address } from "src/modules/addresses/entities/address.entity";
import { PropertyType } from "src/modules/property-types/entities/property-type.entity";
import { Sale } from "src/modules/sales/entities/sale.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity()
export class Property {
  @Column({primary: true, generated: true})
  id: number;

  @Column({unique: true})
  name: string;
  
  @Column({nullable: true})
  rooms: number;

  @Column({nullable: true})
  bath: number;

  @Column()
  area: number;

  @Column({nullable: true})
  deparments: number;

  @Column()
  isDisponible: boolean;

  @Column()
  price: number;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => PropertyType, (propertyType) => propertyType.properties, {
    nullable: false,
    eager: true
  })
  propertyType: PropertyType;

  @OneToOne(() => Address, (address) => address.property, {
    nullable: false,
    eager: true
  })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Sale, (sale) => sale.property)
  sales: Sale[];
}
