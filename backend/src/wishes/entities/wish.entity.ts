import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wish {
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

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @Column()
  @IsNotEmpty()
  price: number;

  @Column({ nullable: true })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn()
  owner: User;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column({ nullable: true })
  @IsInt()
  copied: number;
}
