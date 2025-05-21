import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class DefaultLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
}
