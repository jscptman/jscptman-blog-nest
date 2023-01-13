import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UsersEntity from './users.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDTO } from './dto';
@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(user: CreateUserDTO) {
    const UsersEntity = this.usersRepository.create(user);
    return this.usersRepository.save(UsersEntity);
  }

  findAll(): Promise<UsersEntity[]> {
    return this.usersRepository.find();
  }

  findOneByUid(uid: string): Promise<UsersEntity | null> {
    return this.usersRepository.findOneBy({ uid });
  }

  findOneByUsername(username = ''): Promise<UsersEntity | null> {
    return this.usersRepository.findOneBy({ username });
  }

  remove(uid: string): Promise<DeleteResult> {
    return this.usersRepository.delete(uid);
  }
}
