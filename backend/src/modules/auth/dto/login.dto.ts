import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "finance@zedtrago.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "Passw0rd!" })
  @IsString()
  @MinLength(8)
  password: string;
}
