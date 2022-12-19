import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ExecutionContext, Request, Put, HttpStatus, HttpException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/roles';
import { RoleGuard } from 'src/auth/roleguard.guard';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { LocalStrategy } from 'src/auth/shared/local.strategy';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,) { }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Request() req, @Body() data: CreateProductDto) {

    return await this.productsService.create(data, req.user);
  }

  @Get('pages?')
  async findAll(@Request() request) {
    return await this.productsService.findAll(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.size : 10,
      request.query.hasOwnProperty('search') ? request.query.search : '',
    )
  }
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {

    return await this.productsService.findOne(id);

  }
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(id, updateProductDto);
  }
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productsService.delete(id);
  }
}
