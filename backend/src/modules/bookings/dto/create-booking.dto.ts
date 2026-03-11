import { ApiProperty } from "@nestjs/swagger";
import { IsISO8601, IsNumber, IsString } from "class-validator";

export class CreateBookingDto {
  @ApiProperty({ example: "cus-001" })
  @IsString()
  customerId: string;

  @ApiProperty({ example: "sup-001" })
  @IsString()
  supplierId: string;

  @ApiProperty({ example: "hotel" })
  @IsString()
  bookingType: string;

  @ApiProperty({ example: "confirmed" })
  @IsString()
  status: string;

  @ApiProperty({ example: "AUD" })
  @IsString()
  bookingCurrency: string;

  @ApiProperty({ example: 2480 })
  @IsNumber()
  grossAmount: number;

  @ApiProperty({ example: 2200 })
  @IsNumber()
  netAmount: number;

  @ApiProperty({ example: "2026-04-18T00:00:00.000Z" })
  @IsISO8601()
  travelDate: string;
}
