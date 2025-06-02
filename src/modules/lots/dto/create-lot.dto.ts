import {
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateLotDto {
  @IsString()
  @IsNotEmpty({ message: 'kitob nomini kiritishingiz shart' })
  book_name: string;
  @IsNotEmpty({ message: 'kitob muallifini kiritishingiz shart' })
  author: string;
  @IsNotEmpty({ message: "kitobning boshlang'ich narxini kiritishingiz shart" })
  @IsString()
  price: string;
  @IsString()
  description?: string;

  @IsNotEmpty()
  endTime: string;
}
