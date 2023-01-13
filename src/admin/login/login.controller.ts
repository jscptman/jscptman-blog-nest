import { PasswordAuthGuard, JwtAuthGuard } from './../../guards/index';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import AdminLoginService from './login.service';
import UsersEntity from '../users/users.entity';
import { Roles, Role } from 'src/decorators';
import { AuthProvider } from 'src/auth/auth.provider';
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

  // @UseGuards(PasswordAuthGuard)
  // @Post('auth')
  // passwordLogin(
  //   @Request() req: { user: Promise<UsersEntity> },
  // ): Promise<UsersEntity> {
  //   return req.user;
  // }

  // @UseGuards(PasswordAuthGuard)
  // @Post('getToken')
  // async getToken(
  //   @Request() req: { user: Promise<UsersEntity> },
  // ): Promise<{ accessToken: string }> {
  //   return this.authProvider.getToken(await req.user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req: { user: UsersEntity }) {
  //   return req.user;
  // }
}
