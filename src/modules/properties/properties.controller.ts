import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  save(@Body() createPropertyRequest: CreatePropertyDto) {
    return this.propertiesService.save(createPropertyRequest);
  }

  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyRequest: UpdatePropertyDto) {
    return this.propertiesService.update(+id, updatePropertyRequest);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
