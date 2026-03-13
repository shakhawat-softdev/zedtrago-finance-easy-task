import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PaymentEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  invoiceId: string;

  @ApiProperty({ example: "stripe" })
  provider: string;

  @ApiProperty({ example: "captured" })
  status: string;

  @ApiProperty({ example: "AUD" })
  currency: string;

  @ApiProperty({ example: 2480 })
  amount: number;

  @ApiProperty({ example: "2026-03-10T11:00:00.000Z" })
  receivedAt: string;

  @ApiPropertyOptional({ example: "cs_test_a1b2c3" })
  gatewayReference?: string;

  @ApiPropertyOptional({
    example: "https://checkout.stripe.com/c/pay/cs_test_x",
  })
  gatewayCheckoutUrl?: string;

  @ApiPropertyOptional({ example: "checkout.session.completed" })
  lastWebhookEvent?: string;
}
