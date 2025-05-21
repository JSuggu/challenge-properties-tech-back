import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { GoogleAuthService } from '../services/google-auth.service';
import { SessionsService } from '../services/session.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService, SessionsService],
  exports: [SessionsService]
})
export class AuthModule {}
