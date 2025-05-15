import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('/create')
  async create(@Body() user: CreateUserDto) {
    return this.usersService.createUsers(user);
  }
  // @Get('/allusers')
  // async allUsers() {
  //   return this.usersService.getAll();
  // }
  // @Delete('/:id')
  // async deleteUser(@Param('id') id: number) {
  //   return await this.usersService.deleteUser(id);
  // }
}
