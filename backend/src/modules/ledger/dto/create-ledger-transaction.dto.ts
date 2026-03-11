import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

class LedgerEntryLineDto {
  @ApiProperty({ example: "1100" })
  @IsString()
  accountCode: string;

  @ApiProperty({ example: 2480 })
  @IsNumber()
  debit: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  credit: number;

  @ApiProperty({ example: "Receivable posted" })
  @IsString()
  description: string;
}

export class CreateLedgerTransactionDto {
  @ApiProperty({ example: "booking_confirmed" })
  @IsString()
  sourceEvent: string;

  @ApiProperty({ example: "bok-1001" })
  @IsString()
  referenceId: string;

  @ApiProperty({ example: "AUD" })
  @IsString()
  currency: string;

  @ApiProperty({ type: [LedgerEntryLineDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LedgerEntryLineDto)
  entries: LedgerEntryLineDto[];
}
