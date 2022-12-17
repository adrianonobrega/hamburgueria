/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const [req] = context.getArgs();
    const userPermissions = req?.user?.permissions || []
    const requiredPermissions = this.reflector.get('permissions', context.getHandler()) || []
    const hasAllRequiredPermissions = requiredPermissions.every(permission => userPermissions.includes(permission))

    if(requiredPermissions.lenght === 0 || hasAllRequiredPermissions){
      return true;
      
    }
    throw new ForbiddenException("não tem permissão")
  }
}
