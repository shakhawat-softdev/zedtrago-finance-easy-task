import { ApiProperty } from "@nestjs/swagger";

export class SupplierEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  supplierName: string;

  @ApiProperty()
  supplierType: string;

  @ApiProperty()
  settlementCurrency: string;

  @ApiProperty({ example: "api" })
  integrationMode: string;
}
