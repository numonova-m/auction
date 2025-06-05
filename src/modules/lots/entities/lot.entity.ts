import { Bid } from 'src/modules/bids/entities/bid.entity';
import { Result } from 'src/modules/result/entities/result.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lot {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  book_name: string;
  @Column()
  author: string;
  @Column()
  price: string;
  @Column()
  image: string;
  @Column()
  description?: string;
  @CreateDateColumn()
  createAt: Date;
  @OneToMany(() => Bid, (bid) => bid.lot)
  bids: Bid[];
  @Column()
  endTime: Date;
  @OneToMany(() => Result, (result) => result.lotName)
  result: Result[];
  @Column()
  status: string;
  @ManyToOne(() => Bid, { nullable: true, eager: true })
  lastBid: Bid;
}
