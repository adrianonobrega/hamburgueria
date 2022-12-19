import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from "src/database/PrismaService"
import { AppError } from 'src/errors/appError';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Paginate } from './paginate/paginate';


@Injectable()
export class ProductsService {

  constructor(
    private prisma: PrismaService,
    private paginate: Paginate
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

  async findAll(page: number, size: number, search: string) {

    const { results, totalItems } = await this.paginate.pages(page, size, search)
    const totalPages = Math.ceil(totalItems / size) - 1
    const currentPage = Number(page)
    return {
      results,
      pagination: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1)

      }
    }
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
      throw new AppError("Product not found")
    }

    return product
  }


  async delete(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id
      }
    })
    if (!product) {
      throw new AppError("Product not found")
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
    const product = await this.prisma.product.findUnique({
      where: {
        id
      }
    })
    if (!product) {
      throw new AppError(`Product does not exists!`)
    }

    const productUpdate = await this.prisma.product.update({
      data,
      where: {
        id
      }
    })
    return productUpdate
  }

}
