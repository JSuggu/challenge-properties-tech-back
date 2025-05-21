import { Person } from "src/modules/persons/entities/person.entity";
import { Role } from "src/modules/roles/entities/role.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class User {
  @Column({primary: true, generated: true})
  id: number;

  @Column({unique: true})
  email: string;

  @Column({nullable: true})
  password: string;

  @Column({default: false})
  accountLocked: boolean;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => Role, (role) => role.users,{
    nullable: false,
    cascade: true,
    eager: true
  })
  role: Role

  @OneToOne(() => Person, (person) => person.user,{
    nullable: false,
    eager: true
  })
  @JoinColumn()
  person: Person;
}
