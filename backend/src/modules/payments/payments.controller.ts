import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AuthTokenGuard } from "src/common/guards/auth-token.guard";
import { PaymentEntity } from "src/database/entities/payment.entity";
import { CreateGatewayPaymentDto } from "./dto/create-gateway-payment.dto";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentsService } from "./payments.service";

@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @UseGuards(AuthTokenGuard)
  @ApiOperation({
    summary: "List all customer receipts and gateway settlements",
  })
  @ApiOkResponse({ type: [PaymentEntity] })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: "Get a single payment record by ID" })
  @ApiParam({ name: "id", example: "pay-1001" })
  @ApiOkResponse({ type: PaymentEntity })
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthTokenGuard)
  @ApiOperation({
    summary: "Record an incoming payment callback or manual settlement event",
  })
  @ApiBody({ type: CreatePaymentDto })
  @ApiOkResponse({ type: PaymentEntity })
  create(@Body() payload: CreatePaymentDto) {
    return this.paymentsService.create(payload);
  }

  @Patch(":id")
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: "Update a payment status or reconciliation flag" })
  @ApiParam({ name: "id", example: "pay-1001" })
  @ApiBody({ type: CreatePaymentDto })
  @ApiOkResponse({ type: PaymentEntity })
  update(@Param("id") id: string, @Body() payload: Partial<CreatePaymentDto>) {
    return this.paymentsService.update(id, payload);
  }

  @Delete(":id")
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: "Remove a payment record" })
  @ApiParam({ name: "id", example: "pay-1001" })
  @ApiOkResponse({ schema: { example: { deleted: true } } })
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(id);
  }

  @Post("gateways/stripe/checkout")
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: "Create Stripe checkout session for invoice payment" })
  @ApiBody({ type: CreateGatewayPaymentDto })
  @ApiOkResponse({
    schema: {
      example: {
        provider: "stripe",
        sessionId: "cs_test_123",
        checkoutUrl: "https://checkout.stripe.com/c/pay/cs_test_123",
      },
    },
  })
  createStripeCheckout(@Body() payload: CreateGatewayPaymentDto) {
    return this.paymentsService.createStripeCheckout(payload);
  }

  @Post("gateways/paypal/order")
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: "Create PayPal order for invoice payment" })
  @ApiBody({ type: CreateGatewayPaymentDto })
  @ApiOkResponse({
    schema: {
      example: {
        provider: "paypal",
        orderId: "8RU61172RG530014L",
        approvalUrl:
          "https://www.sandbox.paypal.com/checkoutnow?token=8RU61172RG530014L",
        status: "CREATED",
      },
    },
  })
  createPayPalOrder(@Body() payload: CreateGatewayPaymentDto) {
    return this.paymentsService.createPayPalOrder(payload);
  }

  @Post("gateways/paypal/capture/:orderId")
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: "Capture an approved PayPal order" })
  @ApiParam({ name: "orderId", example: "8RU61172RG530014L" })
  capturePayPalOrder(@Param("orderId") orderId: string) {
    return this.paymentsService.capturePayPalOrder(orderId);
  }

  @Post("webhooks/stripe")
  @ApiOperation({ summary: "Stripe webhook receiver" })
  handleStripeWebhook(
    @Body() event: Record<string, unknown>,
    @Headers("stripe-signature") signature?: string,
  ) {
    return this.paymentsService.handleStripeWebhook(event, signature);
  }

  @Post("webhooks/paypal")
  @ApiOperation({ summary: "PayPal webhook receiver" })
  handlePayPalWebhook(@Body() event: Record<string, unknown>) {
    return this.paymentsService.handlePayPalWebhook(event);
  }
}
