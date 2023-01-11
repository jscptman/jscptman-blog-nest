import { Body, Controller, Get, Post } from '@nestjs/common';
import UserService from './users.service';
import { CreateUserDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AdminUserController')
@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('create')
  async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.create(createUserDTO);
  }
  @Get('findAll')
  async findAll() {
    const result = await this.userService.findAll();
    return result;
  }
}
