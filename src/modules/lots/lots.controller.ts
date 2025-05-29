import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { LotsService } from './lots.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/enums/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorators';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('lots')
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() book: CreateLotDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(image);
    const post = await this.lotsService.createBook(book, image);
    return { message: 'post yaratildi', post };
  }

  @Get('/allbooks')
  async getAll() {
    return await this.lotsService.getAllBook();
  }
  @Get('/book/:name')
  async getByBook(@Param('name') name: string) {
    return await this.lotsService.getOneBook(name);
  }

  @Get('/autor/:name')
  async getByAutor(@Param('name') name: string) {
    return await this.lotsService.getOneByAutor(name);
  }
  @Put('/:id')
  async updateBook(@Param('id') id: number, @Body() book?: CreateLotDto) {
    return await this.lotsService.updateBook(id, book);
  }
  @Delete('/:id')
  async deleteBook(@Param('id') id: number) {
    return await this.lotsService.deleteBook(id);
  }
}
