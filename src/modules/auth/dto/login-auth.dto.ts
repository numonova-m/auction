import { IsNotEmpty } from "class-validator";

export class LoginAuthDto {
     @IsNotEmpty({ message: "Email bo'sh bo'lmasligi kerak" }
      )
      email: string;
      @IsNotEmpty({ message: "Password bo'sh bo'lmasligi kerak" }
      )
      password: string;
}
