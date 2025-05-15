import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAddressDto{
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  country?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  state?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  street?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  number?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  zipCode?: string;
}
