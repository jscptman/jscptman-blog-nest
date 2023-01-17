import { Injectable } from '@nestjs/common';
import AdminUserService from '../admin/users/users.service';
import UsersEntity from 'src/admin/users/users.entity';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { CustomCacheProvider } from 'src/common/cache/custom-cache.provider';

@Injectable()
export class AuthProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminUsersService: AdminUserService,
    private readonly customCacheProvider: CustomCacheProvider,
  ) {}

  async validateUserIfExistByUsername(username: string) {
    const user = await this.adminUsersService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('当前用户未被录入系统');
    }
    return user;
  }

  async validateByVerificationCodeAdmin(
    username: string,
    verificationCode: string,
  ): Promise<boolean> {
    const client_1 = await this.customCacheProvider.getDbClient(1);
    const verificationCodeInStore: string | null = await client_1.get(
      `vc_${username}`,
    );
    if (
      verificationCodeInStore &&
      verificationCodeInStore === verificationCode
    ) {
      return true;
    } else {
      throw new UnauthorizedException('验证码错误');
    }
  }

  validateSessionIfValid(sessionID: string) {
    return new Promise(async (resolve, reject) => {
      const client_2 = (await this.customCacheProvider.getDbClient(2)) as any;
      return client_2.get(
        `sess:${sessionID}`,
        function (err: Error, session: string) {
          if (!sessionID || !session || err) {
            reject(new UnauthorizedException('身份认证失败(或已过期)'));
          } else {
            const { cookie, ...sessionResult } = JSON.parse(session);
            return resolve(sessionResult);
          }
        },
      );
    });
  }

  async validateByPasswordWww(
    username: string,
    password: string,
  ): Promise<UsersEntity | null> {
    const user = await this.adminUsersService.findOneByUsername(username);
    if (user) {
      // const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async getToken({ username, uid }: { username: string; uid: string }) {
    const payload = { username, uid };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
