import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import AdminUserService from '../admin/users/users.service';
import UsersEntity from 'src/admin/users/users.entity';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigOptions } from 'config/interfaces';
import { CustomCacheProvider } from 'src/common/cache/custom-cache.provider';

@Injectable()
export class AuthProvider {
  constructor(
    private readonly configService: ConfigService<ConfigOptions, true>,
    private readonly jwtService: JwtService,
    private readonly adminUsersService: AdminUserService, // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly customCacheProvider: CustomCacheProvider,
  ) {}

  async validateUserIfExistByUsername(username: string) {
    const user = await this.adminUsersService.findOneByUsername(username);
    console.log(
      '🚀 ~ file: auth.provider.ts:18 ~ AuthProvider ~ validateUserIfExistByUsername ~ username',
      username,
    );
    console.log('user:', user);

    if (!user) {
      throw new UnauthorizedException('当前用户未被录入系统');
    }
  }

  async validateByVerificationCodeAdmin(
    username: string,
    verificationCode: string,
  ): Promise<boolean> {
    const cacheInstance =
      await this.customCacheProvider.getVerificationInstance();

    const verificationCodeInStore: string | null = await cacheInstance
      .getDbClient_1()
      .get(username);

    if (
      verificationCodeInStore &&
      verificationCodeInStore === verificationCode
    ) {
      return true;
    } else {
      throw new UnauthorizedException('验证码错误');
    }
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
