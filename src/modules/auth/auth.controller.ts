import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Post('/register')
  async registerController(@Body()CreateUserDto:CreateUserDto){
    return await this.authService.register(CreateUserDto)
  }
  @Post('/login')
  @HttpCode(200)
  async loginController(@Body()LoginAuthDto:LoginAuthDto){
    return await this.authService.getByEmail(LoginAuthDto)
  }
}
