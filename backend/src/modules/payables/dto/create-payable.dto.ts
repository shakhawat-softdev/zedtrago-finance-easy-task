import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreatePayableDto {
  @ApiProperty({ example: "sup-001" })
  @IsString()
  supplierId: string;

  @ApiProperty({ example: "bok-1001" })
  @IsString()
  bookingId: string;

  @ApiProperty({ example: "inv-1001" })
  @IsString()
  invoiceId: string;

  @ApiProperty({ example: "accrued" })
  @IsString()
  status: string;

  @ApiProperty({ example: "AUD" })
  @IsString()
  currency: string;

  @ApiProperty({ example: 2200 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: "2026-03-25" })
  @IsDateString()
  dueDate: string;

  @ApiProperty({ example: "SETTLE-2026-03" })
  @IsString()
  settlementBatch: string;
}
