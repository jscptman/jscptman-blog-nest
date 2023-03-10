import { Module } from '@nestjs/common';
import AdminLoginController from './login.controller';
import AdminLoginService from './login.service';
import UsersModule from '../users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/common/email/email.module';
import { CustomCacheModule } from 'src/common/cache/custom-cache.module';
@Module({
  imports: [UsersModule, AuthModule, EmailModule, CustomCacheModule],
  controllers: [AdminLoginController],
  providers: [AdminLoginService],
})
export default class AdminLoginModule {}
