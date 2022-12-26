import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/update-order.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
  @Get('/detail/:id')
  detail(@Param('id') id:string){
    return this.ordersService.detail(id)
  }
  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: string) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }

  @Get()
  orders(){
    return this.ordersService.listOrders()
  }
}
