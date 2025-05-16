import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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
  deparments?: number;

  @IsBoolean()
  isDisponible: boolean;

  @IsInt()
  price: number;

  @IsInt()
  propertyId: number;
}
