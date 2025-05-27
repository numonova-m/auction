import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from '../enums/roles.enum';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from '../decorators/roles.decorators';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<Roles>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRole) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    console.log(user);
    if (requiredRole.includes(user.role)) {
      return true;
    } else {
      throw new BadRequestException('Siz bunday qila olmaysiz');
    }
  }
}
