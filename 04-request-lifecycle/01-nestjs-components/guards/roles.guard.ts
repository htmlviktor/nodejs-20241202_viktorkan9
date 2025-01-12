import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const ROLE_KEY = 'x-role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const role = request.header(ROLE_KEY);

    if (!roles.includes(role)) {
      throw new ForbiddenException(`Доступ запрещён: требуется роль ${roles.join(' | ')}`);
    }

    return true;
  }
}
