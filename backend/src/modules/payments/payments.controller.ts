import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AuthTokenGuard } from "src/common/guards/auth-token.guard";
import { PaymentEntity } from "src/database/entities/payment.entity";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentsService } from "./payments.service";

@ApiTags("Payments")
@ApiBearerAuth()
@UseGuards(AuthTokenGuard)
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @ApiOperation({
    summary: "List all customer receipts and gateway settlements",
  })
  @ApiOkResponse({ type: [PaymentEntity] })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single payment record by ID" })
  @ApiParam({ name: "id", example: "pay-1001" })
  @ApiOkResponse({ type: PaymentEntity })
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: "Record an incoming payment callback or manual settlement event",
  })
  @ApiBody({ type: CreatePaymentDto })
  @ApiOkResponse({ type: PaymentEntity })
  create(@Body() payload: CreatePaymentDto) {
    return this.paymentsService.create(payload);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a payment status or reconciliation flag" })
  @ApiParam({ name: "id", example: "pay-1001" })
  @ApiBody({ type: CreatePaymentDto })
  @ApiOkResponse({ type: PaymentEntity })
  update(@Param("id") id: string, @Body() payload: Partial<CreatePaymentDto>) {
    return this.paymentsService.update(id, payload);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remove a payment record" })
  @ApiParam({ name: "id", example: "pay-1001" })
  @ApiOkResponse({ schema: { example: { deleted: true } } })
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(id);
  }
}
