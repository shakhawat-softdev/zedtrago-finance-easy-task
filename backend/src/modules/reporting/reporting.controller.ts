import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { AuthTokenGuard } from "src/common/guards/auth-token.guard";
import { ReportFilterDto } from "./dto/report-filter.dto";
import { ReportingService } from "./reporting.service";

@ApiTags("Reporting")
@ApiBearerAuth()
@UseGuards(AuthTokenGuard)
@Controller("reporting")
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get("dashboard")
  @ApiOperation({
    summary: "Finance dashboard — KPI summary across all modules",
  })
  @ApiOkResponse({
    schema: {
      example: {
        summary: {
          bookings: 2,
          invoicedAmount: 3930,
          collectedAmount: 2480,
          accruedCommission: 420,
        },
        compliance: { malaysia: "SST-ready", australia: "GST-ready" },
        refreshMode: "real-time event projections with nightly reconciliation",
      },
    },
  })
  dashboard(@Query() filter: ReportFilterDto) {
    return this.reportingService.getDashboard(filter);
  }

  @Get("ar-aging")
  @ApiOperation({
    summary:
      "Accounts receivable aging — outstanding invoice buckets (0-30, 31-60, 61-90, 90+ days)",
  })
  @ApiOkResponse({
    schema: {
      example: {
        asOf: "2026-01-01",
        buckets: {
          current: { count: 1, total: 1450 },
          "31-60": { count: 1, total: 2480 },
          "61-90": { count: 0, total: 0 },
          "90+": { count: 0, total: 0 },
        },
        grandTotal: 3930,
      },
    },
  })
  arAging(@Query() filter: ReportFilterDto) {
    return this.reportingService.getArAging(filter);
  }

  @Get("ap-aging")
  @ApiOperation({
    summary: "Accounts payable aging — outstanding supplier cost buckets",
  })
  @ApiOkResponse({
    schema: {
      example: {
        asOf: "2026-01-01",
        buckets: {
          current: { count: 1, total: 1200 },
          "31-60": { count: 0, total: 0 },
        },
        grandTotal: 1200,
      },
    },
  })
  apAging(@Query() filter: ReportFilterDto) {
    return this.reportingService.getApAging(filter);
  }

  @Get("tax")
  @ApiOperation({
    summary:
      "Tax compliance report — SST (Malaysia) and GST (Australia) export",
  })
  @ApiQuery({ name: "market", required: false, enum: ["MY", "AU", "ALL"] })
  @ApiOkResponse({
    schema: {
      example: {
        period: "2026-Q1",
        malaysia: {
          taxCode: "SST",
          rate: 0.06,
          taxableAmount: 2480,
          taxDue: 148.8,
        },
        australia: {
          taxCode: "GST",
          rate: 0.1,
          taxableAmount: 1450,
          taxDue: 145,
        },
        totalTaxDue: 293.8,
      },
    },
  })
  taxReport(@Query() filter: ReportFilterDto) {
    return this.reportingService.getTaxReport(filter);
  }

  @Get("ledger-summary")
  @ApiOperation({
    summary: "Trial balance — aggregated debit and credit by account code",
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
  ledgerSummary(@Query() filter: ReportFilterDto) {
    return this.reportingService.getLedgerSummary(filter);
  }

  @Get("commissions")
  @ApiOperation({
    summary: "Commission accrual report — totals grouped by supplier",
  })
  @ApiOkResponse({
    schema: {
      example: {
        period: "2026-Q1",
        perSupplier: [
          {
            supplierId: "sup-001",
            supplierName: "Sabre GDS",
            totalCommission: 270,
            settled: 270,
            pending: 0,
          },
        ],
        grandTotal: 420,
        pendingSettlement: 150,
      },
    },
  })
  commissionsReport(@Query() filter: ReportFilterDto) {
    return this.reportingService.getCommissionsReport(filter);
  }

  @Get("pl-summary")
  @ApiOperation({
    summary: "Profit and loss summary — revenue vs cost vs gross margin",
  })
  @ApiOkResponse({
    schema: {
      example: {
        period: "2026-Q1",
        revenue: 3930,
        costOfSales: 2250,
        grossProfit: 1680,
        grossMarginPct: 42.75,
        commissionIncome: 420,
        netProfit: 2100,
      },
    },
  })
  plSummary(@Query() filter: ReportFilterDto) {
    return this.reportingService.getPlSummary(filter);
  }
}
