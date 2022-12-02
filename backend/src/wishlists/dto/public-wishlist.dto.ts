import { UserPublicProfileResponseDto } from 'src/users/dto/user-public-profile-response.dto';

export class PublicWishlistDto {
  name: string;
  image: string;
  itemsId?: number[];
  owner: UserPublicProfileResponseDto;
}
