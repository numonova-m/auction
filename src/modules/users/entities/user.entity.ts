import { Bid } from 'src/modules/bids/entities/bid.entity';
import { Result } from 'src/modules/result/entities/result.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true, default: 'user' })
  role: string;
  @OneToMany(() => Bid, (bid) => bid.user)
  bids: Bid[];
  @OneToMany(() => Result, (result) => result.winnerUser)
  result: Result[];
}
