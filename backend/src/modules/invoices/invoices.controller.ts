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
import { InvoiceEntity } from "src/database/entities/invoice.entity";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { InvoicesService } from "./invoices.service";

@ApiTags("Invoices")
@ApiBearerAuth()
@UseGuards(AuthTokenGuard)
@Controller("invoices")
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  @ApiOperation({
    summary: "List all customer invoices generated from bookings",
  })
  @ApiOkResponse({ type: [InvoiceEntity] })
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single invoice by ID" })
  @ApiParam({ name: "id", example: "inv-1001" })
  @ApiOkResponse({ type: InvoiceEntity })
  findOne(@Param("id") id: string) {
    return this.invoicesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Generate a receivable invoice for a booking" })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiOkResponse({ type: InvoiceEntity })
  create(@Body() payload: CreateInvoiceDto) {
    return this.invoicesService.create(payload);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update invoice status or amounts" })
  @ApiParam({ name: "id", example: "inv-1001" })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiOkResponse({ type: InvoiceEntity })
  update(@Param("id") id: string, @Body() payload: Partial<CreateInvoiceDto>) {
    return this.invoicesService.update(id, payload);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Void and remove an invoice" })
  @ApiParam({ name: "id", example: "inv-1001" })
  @ApiOkResponse({ schema: { example: { deleted: true } } })
  remove(@Param("id") id: string) {
    return this.invoicesService.remove(id);
  }
}
