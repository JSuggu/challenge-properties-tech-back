import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdateAddressDto } from 'src/modules/addresses/dto/update-address.dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastname?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    dni?: string;

    @IsOptional()
    address?: UpdateAddressDto;
}
