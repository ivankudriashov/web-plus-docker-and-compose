import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateWishDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  link: string;
  image: string;
  price: number;
  raised: number;
  owner: User;
  description: string;
  offers: Offer[];
  copied: number;
}
