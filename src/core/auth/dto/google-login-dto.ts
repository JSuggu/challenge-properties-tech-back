import { IsNotEmpty, IsString } from "class-validator";

export class GoogleLoginDto {
  @IsString()
  @IsNotEmpty()
  googleToken: string
}
