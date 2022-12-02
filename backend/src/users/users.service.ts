import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { FindUsersDto } from './dto/find-users.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UserWishesDto } from './dto/user-wishes-dto';

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const user = await this.userRepository.create({
      ...createUserDto,
      password: await hashPassword(password),
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });

    return user;
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findUserWishes(username: string): Promise<UserWishesDto[]> {
    const user = await this.userRepository.findOne({
      where: { username: username },
      select: ['wishes'],
      relations: ['wishes'],
    });

    return user.wishes;
  }

  async findMyWishes(id: number): Promise<UserWishesDto[]> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      select: ['wishes'],
      relations: ['wishes'],
    });

    return user.wishes;
  }

  async update(id: number, user: UpdateUserDto) {
    const { password } = user;
    if (password) {
      return this.userRepository.update(id, {
        ...user,
        password: await hashPassword(password),
      });
    } else return this.userRepository.update({ id }, user);
  }

  async findMany(
    findUsersDto: FindUsersDto,
  ): Promise<UserProfileResponseDto[]> {
    const usersByEmail = await this.userRepository.findBy({
      email: findUsersDto.query,
    });
    const usersByName = await this.userRepository.findBy({
      username: findUsersDto.query,
    });
    const users: User[] = usersByEmail.concat(usersByName);
    return users.map((user) => UserProfileResponseDto.getUser(user));
  }
}
