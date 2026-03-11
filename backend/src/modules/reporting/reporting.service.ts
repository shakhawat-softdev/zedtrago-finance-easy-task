import { Injectable } from "@nestjs/common";
import {
  accounts,
  bookings,
  commissions,
  invoices,
  ledgerTransactions,
  payments,
  suppliers,
} from "src/database/seed/sample-data";
import { ReportFilterDto } from "./dto/report-filter.dto";

@Injectable()
export class ReportingService {
  getDashboard(_filter: ReportFilterDto) {
    const totalRevenue = invoices.reduce(
      (sum, inv) => sum + inv.totalAmount,
      0,
    );
    const totalCollections = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalCommission = commissions.reduce((sum, c) => sum + c.amount, 0);
    const outstanding = totalRevenue - totalCollections;

    return {
      summary: {
        bookings: bookings.length,
        invoicedAmount: totalRevenue,
        collectedAmount: totalCollections,
        outstandingReceivables: outstanding,
        accruedCommission: totalCommission,
      },
      compliance: {
        malaysia: "SST-ready reporting through tax code mapping",
        australia:
          "GST-ready reporting through jurisdiction-based invoice rules",
      },
      refreshMode: "real-time event projections with nightly reconciliation",
    };
  }

  getArAging(_filter: ReportFilterDto) {
    const asOf = new Date();
    const buckets: Record<
      string,
      { count: number; total: number; invoices: string[] }
    > = {
      current: { count: 0, total: 0, invoices: [] },
      "31-60": { count: 0, total: 0, invoices: [] },
      "61-90": { count: 0, total: 0, invoices: [] },
      "90+": { count: 0, total: 0, invoices: [] },
    };

    for (const inv of invoices) {
      if (inv.status === "paid") continue;
      const due = new Date(inv.dueDate);
      const diffDays = Math.floor((asOf.getTime() - due.getTime()) / 86400000);
      const bucket =
        diffDays <= 0
          ? "current"
          : diffDays <= 30
            ? "current"
            : diffDays <= 60
              ? "31-60"
              : diffDays <= 90
                ? "61-90"
                : "90+";
      buckets[bucket].count++;
      buckets[bucket].total += inv.totalAmount;
      buckets[bucket].invoices.push(inv.invoiceNumber);
    }

    const grandTotal = Object.values(buckets).reduce(
      (sum, b) => sum + b.total,
      0,
    );
    return { asOf: asOf.toISOString().slice(0, 10), buckets, grandTotal };
  }

  getApAging(_filter: ReportFilterDto) {
    const asOf = new Date();
    // Simulate AP data from cost portion of bookings
    const apEntries = bookings.map((b) => ({
      supplierId: b.supplierId,
      amount: b.netAmount,
      dueDate: new Date(b.travelDate),
    }));

    const buckets: Record<string, { count: number; total: number }> = {
      current: { count: 0, total: 0 },
      "31-60": { count: 0, total: 0 },
      "61-90": { count: 0, total: 0 },
      "90+": { count: 0, total: 0 },
    };

    for (const entry of apEntries) {
      const diffDays = Math.floor(
        (asOf.getTime() - entry.dueDate.getTime()) / 86400000,
      );
      const bucket =
        diffDays <= 0
          ? "current"
          : diffDays <= 30
            ? "current"
            : diffDays <= 60
              ? "31-60"
              : diffDays <= 90
                ? "61-90"
                : "90+";
      buckets[bucket].count++;
      buckets[bucket].total += entry.amount;
    }

    const grandTotal = Object.values(buckets).reduce(
      (sum, b) => sum + b.total,
      0,
    );
    return { asOf: asOf.toISOString().slice(0, 10), buckets, grandTotal };
  }

  getTaxReport(_filter: ReportFilterDto) {
    const myInvoices = invoices.filter((i) => i.currency === "MYR");
    const auInvoices = invoices.filter((i) => i.currency === "AUD");

    const myTaxable = myInvoices.reduce((sum, i) => sum + i.totalAmount, 0);
    const auTaxable = auInvoices.reduce((sum, i) => sum + i.totalAmount, 0);

    return {
      period: "2026-Q1",
      malaysia: {
        taxCode: "SST",
        rate: 0.06,
        taxableAmount: myTaxable,
        taxDue: +(myTaxable * 0.06).toFixed(2),
      },
      australia: {
        taxCode: "GST",
        rate: 0.1,
        taxableAmount: auTaxable,
        taxDue: +(auTaxable * 0.1).toFixed(2),
      },
      totalTaxDue: +(myTaxable * 0.06 + auTaxable * 0.1).toFixed(2),
    };
  }

  getLedgerSummary(_filter: ReportFilterDto) {
    const balanceMap: Record<
      string,
      { code: string; name: string; debit: number; credit: number }
    > = {};

    for (const account of accounts) {
      balanceMap[account.code] = {
        code: account.code,
        name: account.name,
        debit: 0,
        credit: 0,
      };
    }

    for (const tx of ledgerTransactions) {
      for (const line of tx.entries) {
        if (!balanceMap[line.accountCode]) {
          balanceMap[line.accountCode] = {
            code: line.accountCode,
            name: line.description,
            debit: 0,
            credit: 0,
          };
        }
        balanceMap[line.accountCode].debit += line.debit || 0;
        balanceMap[line.accountCode].credit += line.credit || 0;
      }
    }

    const accountList = Object.values(balanceMap).map((a) => ({
      ...a,
      balance: a.debit - a.credit,
    }));
    const totalDebit = accountList.reduce((sum, a) => sum + a.debit, 0);
    const totalCredit = accountList.reduce((sum, a) => sum + a.credit, 0);

    return {
      accounts: accountList,
      totalDebit,
      totalCredit,
      balanced: Math.abs(totalDebit - totalCredit) < 0.01,
    };
  }

  getCommissionsReport(_filter: ReportFilterDto) {
    const supplierMap: Record<
      string,
      {
        supplierId: string;
        supplierName: string;
        totalCommission: number;
        settled: number;
        pending: number;
      }
    > = {};

    for (const commission of commissions) {
      // Resolve supplier via booking relationship
      const booking = bookings.find((b) => b.id === commission.bookingId);
      const supplierId = booking?.supplierId || "unknown";
      const sup = suppliers.find((s) => s.id === supplierId);
      const supplierName = sup?.supplierName || supplierId;

      if (!supplierMap[supplierId]) {
        supplierMap[supplierId] = {
          supplierId,
          supplierName,
          totalCommission: 0,
          settled: 0,
          pending: 0,
        };
      }

      supplierMap[supplierId].totalCommission += commission.amount;
      if (commission.status === "settled") {
        supplierMap[supplierId].settled += commission.amount;
      } else {
        supplierMap[supplierId].pending += commission.amount;
      }
    }

    const perSupplier = Object.values(supplierMap);
    const grandTotal = perSupplier.reduce(
      (sum, s) => sum + s.totalCommission,
      0,
    );
    const pendingSettlement = perSupplier.reduce(
      (sum, s) => sum + s.pending,
      0,
    );

    return { period: "2026-Q1", perSupplier, grandTotal, pendingSettlement };
  }

  getPlSummary(_filter: ReportFilterDto) {
    const revenue = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
    const costOfSales = bookings.reduce((sum, b) => sum + b.netAmount, 0);
    const grossProfit = revenue - costOfSales;
    const commissionIncome = commissions
      .filter((c) => c.status === "settled")
      .reduce((sum, c) => sum + c.amount, 0);
    const netProfit = grossProfit + commissionIncome;

    return {
      period: "2026-Q1",
      revenue,
      costOfSales,
      grossProfit,
      grossMarginPct:
        revenue > 0 ? +((grossProfit / revenue) * 100).toFixed(2) : 0,
      commissionIncome,
      netProfit,
    };
  }
}
