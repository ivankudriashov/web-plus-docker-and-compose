import { User } from '../entities/user.entity';

export class UserPublicProfileResponseDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  about: string;
  avatar: string;

  static getUser(user: User): UserPublicProfileResponseDto {
    return {
      id: user.id,
      username: user.username,
      about: user.about,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
