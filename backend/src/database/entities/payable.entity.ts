import { ApiProperty } from "@nestjs/swagger";

export class PayableEntity {
  @ApiProperty({ example: "payb-1001" })
  id: string;

  @ApiProperty({ example: "sup-001" })
  supplierId: string;

  @ApiProperty({ example: "bok-1001" })
  bookingId: string;

  @ApiProperty({ example: "inv-1001" })
  invoiceId: string;

  @ApiProperty({ example: "accrued" })
  status: string;

  @ApiProperty({ example: "AUD" })
  currency: string;

  @ApiProperty({ example: 2200 })
  amount: number;

  @ApiProperty({ example: "2026-03-25" })
  dueDate: string;

  @ApiProperty({ example: "SETTLE-2026-03" })
  settlementBatch: string;
}
