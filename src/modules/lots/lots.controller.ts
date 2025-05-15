import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { LotsService } from './lots.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';

@Controller('lots')
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}
  @Post('/create')
  async create(@Body() book: CreateLotDto) {
    return await this.lotsService.createBook(book);
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
