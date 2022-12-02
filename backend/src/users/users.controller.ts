import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { FindUsersDto } from './dto/find-users.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me/wishes')
  findMyWishes(@Req() req) {
    return this.usersService.findMyWishes(req.user.id);
  }

  @Get('me')
  findMe(@Req() req) {
    return this.usersService.findOne(req.user.id);
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get(':username/wishes')
  findUserWishes(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Patch('me')
  update(@Req() req, @Body() user: UpdateUserDto) {
    return this.usersService.update(+req.user.id, user);
  }

  @Post('find')
  findMany(@Body() findUsersDto: FindUsersDto) {
    return this.usersService.findMany(findUsersDto);
  }
}
