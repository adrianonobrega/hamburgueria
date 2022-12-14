import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto) {

   
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        cpf: data.cpf,
        phone: data.phone,
        birthdate: data.birthdate,
        isAdmin: data.isAdm,
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
    return user
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
