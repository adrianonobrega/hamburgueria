import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/PrismaService';
import { UserAdminService, UsersService } from './users.service';


@Module({
  controllers:
  [
    UsersController,
  ],
  providers: [
    PrismaService,
    UsersService,
    UserAdminService
    
  ],
  exports:[
    UsersService,
  ]
})
export class UsersModule {}