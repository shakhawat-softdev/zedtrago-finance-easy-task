import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AuthTokenGuard } from "src/common/guards/auth-token.guard";
import { LedgerTransactionEntity } from "src/database/entities/ledger-transaction.entity";
import { CreateLedgerTransactionDto } from "./dto/create-ledger-transaction.dto";
import { LedgerService } from "./ledger.service";

@ApiTags("Ledger")
@ApiBearerAuth()
@UseGuards(AuthTokenGuard)
@Controller("ledger")
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get("transactions")
  @ApiOperation({ summary: "List all double-entry ledger transactions" })
  @ApiOkResponse({ type: [LedgerTransactionEntity] })
  findAll() {
    return this.ledgerService.findAll();
  }

  @Get("transactions/:id")
  @ApiOperation({ summary: "Get a single ledger transaction by ID" })
  @ApiParam({ name: "id", example: "led-1001" })
  @ApiOkResponse({ type: LedgerTransactionEntity })
  findOne(@Param("id") id: string) {
    return this.ledgerService.findOne(id);
  }

  @Get("trial-balance")
  @ApiOperation({
    summary: "Get the current trial balance across all ledger accounts",
  })
  @ApiOkResponse({
    schema: {
      example: {
        accounts: [
          {
            code: "1100",
            name: "Accounts Receivable",
            debit: 3930,
            credit: 0,
            balance: 3930,
          },
          {
            code: "4001",
            name: "Travel Revenue",
            debit: 0,
            credit: 3930,
            balance: -3930,
          },
        ],
        totalDebit: 3930,
        totalCredit: 3930,
        balanced: true,
      },
    },
  })
  trialBalance() {
    return this.ledgerService.getTrialBalance();
  }

  @Post("transactions")
  @ApiOperation({
    summary:
      "Post a balanced ledger transaction from an upstream business event",
  })
  @ApiBody({ type: CreateLedgerTransactionDto })
  @ApiOkResponse({ type: LedgerTransactionEntity })
  create(@Body() payload: CreateLedgerTransactionDto) {
    return this.ledgerService.create(payload);
  }
}
