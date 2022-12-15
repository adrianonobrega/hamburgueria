import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { PrismaService } from "src/database/PrismaService"

@Injectable()
export class UsersDeleteService {
    constructor(private prisma: PrismaService) { }

    async delete(id: string) {
        const userExists = await this.prisma.user.findUnique({
            where:{
                id
            }
        })
        if(!userExists){
            throw new HttpException(`User does not exists!`,HttpStatus.NOT_FOUND)
        }
    
        await this.prisma.user.delete({
            where: {
                id
            }
        })
        return {
            message:"user deleted successfully!"
        }
    }
}
