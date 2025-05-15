import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonsService {

  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>
  ){}

  async findAll() {
    return this.personRepository.find();
  }

  async findOne(personId: number) {
    const dbPerson = await this.personRepository.findOneBy({id: personId})
    if(!dbPerson) throw new NotFoundException(`La persona con ID ${personId} no se encontro`);
    return dbPerson;
  }

  async update(personId: number, updatedPersonData: UpdatePersonDto) {
    const updatedPerson = await this.personRepository.update(personId, updatedPersonData);
    if(updatedPerson.affected === 0) throw new NotFoundException(`La persona con ID ${personId} no se encontro`);
    return this.findOne(personId);
  }

  async remove(personId: number) {
    const deletedPerson = await this.personRepository.delete(personId);
    if(deletedPerson.affected === 0) throw new NotFoundException(`La persona con ID ${personId} no se encontro`);
    return {message: "La persona se ha borrado correctamente"};
  }
}
