import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppError } from 'src/errors/appError';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) { }

  matchRoles(roles: string[], userRole) {
    const isAdm = roles.some((role) => role === userRole)
    if(isAdm === true){
      return true
    }
    else{
      throw new AppError("User does not have permission")
    }
  }
  canActivate(context: ExecutionContext,): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())


    const request = context.switchToHttp().getRequest();
    const user = request.user
    return this.matchRoles(roles, user.role)
  }
}
