import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { Roles } from 'src/auth/roles';
import { RoleGuard } from 'src/auth/roleguard.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/detail/:id')
  @ApiBearerAuth()
  detail(@Param('id') id:string){
    return this.ordersService.detail(id)
  }
  
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get()
  @ApiBearerAuth()
  orders(){
    return this.ordersService.listOrders()
  }
}
