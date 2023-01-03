import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { AppError } from "src/errors/appError";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Injectable()
export class AddressService {

  constructor(private prisma: PrismaService,) { }



  async update(user,data: UpdateAddressDto) {
    
    const logged_use = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
     
    })
    
    if (!logged_use) {
      throw new AppError(`User not found`)
    }
    const addressUpdate = await this.prisma.address.update({
      data,
      where:{
        userId: user.id
      }
    })
    return addressUpdate
  }

}