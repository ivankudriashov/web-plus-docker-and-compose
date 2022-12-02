import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPublicProfileResponseDto } from 'src/users/dto/user-public-profile-response.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: number, wish: CreateWishDto): Promise<Wish> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const newWish = await this.wishesRepository.create({
      ...wish,
      owner: user,
    });

    return this.wishesRepository.save(newWish);
  }

  async findAll(): Promise<Wish[]> {
    return this.wishesRepository.find();
  }

  async findOne(id: number): Promise<Wish> {
    return this.wishesRepository.findOneBy({ id });
  }

  async findLast(): Promise<any> {
    const wish = await this.wishesRepository.find({
      relations: ['owner'],
      order: { id: 'desc' },
      take: 30,
    });
    return wish;
  }

  async findTop(): Promise<any> {
    const wish = await this.wishesRepository.find({
      relations: ['owner'],
      order: { copied: 'desc' },
      take: 10,
    });
    return wish;
  }

  async update(id: number, wish: UpdateWishDto, userId: number): Promise<void> {
    const wishToUpdate = await this.findOne(id);

    if (wishToUpdate.owner.id !== userId) {
      throw new ForbiddenException('Нельзя редактировать чужие желания');
    }

    await this.wishesRepository.update({ id }, wish);
  }

  async remove(id: number, userId: number): Promise<void> {
    const wishToDelete = await this.findOne(id);

    if (wishToDelete.owner.id !== userId) {
      throw new ForbiddenException('Нельзя удалять чужие желания');
    }

    await this.wishesRepository.delete({ id });
  }

  async copyWish(id: number, userId: number) {
    const wish = await this.findOne(id);
    const counter = wish.copied + 1;
    await this.wishesRepository.update(id, {
      copied: counter,
    });
    const user = await this.userRepository.findOneBy({ id: userId });
    const copiedWish = {
      ...wish,
      owner: UserPublicProfileResponseDto.getUser(user),
      copied: 0,
      raised: 0,
      offers: [],
    };
    delete copiedWish.id;
    return this.wishesRepository.save(copiedWish);
  }
}
