import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Lot } from 'src/modules/lots/entities/lot.entity';
import { Result } from 'src/modules/result/entities/result.entity';
@Entity({ name: 'bids' })
export class Bid {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.bids)
  user: User;

  @ManyToOne(() => Lot, (lot) => lot.bids)
  lot: Lot;
  @OneToMany(() => Result, (result) => result.amountBid)
  result: Result[];
}
