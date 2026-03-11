import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateCustomerDto {
  @ApiProperty({ example: "Summit Trails Travel" })
  @IsString()
  companyName: string;

  @ApiProperty({ example: "Nadia Ismail" })
  @IsString()
  contactName: string;

  @ApiProperty({ example: "nadia@summittrails.example" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "Malaysia" })
  @IsString()
  market: string;

  @ApiProperty({ example: "MYR" })
  @IsString()
  preferredCurrency: string;
}
