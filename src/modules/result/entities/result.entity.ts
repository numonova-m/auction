// auction-result.entity.ts
import { Injectable } from '@nestjs/common';
import { Bid } from 'src/modules/bids/entities/bid.entity';
import { Lot } from 'src/modules/lots/entities/lot.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
@Injectable()
@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (winnerUser) => winnerUser.email)
  winnerUser: User;
  @ManyToOne(() => Lot, (lotName) => lotName.book_name)
  lotName: Lot;
  @ManyToOne(() => Bid, (amountBid) => amountBid.amount)
  amountBid: Bid;
}
