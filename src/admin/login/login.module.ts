import { Module } from '@nestjs/common';
import AdminLoginController from './login.controller';
import AdminLoginService from './login.service';
import UsersModule from '../users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/common/email/email.module';

@Module({
  imports: [UsersModule, AuthModule, EmailModule],
  controllers: [AdminLoginController],
  providers: [AdminLoginService],
})
export default class AdminLoginModule {}
