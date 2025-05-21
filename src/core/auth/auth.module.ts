import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { GoogleAuthModule } from '../services/google-auth/google-auth.module';
import { SqlRunnerService } from '../services/sql/sql-runner.service';

@Module({
  imports: [UsersModule, GoogleAuthModule],
  controllers: [AuthController],
  providers: [AuthService, SqlRunnerService],
})
export class AuthModule {}
