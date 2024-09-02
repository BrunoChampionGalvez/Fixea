import { SetMetadata } from '@nestjs/common';
import { Roles } from './roles.enum';  // Import the Roles enum

export const ROLES_KEY = 'roles';
export const RolesAllowed = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);