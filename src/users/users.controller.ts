import { Body, Controller, Delete, Get, Param, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAdminService, UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Roles } from 'src/auth/roles';
import { RoleGuard } from 'src/auth/roleguard.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userAdminService: UserAdminService
    ) { }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.usersService.create(data)
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Post('/admin')
  @ApiBearerAuth()
  async createAdmin(@Body() data: CreateUserDto){
    return await this.userAdminService.create(data)
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  @ApiBearerAuth()
  async findAll() {
    return await this.usersService.findAll()
  }

  
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  async update(@Param("id") id: string, @Body() data: UpdateUserDto) {

    return this.usersService.update(id, data)
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @ApiBearerAuth()
  async delete(@Param("id") id: string) {
    return await this.usersService.delete(id)

  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  async get(@Param("id") id: string) {
    return await this.usersService.findOne(id)
  }
}

