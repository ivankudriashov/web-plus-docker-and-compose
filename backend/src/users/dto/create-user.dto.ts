import { Offer } from 'src/offers/entities/offer.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

export class CreateUserDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
  wishes: Wish[];
  wishlists: Wishlist[];
  offers: Offer[];
}
