import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';  // This will hold the metadata key for roles
import { Roles } from './roles.enum';  // Import the Roles enum

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;  // No roles required, allow access
        }

        const { user } = context.switchToHttp().getRequest();

        if (!user || !user.role) {
            return false;  // No user or roles found, deny access
        }

        // Check if the user has one of the required roles
        return requiredRoles.some((role) => user.role === role);
    }
}
