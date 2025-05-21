import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DefaultLoginDto } from './dto/default-login-dto';
import { GoogleLoginDto } from './dto/google-login-dto';
import { GoogleAuthService } from '../services/google-auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { SessionsService } from '../services/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly sessionService: SessionsService
  ){}

  async defaultLogin(defaultLoginData: DefaultLoginDto) {
    const dbUser = await this.userService.findByEmail(defaultLoginData.email);
    if(!dbUser) throw new NotFoundException('El usuario no existe');

    const samePassword = dbUser.password === defaultLoginData.password;
    if(!samePassword) throw new BadRequestException('Email o Contraseña incorrecta');

    const token = this.sessionService.createSession(dbUser.id, dbUser.role.name);

    return {dbUser, token};
  }

  async googleLogin(googleLoginData: GoogleLoginDto) {
    const result = await this.googleAuthService.verify(googleLoginData.googleToken);

    if(!result) throw new BadGatewayException('Hubo un Error con el Servicio de Google');

    let dbUser = await this.userService.findByEmail(result.email);

    if(!dbUser){ dbUser = await this.userService.save({email: result.email, roleId: 2}) } 

    const token = this.sessionService.createSession(dbUser.id, dbUser.role.name);

    return {dbUser, token};
  }
}
