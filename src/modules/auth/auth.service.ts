import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async register(CreateUserDto: CreateUserDto) {
    const createUser = await this.userService.createUsers(CreateUserDto);
    const payload = { user_id: createUser.id, user_role: createUser.role };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '4h',
      secret: this.configService.get('JWT_KEY'),
    });
    return {
      message: 'siz muvaffaqiyatli tizimga kirdingiz',
      data: {
        email: createUser.email,
        user: createUser.username,
      },
      token: access_token,
    };
  }

  async getByEmail(loginAuthDto: LoginAuthDto) {
    const findUser = await this.userService.getByEmail(loginAuthDto.email);

    if (!findUser) throw new BadRequestException('Parol yoki email xato!!!');

    const comparePassword = await bcrypt.compare(
      loginAuthDto.password,
      findUser.password,
    );
    if (!comparePassword)
      throw new BadRequestException('Parol yoki email xato!!!');
    const payload = { user_id: findUser.id, user_role: findUser.role };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '4h',
      secret: this.configService.get('JWT_KEY'),
    });
    return {
      message: 'siz muvaffaqiyatli tizimga kirdingiz',
      data: {
        email: findUser.email,
        user: findUser.username,
      },
      token: access_token,
    };
  }
}
