import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SalesService {

  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>
  ){}

  create(createSaleDto: CreateSaleDto) {
    return 'This action adds a new sale';
  }

  async findAll() {
    const result = await this.saleRepository.find();
    return {data: result}
  }

  async findOne(id: number) {
    const result = await this.saleRepository.findOneBy({id})
    return {data: result};
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
