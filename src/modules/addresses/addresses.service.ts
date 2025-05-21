import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressesService {

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>
  ){}

  async generate(){
    const newAddress = this.addressRepository.create();
    return await this.addressRepository.save(newAddress);
  }

  async findAll() {
    return await this.addressRepository.find();
  }

  async findOne(idAddress: number) {
    const dbAddress = await this.addressRepository.findOneBy({id: idAddress});
    if(!dbAddress) throw new NotFoundException(`Direccion con el ID ${idAddress} no encontrada`);
    return dbAddress;
  }

  async update(idAddress: number, updatedAddressData: UpdateAddressDto) {
    const dbAddress = await this.addressRepository.update(idAddress, updatedAddressData);
    if(dbAddress.affected === 0) throw new NotFoundException(`Direccion con el ID ${idAddress} no encontrada`);
    return this.findOne(idAddress);
  }

  async remove(idAddress: number) {
    const dbAddress = await this.addressRepository.delete(idAddress);
    if(dbAddress.affected === 0) throw new NotFoundException(`Direccion con el ID ${idAddress} no encontrada`);
    return {message: "Direccion eliminada correctamente"};
  }
}
