# Zedtrago Accounting Platform Assignment

This repository contains a complete technical assignment submission for an accounting software implementation strategy for a multi-service travel business. It includes a modular NestJS backend, a React frontend, and documentation covering architecture, database design, workflow, integrations, and implementation roadmap.

## Repository Structure

```text
.
├── backend
├── frontend
├── docs
└── README.md
```

## Project Overview

The proposed platform is designed to support:

- booking-driven accounting flows
- real-time transaction visibility
- automated ledger postings
- supplier commission and payable management
- multi-currency financial operations
- SST and GST reporting readiness
- API-first integrations with payment gateways, booking suppliers, GDS, and CRM systems

## Technology Stack

### Backend

- NestJS
- TypeScript
- Swagger via `@nestjs/swagger`

### Frontend

- React
- Vite
- TypeScript

### Database

- PostgreSQL recommended for production deployment

### Infrastructure Recommendation

- AWS with ECS or App Runner for services
- RDS PostgreSQL for transactional storage
- SQS for retry and integration workloads
- CloudWatch and OpenSearch for observability and audit trails

## System Architecture Summary

The system follows a modular API-first architecture where operational business events drive accounting updates:

1. Frontend dashboards and proposal interface consume backend APIs.
2. NestJS modules handle customers, bookings, invoices, payments, commissions, suppliers, ledger posting, reporting, currency, and integrations.
3. PostgreSQL stores normalized master and transaction data.
4. Integrations receive webhooks and launch sync jobs for external systems.
5. Reporting services generate real-time finance and compliance insights.

See the full narrative in [docs/system-overview.md](docs/system-overview.md).

## Database Design Explanation

The design separates master data from transactional data and uses a ledger header and line model for balanced accounting entries. Core relationships include:

- customers to bookings
- suppliers to bookings
- bookings to invoices
- invoices to payments
- bookings to commissions
- ledger transactions to ledger entry lines
- currency rates to revaluation and reporting workflows

The ER source is located in [docs/er-diagram.mmd](docs/er-diagram.mmd).

## Module Descriptions

- Auth Module: login flow, token decoding, authentication baseline
- User Module: user and role listing
- Customer Module: customer master management
- Booking Module: booking intake and operational transaction data
- Invoice Module: invoice generation and receivable records
- Payment Module: gateway collection records
- Commission Module: commission accrual tracking
- Supplier Module: supplier configuration and settlement metadata
- Ledger Module: journal transaction posting
- Reporting Module: KPI and compliance dashboard responses
- Currency Module: FX rate management
- Integration Module: external connector registry and sync jobs

## Swagger API Documentation

Swagger is available at:

```text
http://localhost:3000/api/docs
```

The backend groups APIs by module and includes request examples for the core endpoints.

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Start backend

```bash
npm run start:dev --workspace backend
```

### 3. Start frontend

```bash
npm run dev --workspace frontend
```

### 4. Open the apps

- Backend Swagger: `http://localhost:3000/api/docs`
- Frontend UI: `http://localhost:5173`

## Sample Authentication

Use this sample login payload:

```json
{
  "email": "finance@zedtrago.com",
  "password": "Passw0rd!"
}
```

The returned bearer token can be used for protected endpoints.

## Documentation Folder

The `docs` folder includes:

- `system-overview.md`
- `TECHNICAL-SPECIFICATION.md`
- `system-architecture-diagram.png`
- `system-architecture.mmd`
- `er-diagram.png`
- `er-diagram.mmd`
- `transaction-flowchart.png`
- `transaction-flowchart.mmd`

The PNG files are included for direct review, and the Mermaid sources remain in the repository for editable diagram maintenance.

## Development Roadmap

1. Requirement analysis and event mapping
2. Database schema and ER design
3. Core accounting module and posting engine
4. Booking, payment, and commission integrations
5. Reporting dashboard and analytics
6. Testing, deployment, and optimization

## Optional Enhancements for Production

- Docker Compose for local environment orchestration
- PostgreSQL persistence and migrations
- Unit and integration tests
- Postman collection
- Seed scripts for richer demo data
- Background workers for webhook retries and settlement batches
