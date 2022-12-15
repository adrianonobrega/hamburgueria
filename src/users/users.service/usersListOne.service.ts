import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { PrismaService } from "src/database/PrismaService"

@Injectable()
export class UsersListOneService {
    constructor(private prisma: PrismaService) { }

    async findOne(id:string){
        const user =  await this.prisma.user.findUnique({
            where:{
                id,
            },
            include: {
                Address: true
            }
        })

        if(!user){
            throw new HttpException("User does not exists!",HttpStatus.NOT_FOUND)
        }
        delete user.password
        return user
    }
}
