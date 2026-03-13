import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";

export class CreatePaymentDto {
  @ApiProperty({ example: "inv-1001" })
  @IsString()
  invoiceId: string;

  @ApiProperty({ example: "stripe" })
  @IsString()
  provider: string;

  @ApiProperty({ example: "captured" })
  @IsString()
  status: string;

  @ApiProperty({ example: "AUD" })
  @IsString()
  currency: string;

  @ApiProperty({ example: 2480 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: "2026-03-10T11:00:00.000Z" })
  @IsDateString()
  receivedAt: string;

  @ApiPropertyOptional({ example: "cs_test_a1b2c3" })
  @IsOptional()
  @IsString()
  gatewayReference?: string;

  @ApiPropertyOptional({ example: "https://checkout.stripe.com/c/pay/cs_test_x" })
  @IsOptional()
  @IsUrl()
  gatewayCheckoutUrl?: string;

  @ApiPropertyOptional({ example: "checkout.session.completed" })
  @IsOptional()
  @IsString()
  lastWebhookEvent?: string;
}
