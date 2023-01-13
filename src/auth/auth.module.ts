import { ConfigOptions } from 'config/interfaces';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthProvider } from './auth.provider';
import AdminUsersModule from '../admin/users/users.module';
import { PasswordStrategy } from './password.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CustomCacheModule } from 'src/common/cache/custom-cache.module';
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
  providers: [AuthProvider, PasswordStrategy, JwtStrategy],
  exports: [AuthProvider, PasswordStrategy, JwtStrategy],
})
export class AuthModule {}
