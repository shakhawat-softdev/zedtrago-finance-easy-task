import { ApiProperty } from "@nestjs/swagger";

export class CustomerEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  contactName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  market: string;

  @ApiProperty()
  preferredCurrency: string;
}
