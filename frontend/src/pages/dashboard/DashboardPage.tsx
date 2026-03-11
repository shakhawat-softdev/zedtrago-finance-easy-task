import {
  useGetBookingsQuery,
  useGetCustomersQuery,
  useGetInvoicesQuery,
  useGetPaymentsQuery,
  useGetSuppliersQuery,
} from "../../services/api";

export function DashboardPage() {
  const { data: customers = [] } = useGetCustomersQuery();
  const { data: bookings = [] } = useGetBookingsQuery();
  const { data: invoices = [] } = useGetInvoicesQuery();
  const { data: payments = [] } = useGetPaymentsQuery();
  const { data: suppliers = [] } = useGetSuppliersQuery();

  const invoiced = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
  const collected = payments.reduce((sum, p) => sum + p.amount, 0);
  const outstanding = invoiced - collected;

  const metrics = [
    { label: "Customers", value: customers.length, tone: "teal" },
    { label: "Bookings", value: bookings.length, tone: "amber" },
    { label: "Invoices", value: invoices.length, tone: "blue" },
    { label: "Payments", value: payments.length, tone: "green" },
    { label: "Suppliers", value: suppliers.length, tone: "slate" },
    { label: "Total Invoiced", value: invoiced.toFixed(2), tone: "indigo" },
    { label: "Total Collected", value: collected.toFixed(2), tone: "emerald" },
    { label: "Outstanding", value: outstanding.toFixed(2), tone: "rose" },
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
          <span className="status-pill">Live API sync</span>
          <strong>{bookings.length} active booking records tracked</strong>
          <p>
            Collections are currently covering{" "}
            {invoiced === 0 ? "0" : ((collected / invoiced) * 100).toFixed(0)}%
            of issued invoice value.
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
              <strong>{invoiced.toFixed(2)}</strong>
              <p>Issued invoice value</p>
            </div>
            <div>
              <strong>{collected.toFixed(2)}</strong>
              <p>Captured payment value</p>
            </div>
            <div>
              <strong>{outstanding.toFixed(2)}</strong>
              <p>Open outstanding balance</p>
            </div>
          </div>
        </article>

        <article className="card insight-card">
          <span className="eyebrow-label">Coverage</span>
          <h3>Operational footprint</h3>
          <ul className="insight-list">
            <li>{customers.length} customer profiles in active workspace</li>
            <li>
              {suppliers.length} supplier records ready for settlement
              processing
            </li>
            <li>
              {payments.length} payment transactions available for
              reconciliation
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
