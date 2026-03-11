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
import { SupplierEntity } from "src/database/entities/supplier.entity";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { SuppliersService } from "./suppliers.service";

@ApiTags("Suppliers")
@ApiBearerAuth()
@UseGuards(AuthTokenGuard)
@Controller("suppliers")
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  @ApiOperation({ summary: "List all hotels, GDS, and booking suppliers" })
  @ApiOkResponse({ type: [SupplierEntity] })
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single supplier by ID" })
  @ApiParam({ name: "id", example: "sup-001" })
  @ApiOkResponse({ type: SupplierEntity })
  findOne(@Param("id") id: string) {
    return this.suppliersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Register a supplier integration profile" })
  @ApiBody({ type: CreateSupplierDto })
  @ApiOkResponse({ type: SupplierEntity })
  create(@Body() payload: CreateSupplierDto) {
    return this.suppliersService.create(payload);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update supplier settlement terms or integration mode",
  })
  @ApiParam({ name: "id", example: "sup-001" })
  @ApiBody({ type: CreateSupplierDto })
  @ApiOkResponse({ type: SupplierEntity })
  update(@Param("id") id: string, @Body() payload: Partial<CreateSupplierDto>) {
    return this.suppliersService.update(id, payload);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remove a supplier integration profile" })
  @ApiParam({ name: "id", example: "sup-001" })
  @ApiOkResponse({ schema: { example: { deleted: true } } })
  remove(@Param("id") id: string) {
    return this.suppliersService.remove(id);
  }
}
