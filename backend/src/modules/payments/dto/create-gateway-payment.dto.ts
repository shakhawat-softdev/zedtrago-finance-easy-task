import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUrl, Min } from "class-validator";

export class CreateGatewayPaymentDto {
  @ApiProperty({ example: "inv-1001" })
  @IsString()
  invoiceId: string;

  @ApiProperty({ example: 2480 })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({ example: "AUD" })
  @IsString()
  currency: string;

  @ApiPropertyOptional({
    example:
      "http://localhost:5173/payments?gateway=stripe&status=success&session_id={CHECKOUT_SESSION_ID}",
  })
  @IsOptional()
  @IsUrl()
  successUrl?: string;

  @ApiPropertyOptional({
    example: "http://localhost:5173/payments?gateway=stripe&status=cancelled",
  })
  @IsOptional()
  @IsUrl()
  cancelUrl?: string;

  @ApiPropertyOptional({
    example: "http://localhost:5173/payments?gateway=paypal&status=success",
  })
  @IsOptional()
  @IsUrl()
  returnUrl?: string;
}
