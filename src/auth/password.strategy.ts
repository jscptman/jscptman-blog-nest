import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthProvider } from './auth.provider';

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authProvider: AuthProvider) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authProvider.validateByPasswordWww(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
