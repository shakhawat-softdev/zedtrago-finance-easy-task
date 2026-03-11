import { ApiProperty } from "@nestjs/swagger";

export class InvoiceEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  bookingId: string;

  @ApiProperty()
  invoiceNumber: string;

  @ApiProperty({ example: "issued" })
  status: string;

  @ApiProperty({ example: "AUD" })
  currency: string;

  @ApiProperty({ example: 2480 })
  totalAmount: number;

  @ApiProperty({ example: "2026-03-15" })
  dueDate: string;
}
