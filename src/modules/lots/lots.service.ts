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
import { Multer } from 'multer';

@Injectable()
export class LotsService {
  constructor(
    @InjectRepository(Lot) private readonly lotRepo: Repository<Lot>,
  ) {}
  async createBook(book: CreateLotDto, image: Express.Multer.File) {
    const newBook = this.lotRepo.create({
      ...book,
      image: image.filename, // yoki image.path
    });
    return await this.lotRepo.save(newBook);
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
      where: { book_name: name_book },
    });
    if (getOneBook.length == 0)
      throw new NotFoundException('bunday kitob mavjud emas');
    else
      return {
        message: `${getOneBook.length} dona kitob mavjud `,
        book: getOneBook,
      };
  }
  async getOneByAutor(name_author: string) {
    const getOneAuthor = await this.lotRepo.find({
      where: { author: name_author },
    });
    if (getOneAuthor.length == 0)
      throw new NotFoundException('bunday muallif mavjud emas');
    else
      return {
        message: `${name_author}ning quyidagi kitoblari mavjud`,
        books: getOneAuthor,
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
