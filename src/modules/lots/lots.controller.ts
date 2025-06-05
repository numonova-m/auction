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
}
