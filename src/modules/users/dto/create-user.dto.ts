import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(8, {message: "La contraseña debe tener minimo 8 caracteres"})
  password?: string;

  @IsInt()
  roleId: number;
}
