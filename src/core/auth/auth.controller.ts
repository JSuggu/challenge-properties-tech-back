import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DefaultLoginDto } from './dto/default-login-dto';
import { GoogleLoginDto } from './dto/google-login-dto';
import { SqlRunnerService } from '../services/sql/sql-runner.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sqlService: SqlRunnerService
  ) {}

  @Post('')
  defaultLogin(@Body() loginDtoRequest: DefaultLoginDto) {
    return this.authService.defaultLogin(loginDtoRequest);
  }

  @Post('google')
  googleLogin(@Body() loginDtoRequest: GoogleLoginDto) {
    return this.authService.googleLogin(loginDtoRequest);
  }

  @Post('init-data')
  async initData(){
    await this.sqlService.runSqlFile();
  }
}
