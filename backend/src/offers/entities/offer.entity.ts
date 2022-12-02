import { IsBoolean, IsDate, IsInt, IsNotEmpty, Min } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Offer {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers, { onDelete: 'CASCADE' })
  @JoinColumn()
  item: Wish;

  @Column()
  @IsNotEmpty()
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;
}
