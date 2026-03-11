import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateRateDto {
  @ApiProperty({ example: "AUD" })
  @IsString()
  fromCurrency: string;

  @ApiProperty({ example: "MYR" })
  @IsString()
  toCurrency: string;

  @ApiProperty({ example: 3.09 })
  @IsNumber()
  rate: number;

  @ApiProperty({ example: "2026-03-10" })
  @IsDateString()
  rateDate: string;
}
