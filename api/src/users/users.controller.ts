import { Body, Controller, Delete, Get, Param, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAdminService, UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Roles } from 'src/auth/roles';
import { RoleGuard } from 'src/auth/roleguard.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userAdminService: UserAdminService
    ) { }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.usersService.create(data)
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Post('/admin')
  async createAdmin(@Body() data: CreateUserDto){
    return this.userAdminService.create(data)
  }

  // @UseGuards(JwtAuthGuard,PermissionsGuard)
  // @SetMetadata('permissions',['read:users'])
  @Get()
  async findAll() {
    return this.usersService.findAll()
  }

  @Put(':id')
  async update(@Param("id") id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param("id") id: string) {
    return this.usersService.delete(id)

  }

  @Get(':id')
  async get(@Param("id") id: string) {
    return this.usersService.findOne(id)

  }
}
