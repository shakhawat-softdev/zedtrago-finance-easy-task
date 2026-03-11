import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCommissionDto {
  @ApiProperty({ example: "bok-1001" })
  @IsString()
  bookingId: string;

  @ApiProperty({ example: 280 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 11.29 })
  @IsNumber()
  rate: number;

  @ApiProperty({ example: "accrued" })
  @IsString()
  status: string;
}
