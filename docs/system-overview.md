# Zedtrago Accounting Platform

## Project Overview

This repository contains a technical solution proposal and implementation starter for a multi-service travel accounting platform. The solution is designed for a business that manages bookings, supplier settlements, customer invoicing, commission accruals, and multi-currency financial reporting across Malaysia and Australia.

The repository includes:

- A modular NestJS backend with Swagger documentation
- A React frontend that presents the proposal professionally
- Architecture, ER, and transaction workflow diagrams in Mermaid source format
- Documentation for system design, database strategy, integrations, and delivery roadmap

## System Architecture Summary

The architecture follows an API-first layered model:

1. React frontend for management dashboards, workflow visibility, and proposal presentation
2. NestJS backend for domain APIs, orchestration, validation, authentication, and accounting logic
3. PostgreSQL relational database for transactional integrity and reporting structures
4. Integration layer for payment gateways, booking suppliers, CRM tools, and GDS systems
5. Reporting projections for finance, compliance, and operational analytics

Key principles:

- Modular monolith first, service extraction later
- Event-driven transaction posting for real-time visibility
- Idempotent integration handling for payment and webhook safety
- Double-entry bookkeeping as the accounting backbone
- Multi-currency normalization for cross-market reporting

## Accounting Module Design

### General Ledger

The ledger module records balanced journal entries generated from operational events such as booking confirmation, invoice issuance, payment receipt, supplier accrual, and settlement. Each source event maps to a posting rule so the accounting behavior stays deterministic and auditable.

### Accounts Receivable

The receivable module is responsible for customer invoices, payment collection status, outstanding balances, and aging analysis. Invoices originate from confirmed bookings and are tied to the customer, booking, currency, tax profile, and due date.

### Accounts Payable

The payable model tracks supplier liabilities based on confirmed services, negotiated rates, and payout schedules. Settlement runs can batch liabilities by supplier, market, and settlement currency.

### Commission Management

The commission module stores rate definitions, accrual events, settlement status, and profitability impact by booking. This supports margin visibility and automated expense recognition.

### Multi-Currency Handling

Daily rate tables are used to convert booking, invoice, payment, and payable amounts to reporting currency. The design supports realized and unrealized FX gain/loss tracking and regional reporting requirements.

### Financial Reporting

Reporting consumes normalized transactional data and ledger postings to provide KPI dashboards, tax exports, receivable aging, payable aging, margin analysis, and compliance views for SST and GST.

## Database Design Strategy

The relational model centers around these core entities:

- users
- customers
- suppliers
- bookings
- invoices
- payments
- payables
- commissions
- accounts
- ledger_transactions
- ledger_entry_lines
- currency_rates

Normalization approach:

- Master data such as users, customers, suppliers, and accounts is stored separately from transaction tables
- Financial events are captured as immutable transactional records where possible
- Many-to-one relations link bookings to customers and suppliers, invoices to bookings, payments to invoices, and payables to suppliers and source bookings
- Ledger transactions hold posting headers while entry lines hold debit and credit rows

Transaction consistency:

- Booking creation and invoice generation should run in database transactions
- Ledger posting must be idempotent to avoid duplicate accounting entries
- Payment webhooks should be stored before processing to guarantee replay safety
- FX rate usage should capture the effective rate on each posting event for auditability

## API & Integration Strategy

### Payment Gateways

- Stripe: API keys for server-side actions, signed webhook validation, idempotency keys for retries
- PayPal: OAuth2 client credentials, webhook signature verification, event replay protection

### Booking Platforms and Suppliers

- Hotel suppliers and booking platforms can sync through polling or webhook-driven models
- GDS integrations may require session tokens, message signatures, and asynchronous reconciliation
- Supplier reservation references should be mapped to internal booking IDs for traceability

### CRM Platforms

- CRM integrations should use OAuth2 or scoped API keys depending on the provider
- Customer profile and booking status data can be pushed as domain events or synchronized in scheduled jobs

### Error Handling and Retry

- Integration failures should use exponential backoff and dead-letter queues
- All write operations should be idempotent using external correlation IDs
- Permanent failures should enter a reconciliation workflow for finance or operations review

## Recommended Technology Stack

### Backend

NestJS on Node.js is suitable because it provides modular architecture, strong TypeScript support, decorators for validation and documentation, and a clean structure for domain-driven APIs.

### Frontend

React is suitable because it allows fast development of management dashboards and proposal-style interfaces, and it integrates cleanly with API-first backend systems.

### Database

PostgreSQL is recommended because it offers strong transactional guarantees, mature indexing strategies, JSON support for integration payloads, and robust reporting capabilities.

### Infrastructure

AWS is a strong choice because it supports managed PostgreSQL, containerized deployments, queueing, event processing, object storage, and observability at scale.

Why this stack works:

- Scalability: horizontal API scaling and queue-based asynchronous integrations
- Performance: efficient relational storage with optimized query paths for accounting and reporting
- Security: JWT, OAuth2, secret management, audit logs, and network isolation
- Maintainability: strong TypeScript typing, modular backend, testable service boundaries
- Integration-heavy finance: webhooks, retries, message-driven processing, and reporting pipelines are well supported

## Development Roadmap

1. Requirement analysis, event discovery, accounting policy mapping, and architecture approval
2. Database schema design, ER modeling, tax dimensions, and posting rule definitions
3. Core ledger, invoice, receivable, and payable implementation
4. Booking, supplier, payment gateway, and commission integration rollout
5. Financial reporting, dashboards, compliance exports, and exception monitoring
6. Testing, deployment automation, observability, performance tuning, and go-live readiness

## Repository Notes

- Swagger documentation is configured for http://localhost:3000/api/docs
- The backend uses in-memory seed data so reviewers can inspect the API structure without needing a live PostgreSQL instance
- The database configuration file documents the intended PostgreSQL deployment setup for production implementation
