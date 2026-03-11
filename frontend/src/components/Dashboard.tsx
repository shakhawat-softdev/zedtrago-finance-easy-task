import React, { useState } from "react";

interface Transaction {
  id: string;
  type: "booking" | "payment" | "invoice";
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  date: string;
}

interface KPI {
  label: string;
  value: string;
  change: number;
  icon: string;
}

const Dashboard: React.FC = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: "BOOK-001",
      type: "booking",
      amount: 2500,
      currency: "AUD",
      status: "completed",
      date: "2026-03-11",
    },
    {
      id: "PAY-001",
      type: "payment",
      amount: 1800,
      currency: "USD",
      status: "completed",
      date: "2026-03-10",
    },
    {
      id: "INV-001",
      type: "invoice",
      amount: 3200,
      currency: "MYR",
      status: "pending",
      date: "2026-03-09",
    },
  ]);

  const kpis: KPI[] = [
    {
      label: "Total Bookings",
      value: "1,240",
      change: 12.5,
      icon: "📊",
    },
    {
      label: "Revenue (AUD)",
      value: "$89,450",
      change: 8.2,
      icon: "💰",
    },
    {
      label: "Pending Payments",
      value: "$12,680",
      change: -3.5,
      icon: "⏳",
    },
    {
      label: "Commission Due",
      value: "$4,290",
      change: 5.1,
      icon: "📈",
    },
  ];

  const getStatusColor = (
    status: string,
  ): string => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "failed":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Financial Dashboard</h2>
        <p>Real-time accounting visibility across bookings, payments, and ledger</p>
      </div>

      <section className="kpi-grid">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="kpi-card">
            <div className="kpi-icon">{kpi.icon}</div>
            <div className="kpi-content">
              <div className="kpi-label">{kpi.label}</div>
              <div className="kpi-value">{kpi.value}</div>
              <div
                className={`kpi-change ${kpi.change >= 0 ? "positive" : "negative"}`}
              >
                {kpi.change >= 0 ? "↑" : "↓"} {Math.abs(kpi.change)}%
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="transactions-section">
        <div className="section-title">
          <h3>Recent Transactions</h3>
          <a href="#" className="view-all">
            View All →
          </a>
        </div>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="tx-id">{tx.id}</td>
                <td>
                  <span className={`badge badge-${tx.type}`}>{tx.type}</span>
                </td>
                <td className="amount">
                  {tx.currency} {tx.amount.toLocaleString()}
                </td>
                <td>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(tx.status) }}
                  >
                    {tx.status}
                  </span>
                </td>
                <td>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="insights-grid">
        <div className="insight-card">
          <h4>System Health</h4>
          <div className="health-indicator">
            <div className="health-status healthy">✓</div>
            <div>All modules operational</div>
          </div>
        </div>
        <div className="insight-card">
          <h4>Compliance Status</h4>
          <div className="compliance-badges">
            <span className="badge-pill">SST Ready</span>
            <span className="badge-pill">GST Ready</span>
          </div>
        </div>
      </section>

      <style>{`
        .dashboard-container {
          padding: 30px 0;
        }

        .dashboard-header {
          margin-bottom: 30px;
        }

        .dashboard-header h2 {
          font-size: 2rem;
          margin: 0 0 8px;
          color: #0f1d2e;
        }

        .dashboard-header p {
          color: #31455f;
          margin: 0;
          font-size: 1rem;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .kpi-card {
          background: var(--surface-strong);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          gap: 16px;
          box-shadow: var(--shadow);
        }

        .kpi-icon {
          font-size: 2.5rem;
          line-height: 1;
        }

        .kpi-content {
          flex: 1;
        }

        .kpi-label {
          font-size: 0.85rem;
          color: #31455f;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .kpi-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f1d2e;
          margin: 6px 0;
        }

        .kpi-change {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .kpi-change.positive {
          color: #10b981;
        }

        .kpi-change.negative {
          color: #ef4444;
        }

        .transactions-section {
          background: var(--surface-strong);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 30px;
          box-shadow: var(--shadow);
        }

        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-title h3 {
          margin: 0;
          font-size: 1.3rem;
          color: #0f1d2e;
        }

        .view-all {
          color: #0b7285;
          font-weight: 600;
          text-decoration: none;
        }

        .transactions-table {
          width: 100%;
          border-collapse: collapse;
        }

        .transactions-table th {
          text-align: left;
          padding: 12px 0;
          border-bottom: 2px solid var(--border);
          font-weight: 600;
          color: #114b5f;
          font-size: 0.85rem;
          text-transform: uppercase;
        }

        .transactions-table td {
          padding: 16px 0;
          border-bottom: 1px solid var(--border);
          color: #31455f;
        }

        .tx-id {
          font-weight: 600;
          color: #0f1d2e;
        }

        .amount {
          font-weight: 600;
        }

        .badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .badge-booking {
          background-color: rgba(59, 130, 246, 0.1);
          color: #1e40af;
        }

        .badge-payment {
          background-color: rgba(34, 197, 94, 0.1);
          color: #15803d;
        }

        .badge-invoice {
          background-color: rgba(245, 158, 11, 0.1);
          color: #b45309;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .insight-card {
          background: var(--surface-strong);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 20px;
          box-shadow: var(--shadow);
        }

        .insight-card h4 {
          margin: 0 0 16px;
          color: #0f1d2e;
        }

        .health-indicator {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #31455f;
        }

        .health-status {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .health-status.healthy {
          background-color: #dcfce7;
          color: #166534;
        }

        .compliance-badges {
          display: flex;
          gap: 10px;
        }

        .badge-pill {
          padding: 8px 14px;
          border-radius: 999px;
          background-color: #e6f4f1;
          color: #114b5f;
          font-size: 0.85rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
