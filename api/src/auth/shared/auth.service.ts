/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,) {}

    async validateUser(userEmail: string, userPassword: string){
        const user = await this.usersService.findEmail(userEmail)
        
        if(user){
            const isPasswordValid = await bcrypt.compare(userPassword, user.password)

            if(isPasswordValid){
                return {
                    ...user,
                    password: undefined
                }
            }
        }

        throw new UnauthorizedException()
    }

    async login(user: CreateUserDto){
        
        const payload = {email: user.email, sub: user.id, role: user.role}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
