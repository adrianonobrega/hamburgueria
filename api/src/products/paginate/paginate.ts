import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class Paginate {
    constructor(private readonly prisma: PrismaService){}

    async pages(page, size,search){
        const results = await this.prisma.product.findMany({
            skip: page * size,
            take: Number(size),
            where:{name: {contains:search}},
        })
        const totalItems = await this.prisma.product.count({
            where:{name: {contains:search,mode:'insensitive'}, },
        })
        return {
            results,
            totalItems
        }
    }
}