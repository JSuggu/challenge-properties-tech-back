import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsInt()
  @IsOptional()
  floors?: number

  @IsInt()
  @IsOptional()
  rooms?: number;

  @IsInt()
  @IsOptional()
  bath?: number;

  @IsInt()
  area: number;

  @IsInt()
  @IsOptional()
  units?: number;

  @IsBoolean()
  isDisponible: boolean;

  @IsBoolean()
  forSale: boolean;

  @IsBoolean()
  forRent: boolean;

  @IsInt()
  price: number;

  @IsInt()
  propertyTypeId: number;
}
