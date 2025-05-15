import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ){}

  async save(roleData: CreateRoleDto) {
    const newRole = this.roleRepository.create(roleData);
    return await this.roleRepository.save(newRole);
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(roleId: number) {
    const dbRole = await this.roleRepository.findOneBy({id: roleId});
    if(!dbRole) throw new NotFoundException(`Rol con ID ${roleId} no encontrado`);
    return dbRole;
  }

  async update(roleId: number, updatedRoleData: UpdateRoleDto) {
    const result = await this.roleRepository.update(roleId, updatedRoleData);
    if(result.affected === 0) throw new NotFoundException(`Rol con ID ${roleId} no encontrado`);
    return await this.findOne(roleId);
  }

  async remove(roleId: number) {
    const result = await this.roleRepository.delete(roleId);
    if(result.affected === 0) throw new NotFoundException(`Rol con ID ${roleId} no encontrado`);
    return { message: `Rol con ID ${roleId} eliminado correctamente` };
  }
}
