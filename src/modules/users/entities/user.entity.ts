import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  @Column({nullable:true,default:"user"})
  role:string
}
