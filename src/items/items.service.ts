import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateItemDto) {
   
    const item = await this.prisma.item.create({
      data:{
        order_id:data.order_id,
        product_id:data.product_id,
        amount: data.amount
      }
    })
    return item
  }
  

  findAll() {
    return `This action returns all items`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
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
