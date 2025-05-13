import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lot } from './entities/lot.entity';
import { Repository } from 'typeorm';
import { retry } from 'rxjs';

@Injectable()
export class LotsService {
  constructor(
    @InjectRepository(Lot) private readonly lotRepo: Repository<Lot>,
  ) {}
  async createBook(book: CreateLotDto) {
    const newBook = this.lotRepo.create(book);
    const createBook = await this.lotRepo.save(newBook);
    return createBook;
  }
  async getAllBook() {
    const AllBook = await this.lotRepo.find();
    return {
      message: `jami ${AllBook.length}ta kitob mavjud `,
      AllBook,
    };
  }
  async getOneBook(name_book: string) {
    const getOneBook = await this.lotRepo.find({
      where: { book_name:name_book },
    });
    if (getOneBook.length==0)
      throw new NotFoundException('bunday kitob mavjud emas');
    else
      return {
        message: `${getOneBook.length} dona kitob mavjud `,
        book: getOneBook,
      };
  }
  async getOneByAutor(name_autor: string) {
    const getOneAutor = await this.lotRepo.find({
      where: { autor: name_autor },
    });
    if (getOneAutor.length == 0)
      throw new NotFoundException('bunday muallif mavjud emas');
    else
      return {
        message: `${name_autor}ning quyidagi kitoblari mavjud`,
        books: getOneAutor,
      };
  }
  async updateBook(id: number, book?: CreateLotDto) {
    const Book = await this.lotRepo.findOne({ where: { id } });
    if (!Book) {
      throw new BadRequestException('bunday id dagi kitob mavjud emas');
    }

    if (!book || Object.keys(book).length === 0) {
      throw new BadRequestException(
        "Yangilash uchun hech qanday ma'lumot yuborilmadi",
      );
    }

    await this.lotRepo.update({ id }, { ...book });

    return {
      message: "Kitob ma'lumotlari yangilandi",
      Book,
    };
  }

  async deleteBook(id: number) {
    const Book = await this.lotRepo.findOne({ where: { id } });
    if (!Book) {
      throw new BadRequestException('bunday id dagi kitob mavjud emas');
    }
    const book = await this.lotRepo.delete({ id: id });
    return {
      message: `${id}-tartibdagi kitob o'chirildi`,
      data: Book,
    };
  }
}
