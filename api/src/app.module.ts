import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from 'src/database/PrismaService';
import { ProductsModule } from './products/products.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    AuthModule, UsersModule,ProductsModule,AddressModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }