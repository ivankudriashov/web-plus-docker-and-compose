import { User } from '../entities/user.entity';

export class UserProfileResponseDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  about: string;
  avatar: string;
  email: string;

  static getUser(user: User): UserProfileResponseDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      about: user.about,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
