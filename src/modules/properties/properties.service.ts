import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertiesService {

  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>
  ){}

  async save(createPropertyData: CreatePropertyDto) {
    const newProperty = this.propertyRepository.create(createPropertyData);
    return await this.propertyRepository.save(newProperty);
  }

  async findAll() {
    return await this.propertyRepository.find();
  }

  async findOne(propertyId: number) {
    const dbProperty = await this.propertyRepository.findOneBy({id: propertyId});
    if(!dbProperty) throw new NotFoundException(`La propiedad con el ID ${propertyId} no se ha encontrado`);
    return dbProperty;
  }

  async update(propertyId: number, updatePropertyData: UpdatePropertyDto) {
    const result = await this.propertyRepository.update(propertyId, updatePropertyData);
    if(result.affected === 0) throw new NotFoundException(`La propiedad con el ID ${propertyId} no se ha encontrado`);
    return this.findOne(propertyId);
  }

  async remove(propertyId: number) {
    const result = await this.propertyRepository.delete(propertyId);
    if(result.affected === 0) throw new NotFoundException(`La propiedad con el ID ${propertyId} no se ha encontrado`);
    return {message: 'La propiedad se ha eliminado correctamente'};
  }
}
