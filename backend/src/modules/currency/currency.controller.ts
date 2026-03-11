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
import { CurrencyRateEntity } from "src/database/entities/currency-rate.entity";
import { CreateRateDto } from "./dto/create-rate.dto";
import { CurrencyService } from "./currency.service";

@ApiTags("Currency")
@ApiBearerAuth()
@UseGuards(AuthTokenGuard)
@Controller("currency-rates")
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  @ApiOperation({ summary: "List all FX rates for multi-currency accounting" })
  @ApiOkResponse({ type: [CurrencyRateEntity] })
  findAll() {
    return this.currencyService.findAll();
  }

  @Get(":key")
  @ApiOperation({ summary: "Get an FX rate by currency pair (e.g. AUD-MYR)" })
  @ApiParam({ name: "key", example: "AUD-MYR" })
  @ApiOkResponse({ type: CurrencyRateEntity })
  findOne(@Param("key") key: string) {
    return this.currencyService.findOne(key);
  }

  @Post()
  @ApiOperation({ summary: "Record a new daily FX rate for a currency pair" })
  @ApiBody({ type: CreateRateDto })
  @ApiOkResponse({ type: CurrencyRateEntity })
  create(@Body() payload: CreateRateDto) {
    return this.currencyService.create(payload);
  }

  @Patch(":key")
  @ApiOperation({ summary: "Update an FX rate record" })
  @ApiParam({ name: "key", example: "AUD-MYR" })
  @ApiBody({ type: CreateRateDto })
  @ApiOkResponse({ type: CurrencyRateEntity })
  update(@Param("key") key: string, @Body() payload: Partial<CreateRateDto>) {
    return this.currencyService.update(key, payload);
  }

  @Delete(":key")
  @ApiOperation({ summary: "Remove an FX rate record" })
  @ApiParam({ name: "key", example: "AUD-MYR" })
  @ApiOkResponse({ schema: { example: { deleted: true } } })
  remove(@Param("key") key: string) {
    return this.currencyService.remove(key);
  }
}
