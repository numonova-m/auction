import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async createUsers(user: CreateUserDto) {
    const existing = await this.userRepo.findOneBy({ email: user.email });
    if (existing) {
      throw new BadRequestException('Bu email allaqachon ro‘yxatdan o‘tgan.');
    }

    const hashpassword = await bcrypt.hash(user.password, 12);
    const create = this.userRepo.create({
      ...user,
      password: hashpassword,
      role: 'user',
    });

    const createUser = await this.userRepo.save(create);
    return createUser;
  }
  async getByEmail(email: string) {
    const findUser = await this.userRepo.findOne({ where: { email: email } });
    return findUser;
  }

  async getAll() {
    const allUsers = await this.userRepo.find();
    if (allUsers.length == 0) {
      throw new BadRequestException('foydalanuvchi mavjud emas');
    } else {
      return { message: `${allUsers.length}ta foydalanuvchi mavjud`, allUsers };
    }
  }
  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('bunday foydalanuvchi mavjud emas');
    }
    const deleteUser = await this.userRepo.delete({ id: id });
    return {
      message: "foydalanuvchi o'chirildi",
      data: user,
    };
  }
}
