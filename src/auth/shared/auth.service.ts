/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AppError } from 'src/errors/appError';
import { LoginUser } from '../dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,) { }

    async validateUser(userEmail: string, userPassword: string) {
        
        const user = await this.usersService.findEmail(userEmail)
        const isPasswordValid = await bcrypt.compare(userPassword, user.password)
        
        if (!user || !isPasswordValid) {
            throw new AppError("Invalid email or password")
            
        }

        return {
            ...user,
            password: undefined
        }
    }

    async login(user: CreateUserDto, data: LoginUser) {

        const payload = { email: data.email, sub: user.id, role: user.role }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
