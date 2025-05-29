import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Lot } from 'src/modules/lots/entities/lot.entity';
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
}
