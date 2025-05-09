import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lot {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  book_name: string;
  @Column()
  autor: string;
  @Column()
  price: number;
}
