import { ApiProperty } from "@nestjs/swagger";

export class CurrencyRateEntity {
  @ApiProperty({ example: "AUD" })
  fromCurrency: string;

  @ApiProperty({ example: "MYR" })
  toCurrency: string;

  @ApiProperty({ example: 3.09 })
  rate: number;

  @ApiProperty({ example: "2026-03-10" })
  rateDate: string;
}
