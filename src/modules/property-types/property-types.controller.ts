import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyTypesService } from './property-types.service';
import { CreatePropertyTypeDto } from './dto/create-property-type.dto';
import { UpdatePropertyTypeDto } from './dto/update-property-type.dto';

@Controller('property-types')
export class PropertyTypesController {
  constructor(private readonly propertyTypesService: PropertyTypesService) {}

  @Post()
  save(@Body() createPropertyRequest: CreatePropertyTypeDto) {
    return this.propertyTypesService.save(createPropertyRequest);
  }

  @Get()
  findAll() {
    return this.propertyTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyRequest: UpdatePropertyTypeDto) {
    return this.propertyTypesService.update(+id, updatePropertyRequest);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyTypesService.remove(+id);
  }
}
