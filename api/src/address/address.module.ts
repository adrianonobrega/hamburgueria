import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AddressController } from './address.controller';
import { AddressService } from './address.services';

@Module({
  controllers: [AddressController],
  providers: [AddressService,PrismaService],

})
export class AddressModule {}