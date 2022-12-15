import { Module } from '@nestjs/common';
import { UsersCreateService } from './users.service/usersCreate.service';
import { UsersController, UsersDeleteController, UsersListController, UsersListOneController, UsersUpdateController } from './users.controller';
import { PrismaService } from 'src/database/PrismaService';
import { UsersListService } from './users.service/usersList.service';
import { UsersUpdateService } from './users.service/usersUpdate.service';
import { UsersDeleteService } from './users.service/usersDelete.service';
import { UsersListOneService } from './users.service/usersListOne.service';


@Module({
  controllers:
  [
    UsersController,
    UsersListController,
    UsersUpdateController,
    UsersDeleteController,
    UsersListOneController
  ],
  providers: [
    UsersCreateService,
    PrismaService,
    UsersListService,
    UsersUpdateService,
    UsersDeleteService,
    UsersListOneService,
    
  ]
})
export class UsersModule {}
