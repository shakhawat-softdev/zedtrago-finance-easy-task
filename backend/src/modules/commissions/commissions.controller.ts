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
import { CommissionEntity } from "src/database/entities/commission.entity";
import { CreateCommissionDto } from "./dto/create-commission.dto";
import { CommissionsService } from "./commissions.service";

@ApiTags("Commissions")
@ApiBearerAuth()
@UseGuards(AuthTokenGuard)
@Controller("commissions")
export class CommissionsController {
  constructor(private readonly commissionsService: CommissionsService) {}

  @Get()
  @ApiOperation({
    summary: "List all accrued commissions for bookings and suppliers",
  })
  @ApiOkResponse({ type: [CommissionEntity] })
  findAll() {
    return this.commissionsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single commission record by ID" })
  @ApiParam({ name: "id", example: "com-1001" })
  @ApiOkResponse({ type: CommissionEntity })
  findOne(@Param("id") id: string) {
    return this.commissionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a commission accrual event for a booking" })
  @ApiBody({ type: CreateCommissionDto })
  @ApiOkResponse({ type: CommissionEntity })
  create(@Body() payload: CreateCommissionDto) {
    return this.commissionsService.create(payload);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update commission settlement status" })
  @ApiParam({ name: "id", example: "com-1001" })
  @ApiBody({ type: CreateCommissionDto })
  @ApiOkResponse({ type: CommissionEntity })
  update(
    @Param("id") id: string,
    @Body() payload: Partial<CreateCommissionDto>,
  ) {
    return this.commissionsService.update(id, payload);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remove a commission accrual record" })
  @ApiParam({ name: "id", example: "com-1001" })
  @ApiOkResponse({ schema: { example: { deleted: true } } })
  remove(@Param("id") id: string) {
    return this.commissionsService.remove(id);
  }
}
