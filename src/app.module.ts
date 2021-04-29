import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'danggeundb.ccnujuyzzot8.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'hyunbin7231',
      database: 'test',
      // 생성한 Entity 넣어줌
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule, RavenModule
  ],
  controllers: [AppController, AuthController, AddressController],
  providers: [AppService, 
    {
    provide: APP_INTERCEPTOR,
    useValue: new RavenInterceptor(),
    }, AuthService, AddressService,
  ],
})
export class AppModule {}
