/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core'
import { PrismaService } from 'src/database/PrismaService';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private userService: UsersService
  ) { }

  matchRoles(roles: string[], userRole) {
    const isAdm = roles.some((role) => role === userRole)
    if(isAdm === true){
      return true
    }
    else{
      throw new ForbiddenException("não tem permissão")
    }
  }
  canActivate(context: ExecutionContext,): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())


    const request = context.switchToHttp().getRequest();
    const user = request.user


    return this.matchRoles(roles, user.role)
  }
}
