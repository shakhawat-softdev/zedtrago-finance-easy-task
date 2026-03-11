import { ApiProperty } from "@nestjs/swagger";

export class CommissionEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  bookingId: string;

  @ApiProperty({ example: 280 })
  amount: number;

  @ApiProperty({ example: 11.29 })
  rate: number;

  @ApiProperty({ example: "accrued" })
  status: string;
}
