import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSupplierDto {
  @ApiProperty({ example: "Harbour Connect Hotels" })
  @IsString()
  supplierName: string;

  @ApiProperty({ example: "hotel" })
  @IsString()
  supplierType: string;

  @ApiProperty({ example: "AUD" })
  @IsString()
  settlementCurrency: string;

  @ApiProperty({ example: "api" })
  @IsString()
  integrationMode: string;
}
