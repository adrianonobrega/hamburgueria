import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersCreateService } from './users.service/usersCreate.service';
import { UsersDeleteService } from './users.service/usersDelete.service';
import { UsersListService } from './users.service/usersList.service';
import { UsersListOneService } from './users.service/usersListOne.service';
import { UsersUpdateService } from './users.service/usersUpdate.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersCreateService) { }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.usersService.create(data)
  }
}

@Controller('users')
export class UsersListController {
  constructor(private readonly usersListService: UsersListService) { }

  @Get()
  async findAll() {
    return this.usersListService.findAll()
  }
}

@Controller('users')
export class UsersUpdateController {
  constructor(private readonly usersUpdateService: UsersUpdateService) { }

  @Put(':id')
  async update(@Param("id") id: string, @Body() data: UpdateUserDto) {
    return this.usersUpdateService.update(id, data)
  }
}

@Controller('users')
export class UsersDeleteController {
  constructor(private readonly usersDeleteService: UsersDeleteService) { }

  @Delete(':id')
  async delete(@Param("id") id: string) {
    return this.usersDeleteService.delete(id)
    
  }
}

@Controller('users')
export class UsersListOneController {
  constructor(private readonly usersListOneService: UsersListOneService) { }

  @Get(':id')
  async get(@Param("id") id: string) {
    return this.usersListOneService.findOne(id)
    
  }
}