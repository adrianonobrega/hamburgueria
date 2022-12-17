import { AuthController } from './auth.controller';
import { AuthService } from './shared/auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './shared/local.strategy';
import {JwtModule} from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './shared/jwt-strategy';
import dotenv from 'dotenv/config'
require('dotenv').config()


@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions:{expiresIn:'30d'}
        })
    ],
    controllers: [
        AuthController,],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,

    ],
})
export class AuthModule { }
