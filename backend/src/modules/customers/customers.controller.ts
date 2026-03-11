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
import { CustomerEntity } from "src/database/entities/customer.entity";
import { AuthTokenGuard } from "src/common/guards/auth-token.guard";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { CustomersService } from "./customers.service";

@ApiTags("Customers")
@ApiBearerAuth()
@UseGuards(AuthTokenGuard)
@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: "List all B2B customers and agencies" })
  @ApiOkResponse({ type: [CustomerEntity] })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single customer by ID" })
  @ApiParam({ name: "id", example: "cus-001" })
  @ApiOkResponse({ type: CustomerEntity })
  findOne(@Param("id") id: string) {
    return this.customersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Register a new travel customer or agency" })
  @ApiBody({ type: CreateCustomerDto })
  @ApiOkResponse({ type: CustomerEntity })
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update customer profile" })
  @ApiParam({ name: "id", example: "cus-001" })
  @ApiBody({ type: CreateCustomerDto })
  @ApiOkResponse({ type: CustomerEntity })
  update(@Param("id") id: string, @Body() payload: Partial<CreateCustomerDto>) {
    return this.customersService.update(id, payload);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remove a customer record" })
  @ApiParam({ name: "id", example: "cus-001" })
  @ApiOkResponse({ schema: { example: { deleted: true } } })
  remove(@Param("id") id: string) {
    return this.customersService.remove(id);
  }
}
