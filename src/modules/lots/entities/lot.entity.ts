import {
  Column,
  CreateDateColumn,
  Entity,
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
}
