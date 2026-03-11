const phases = [
  {
    phase: "Phase 1",
    title: "Core Accounting Foundation",
    status: "completed",
    color: "#10b981",
    quarter: "Q1 2026",
    items: [
      "NestJS 10 monorepo scaffold with 12 modules",
      "PostgreSQL schema design with double-entry ledger",
      "Authentication & role-based access control (RBAC)",
      "Booking, Invoice, Payment CRUD APIs",
      "Swagger documentation at /api/docs",
      "In-memory seed data for all entities",
    ],
  },
  {
    phase: "Phase 2",
    title: "Financial Reporting & Compliance",
    status: "completed",
    color: "#6366f1",
    quarter: "Q2 2026",
    items: [
      "AR/AP aging reports with overdue bucket analysis",
      "SST (Malaysia 6%) and GST (Australia 10%) tax reports",
      "Trial balance and ledger summary APIs",
      "Commission accrual reports grouped by supplier",
      "Profit & loss summary with gross margin calculation",
      "Multi-currency FX rate management",
    ],
  },
  {
    phase: "Phase 3",
    title: "Integrations & Automation",
    status: "in-progress",
    color: "#f59e0b",
    quarter: "Q3 2026",
    items: [
      "GDS connector (Amadeus, Sabre) live API integration",
      "Payment gateway webhooks (Stripe, PayWay, iPay88)",
      "Automated nightly reconciliation jobs",
      "Event-driven ledger posting via message queue",
      "Supplier statement auto-matching",
      "Currency gain/loss real-time calculation",
    ],
  },
  {
    phase: "Phase 4",
    title: "Advanced Analytics",
    status: "planned",
    color: "#0ea5e9",
    quarter: "Q4 2026",
    items: [
      "Interactive financial dashboards with chart.js",
      "Customizable report builder with date range filters",
      "Budget vs actual variance tracking",
      "Cash flow forecasting module",
      "Supplier performance scorecard",
      "Revenue per booking type analytics",
    ],
  },
  {
    phase: "Phase 5",
    title: "Enterprise Features",
    status: "planned",
    color: "#a855f7",
    quarter: "Q1 2027",
    items: [
      "Multi-entity / multi-branch support",
      "Audit trail and change-log for all financial records",
      "Approval workflows for invoices and payments",
      "ERP integration (SAP, Xero, QuickBooks)",
      "Data export: CSV, Excel, PDF statements",
      "Bank feed reconciliation via Open Banking APIs",
    ],
  },
  {
    phase: "Phase 6",
    title: "Scale & Security",
    status: "planned",
    color: "#ef4444",
    quarter: "Q2 2027",
    items: [
      "Kubernetes deployment with horizontal scaling",
      "Redis caching for reporting aggregations",
      "SOC 2 Type II compliance readiness",
      "Data residency controls (MY vs AU regions)",
      "PCI-DSS scoped payment data handling",
      "Penetration testing and security audit",
    ],
  },
];

const STATUS_LABELS: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  completed: { label: "✓ Completed", color: "#10b981", bg: "#10b98122" },
  "in-progress": { label: "⚡ In Progress", color: "#f59e0b", bg: "#f59e0b22" },
  planned: { label: "○ Planned", color: "#94a3b8", bg: "#94a3b822" },
};

export default function RoadmapPage() {
  return (
    <div className="page-container">
      <style>{`
        .rm-hero { text-align: center; margin-bottom: 48px; }
        .rm-hero h1 { font-size: 2.6rem; font-weight: 800; background: linear-gradient(135deg, #10b981, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 12px; }
        .rm-hero p { color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto; }
        .rm-legend { display: flex; justify-content: center; gap: 24px; margin-bottom: 48px; flex-wrap: wrap; }
        .rm-legend-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; }
        .rm-legend-dot { width: 10px; height: 10px; border-radius: 50%; }
        .rm-timeline { position: relative; max-width: 900px; margin: 0 auto; }
        .rm-timeline::before { content: ''; position: absolute; left: 50%; transform: translateX(-1px); top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, #10b981, #6366f1, #f59e0b, #0ea5e9, #a855f7, #ef4444); opacity: 0.3; }
        .rm-phase { display: flex; gap: 32px; margin-bottom: 40px; position: relative; align-items: flex-start; }
        .rm-phase-left { flex: 1; text-align: right; padding-right: 24px; }
        .rm-phase-right { flex: 1; padding-left: 24px; }
        .rm-phase-dot { position: absolute; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0; top: 12px; z-index: 1; border: 3px solid var(--bg); }
        .rm-phase:nth-child(odd) .rm-phase-left { order: 1; }
        .rm-phase:nth-child(odd) .rm-phase-right { order: 3; }
        .rm-phase:nth-child(even) .rm-phase-left { order: 3; text-align: left; padding-right: 0; padding-left: 24px; }
        .rm-phase:nth-child(even) .rm-phase-right { order: 1; padding-left: 0; padding-right: 24px; text-align: right; }
        .rm-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 20px 24px; }
        .rm-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
        .rm-phase-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.7; }
        .rm-title { font-size: 1.1rem; font-weight: 700; margin: 4px 0 8px; }
        .rm-status-badge { font-size: 0.72rem; font-weight: 600; padding: 3px 10px; border-radius: 8px; white-space: nowrap; }
        .rm-quarter { font-size: 0.78rem; color: var(--text-muted); margin-bottom: 12px; }
        .rm-items { list-style: none; padding: 0; margin: 0; }
        .rm-items li { font-size: 0.83rem; color: var(--text-muted); padding: 3px 0; display: flex; align-items: flex-start; gap: 8px; }
        .rm-items li::before { content: '·'; font-size: 1.2rem; flex-shrink: 0; line-height: 1.1; }
        .rm-summary { margin-top: 56px; background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 40px; text-align: center; }
        .rm-summary h2 { font-size: 1.6rem; font-weight: 700; margin-bottom: 12px; }
        .rm-summary p { color: var(--text-muted); max-width: 640px; margin: 0 auto; line-height: 1.7; }
        @media (max-width: 640px) {
          .rm-timeline::before { left: 12px; }
          .rm-phase { flex-direction: column; padding-left: 36px; }
          .rm-phase-dot { left: 2px; transform: none; }
          .rm-phase-left, .rm-phase-right { text-align: left !important; padding: 0 !important; order: unset !important; }
        }
      `}</style>

      <div className="rm-hero">
        <h1>Product Roadmap</h1>
        <p>
          Six-phase development plan from core accounting to enterprise-scale
          multi-entity financial management.
        </p>
      </div>

      <div className="rm-legend">
        {Object.entries(STATUS_LABELS).map(([k, v]) => (
          <div className="rm-legend-item" key={k}>
            <div className="rm-legend-dot" style={{ background: v.color }} />
            <span style={{ color: v.color }}>{v.label}</span>
          </div>
        ))}
      </div>

      <div className="rm-timeline">
        {phases.map((phase, i) => {
          const status = STATUS_LABELS[phase.status];
          const isEven = i % 2 === 1;
          const card = (
            <div
              className="rm-card"
              style={{ borderTop: `3px solid ${phase.color}` }}
            >
              <div className="rm-card-header">
                <span className="rm-phase-label" style={{ color: phase.color }}>
                  {phase.phase}
                </span>
                <span
                  className="rm-status-badge"
                  style={{ color: status.color, background: status.bg }}
                >
                  {status.label}
                </span>
              </div>
              <div className="rm-title">{phase.title}</div>
              <div className="rm-quarter">📅 {phase.quarter}</div>
              <ul className="rm-items">
                {phase.items.map((item, j) => (
                  <li
                    key={j}
                    style={
                      { "--dot-color": phase.color } as React.CSSProperties
                    }
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );

          return (
            <div className="rm-phase" key={phase.phase}>
              <div className={isEven ? "rm-phase-right" : "rm-phase-left"}>
                {!isEven && card}
              </div>
              <div
                className="rm-phase-dot"
                style={{ background: phase.color }}
              />
              <div className={isEven ? "rm-phase-left" : "rm-phase-right"}>
                {isEven && card}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rm-summary">
        <h2>18-Month Vision</h2>
        <p>
          Zedtrago's accounting platform is built to evolve from a functional
          travel-finance system into a fully auditable, multi-jurisdiction
          enterprise accounting solution — supporting Malaysia SST, Australia
          GST, and future expansion markets. Each phase delivers measurable
          business value while maintaining backward compatibility with the
          NestJS + PostgreSQL core.
        </p>
      </div>
    </div>
  );
}
