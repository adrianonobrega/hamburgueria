import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService,PrismaService]
})
export class OrdersModule {}
