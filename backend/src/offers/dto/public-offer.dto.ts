import { UserPublicProfileResponseDto } from 'src/users/dto/user-public-profile-response.dto';

export class PublicOfferDto {
  itemId?: number;
  amount: number;
  hidden: boolean;
  user: UserPublicProfileResponseDto;
}
