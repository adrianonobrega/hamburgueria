import { BadGatewayException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {


    constructor(private prisma: PrismaService) { }
    async create(data: CreateUserDto) {

        const isNotUnique = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: data.email }, { cpf: data.cpf }, { phone: data.phone }]
            }
        })

        const hashedPassword = await hash(data.password, 10)
        data = { ...data, password: hashedPassword }

        if (isNotUnique) {
            throw new HttpException("An user with this email, cpf or phone has already been registered", HttpStatus.BAD_REQUEST)
        }
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                cpf: data.cpf,
                phone: data.phone,
                birthdate: data.birthdate,
                role: "USER",
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


    async delete(id: string) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!userExists) {
            throw new HttpException(`User does not exists!`, HttpStatus.NOT_FOUND)
        }
        await this.prisma.user.delete({
            where: {
                id
            }
        })
        return {
            message: "user deleted successfully!"
        }
    }


    async findAll() {
        const users = await this.prisma.user.findMany()

        users.map((user) => { delete user.password })

        return users
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                Address: true
            }
        })

        if (!user) {
            throw new Error("User does not exists!")
        }
        delete user.password
        return user
    }

    async findEmail(email: string){
        return await this.prisma.user.findUnique({
            where:{
                email,
            }
        })
    }


    async update(id: string, data: UpdateUserDto) {
        // const userExists = await this.prisma.user.findUnique({
        //     where: {
        //         id
        //     }
        // })
        // if (!userExists) {
        //    ""
        // }

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


@Injectable()
export class UserAdminService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateUserDto) {
        const isNotUnique = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: data.email }, { cpf: data.cpf }, { phone: data.phone }]
            }
        })

        const hashedPassword = await hash(data.password, 10)
        data = { ...data, password: hashedPassword }

        if (isNotUnique) {
            throw new HttpException("An user with this email, cpf or phone has already been registered", HttpStatus.BAD_REQUEST)
        }
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                cpf: data.cpf,
                phone: data.phone,
                birthdate: data.birthdate,
                role: "ADMIN",
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