import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateInvoiceDto {
  @ApiProperty({ example: "bok-1001" })
  @IsString()
  bookingId: string;

  @ApiProperty({ example: "issued" })
  @IsString()
  status: string;

  @ApiProperty({ example: "AUD" })
  @IsString()
  currency: string;

  @ApiProperty({ example: 2480 })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ example: "2026-03-20" })
  @IsDateString()
  dueDate: string;
}
