/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2023-01-13 12:07:39
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-17 13:13:55
 * @FilePath: /jscptman-blog-nest/src/admin/login/login.service.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/common/email/email.service';
import { getRandomIntInclusive } from 'src/utils/index';
import UserService from '../users/users.service';
import { AuthProvider } from 'src/auth/auth.provider';
import { CustomCacheProvider } from 'src/common/cache/custom-cache.provider';

@Injectable()
export default class AdminLoginService {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    private readonly customCacheProvider: CustomCacheProvider,
    private readonly authService: AuthProvider,
  ) {}

  async getVerificationCode(username: string) {
    const randomNum = getRandomIntInclusive(100000, 999999);
    let result: null | Promise<{
      verifyCode: number;
      info: any;
    }> = null;
    await this.authService.validateUserIfExistByUsername(username);
    const client_1 = await this.customCacheProvider.getDbClient(1);
    client_1.set(`vc_${username}`, `${randomNum}`, { EX: 6000 });
    result = Promise.resolve(this.emailService.sendEmail(randomNum, username));
    return result;
  }

  async login(
    username: string,
    verificationCode: string,
    session: Record<string, any>,
  ) {
    await this.authService.validateByVerificationCodeAdmin(
      username,
      verificationCode,
    );
    const user = await this.authService.validateUserIfExistByUsername(username);
    session.username = username;
    session.roles = user.roles;
    const client_1 = await this.customCacheProvider.getDbClient(1);
    await client_1.del(`vc_${username}`);
  }
}
