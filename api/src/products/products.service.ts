import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from "src/database/PrismaService"
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService,
    ) { }


  async create(data: CreateProductDto, user) {
   
    const product = await this.prisma.product.create({
      data: {
        name: data.name,
        category: data.category,
        img: data.img,
        price: data.price,
        userId: user.id,
        Ingredients: {
          createMany: {
            data: data.ingredients
          }
        }
      },
      include: {
        Ingredients: true
      }
    })
    return product
  }

  async findAll() {
    const products = this.prisma.product.findMany({
      include: {
        Ingredients: {
          select: {
            item: true,
          }
        }
      }
    })
    return products
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
          id,
      },
      include: {
        Ingredients: true
      }
  })

  if (!product) {
      throw new HttpException("Product does not exists!", HttpStatus.NOT_FOUND)
  }
 
  return product
  }


  async delete(id: string) {
    const productExists = await this.prisma.product.findUnique({
        where: {
            id
        }
    })
    if (!productExists) {
        throw new HttpException(`Product does not exists!`, HttpStatus.NOT_FOUND)
    }
    await this.prisma.product.delete({
        where: {
            id
        }
    })
    return {
        message: "Product deleted successfully!"
    }
}

async update(id: string, data: UpdateProductDto) {
  const productExists = await this.prisma.product.findUnique({
      where: {
          id
      }
  })
  if (!productExists) {
      throw new HttpException(`Product does not exists!`, HttpStatus.NOT_FOUND)
  }

  const product = await this.prisma.product.update({
      data,
      where: {
          id
      }
  })
  return product
}

}
