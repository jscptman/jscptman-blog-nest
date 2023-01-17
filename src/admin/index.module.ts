/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2022-12-29 18:04:56
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-16 17:59:24
 * @FilePath: /jscptman-blog-nest/src/admin/index.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import AdminLoginModule from './login/login.module';
import { CorsMiddleware } from 'src/middleware';
import UsersModule from './users/users.module';

@Module({
  imports: [AdminLoginModule, UsersModule],
})
export default class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware) // 配置Cors
      .forRoutes('admin/*');
  }
}
