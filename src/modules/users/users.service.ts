import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Person } from '../persons/entities/person.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository:Repository<Role>
  ){}

  async create(userData: CreateUserDto) {
    const dbRole = await this.roleRepository.findOneBy({id: userData.roleId});
    if(!dbRole) throw new BadRequestException('El rol no existe');

    const newPerson = new Person();
    const newUser = this.userRepository.create({
      email: userData.email,
      password: userData.password,
      person: newPerson,
      role: dbRole
    });

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(userId: number) {
    const userDb = await this.userRepository.findOneBy({id: userId});
    if(!userDb) throw new NotFoundException(`El usuario con ID ${userId} no fue encontrado`);
    return userDb;
  }

  async update(userId: number, updatedUserData: UpdateUserDto) {
    const result = await this.userRepository.update(userId, updatedUserData);
    if(result.affected === 0) throw new NotFoundException(`El usuario con ID ${userId} no fue encontrado`);
    return this.findOne(userId);
  }

  async remove(userId: number) {
    const result = await this.userRepository.delete(userId);
    if(result.affected === 0) throw new NotFoundException(`El usuario con ID ${userId} no fue encontrado`);
    return { message: `Usuario con ID ${userId} eliminado correctamente` };
  }
}
