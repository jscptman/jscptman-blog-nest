import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { EmailService } from 'src/common/email/email.service';
import { getRandomIntInclusive } from 'src/utils/index';
import UserService from '../users/users.service';
import { Cache } from 'cache-manager';
import { AuthProvider } from 'src/auth/auth.provider';

@Injectable()
export default class AdminLoginService {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly authService: AuthProvider,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getVerificationCode(username: string) {
    const randomNum = getRandomIntInclusive(100000, 999999);
    let result: null | Promise<{
      verifyCode: number;
      info: any;
    }> = null;
    await this.authService.validateUserIfExistByUsername(username);
    await this.cacheManager.set(`vc_${username}`, `${randomNum}`);
    result = Promise.resolve(this.emailService.sendEmail(randomNum, username));
    return result;
  }
}
