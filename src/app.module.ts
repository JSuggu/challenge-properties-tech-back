import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { PropertyTypesModule } from './modules/property-types/property-types.module';
import { PersonsModule } from './modules/persons/persons.module';
import { SalesModule } from './modules/sales/sales.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { AuthModule } from './core/auth/auth.module';
import { AuthMiddleware } from './core/middleware/auth.middleware';
import { SqlModule } from './core/sql/sql.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule,
    UsersModule,
    RolesModule,
    PropertiesModule,
    PropertyTypesModule,
    PersonsModule,
    SalesModule,
    AddressesModule,
    AuthModule,
    SqlModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude(
      { path: 'auth', method: RequestMethod.ALL },
      { path: 'auth/:remain', method: RequestMethod.ALL },
      { path: ':anypath/public', method: RequestMethod.ALL } ,
      { path: ':anypath/public/:remain', method: RequestMethod.ALL } 
    )
    .forRoutes('*');
  }
}
