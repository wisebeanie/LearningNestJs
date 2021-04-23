import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { profileImg } from 'src/entities/profileImg.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, profileImg])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
