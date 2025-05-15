import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    @MinLength(8, {message: "La contraseña debe tener minimo 8 caracteres"})
    password?: string;
}
