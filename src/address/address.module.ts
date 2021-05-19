import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AddressService],
    controllers: [AddressController]
})
export class AddressModule {}
