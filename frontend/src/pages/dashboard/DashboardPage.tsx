import {
  useGetReportingArAgingQuery,
  useGetReportingCommissionsQuery,
  useGetReportingDashboardQuery,
  useGetReportingPlSummaryQuery,
} from "../../services/api";
import { formatMoney } from "../../utils/format";

export function DashboardPage() {
  const { data: dashboard, isLoading: loadingDashboard } =
    useGetReportingDashboardQuery(undefined);
  const { data: arAging, isLoading: loadingArAging } =
    useGetReportingArAgingQuery(undefined);
  const { data: commissions, isLoading: loadingCommissions } =
    useGetReportingCommissionsQuery(undefined);
  const { data: plSummary, isLoading: loadingPlSummary } =
    useGetReportingPlSummaryQuery(undefined);

  const loading =
    loadingDashboard || loadingArAging || loadingCommissions || loadingPlSummary;

  const summary = dashboard?.summary;
  const coveragePct =
    summary && summary.invoicedAmount > 0
      ? ((summary.collectedAmount / summary.invoicedAmount) * 100).toFixed(0)
      : "0";

  const metrics = [
    { label: "Bookings", value: summary?.bookings ?? 0, tone: "amber" },
    {
      label: "Total Invoiced",
      value: formatMoney(summary?.invoicedAmount ?? 0),
      tone: "indigo",
    },
    {
      label: "Total Collected",
      value: formatMoney(summary?.collectedAmount ?? 0),
      tone: "emerald",
    },
    {
      label: "Outstanding",
      value: formatMoney(summary?.outstandingReceivables ?? 0),
      tone: "rose",
    },
    {
      label: "Accrued Commission",
      value: formatMoney(summary?.accruedCommission ?? 0),
      tone: "teal",
    },
    {
      label: "Gross Profit",
      value: formatMoney(plSummary?.grossProfit ?? 0),
      tone: "blue",
    },
    {
      label: "Net Profit",
      value: formatMoney(plSummary?.netProfit ?? 0),
      tone: "green",
    },
    {
      label: "Pending Commission",
      value: formatMoney(commissions?.pendingSettlement ?? 0),
      tone: "slate",
    },
  ];

  return (
    <div className="dashboard-stack">
      <section className="hero-panel card">
        <div>
          <span className="eyebrow-label">Executive Summary</span>
          <h2>
            Financial activity across travel operations is live and reconciled.
          </h2>
          <p>
            Use this workspace to follow receivables, payment capture, booking
            flow, and supplier readiness from a single operational surface.
          </p>
        </div>
        <div className="hero-aside">
          <span className="status-pill">
            {loading ? "Refreshing analytics" : "Live reporting feed"}
          </span>
          <strong>{summary?.bookings ?? 0} booking records tracked</strong>
          <p>
            Collections are currently covering{" "}
            {coveragePct}% of issued invoice value.
          </p>
        </div>
      </section>

      <section className="page-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className={`card kpi tone-${metric.tone}`}>
            <span className="kpi-label">{metric.label}</span>
            <h3>{metric.value}</h3>
            <p>Updated from connected service data.</p>
          </div>
        ))}
      </section>

      <section className="insight-grid">
        <article className="card insight-card">
          <span className="eyebrow-label">Collections</span>
          <h3>Revenue and cash movement</h3>
          <div className="insight-row">
            <div>
              <strong>{formatMoney(summary?.invoicedAmount ?? 0)}</strong>
              <p>Issued invoice value</p>
            </div>
            <div>
              <strong>{formatMoney(summary?.collectedAmount ?? 0)}</strong>
              <p>Captured payment value</p>
            </div>
            <div>
              <strong>{formatMoney(summary?.outstandingReceivables ?? 0)}</strong>
              <p>Open outstanding balance</p>
            </div>
          </div>
        </article>

        <article className="card insight-card">
          <span className="eyebrow-label">Performance</span>
          <h3>Reporting highlights</h3>
          <ul className="insight-list">
            <li>{dashboard?.refreshMode ?? "Reporting services are syncing."}</li>
            <li>
              AR aging total stands at {formatMoney(arAging?.grandTotal ?? 0)}.
            </li>
            <li>
              Commission report shows {commissions?.perSupplier.length ?? 0} supplier groups.
            </li>
            <li>
              Gross margin is {plSummary?.grossMarginPct ?? 0}% for {plSummary?.period ?? "current period"}.
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
