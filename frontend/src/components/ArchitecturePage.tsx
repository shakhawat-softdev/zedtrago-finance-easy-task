import React from "react";

interface ArchitectureLayer {
  name: string;
  components: string[];
  description: string;
}

const ArchitecturePage: React.FC = () => {
  const layers: ArchitectureLayer[] = [
    {
      name: "Presentation Layer",
      components: ["React SPA", "Dashboard UI", "Form Components", "Charts"],
      description:
        "User-facing React application with responsive design, real-time data binding, and professional dashboards for financial visibility.",
    },
    {
      name: "API Layer",
      components: [
        "NestJS REST APIs",
        "Swagger Documentation",
        "JWT Authentication",
        "Request Validation",
      ],
      description:
        "11+ modular NestJS services providing RESTful endpoints for all business operations with automatic Swagger documentation and centralized auth.",
    },
    {
      name: "Business Logic Layer",
      components: [
        "Domain Services",
        "Validation Rules",
        "Posting Engines",
        "Event Processors",
      ],
      description:
        "Core accounting logic including journal posting rules, commission calculations, tax compliance, and event-driven workflow orchestration.",
    },
    {
      name: "Data Access Layer",
      components: [
        "ORM/Repositories",
        "Query Builders",
        "Transactions",
        "Caching",
      ],
      description:
        "TypeORM-based data access with repository pattern, transactional integrity, and query optimization for high-volume operations.",
    },
    {
      name: "Database Layer",
      components: [
        "PostgreSQL",
        "Master Tables",
        "Transactional Tables",
        "Audit Logs",
      ],
      description:
        "Normalized relational schema supporting multi-currency, multi-market operations with comprehensive audit trails and referential integrity.",
    },
    {
      name: "Integration Layer",
      components: ["Webhook Handlers", "Sync Jobs", "Retry Queue", "Event Bus"],
      description:
        "Secure connectors for Stripe, PayPal, supplier systems, and GDS with resilient async processing and idempotent deduplication.",
    },
  ];

  return (
    <div className="architecture-container">
      <div className="page-header">
        <h2>System Architecture</h2>
        <p>
          Layered, modular architecture optimized for scalability, integration,
          and real-time accounting visibility
        </p>
      </div>

      <div className="architecture-layers">
        {layers.map((layer, index) => (
          <div
            key={layer.name}
            className={`layer-card ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="layer-number">{layers.length - index}</div>
            <div className="layer-content">
              <h3>{layer.name}</h3>
              <p className="layer-description">{layer.description}</p>
              <div className="layer-components">
                {layer.components.map((comp) => (
                  <span key={comp} className="component-tag">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="integration-section">
        <h3>External Integrations</h3>
        <div className="integration-grid">
          <div className="integration-item">
            <div className="integration-icon">💳</div>
            <h4>Payment Gateways</h4>
            <p>Stripe, PayPal webhook integration with idempotent processing</p>
          </div>
          <div className="integration-item">
            <div className="integration-icon">✈️</div>
            <h4>GDS Systems</h4>
            <p>Amadeus, Sabre supplier data sync with reconciliation</p>
          </div>
          <div className="integration-item">
            <div className="integration-icon">🏨</div>
            <h4>Hotel Suppliers</h4>
            <p>Hotel API integration for booking confirmation and pricing</p>
          </div>
          <div className="integration-item">
            <div className="integration-icon">📊</div>
            <h4>CRM Platforms</h4>
            <p>Salesforce, Zoho sync for customer intelligence</p>
          </div>
        </div>
      </section>

      <style>{`
        .architecture-container {
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

        .architecture-layers {
          margin-bottom: 50px;
        }

        .layer-card {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 24px;
          align-items: start;
          margin-bottom: 30px;
          background: var(--surface-strong);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 28px;
          box-shadow: var(--shadow);
          transition: all 0.3s;
        }

        .layer-card:hover {
          transform: translateY(-4px);
          border-color: #0b7285;
        }

        .layer-number {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: linear-gradient(135deg, #0b7285, #195b73);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: bold;
          flex-shrink: 0;
        }

        .layer-content h3 {
          margin: 0 0 12px;
          font-size: 1.3rem;
          color: #0f1d2e;
        }

        .layer-description {
          color: #31455f;
          margin: 0 0 16px;
          line-height: 1.6;
        }

        .layer-components {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .component-tag {
          padding: 6px 12px;
          border-radius: 999px;
          background: #e6f4f1;
          color: #114b5f;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .integration-section {
          background: linear-gradient(
            135deg,
            rgba(11, 114, 133, 0.05),
            rgba(239, 131, 84, 0.05)
          );
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px;
        }

        .integration-section h3 {
          margin: 0 0 30px;
          font-size: 1.5rem;
          color: #0f1d2e;
        }

        .integration-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .integration-item {
          background: var(--surface-strong);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          transition: transform 0.2s;
        }

        .integration-item:hover {
          transform: translateY(-4px);
        }

        .integration-icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 12px;
        }

        .integration-item h4 {
          margin: 0 0 8px;
          color: #0f1d2e;
        }

        .integration-item p {
          margin: 0;
          color: #31455f;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

export default ArchitecturePage;
