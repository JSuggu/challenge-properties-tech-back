import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PropertiesModule } from './modules/properties/properties.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '41100',
      database: 'challenge_properties',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    PropertiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
