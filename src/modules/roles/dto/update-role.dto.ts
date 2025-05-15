import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}
