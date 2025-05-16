import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyTypeDto } from './dto/create-property-type.dto';
import { UpdatePropertyTypeDto } from './dto/update-property-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyType } from './entities/property-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyTypesService {

  constructor(
    @InjectRepository(PropertyType)
    private readonly propertyTypeRepository: Repository<PropertyType>
  ){}

  async save(createPropertyTypeData: CreatePropertyTypeDto) {
    const newPropertyType = this.propertyTypeRepository.create(createPropertyTypeData);
    return await this.propertyTypeRepository.save(newPropertyType);
  }

  async findAll() {
    return await this.propertyTypeRepository.find();
  }

  async findOne(propertyTypeId: number) {
    const dbPropertyType = await this.propertyTypeRepository.findOneBy({id: propertyTypeId});
    if(!dbPropertyType) throw new NotFoundException(`Tipo de propiedad con el ID ${propertyTypeId} no se ha encontrado`);
    return dbPropertyType;
  }

  async update(propertyTypeId: number, updatedPropertyTypeData: UpdatePropertyTypeDto) {
    const result = await this.propertyTypeRepository.update(propertyTypeId, updatedPropertyTypeData);
    if(result.affected === 0) throw new NotFoundException(`Tipo de propiedad con el ID ${propertyTypeId} no se ha encontrado`);
    return this.findOne(propertyTypeId);
  }

  async remove(propertyTypeId: number) {
    const result = await this.propertyTypeRepository.delete(propertyTypeId);
    if(result.affected === 0) throw new NotFoundException(`Tipo de propiedad con el ID ${propertyTypeId} no se ha encontrado`);
    return {messsage: 'El tipo de propiedad se ha eliminado correctamente'};
  }
}
