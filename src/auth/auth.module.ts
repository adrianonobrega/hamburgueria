import { AuthController } from './auth.controller';
import { AuthService } from './shared/auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './shared/jwt-strategy';
import { LocalStrategy } from './shared/local.strategy';
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