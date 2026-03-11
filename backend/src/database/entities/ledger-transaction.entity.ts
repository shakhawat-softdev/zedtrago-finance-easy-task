import { ApiProperty } from "@nestjs/swagger";

export class LedgerEntryLine {
  @ApiProperty()
  accountCode: string;

  @ApiProperty({ example: 2480 })
  debit: number;

  @ApiProperty({ example: 0 })
  credit: number;

  @ApiProperty()
  description: string;
}

export class LedgerTransactionEntity {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: "booking_confirmed" })
  sourceEvent: string;

  @ApiProperty()
  referenceId: string;

  @ApiProperty({ example: "AUD" })
  currency: string;

  @ApiProperty({ type: [LedgerEntryLine] })
  entries: LedgerEntryLine[];

  @ApiProperty({ example: "2026-03-10T11:00:00.000Z" })
  postedAt: string;
}
