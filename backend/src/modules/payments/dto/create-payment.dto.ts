import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty({ example: "inv-1001" })
  @IsString()
  invoiceId: string;

  @ApiProperty({ example: "stripe" })
  @IsString()
  provider: string;

  @ApiProperty({ example: "captured" })
  @IsString()
  status: string;

  @ApiProperty({ example: "AUD" })
  @IsString()
  currency: string;

  @ApiProperty({ example: 2480 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: "2026-03-10T11:00:00.000Z" })
  @IsDateString()
  receivedAt: string;
}
