import { Bid } from 'src/modules/bids/entities/bid.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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
}
