import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateAddressDto } from "src/modules/addresses/dto/create-address.dto";

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsOptional()
  address?: CreateAddressDto;
}
