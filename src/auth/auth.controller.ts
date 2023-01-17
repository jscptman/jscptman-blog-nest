/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2023-01-16 15:28:15
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-16 18:39:58
 * @FilePath: /jscptman-blog-nest/src/auth/auth.controller.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { Controller, Get, Request } from '@nestjs/common';
import { AuthProvider } from './auth.provider';

@Controller('auth')
export class AuthController {
  constructor(private readonly authProvider: AuthProvider) {}
  @Get('admin')
  async validateSessionIfValid(
    @Request() req: Request & { sessionID: string },
  ) {
    const session = await this.authProvider.validateSessionIfValid(
      req.sessionID,
    );
    return session;
  }
}
