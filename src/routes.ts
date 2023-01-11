import { Routes } from '@nestjs/core';
import AdminModule from './admin/index.module';
import WwwModule from './www/index.module';
import AdminLoginModule from './admin/login/login.module';
import UsersModule from './admin/users/users.module';
export const routes: Routes = [
  {
    path: 'admin',
    module: AdminModule,
    children: [AdminLoginModule, UsersModule],
  },
  {
    path: 'www',
    module: WwwModule,
    children: [],
  },
];
