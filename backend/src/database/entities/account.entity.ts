import { ApiProperty } from "@nestjs/swagger";

export class AccountEntity {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: "1100" })
  code: string;

  @ApiProperty({ example: "Accounts Receivable" })
  name: string;

  @ApiProperty({ example: "asset" })
  type: string;

  @ApiProperty({ example: "USD" })
  baseCurrency: string;
}
