import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { PrismaService } from "src/database/PrismaService"
import { UpdateUserDto } from "../dto/update-user.dto"

@Injectable()
export class UsersUpdateService {

  constructor(private prisma: PrismaService) { }

  async update(id: string, data:UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({
        where:{
            id
        }
    })
    if(!userExists){
        throw new HttpException(`User does not exists!`,HttpStatus.NOT_FOUND)
    }

     const user = await this.prisma.user.update({
        data,
        where: {
            id
        }
    })
    delete user.password
    return user
  }
}
