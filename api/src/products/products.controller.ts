import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ExecutionContext, Request, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/roles';
import { RoleGuard } from 'src/auth/roleguard.guard';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { LocalStrategy } from 'src/auth/shared/local.strategy';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,) {}

@Roles('ADMIN')
@UseGuards(JwtAuthGuard,RoleGuard)
  @Post()
 async create(@Request() req ,@Body() data: CreateProductDto) {
    
    return await this.productsService.create(data,req.user);
  }
  @Roles('ADMIN')
@UseGuards(JwtAuthGuard,RoleGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
