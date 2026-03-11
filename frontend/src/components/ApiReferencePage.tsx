const API_MODULES = [
  {
    tag: "Auth",
    color: "#f59e0b",
    icon: "🔐",
    description: "Authentication and session management",
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/login",
        summary: "Obtain a bearer token",
        auth: false,
        body: `{ "email": "finance@zedtrago.com", "password": "Passw0rd!" }`,
        response: `{ "accessToken": "...", "user": { "id": "usr-001", "role": "finance_manager" } }`,
      },
      {
        method: "GET",
        path: "/api/auth/me",
        summary: "Get current authenticated user",
        auth: true,
        response: `{ "id": "usr-001", "fullName": "Aina Rahman", "role": "finance_manager" }`,
      },
    ],
  },
  {
    tag: "Users",
    color: "#6366f1",
    icon: "👤",
    description: "Platform user management",
    endpoints: [
      {
        method: "GET",
        path: "/api/users",
        summary: "List all platform users",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/users/:id",
        summary: "Get user by ID",
        auth: true,
      },
      {
        method: "PATCH",
        path: "/api/users/:id",
        summary: "Update user role or profile",
        auth: true,
      },
    ],
  },
  {
    tag: "Customers",
    color: "#0ea5e9",
    icon: "🏢",
    description: "B2B travel agency and customer management",
    endpoints: [
      {
        method: "GET",
        path: "/api/customers",
        summary: "List all customers",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/customers/:id",
        summary: "Get customer by ID",
        auth: true,
      },
      {
        method: "POST",
        path: "/api/customers",
        summary: "Register a new customer",
        auth: true,
      },
      {
        method: "PATCH",
        path: "/api/customers/:id",
        summary: "Update customer profile",
        auth: true,
      },
      {
        method: "DELETE",
        path: "/api/customers/:id",
        summary: "Remove a customer",
        auth: true,
      },
    ],
  },
  {
    tag: "Bookings",
    color: "#f59e0b",
    icon: "✈️",
    description: "Travel booking lifecycle and financial attributes",
    endpoints: [
      {
        method: "GET",
        path: "/api/bookings",
        summary: "List all bookings",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/bookings/:id",
        summary: "Get booking by ID",
        auth: true,
      },
      {
        method: "POST",
        path: "/api/bookings",
        summary: "Create booking + trigger accounting workflows",
        auth: true,
      },
      {
        method: "PATCH",
        path: "/api/bookings/:id",
        summary: "Update booking status or amounts",
        auth: true,
      },
      {
        method: "DELETE",
        path: "/api/bookings/:id",
        summary: "Cancel a booking",
        auth: true,
      },
    ],
  },
  {
    tag: "Invoices",
    color: "#ef4444",
    icon: "🧾",
    description: "Accounts receivable invoice generation",
    endpoints: [
      {
        method: "GET",
        path: "/api/invoices",
        summary: "List all invoices",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/invoices/:id",
        summary: "Get invoice by ID",
        auth: true,
      },
      {
        method: "POST",
        path: "/api/invoices",
        summary: "Generate receivable invoice",
        auth: true,
      },
      {
        method: "PATCH",
        path: "/api/invoices/:id",
        summary: "Update invoice status",
        auth: true,
      },
      {
        method: "DELETE",
        path: "/api/invoices/:id",
        summary: "Void an invoice",
        auth: true,
      },
    ],
  },
  {
    tag: "Payments",
    color: "#8b5cf6",
    icon: "💳",
    description: "Payment receipts and gateway settlement events",
    endpoints: [
      {
        method: "GET",
        path: "/api/payments",
        summary: "List all payments",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/payments/:id",
        summary: "Get payment by ID",
        auth: true,
      },
      {
        method: "POST",
        path: "/api/payments",
        summary: "Record a payment event",
        auth: true,
      },
      {
        method: "PATCH",
        path: "/api/payments/:id",
        summary: "Update payment status",
        auth: true,
      },
      {
        method: "DELETE",
        path: "/api/payments/:id",
        summary: "Remove a payment record",
        auth: true,
      },
    ],
  },
  {
    tag: "Commissions",
    color: "#ec4899",
    icon: "💰",
    description: "Supplier commission accruals and settlements",
    endpoints: [
      {
        method: "GET",
        path: "/api/commissions",
        summary: "List all commission records",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/commissions/:id",
        summary: "Get commission by ID",
        auth: true,
      },
      {
        method: "POST",
        path: "/api/commissions",
        summary: "Create commission accrual",
        auth: true,
      },
      {
        method: "PATCH",
        path: "/api/commissions/:id",
        summary: "Update commission status",
        auth: true,
      },
      {
        method: "DELETE",
        path: "/api/commissions/:id",
        summary: "Remove commission record",
        auth: true,
      },
    ],
  },
  {
    tag: "Suppliers",
    color: "#10b981",
    icon: "🔌",
    description: "Supplier and GDS integration profiles",
    endpoints: [
      {
        method: "GET",
        path: "/api/suppliers",
        summary: "List all suppliers",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/suppliers/:id",
        summary: "Get supplier by ID",
        auth: true,
      },
      {
        method: "POST",
        path: "/api/suppliers",
        summary: "Register a supplier",
        auth: true,
      },
      {
        method: "PATCH",
        path: "/api/suppliers/:id",
        summary: "Update supplier profile",
        auth: true,
      },
      {
        method: "DELETE",
        path: "/api/suppliers/:id",
        summary: "Remove a supplier",
        auth: true,
      },
    ],
  },
  {
    tag: "Ledger",
    color: "#14b8a6",
    icon: "📒",
    description: "Double-entry general ledger",
    endpoints: [
      {
        method: "GET",
        path: "/api/ledger/transactions",
        summary: "List all ledger transactions",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/ledger/transactions/:id",
        summary: "Get ledger transaction by ID",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/ledger/trial-balance",
        summary: "Get current trial balance",
        auth: true,
      },
      {
        method: "POST",
        path: "/api/ledger/transactions",
        summary: "Post a balanced ledger entry",
        auth: true,
      },
    ],
  },
  {
    tag: "Reporting",
    color: "#a855f7",
    icon: "📊",
    description: "Financial reports, tax compliance, and analytics",
    endpoints: [
      {
        method: "GET",
        path: "/api/reporting/dashboard",
        summary: "Finance KPI dashboard",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/reporting/ar-aging",
        summary: "Accounts receivable aging buckets",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/reporting/ap-aging",
        summary: "Accounts payable aging buckets",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/reporting/tax",
        summary: "SST/GST tax compliance export",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/reporting/ledger-summary",
        summary: "Trial balance / ledger summary",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/reporting/commissions",
        summary: "Commission accrual report",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/reporting/pl-summary",
        summary: "Profit & loss summary",
        auth: true,
      },
    ],
  },
  {
    tag: "Currency",
    color: "#f97316",
    icon: "💱",
    description: "Multi-currency FX rate management",
    endpoints: [
      {
        method: "GET",
        path: "/api/currency-rates",
        summary: "List all FX rates",
        auth: true,
      },
      {
        method: "GET",
        path: "/api/currency-rates/:key",
        summary: "Get FX rate by pair (e.g. AUD-MYR)",
        auth: true,
      },
      {
        method: "POST",
        path: "/api/currency-rates",
        summary: "Record a new daily FX rate",
        auth: true,
      },
      {
        method: "PATCH",
        path: "/api/currency-rates/:key",
        summary: "Update an FX rate",
        auth: true,
      },
      {
        method: "DELETE",
        path: "/api/currency-rates/:key",
        summary: "Remove an FX rate",
        auth: true,
      },
    ],
  },
  {
    tag: "Integrations",
    color: "#64748b",
    icon: "🔗",
    description: "External system and GDS integration management",
    endpoints: [
      {
        method: "GET",
        path: "/api/integrations/connectors",
        summary: "List integration connectors",
        auth: true,
      },
      {
        method: "POST",
        path: "/api/integrations/sync-jobs",
        summary: "Queue an integration sync job",
        auth: true,
      },
    ],
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "#10b981",
  POST: "#6366f1",
  PATCH: "#f59e0b",
  DELETE: "#ef4444",
  PUT: "#0ea5e9",
};

export default function ApiReferencePage() {
  return (
    <div className="page-container">
      <style>{`
        .api-hero { text-align: center; margin-bottom: 48px; }
        .api-hero h1 { font-size: 2.6rem; font-weight: 800; background: linear-gradient(135deg, #a855f7, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 12px; }
        .api-hero p { color: var(--text-muted); font-size: 1.1rem; max-width: 640px; margin: 0 auto 24px; }
        .api-swagger-link { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #6366f1, #a855f7); color: white; text-decoration: none; padding: 12px 28px; border-radius: 12px; font-weight: 600; font-size: 0.95rem; transition: opacity 0.2s; }
        .api-swagger-link:hover { opacity: 0.85; }
        .api-stats { display: flex; justify-content: center; gap: 32px; margin-bottom: 48px; flex-wrap: wrap; }
        .api-stat { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 20px 28px; text-align: center; }
        .api-stat-value { font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, #a855f7, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .api-stat-label { color: var(--text-muted); font-size: 0.82rem; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
        .module-section { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; margin-bottom: 24px; overflow: hidden; }
        .module-header { padding: 18px 24px; display: flex; align-items: center; gap: 14px; }
        .module-icon { font-size: 1.4rem; }
        .module-tag { font-size: 1.05rem; font-weight: 700; }
        .module-desc { font-size: 0.85rem; color: var(--text-muted); }
        .module-count { margin-left: auto; background: rgba(255,255,255,0.07); border-radius: 8px; padding: 4px 12px; font-size: 0.8rem; color: var(--text-muted); }
        .endpoint-list { border-top: 1px solid var(--border); }
        .endpoint-row { display: flex; align-items: center; gap: 16px; padding: 12px 24px; border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; }
        .endpoint-row:last-child { border-bottom: none; }
        .endpoint-row:hover { background: rgba(255,255,255,0.03); }
        .method-badge { font-size: 0.7rem; font-weight: 700; padding: 3px 9px; border-radius: 6px; width: 56px; text-align: center; flex-shrink: 0; font-family: monospace; }
        .endpoint-path { font-family: 'Courier New', monospace; font-size: 0.85rem; flex: 1; }
        .endpoint-summary { font-size: 0.82rem; color: var(--text-muted); }
        .auth-badge { background: rgba(245,158,11,0.1); color: #f59e0b; font-size: 0.65rem; padding: 2px 7px; border-radius: 5px; font-weight: 600; flex-shrink: 0; }
        .example-block { background: rgba(0,0,0,0.3); border-radius: 8px; margin: 0 24px 12px; padding: 12px 16px; font-family: monospace; font-size: 0.75rem; color: #a3e635; overflow-x: auto; }
      `}</style>

      <div className="api-hero">
        <h1>API Reference</h1>
        <p>
          Complete REST API surface for the Zedtrago Accounting Platform. All
          endpoints follow REST conventions with JSON request/response bodies.
        </p>
        <a
          className="api-swagger-link"
          href="http://localhost:3000/api/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          📘 Open Interactive Swagger UI →
        </a>
      </div>

      <div className="api-stats">
        <div className="api-stat">
          <div className="api-stat-value">12</div>
          <div className="api-stat-label">Modules</div>
        </div>
        <div className="api-stat">
          <div className="api-stat-value">
            {API_MODULES.reduce((s, m) => s + m.endpoints.length, 0)}
          </div>
          <div className="api-stat-label">Endpoints</div>
        </div>
        <div className="api-stat">
          <div className="api-stat-value">JWT</div>
          <div className="api-stat-label">Auth Mode</div>
        </div>
        <div className="api-stat">
          <div className="api-stat-value">REST</div>
          <div className="api-stat-label">Protocol</div>
        </div>
      </div>

      {API_MODULES.map((mod) => (
        <div
          className="module-section"
          key={mod.tag}
          style={{ borderTop: `3px solid ${mod.color}` }}
        >
          <div className="module-header">
            <span className="module-icon">{mod.icon}</span>
            <div>
              <div className="module-tag" style={{ color: mod.color }}>
                {mod.tag}
              </div>
              <div className="module-desc">{mod.description}</div>
            </div>
            <span className="module-count">
              {mod.endpoints.length} endpoints
            </span>
          </div>
          <div className="endpoint-list">
            {mod.endpoints.map((ep, i) => (
              <div className="endpoint-row" key={i}>
                <span
                  className="method-badge"
                  style={{
                    background: `${METHOD_COLORS[ep.method]}22`,
                    color: METHOD_COLORS[ep.method],
                  }}
                >
                  {ep.method}
                </span>
                <span className="endpoint-path">{ep.path}</span>
                <span className="endpoint-summary">{ep.summary}</span>
                {ep.auth && <span className="auth-badge">🔒 Auth</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
