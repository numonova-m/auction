import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles, ROLES_KEY } from '../decorators/roles.decorators';
import { Role } from '../enums/roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role | Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    // Role berilmagan bo‘lsa, ruxsat beramiz
    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    console.log('user:', user);

    const userRole = user.role || user.user_role;

    if (Array.isArray(requiredRoles)) {
      if (requiredRoles.includes(userRole)) {
        return true;
      }
    } else {
      if (requiredRoles === userRole) {
        return true;
      }
    }

    throw new BadRequestException('Siz bunday qila olmaysiz');
  }
}
