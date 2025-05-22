import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Between, Repository } from 'typeorm';
import { PersonsService } from '../persons/persons.service';
import { AddressesService } from '../addresses/addresses.service';

@Injectable()
export class PropertiesService {

  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly personService: PersonsService,
    private readonly addressService: AddressesService
  ){}
  
  async save(personId: number, createPropertyData: CreatePropertyDto) {
    const dbPerson = await this.personService.findOne(personId);
    const newAddress = await this.addressService.generate();
    const newProperty = this.propertyRepository.create({...createPropertyData, person: dbPerson, address: newAddress});
    return await this.propertyRepository.save(newProperty);
  }

  async findAll(queryParams: any) {
    const where = this.smartFilter(queryParams);
    const result = await this.propertyRepository.find({
      where,
      relations: ['propertyType', 'address']
    });

    const finalResult = this.searchFilter(result, queryParams.search);

    return {result: finalResult};
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

  private smartFilter(queryParams: any): any{
    const {type, buyType, price} = queryParams;
    let forSale, forRent;

    if(buyType === 'buy'){
      forSale = true;
      forRent = false;
    } else if (buyType === 'rent'){
      forSale = false;
      forRent = true;
    } else {
      forSale = null;
      forRent = null;
    }

    const where: any = {
      isDisponible: true,
      forSale,
      forRent
    };
    
    if(type) where.propertyType = {name: type};

    if(price) {
      const prices = (price.replace(/[$,+\s]/g, '')).split('-');
      where.price = Between(prices[0], prices[1]);
    }

    return where;
  }

  private searchFilter(resultList: Array<any>, search: string): any{
    const wordList = this.normalizeText(search).split(" ");
    let containWord;

    const finalList = resultList.filter( property => {
      const stringProperty: string = this.normalizeText(JSON.stringify(property));
      containWord = false;

      wordList.forEach( word => {
        if(stringProperty.includes(word)){
          containWord = true;
          return;
        }
      })

      return containWord;
    });

    return finalList;
  }

  private normalizeText(text: string){
    return text
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  }
}
