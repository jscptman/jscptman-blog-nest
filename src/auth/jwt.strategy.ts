import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigOptions } from 'config/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<ConfigOptions, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtOptions.secret', { infer: true }),
      maxAge: configService.get('jwtOptions.signOptions.expiresIn', {
        infer: true,
      }),
    });
  }

  async validate({ uid, username }: { uid: string; username: string }) {
    return { uid, username };
  }
}
