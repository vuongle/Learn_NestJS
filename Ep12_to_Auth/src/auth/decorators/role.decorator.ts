import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';

export const ROLE_KEY = 'roles';

// "...roles" syntax: use spread operator to pass multiple roles. Just pass a list of roles separated by comma, no need to use array
// "[Role, ...Role[]]" syntax: must pass at least one role
export const Roles = (...roles: [Role, ...Role[]]) =>
  SetMetadata(ROLE_KEY, roles);
