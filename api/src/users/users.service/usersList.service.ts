import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/database/PrismaService"

@Injectable()
export class UsersListService {

  constructor(private prisma: PrismaService) { }

  async findAll() {
    const users = await this.prisma.user.findMany()
    
    users.map((user) => {delete user.password})
    
    return users
  }

  
}
