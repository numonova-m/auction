import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Unique } from 'typeorm';


export class CreateUserDto {
  @IsNotEmpty({ message: "username bo'sh bo'lishi mumkin emas" })
  @MinLength(3, {
    message: "username eng kamida 3ta belgidan iborat bo'lishi kerak",
  })
  username: string;

  
  @IsNotEmpty({ message: "ma'lumotingizni to'liq kiritmadingiz" })
  @IsEmail(
    {},
    {
      message: 'emailngizda qandaydir xatolik bor, tekshirib qayta kiriting',
    },
  )
  email: string;
  @IsNotEmpty({ message: "ma'lumotingizni to'liq kiritmadingiz" })
  @IsStrongPassword(
    {},
    {
      message:
        "parolingiz kamida 1ta raqam, 1ta belgi, 1ta bosh va 6ta harfdan iborat bo'lishi kerak",
    },
  )
  password: string;
}
