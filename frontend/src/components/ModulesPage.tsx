import React from "react";

interface Module {
  name: string;
  description: string;
  responsibilities: string[];
  color: string;
}

const ModulesPage: React.FC = () => {
  const modules: Module[] = [
    {
      name: "Auth Module",
      description: "JWT-based authentication and authorization",
      responsibilities: [
        "User login and token generation",
        "Token validation and refresh",
        "Role-based access control",
      ],
      color: "#3b82f6",
    },
    {
      name: "Customer Module",
      description: "B2B customer and agency management",
      responsibilities: [
        "Customer master data management",
        "Agency configuration",
        "Customer hierarchy and relationships",
      ],
      color: "#8b5cf6",
    },
    {
      name: "Booking Module",
      description: "Travel booking orchestration",
      responsibilities: [
        "Booking creation and management",
        "Supplier integration",
        "Booking status tracking",
      ],
      color: "#ec4899",
    },
    {
      name: "Invoice Module",
      description: "Invoice generation and accounts receivable",
      responsibilities: [
        "Invoice creation from bookings",
        "Invoice reconciliation",
        "Accounts receivable tracking",
      ],
      color: "#f59e0b",
    },
    {
      name: "Payment Module",
      description: "Payment gateway integration and processing",
      responsibilities: [
        "Payment collection",
        "Gateway webhook handling",
        "Payment reconciliation",
      ],
      color: "#10b981",
    },
    {
      name: "Commission Module",
      description: "Commission accrual and settlement",
      responsibilities: [
        "Commission calculation",
        "Commission accrual tracking",
        "Settlement batch processing",
      ],
      color: "#14b8a6",
    },
    {
      name: "Supplier Module",
      description: "Supplier and vendor management",
      responsibilities: [
        "Supplier master data",
        "Settlement configuration",
        "Supplier integration setup",
      ],
      color: "#06b6d4",
    },
    {
      name: "Ledger Module",
      description: "General ledger and journal posting",
      responsibilities: [
        "Journal entry creation",
        "Ledger posting rules",
        "Transaction balancing",
      ],
      color: "#0891b2",
    },
    {
      name: "Currency Module",
      description: "Multi-currency and FX management",
      responsibilities: [
        "FX rate management",
        "Currency conversion",
        "Gain/loss tracking",
      ],
      color: "#0d9488",
    },
    {
      name: "Reporting Module",
      description: "Financial dashboards and analytics",
      responsibilities: [
        "KPI dashboard generation",
        "Tax compliance reporting",
        "Financial analytics",
      ],
      color: "#059669",
    },
    {
      name: "Integration Module",
      description: "External system connectors",
      responsibilities: [
        "Webhook management",
        "API sync jobs",
        "Event deduplication",
      ],
      color: "#047857",
    },
    {
      name: "User Module",
      description: "User management and access control",
      responsibilities: [
        "User profile management",
        "Permission configuration",
        "Team management",
      ],
      color: "#065f46",
    },
  ];

  return (
    <div className="modules-container">
      <div className="page-header">
        <h2>System Modules</h2>
        <p>
          Comprehensive breakdown of 11+ specialized NestJS modules powering
          the accounting platform
        </p>
      </div>

      <div className="modules-grid">
        {modules.map((module) => (
          <div key={module.name} className="module-detail-card">
            <div
              className="module-header"
              style={{ borderTopColor: module.color }}
            >
              <span
                className="module-icon"
                style={{ backgroundColor: module.color }}
              />
              <div>
                <h3>{module.name}</h3>
                <p className="module-desc">{module.description}</p>
              </div>
            </div>
            <div className="module-body">
              <h4>Responsibilities</h4>
              <ul>
                {module.responsibilities.map((resp) => (
                  <li key={resp}>{resp}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .modules-container {
          padding: 30px 0;
        }

        .page-header {
          margin-bottom: 40px;
        }

        .page-header h2 {
          font-size: 2rem;
          margin: 0 0 8px;
          color: #0f1d2e;
        }

        .page-header p {
          color: #31455f;
          margin: 0;
          font-size: 1rem;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .module-detail-card {
          background: var(--surface-strong);
          border: 1px solid var(--border);
          border-top: 4px solid;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .module-detail-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 80px rgba(29, 51, 84, 0.15);
        }

        .module-header {
          padding: 20px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .module-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .module-header h3 {
          margin: 0 0 4px;
          font-size: 1.1rem;
          color: #0f1d2e;
        }

        .module-desc {
          margin: 0;
          font-size: 0.85rem;
          color: #5a6f84;
        }

        .module-body {
          padding: 0 20px 20px;
        }

        .module-body h4 {
          margin: 0 0 12px;
          font-size: 0.9rem;
          color: #0f1d2e;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .module-body ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .module-body li {
          padding: 6px 0;
          color: #31455f;
          font-size: 0.9rem;
          line-height: 1.5;
          position: relative;
          padding-left: 20px;
        }

        .module-body li::before {
          content: "▸";
          position: absolute;
          left: 0;
          color: #0b7285;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default ModulesPage;
