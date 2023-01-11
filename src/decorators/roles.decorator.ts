import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'user',
  Admin = 'admin',
  Visitor = 'visitor',
}
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
