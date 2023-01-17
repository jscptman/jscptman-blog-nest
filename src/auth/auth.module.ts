/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2023-01-13 12:07:39
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-16 18:33:22
 * @FilePath: /jscptman-blog-nest/src/auth/auth.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { ConfigOptions } from 'config/interfaces';
import { ConfigService } from '@nestjs/config';
import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthProvider } from './auth.provider';
import AdminUsersModule from '../admin/users/users.module';
import { PasswordStrategy } from './password.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CustomCacheModule } from 'src/common/cache/custom-cache.module';
import { AuthController } from './auth.controller';
import { CorsMiddleware } from 'src/middleware';

@Global()
@Module({
  imports: [
    AdminUsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigOptions, true>) => {
        return configService.get('jwtOptions', { infer: true });
      },
    }),
    CustomCacheModule,
  ],
  controllers: [AuthController],
  providers: [AuthProvider, PasswordStrategy, JwtStrategy],
  exports: [AuthProvider, PasswordStrategy, JwtStrategy],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware) // 配置Cors
      .forRoutes('auth/*');
  }
}
