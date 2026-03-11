const entities = [
  {
    name: "users",
    label: "Users",
    color: "#6366f1",
    icon: "👤",
    fields: [
      { name: "id", type: "VARCHAR(20)", pk: true },
      { name: "fullName", type: "VARCHAR(120)", pk: false },
      { name: "email", type: "VARCHAR(120)", pk: false },
      { name: "role", type: "VARCHAR(40)", pk: false },
      { name: "status", type: "VARCHAR(20)", pk: false },
      { name: "region", type: "CHAR(2)", pk: false },
    ],
  },
  {
    name: "customers",
    label: "Customers",
    color: "#0ea5e9",
    icon: "🏢",
    fields: [
      { name: "id", type: "VARCHAR(20)", pk: true },
      { name: "company", type: "VARCHAR(120)", pk: false },
      { name: "contactEmail", type: "VARCHAR(120)", pk: false },
      { name: "country", type: "CHAR(2)", pk: false },
      { name: "creditLimit", type: "NUMERIC(12,2)", pk: false },
      { name: "currency", type: "CHAR(3)", pk: false },
    ],
  },
  {
    name: "suppliers",
    label: "Suppliers",
    color: "#10b981",
    icon: "🔌",
    fields: [
      { name: "id", type: "VARCHAR(20)", pk: true },
      { name: "supplierName", type: "VARCHAR(120)", pk: false },
      { name: "supplierType", type: "VARCHAR(40)", pk: false },
      { name: "settlementCurrency", type: "CHAR(3)", pk: false },
      { name: "integrationMode", type: "VARCHAR(20)", pk: false },
    ],
  },
  {
    name: "bookings",
    label: "Bookings",
    color: "#f59e0b",
    icon: "✈️",
    fields: [
      { name: "id", type: "VARCHAR(20)", pk: true },
      {
        name: "customerId",
        type: "VARCHAR(20)",
        pk: false,
        fk: "customers.id",
      },
      {
        name: "supplierId",
        type: "VARCHAR(20)",
        pk: false,
        fk: "suppliers.id",
      },
      { name: "bookingType", type: "VARCHAR(40)", pk: false },
      { name: "status", type: "VARCHAR(20)", pk: false },
      { name: "grossAmount", type: "NUMERIC(12,2)", pk: false },
      { name: "netAmount", type: "NUMERIC(12,2)", pk: false },
      { name: "bookingCurrency", type: "CHAR(3)", pk: false },
      { name: "travelDate", type: "TIMESTAMPTZ", pk: false },
    ],
  },
  {
    name: "invoices",
    label: "Invoices",
    color: "#ef4444",
    icon: "🧾",
    fields: [
      { name: "id", type: "VARCHAR(20)", pk: true },
      { name: "bookingId", type: "VARCHAR(20)", pk: false, fk: "bookings.id" },
      { name: "invoiceNumber", type: "VARCHAR(30)", pk: false },
      { name: "status", type: "VARCHAR(20)", pk: false },
      { name: "totalAmount", type: "NUMERIC(12,2)", pk: false },
      { name: "currency", type: "CHAR(3)", pk: false },
      { name: "dueDate", type: "DATE", pk: false },
    ],
  },
  {
    name: "payments",
    label: "Payments",
    color: "#8b5cf6",
    icon: "💳",
    fields: [
      { name: "id", type: "VARCHAR(20)", pk: true },
      { name: "invoiceId", type: "VARCHAR(20)", pk: false, fk: "invoices.id" },
      { name: "amount", type: "NUMERIC(12,2)", pk: false },
      { name: "currency", type: "CHAR(3)", pk: false },
      { name: "gateway", type: "VARCHAR(40)", pk: false },
      { name: "status", type: "VARCHAR(20)", pk: false },
      { name: "paidAt", type: "TIMESTAMPTZ", pk: false },
    ],
  },
  {
    name: "commissions",
    label: "Commissions",
    color: "#ec4899",
    icon: "💰",
    fields: [
      { name: "id", type: "VARCHAR(20)", pk: true },
      { name: "bookingId", type: "VARCHAR(20)", pk: false, fk: "bookings.id" },
      { name: "amount", type: "NUMERIC(10,2)", pk: false },
      { name: "rate", type: "NUMERIC(5,2)", pk: false },
      { name: "status", type: "VARCHAR(20)", pk: false },
    ],
  },
  {
    name: "ledger_transactions",
    label: "Ledger Transactions",
    color: "#14b8a6",
    icon: "📒",
    fields: [
      { name: "id", type: "VARCHAR(20)", pk: true },
      { name: "sourceEvent", type: "VARCHAR(60)", pk: false },
      { name: "referenceId", type: "VARCHAR(20)", pk: false },
      { name: "currency", type: "CHAR(3)", pk: false },
      { name: "postedAt", type: "TIMESTAMPTZ", pk: false },
    ],
  },
  {
    name: "ledger_entry_lines",
    label: "Ledger Entry Lines",
    color: "#06b6d4",
    icon: "📝",
    fields: [
      { name: "id", type: "BIGSERIAL", pk: true },
      {
        name: "transactionId",
        type: "VARCHAR(20)",
        pk: false,
        fk: "ledger_transactions.id",
      },
      {
        name: "accountCode",
        type: "VARCHAR(10)",
        pk: false,
        fk: "accounts.code",
      },
      { name: "debit", type: "NUMERIC(12,2)", pk: false },
      { name: "credit", type: "NUMERIC(12,2)", pk: false },
      { name: "description", type: "TEXT", pk: false },
    ],
  },
  {
    name: "accounts",
    label: "Chart of Accounts",
    color: "#84cc16",
    icon: "🏦",
    fields: [
      { name: "id", type: "VARCHAR(20)", pk: true },
      { name: "code", type: "VARCHAR(10)", pk: false },
      { name: "name", type: "VARCHAR(80)", pk: false },
      { name: "type", type: "VARCHAR(20)", pk: false },
      { name: "baseCurrency", type: "CHAR(3)", pk: false },
    ],
  },
  {
    name: "currency_rates",
    label: "Currency Rates",
    color: "#f97316",
    icon: "💱",
    fields: [
      { name: "id", type: "BIGSERIAL", pk: true },
      { name: "fromCurrency", type: "CHAR(3)", pk: false },
      { name: "toCurrency", type: "CHAR(3)", pk: false },
      { name: "rate", type: "NUMERIC(10,6)", pk: false },
      { name: "rateDate", type: "DATE", pk: false },
    ],
  },
];

export default function DatabasePage() {
  return (
    <div className="page-container">
      <style>{`
        .db-hero { text-align: center; margin-bottom: 48px; }
        .db-hero h1 { font-size: 2.6rem; font-weight: 800; background: linear-gradient(135deg, #6366f1, #0ea5e9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 12px; }
        .db-hero p { color: var(--text-muted); font-size: 1.1rem; max-width: 640px; margin: 0 auto; }
        .db-stats { display: flex; justify-content: center; gap: 32px; margin-bottom: 48px; flex-wrap: wrap; }
        .db-stat { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 24px 32px; text-align: center; }
        .db-stat-value { font-size: 2.2rem; font-weight: 800; background: linear-gradient(135deg, #6366f1, #0ea5e9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .db-stat-label { color: var(--text-muted); font-size: 0.85rem; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
        .db-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
        .entity-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
        .entity-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .entity-header { padding: 16px 20px; display: flex; align-items: center; gap: 12px; }
        .entity-icon { font-size: 1.4rem; }
        .entity-name { font-weight: 700; font-size: 1.05rem; }
        .entity-table-name { font-size: 0.75rem; opacity: 0.7; font-family: 'Courier New', monospace; }
        .entity-fields { padding: 0 0 12px; }
        .field-row { display: flex; align-items: center; gap: 8px; padding: 6px 20px; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .field-row:last-child { border-bottom: none; }
        .field-pk { background: #f59e0b22; color: #f59e0b; font-size: 0.6rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; flex-shrink: 0; }
        .field-fk { background: #0ea5e922; color: #0ea5e9; font-size: 0.6rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; flex-shrink: 0; }
        .field-name { font-family: 'Courier New', monospace; font-size: 0.82rem; flex: 1; }
        .field-type { font-size: 0.72rem; color: var(--text-muted); font-family: 'Courier New', monospace; }
        .relationships-section { margin-top: 48px; }
        .relationships-section h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 24px; }
        .rel-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
        .rel-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 16px 20px; display: flex; align-items: center; gap: 12px; }
        .rel-from { font-family: monospace; font-size: 0.82rem; color: #f59e0b; font-weight: 600; }
        .rel-arrow { color: var(--text-muted); font-size: 1.2rem; }
        .rel-to { font-family: monospace; font-size: 0.82rem; color: #0ea5e9; font-weight: 600; }
        .rel-type { margin-left: auto; font-size: 0.7rem; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; }
      `}</style>

      <div className="db-hero">
        <h1>Database Design</h1>
        <p>
          PostgreSQL relational schema for the Zedtrago multi-currency travel
          accounting platform. All tables follow double-entry bookkeeping
          principles.
        </p>
      </div>

      <div className="db-stats">
        <div className="db-stat">
          <div className="db-stat-value">11</div>
          <div className="db-stat-label">Tables</div>
        </div>
        <div className="db-stat">
          <div className="db-stat-value">52</div>
          <div className="db-stat-label">Columns</div>
        </div>
        <div className="db-stat">
          <div className="db-stat-value">9</div>
          <div className="db-stat-label">Foreign Keys</div>
        </div>
        <div className="db-stat">
          <div className="db-stat-value">3</div>
          <div className="db-stat-label">Jurisdictions</div>
        </div>
      </div>

      <div className="db-grid">
        {entities.map((entity) => (
          <div className="entity-card" key={entity.name}>
            <div
              className="entity-header"
              style={{
                borderBottom: `2px solid ${entity.color}33`,
                background: `${entity.color}11`,
              }}
            >
              <span className="entity-icon">{entity.icon}</span>
              <div>
                <div className="entity-name" style={{ color: entity.color }}>
                  {entity.label}
                </div>
                <div className="entity-table-name">{entity.name}</div>
              </div>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                }}
              >
                {entity.fields.length} cols
              </span>
            </div>
            <div className="entity-fields">
              {entity.fields.map((field) => (
                <div className="field-row" key={field.name}>
                  {field.pk && <span className="field-pk">PK</span>}
                  {(field as any).fk && <span className="field-fk">FK</span>}
                  {!field.pk && !(field as any).fk && (
                    <span style={{ width: 26 }} />
                  )}
                  <span className="field-name">{field.name}</span>
                  <span className="field-type">{field.type}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relationships-section">
        <h2>Entity Relationships</h2>
        <div className="rel-grid">
          {[
            {
              from: "bookings.customerId",
              to: "customers.id",
              type: "Many→One",
            },
            {
              from: "bookings.supplierId",
              to: "suppliers.id",
              type: "Many→One",
            },
            { from: "invoices.bookingId", to: "bookings.id", type: "Many→One" },
            { from: "payments.invoiceId", to: "invoices.id", type: "Many→One" },
            {
              from: "commissions.bookingId",
              to: "bookings.id",
              type: "Many→One",
            },
            {
              from: "ledger_entry_lines.transactionId",
              to: "ledger_transactions.id",
              type: "Many→One",
            },
            {
              from: "ledger_entry_lines.accountCode",
              to: "accounts.code",
              type: "Many→One",
            },
          ].map((rel, i) => (
            <div className="rel-card" key={i}>
              <span className="rel-from">{rel.from}</span>
              <span className="rel-arrow">→</span>
              <span className="rel-to">{rel.to}</span>
              <span className="rel-type">{rel.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
