import { useState } from "react";
import { Table } from "../../components/table/Table";
import {
  useGetReportingApAgingQuery,
  useGetReportingArAgingQuery,
  useGetReportingCommissionsQuery,
  useGetReportingLedgerSummaryQuery,
  useGetReportingPlSummaryQuery,
  useGetReportingTaxQuery,
} from "../../services/api";
import type { ReportFilter } from "../../utils/types";
import { formatMoney } from "../../utils/format";

const MARKETS = ["Malaysia", "Australia"] as const;

export function ReportingPage() {
  const [filters, setFilters] = useState<ReportFilter>({});

  const { data: arAging, isLoading: loadingAr } = useGetReportingArAgingQuery(
    filters.fromDate || filters.toDate || filters.market ? filters : undefined,
  );
  const { data: apAging, isLoading: loadingAp } = useGetReportingApAgingQuery(
    filters.fromDate || filters.toDate || filters.market ? filters : undefined,
  );
  const { data: taxReport, isLoading: loadingTax } = useGetReportingTaxQuery(
    filters.fromDate || filters.toDate || filters.market ? filters : undefined,
  );
  const { data: ledgerSummary, isLoading: loadingLedger } =
    useGetReportingLedgerSummaryQuery(
      filters.fromDate || filters.toDate || filters.market
        ? filters
        : undefined,
    );
  const { data: commissionsReport, isLoading: loadingCommissions } =
    useGetReportingCommissionsQuery(
      filters.fromDate || filters.toDate || filters.market
        ? filters
        : undefined,
    );
  const { data: plSummary, isLoading: loadingPl } =
    useGetReportingPlSummaryQuery(
      filters.fromDate || filters.toDate || filters.market
        ? filters
        : undefined,
    );

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <div className="section-stack">
      <section className="card">
        <div className="form-grid">
          <div>
            <label htmlFor="fromDate">From Date</label>
            <input
              id="fromDate"
              type="date"
              value={filters.fromDate || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  fromDate: e.target.value || undefined,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="toDate">To Date</label>
            <input
              id="toDate"
              type="date"
              value={filters.toDate || ""}
              onChange={(e) =>
                setFilters({ ...filters, toDate: e.target.value || undefined })
              }
            />
          </div>
          <div>
            <label htmlFor="market">Market</label>
            <select
              id="market"
              value={filters.market || ""}
              onChange={(e) =>
                setFilters({ ...filters, market: e.target.value || undefined })
              }
            >
              <option value="">All Markets</option>
              {MARKETS.map((market) => (
                <option key={market} value={market}>
                  {market}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}
          >
            <button
              type="button"
              onClick={handleClearFilters}
              className="btn-secondary"
              style={{ flexGrow: 1 }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <section className="page-grid">
        <article className="card kpi tone-indigo">
          <span className="kpi-label">AR Aging</span>
          <h3>{formatMoney(arAging?.grandTotal ?? 0)}</h3>
          <p>Open receivables across aging buckets.</p>
        </article>
        <article className="card kpi tone-amber">
          <span className="kpi-label">AP Aging</span>
          <h3>{formatMoney(apAging?.grandTotal ?? 0)}</h3>
          <p>Outstanding supplier-side liabilities.</p>
        </article>
        <article className="card kpi tone-teal">
          <span className="kpi-label">Tax Due</span>
          <h3>{formatMoney(taxReport?.totalTaxDue ?? 0)}</h3>
          <p>SST and GST obligations for the reporting period.</p>
        </article>
        <article className="card kpi tone-green">
          <span className="kpi-label">Net Profit</span>
          <h3>{formatMoney(plSummary?.netProfit ?? 0)}</h3>
          <p>{plSummary?.period ?? "Current period"} operating outcome.</p>
        </article>
      </section>

      <section className="insight-grid">
        <article className="card insight-card">
          <span className="eyebrow-label">Tax Report</span>
          <h3>Jurisdiction summary</h3>
          {loadingTax ? (
            <p>Loading tax report...</p>
          ) : (
            <div className="insight-row">
              <div>
                <strong>{formatMoney(taxReport?.malaysia.taxDue ?? 0)}</strong>
                <p>Malaysia {taxReport?.malaysia.taxCode ?? "SST"}</p>
              </div>
              <div>
                <strong>{formatMoney(taxReport?.australia.taxDue ?? 0)}</strong>
                <p>Australia {taxReport?.australia.taxCode ?? "GST"}</p>
              </div>
              <div>
                <strong>{formatMoney(plSummary?.grossProfit ?? 0)}</strong>
                <p>Gross profit</p>
              </div>
            </div>
          )}
        </article>

        <article className="card insight-card">
          <span className="eyebrow-label">Commissions</span>
          <h3>Settlement position</h3>
          <ul className="insight-list">
            <li>
              Grand total: {formatMoney(commissionsReport?.grandTotal ?? 0)}
            </li>
            <li>
              Pending settlement:{" "}
              {formatMoney(commissionsReport?.pendingSettlement ?? 0)}
            </li>
            <li>
              Supplier groups: {commissionsReport?.perSupplier.length ?? 0}
            </li>
          </ul>
        </article>
      </section>

      {loadingCommissions ? (
        <div className="card">Loading supplier commission report...</div>
      ) : (
        <Table
          data={commissionsReport?.perSupplier ?? []}
          columns={[
            { key: "supplierId", header: "Supplier ID" },
            { key: "supplierName", header: "Supplier" },
            { key: "totalCommission", header: "Total" },
            { key: "settled", header: "Settled" },
            { key: "pending", header: "Pending" },
          ]}
          emptyText="No supplier commission data"
        />
      )}

      {loadingLedger ? (
        <div className="card">Loading ledger summary...</div>
      ) : (
        <Table
          data={ledgerSummary?.accounts ?? []}
          columns={[
            { key: "code", header: "Code" },
            { key: "name", header: "Account" },
            { key: "debit", header: "Debit" },
            { key: "credit", header: "Credit" },
            { key: "balance", header: "Balance" },
          ]}
          emptyText="No ledger summary data"
        />
      )}

      {loadingAr || loadingAp || loadingPl ? (
        <div className="card">Loading aging and profitability reports...</div>
      ) : null}
    </div>
  );
}
