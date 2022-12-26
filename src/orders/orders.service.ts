import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {

  constructor(private prisma: PrismaService) { }

  async create(data:CreateOrderDto) {
    const order = await this.prisma.order.create({
      data:{
        table: data.table,
        name: data.name,
        status: ''
      }
    })
    return order
  }

  async detail(order_id:string){
    const order = await this.prisma.item.findMany({
      where: {
        order_id: order_id
      },
      include: {
        product: true,
        order: true
      }
    })
    return order
  }

  async update(order_id: string,data){
    const order = await this.prisma.order.update({
      where:{
        id: order_id
      },
      data:{ 
        status: data
      }
    })
    return order;
  }

  async deleteOrder(order_id: string){
    console.log(order_id)
    const order = await this.prisma.order.delete({
      where: {
        id: order_id
      }
    })
    return order
  }

  async listOrders(){
    const orders = await this.prisma.order.findMany({
      orderBy:{
        created_at: 'desc'
      },
      include:{
        items: true

      }
    })
    return orders
  }
}
