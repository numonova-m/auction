import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { Role } from 'src/common/enums/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post('/create')
  async create(@Body() user: CreateUserDto) {
    return this.usersService.createUsers(user);
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Get('/allusers')
  async allUsers() {
    return this.usersService.getAll();
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.usersService.deleteUser(id);
  }
}
