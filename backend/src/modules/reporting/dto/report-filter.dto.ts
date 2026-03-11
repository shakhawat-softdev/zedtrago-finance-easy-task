import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ReportFilterDto {
  @ApiPropertyOptional({ example: "2026-03-01" })
  @IsOptional()
  @IsString()
  fromDate?: string;

  @ApiPropertyOptional({ example: "2026-03-31" })
  @IsOptional()
  @IsString()
  toDate?: string;

  @ApiPropertyOptional({ example: "MY" })
  @IsOptional()
  @IsString()
  market?: string;
}
