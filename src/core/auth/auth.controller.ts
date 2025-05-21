import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DefaultLoginDto } from './dto/default-login-dto';
import { GoogleLoginDto } from './dto/google-login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('')
  defaultLogin(@Body() loginDtoRequest: DefaultLoginDto) {
    return this.authService.defaultLogin(loginDtoRequest);
  }

  @Post('google')
  googleLogin(@Body() loginDtoRequest: GoogleLoginDto) {
    return this.authService.googleLogin(loginDtoRequest);
  }
}
