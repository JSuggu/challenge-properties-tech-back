import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, BadRequestException } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Request } from 'express';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post(':personId')
  save(@Req() req: Request, @Body() createPropertyRequest: CreatePropertyDto) {
    if(!req.user) throw new BadRequestException("No se encontro el usuario dentro del token");
    return this.propertiesService.save(req.user.personId, createPropertyRequest);
  }

  @Get('public')
  findAll(
    @Query() queryParams, 
  ){
    return this.propertiesService.findAll(queryParams);
  }

  @Get('public/home')
  findAllToHome(@Query('type') type:string, @Query('page') page:number = 1, @Query('limit') limit:number = 16,){
    return this.propertiesService.findAllToHome(type, page, limit);
  }

  @Get('admin')
  findAllByAdmin(@Req() req: Request){
    if(!req.user) throw new BadRequestException("No se encontro el usuario dentro del token");
    return `return all properties from user with ID: ${req.user.personId}`;
  }

  @Get('public/:id')
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
