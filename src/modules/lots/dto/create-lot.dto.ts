import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLotDto {
  @IsString()
  @IsNotEmpty({ message: 'kitob nomini kiritishingiz shart' })
  book_name: string;
  @IsNotEmpty({ message: 'kitob muallifini kiritishingiz shart' })
  autor: string;
  @IsNotEmpty({ message: "kitobning boshlang'ich narxini kiritishingiz shart" })
  @IsNumber()
  price: number;
}
