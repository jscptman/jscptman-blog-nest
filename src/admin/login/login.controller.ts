/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2023-01-13 12:07:39
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-17 17:21:47
 * @FilePath: /jscptman-blog-nest/src/admin/login/login.controller.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { Controller, Get, Post, Query, Session, Body } from '@nestjs/common';
import AdminLoginService from './login.service';
import { Roles, Role } from 'src/decorators';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('AdminLoginController')
@Controller('login')
export default class AdminLoginController {
  constructor(private readonly adminLoginService: AdminLoginService) {}

  @Get('getVerificationCode')
  @Roles(Role.Admin)
  async getVerificationCode(@Query('username') username: string): Promise<any> {
    try {
      await this.adminLoginService.getVerificationCode(username);
    } catch (error) {
      throw error;
    }
    return;
  }

  @Post('')
  @Roles(Role.Admin)
  async login(
    @Body('username') username: string,
    @Body('verificationCode') verificationCode: string,
    @Session() session: Record<string, any>,
  ) {
    await this.adminLoginService.login(username, verificationCode, session);
  }
}
