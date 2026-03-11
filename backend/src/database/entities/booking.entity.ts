import { ApiProperty } from "@nestjs/swagger";

export class BookingEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  supplierId: string;

  @ApiProperty({ example: "hotel" })
  bookingType: string;

  @ApiProperty({ example: "confirmed" })
  status: string;

  @ApiProperty({ example: "AUD" })
  bookingCurrency: string;

  @ApiProperty({ example: 2480 })
  grossAmount: number;

  @ApiProperty({ example: 2200 })
  netAmount: number;

  @ApiProperty({ example: "2026-03-10T10:00:00.000Z" })
  travelDate: string;
}
