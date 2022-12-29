import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AppError } from 'src/errors/appError';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {

  constructor(private prisma: PrismaService) { }

  async create(order_id: string,data: CreateItemDto) {
    
    const order = await this.prisma.order.findUnique({
      where: {
        id: order_id
      }
    })
    
    const product = await this.prisma.product.findUnique({
      where:{
        id: data.product_id
      }
    })

    if(!order){
      throw new AppError("Order not found")
    }
    
    if(!product){
      throw new AppError("Product not found")
    }

    const item = await this.prisma.item.create({
      data:{
        order_id:order_id,
        product_id:data.product_id,
        amount: data.amount,
      }
    })
    return item
  }
  
  async remove(item_id: string) {
    const item = await this.prisma.item.delete({
      where: {
          id: item_id
      }
  })
  return item;
}
  
}
