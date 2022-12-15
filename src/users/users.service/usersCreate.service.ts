import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from '../dto/create-user.dto';
import { hash } from 'bcrypt'

@Injectable()
export class UsersCreateService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto) {

    const isNotUnique = await this.prisma.user.findFirst({
      where: {
        OR: [{email: data.email},{cpf: data.cpf}, {phone: data.phone}]
      }
    })

    const hashedPassword = await hash(data.password, 10)
    data = { ...data, password: hashedPassword }
    
    if(isNotUnique) {
      throw new HttpException("An user with this email, cpf or phone has already been registered",HttpStatus.BAD_REQUEST)
    }
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        cpf: data.cpf,
        phone: data.phone,
        birthdate: data.birthdate,
        isAdmin: data.isAdmin,
        Address: {
          create: {
            address: data.address.address,
            cep: data.address.cep,
            state: data.address.state,
            city: data.address.city,
            number: data.address.number,
            complement: data.address.complement,
            country: data.address.country
          }
        },
      },
      include: {
        Address: true
      }
    })

    delete user.password

    return user
   
  }
  
}
