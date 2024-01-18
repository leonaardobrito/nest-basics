import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
// import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDTO): Promise<UserEntity> {
    const saltOrRounds = 10;
    const passHashed = await hash(createUserDto.pass, saltOrRounds);
    // console.log(passHashed);
    return this.userRepository.save({
      ...createUserDto,
      pass: passHashed,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
