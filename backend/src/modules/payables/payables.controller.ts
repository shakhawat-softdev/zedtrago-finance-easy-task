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
import { Roles } from "src/common/decorators/roles.decorator";
import { AuthTokenGuard } from "src/common/guards/auth-token.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { PayableEntity } from "src/database/entities/payable.entity";
import { CreatePayableDto } from "./dto/create-payable.dto";
import { PayablesService } from "./payables.service";

@ApiTags("Payables")
@ApiBearerAuth()
@UseGuards(AuthTokenGuard, RolesGuard)
@Roles("finance_manager")
@Controller("payables")
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Get()
  @ApiOperation({
    summary: "List all supplier liabilities and settlement candidates",
  })
  @ApiOkResponse({ type: [PayableEntity] })
  findAll() {
    return this.payablesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single accounts payable record by ID" })
  @ApiParam({ name: "id", example: "payb-1001" })
  @ApiOkResponse({ type: PayableEntity })
  findOne(@Param("id") id: string) {
    return this.payablesService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary:
      "Create a supplier payable generated from booking or settlement workflows",
  })
  @ApiBody({ type: CreatePayableDto })
  @ApiOkResponse({ type: PayableEntity })
  create(@Body() payload: CreatePayableDto) {
    return this.payablesService.create(payload);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update payable status, amount, or settlement batch",
  })
  @ApiParam({ name: "id", example: "payb-1001" })
  @ApiBody({ type: CreatePayableDto })
  @ApiOkResponse({ type: PayableEntity })
  update(@Param("id") id: string, @Body() payload: Partial<CreatePayableDto>) {
    return this.payablesService.update(id, payload);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remove a payable record" })
  @ApiParam({ name: "id", example: "payb-1001" })
  @ApiOkResponse({ schema: { example: { deleted: true } } })
  remove(@Param("id") id: string) {
    return this.payablesService.remove(id);
  }
}
