# Zedtrago Accounting Platform - Complete Technical Documentation

## Executive Summary

This assignment submission presents a complete technical solution for implementing an accounting software system for a multi-service travel business. The solution includes a fully structured NestJS backend, professional React frontend, comprehensive documentation, and database design.

**Submission includes:**

- NestJS backend with 13 domain modules and Swagger documentation
- React frontend with professional UI and navigation
- PostgreSQL ER diagram and normalization strategy
- Transaction workflow and system architecture diagrams
- Complete implementation roadmap
- Technology stack recommendations

---

## 1. System Architecture Design

### Architectural Layers

The platform follows a **6-layer architecture** optimized for scalability, real-time financial visibility, and integration:

#### Layer 1: Presentation Layer (React SPA)

- Dashboard with KPI metrics and transaction views
- Real-time financial data binding
- Module navigation and documentation interface
- Mobile-responsive design

#### Layer 2: API Layer (NestJS REST)

- 13 domain-focused module groups with REST endpoints
- JWT-based authentication
- Swagger auto-documentation at `/api/docs`
- Centralized validation and error handling

#### Layer 3: Business Logic Layer

- Domain service implementations for each module
- Validation rules and business constraints
- Journal posting engines
- Event-driven workflow orchestration

#### Layer 4: Data Access Layer

- In-memory repository-style services in this demo implementation, with a TypeORM/PostgreSQL repository layer planned for production deployment
- Query optimization and caching strategies
- Transaction management
- Audit trail logging

#### Layer 5: Database Layer

- PostgreSQL relational database
- Normalized schema with master and transactional tables
- Referential integrity and constraints
- Optimized indexes for reporting queries

#### Layer 6: Integration Layer

- Payment gateway webhooks (Stripe, PayPal)
- Supplier and GDS sync jobs
- CRM platform connectors
- Retry queue and deduplication logic

### External Integrations

**Payment Gateways:**

- Stripe: Server-side API with signed webhooks, idempotent retries
- PayPal: OAuth2 client credentials, webhook signature validation

**Booking Platforms & Suppliers:**

- Hotel APIs: Real-time availability and pricing sync
- GDS Systems: Amadeus, Sabre integration with session management
- Supplier reservation APIs: Confirmation and reconciliation

**CRM & External Systems:**

- Salesforce/Zoho: OAuth2-based customer sync
- External accounting systems: Real-time ledger export

---

## 2. Database Design (ER Diagram)

### Core Entities

**Master Data Tables:**

- `users` - System users with roles and market assignment
- `customers` - B2B customers, agencies, and entities
- `suppliers` - Travel suppliers with settlement terms
- `accounts` - General ledger accounts by market and type
- `currency_rates` - Daily FX rates for AUD, MYR, USD

**Transactional Tables:**

- `bookings` - Travel service bookings with status and amounts
- `invoices` - Customer-facing invoices with tax details
- `payments` - Payment collection records with gateway references
- `payables` - Supplier liabilities, settlement schedules, and payable status
- `commissions` - Commission accruals and settlements
- `ledger_transactions` - Journal entry headers
- `ledger_entry_lines` - Debit/credit entry rows

### Key Relationships

```
Customers → Bookings (one-to-many)
Suppliers → Bookings (one-to-many)
Bookings → Invoices (one-to-many)
Invoices → Payments (one-to-many)
Suppliers → Payables (one-to-many)
Bookings → Payables (one-to-many)
Bookings → Commissions (one-to-many)
Bookings → Ledger Transactions (one-to-many)
Ledger Transactions → Entry Lines (one-to-many)
Accounts → Entry Lines (one-to-many)
Currency Rates → Bookings, Invoices, Payments, Payables (many-to-one)
```

### Normalization Strategy

- **1NF**: Atomic attributes, no repeating groups
- **2NF**: Full functional dependency on primary keys
- **3NF**: No transitive dependencies
- **Transaction Table Design**: Immutable transactional records with timestamps
- **Audit Trail**: Created_at, updated_at, created_by fields on all master tables

### Data Consistency

- **Booking to Invoice**: Cascading with status checks (confirmed bookings only)
- **Invoice to Payment**: Partial payment support with remaining balance tracking
- **Booking to Payable**: Supplier liabilities created only for confirmed or ticketed service obligations
- **Ledger Posting**: Balanced entries enforced at database constraint level
- **Multi-Currency**: FX rates captured at transaction time for auditability
- **Idempotence**: Payment webhook and ledger posting marked with unique keys to prevent duplicates

---

## 3. Transaction Lifecycle & Workflow

### End-to-End Financial Flow

**Step 1: Booking Creation**

```
Customer requests travel service
→ System creates booking record
→ Status: PENDING_CONFIRMATION
→ Booking event emitted to ledger service
```

**Step 2: Supplier Confirmation**

```
Supplier confirms availability
→ Booking status changes to CONFIRMED
→ Invoice generation triggered
```

**Step 3: Invoice Generation**

```
System generates customer invoice
→ Calculates tax (SST/GST as applicable)
→ Invoice record created with due date
→ AR aging clock starts
```

**Step 4: Payment Processing**

```
Customer pays via Stripe/PayPal
→ Webhook received and validated
→ Payment record stored with idempotent key
→ Ledger posting triggered
```

**Step 5: Ledger Entry Creation**

```
Transaction event → Posting rule lookup
→ Debit AR account, Credit Revenue account
→ Balanced entry lines created
→ Ledger posting logged for audit
```

**Step 6: Supplier Settlement**

```
Settlement batch created for supplier
→ Invoices sum to payable amount
→ Commission deducted if applicable
→ Payment issued to supplier
→ AP ledger entries posted
```

**Step 7: Financial Reporting**

```
Reporting queries consume ledger transactions
→ KPI dashboard shows real-time balances
→ Tax reports export SST/GST breakdowns
→ AR/AP aging analysis generated
```

---

## 4. Accounting Module Design

### General Ledger Module

**Responsibilities:**

- Journal entry creation from operational events
- Posting rule engine mapping events to GL accounts
- Double-entry validation and balancing
- Ledger transaction query and reporting

**Interactions:**

- Consumes: Booking CONFIRMED, Invoice ISSUED, Payment RECEIVED, Commission ACCRUED events
- Produces: Balanced ledger entries
- Contributes: General ledger for trial balance and financial statements

**Example Posting Rule (Booking Confirmation):**

```
Event: Booking CONFIRMED
Amount: GrossAmount in booking_currency
Rule:
  Debit: Asset Account (AR)
  Credit: Revenue Account
Journal Entry:
  Dr. Accounts Receivable    $2,500 (AUD)
     Cr. Travel Revenue             $2,500
```

### Accounts Receivable Module

**Responsibilities:**

- Invoice creation and tracking
- Payment allocation and matching
- Aging analysis and collection status
- Credit limit enforcement

**Interactions:**

- Creates invoices from confirmed bookings
- Matches payments to invoices
- Generates AR aging reports
- Feeds ledger with AR postings

### Accounts Payable Module

**Responsibilities:**

- Supplier obligation tracking
- Settlement batch creation
- Payment scheduling and execution
- Payable aging and reconciliation

**Interactions:**

- Accrues payables from bookings
- Tracks supplier settlements
- Generates AP aging reports
- Feeds ledger with supplier payment entries

### Commission Management Module

**Responsibilities:**

- Commission accrual from bookings
- Rate lookup and calculation
- Payout batching and reconciliation
- Margin analysis by booking and supplier

**Interactions:**

- Calculates commissions from booking amounts
- Accrues commission expense
- Batches settlements
- Tracks commission payouts

### Multi-Currency Module

**Responsibilities:**

- Daily FX rate management
- Currency conversion calculations
- Realized and unrealized gain/loss
- Multi-currency reporting

**Interactions:**

- Maintains daily rates for AUD, MYR, USD
- Converts amounts at transaction time
- Tracks FX impacts on ledger
- Supports reporting in home currency

### Financial Reporting Module

**Responsibilities:**

- KPI dashboard generation
- Tax compliance reporting (SST, GST)
- Reconciliation views
- Analytics and trend analysis

**Interactions:**

- Queries ledger transactions and balances
- Generates real-time dashboards
- Exports tax-ready reports
- Provides business intelligence data

---

## 5. API & Integration Strategy

### Payment Gateway Integration

**Stripe Integration:**

- Endpoint: `/api/payments/stripe/webhook`
- Method: POST
- Authentication: Webhook signature validation
- Idempotency: Event ID tracking to prevent duplicate processing
- Retry: Automatic retry queue for failed webhook processing

**PayPal Integration:**

- Endpoint: `/api/payments/paypal/webhook`
- Method: POST
- Authentication: OAuth2 token validation
- Idempotency: Transaction ID-based deduplication
- Async: Event-driven asynchronous processing

### Booking Platform Integration

**Supplier Sync Jobs:**

- Endpoint: `/api/integrations/suppliers/sync`
- Method: POST (triggered)
- Polling: Daily sync via scheduled jobs
- Reconciliation: Booking reference matching
- Correlation: Unique integration event IDs

**GDS Integration:**

- Endpoint: `/api/integrations/gds/sync`
- Authentication: Session tokens
- Message Format: XML/JSON translation layers
- Async Reconciliation: Background batch matching

### CRM Platform Integration

**Salesforce Connector:**

- Authentication: OAuth2 with refresh token
- Sync Direction: Bidirectional customer data
- Event Deduplication: Field-level hash matching
- Rate Limiting: 100 records per batch

### Authentication Methods

- **Internal APIs**: JWT bearer tokens (HS256 or RS256)
- **External Webhooks**: HMAC-SHA256 signature validation
- **GDS/Supplier APIs**: Basic auth or OAuth2 client credentials
- **Rate Limiting**: Per API key or per user

### Data Synchronization Strategy

**Real-time Sync (Webhooks):**

- Payment confirmations
- Supplier confirmations
- Customer updates from CRM

**Batch Sync (Scheduled Jobs):**

- Daily supplier rate updates
- FX rate updates
- Reconciliation batches
- Report exports

**Error Handling:**

- Retry queue with exponential backoff
- Dead letter queue for unrecoverable failures
- Alert thresholds for monitoring
- Manual intervention procedures

---

## 6. NestJS API Implementation

### Project Structure

```
backend/
├── src/
│   ├── main.ts                      # Application bootstrap
│   ├── app.module.ts                # Root module
│   ├── modules/                     # Domain modules
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   └── dto/
│   │   ├── customers/
│   │   ├── bookings/
│   │   ├── invoices/
│   │   ├── payments/
│   │   ├── commissions/
│   │   ├── suppliers/
│   │   ├── users/
│   │   ├── ledger/
│   │   ├── currency/
│   │   ├── reporting/
│   │   └── integrations/
│   ├── database/
│   │   ├── entities/                # TypeORM entities
│   │   └── migrations/              # Database migrations
│   ├── common/
│   │   ├── guards/                  # Auth guard, RBAC
│   │   ├── filters/                 # Exception filters
│   │   ├── decorators/              # Custom decorators
│   │   └── interceptors/            # Logging, transformation
│   └── config/                      # Configuration services
├── package.json
├── tsconfig.json
└── nest-cli.json
```

### Key Technologies

- **Framework**: NestJS 10.4+
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **API Docs**: Swagger/OpenAPI
- **Validation**: Class Validator
- **Configuration**: @nestjs/config

### Module Implementations

#### Auth Module

**Services:**

- `AuthService`: Login, token generation, validation
- `JwtStrategy`: JWT token parsing and validation

**Controllers:**

- `AuthController`: POST /auth/login, GET /auth/me

**DTOs:**

- `LoginDto`: Email and password
- `TokenResponseDto`: Access token and refresh token

#### Customer Module

**Services:**

- `CustomersService`: CRUD operations, customer lookup

**Controllers:**

- `CustomersController`: GET /customers, POST /customers

**Entities:**

- `CustomerEntity`: Database model with market and currency fields

#### Booking Module

**Services:**

- `BookingsService`: Create, update, status transitions
- `BookingEventService`: Emit booking events

**Controllers:**

- `BookingsController`: Full CRUD for bookings
- `BookingStatusController`: Status transitions

#### Invoice Module

**Services:**

- `InvoicesService`: Generation, reconciliation
- `TaxService`: SST/GST calculation

**Controllers:**

- `InvoicesController`: GET /invoices, POST /invoices/generate

#### Payment Module

**Services:**

- `PaymentsService`: Payment recording
- `StripeWebhookService`: Webhook processing
- `PayPalWebhookService`: Webhook processing

**Controllers:**

- `PaymentsController`: GET /payments, POST /payments/record
- `StripeWebhookController`: POST /payments/stripe/webhook
- `PayPalWebhookController`: POST /payments/paypal/webhook

#### Ledger Module

**Services:**

- `LedgerService`: Journal posting
- `PostingRuleService`: Rule lookup and application

**Controllers:**

- `LedgerController`: GET /ledger/transactions, POST /ledger/entries

#### Reporting Module

**Services:**

- `ReportingService`: KPI and financial report generation

**Controllers:**

- `ReportingController`: GET /reporting/dashboard, GET /reporting/tax-export

---

## 7. Swagger API Documentation

The API is fully documented with Swagger and accessible at:

```
http://localhost:3000/api/docs
```

### API Groups & Endpoints

**Authentication (Auth Module)**

- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

**Users (User Module)**

- `GET /users` - List users
- `POST /users` - Create user

**Customers (Customer Module)**

- `GET /customers` - List customers
- `POST /customers` - Create customer
- `GET /customers/{id}` - Get customer details

**Bookings (Booking Module)**

- `GET /bookings` - List bookings
- `POST /bookings` - Create booking
- `GET /bookings/{id}` - Get booking details
- `PATCH /bookings/{id}/status` - Update booking status

**Invoices (Invoice Module)**

- `GET /invoices` - List invoices
- `POST /invoices` - Create invoice
- `GET /invoices/{id}` - Get invoice details

**Payments (Payment Module)**

- `GET /payments` - List payments
- `POST /payments` - Record payment
- `POST /payments/stripe/webhook` - Stripe webhook

**Commissions (Commission Module)**

- `GET /commissions` - List commissions
- `GET /commissions/settlements` - Batch settlements

**Suppliers (Supplier Module)**

- `GET /suppliers` - List suppliers
- `POST /suppliers` - Create supplier

**Ledger (Ledger Module)**

- `GET /ledger/transactions` - List ledger transactions
- `POST /ledger/entries` - Create journal entry

**Currency (Currency Module)**

- `GET /currency/rates` - Get daily FX rates
- `POST /currency/rates` - Update rates

**Reporting (Reporting Module)**

- `GET /reporting/dashboard` - KPI dashboard
- `GET /reporting/tax-export` - Tax compliance export

---

## 8. Technology Stack

### Backend

- **Runtime**: Node.js 18+
- **Framework**: NestJS 10+
- **Language**: TypeScript 5+
- **API Docs**: @nestjs/swagger
- **Database ORM**: TypeORM
- **Authentication**: @nestjs/passport, passport-jwt
- **Validation**: class-validator, class-transformer

### Frontend

- **Framework**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS3 with modern layout (Grid, Flexbox)
- **State**: React hooks (useState)

### Database

- **Primary**: PostgreSQL 14+
- **Query Builder**: TypeORM QueryBuilder
- **Migrations**: TypeORM CLI

### Infrastructure (Recommended)

- **Compute**: AWS ECS/App Runner
- **Database**: AWS RDS PostgreSQL
- **Queue**: AWS SQS for retry/async jobs
- **Observability**: CloudWatch + OpenSearch
- **CI/CD**: GitHub Actions or AWS CodePipeline

### Why This Stack?

**Scalability:**

- NestJS modular architecture scales horizontally
- PostgreSQL handles multi-million transaction volumes
- AWS services auto-scale and partition by nature

**Performance:**

- TypeORM with query optimization and caching
- React SPA for client-side performance
- Database indexes on frequently queried dimensions

**Security:**

- JWT bearer tokens for stateless auth
- Webhook signature validation (HMAC)
- Row-level security policies for multi-tenancy
- Data encryption in transit and at rest (AWS)

**Maintainability:**

- NestJS structure enforces clean architecture
- Strong typing with TypeScript
- Decorator-based dependency injection
- Comprehensive API documentation via Swagger

**Integration:**

- REST APIs for webhook and third-party integration
- Event-driven architecture for real-time updates
- Standard OAuth2 for third-party auth
- Message queues for resilient async processing

---

## 9. Implementation Roadmap

### Phase 1: Requirement Analysis & Architecture (Week 1)

- [x] Domain modeling and entity relationships
- [x] Event mapping and posting rule definition
- [x] Architecture review and approval
- [x] Technology stack selection
- [x] Database schema design

**Deliverables:**

- ER diagram with 10+ entities
- System architecture diagram
- Posting rule specifications
- Technical design document

### Phase 2: Database & Infrastructure (Week 2)

- [ ] PostgreSQL schema creation
- [ ] TypeORM entities and migrations
- [ ] Initial indices and constraints
- [ ] Audit trail logging setup
- [ ] Backup and recovery procedures

**Deliverables:**

- Live database schema
- Migration scripts
- Seed data for demo
- Database documentation

### Phase 3: Core Accounting Services (Week 3-4)

- [ ] Ledger module with posting engine
- [ ] General accounting rules
- [ ] Double-entry validation
- [ ] AR/AP module basics
- [ ] Commission calculation engine

**Deliverables:**

- Ledger posting API (POST /ledger/entries)
- Journal query API (GET /ledger/transactions)
- Commission calculation service
- Comprehensive Swagger documentation

### Phase 4: Operational Integration (Week 5)

- [ ] Booking and Invoice modules
- [ ] Customer and Supplier management
- [ ] Payment gateway webhook handlers
- [ ] Real-time ledger event streaming
- [ ] Commission accrual automation

**Deliverables:**

- Booking creation flow
- Invoice generation from bookings
- Payment webhook processing
- Real-time commission tracking

### Phase 5: Reporting & Analytics (Week 6)

- [ ] KPI dashboard backend
- [ ] Tax compliance reporting (SST/GST)
- [ ] AR/AP aging analysis
- [ ] Profitability by booking/supplier
- [ ] FX impact reporting

**Deliverables:**

- Dashboard API (/reporting/dashboard)
- Tax export API (/reporting/tax-export)
- Frontend dashboard UI
- Sample reports

### Phase 6: Testing, Performance & Deployment (Week 7+)

- [ ] Unit and integration tests (>80% coverage)
- [ ] Performance testing and optimization
- [ ] Load testing with 10k+ concurrent users
- [ ] Security audit and penetration testing
- [ ] Docker containerization
- [ ] Kubernetes deployment scripts
- [ ] Database backup and recovery testing
- [ ] Documentation and training materials

**Deliverables:**

- Test suite with high coverage
- Docker images
- Kubernetes manifests
- Deployment runbooks
- Operation manuals

---

## 10. Running the Application

### Prerequisites

```bash
Node.js: >= 18.0
npm: >= 10.0
PostgreSQL: >= 14.0
```

### Installation

**Clone and setup:**

```bash
cd d:\shakhawat\easy-task
npm install
```

**Backend setup:**

```bash
cd backend
npm install
npm run build
```

**Frontend setup:**

```bash
cd frontend
npm install
npm run build
```

### Running Development Servers

**Start Backend:**

```bash
cd backend
npm run start:dev
# Swagger available at http://localhost:3000/api/docs
```

**Start Frontend:**

```bash
cd frontend
npm run dev
# Application available at http://localhost:5173
```

### Database Initialization

```bash
# Update .env with database credentials
cd backend
npm run typeorm migration:run
npm run seed  # Load sample data
```

### Building for Production

```bash
# Backend build
cd backend
npm run build

# Frontend build
cd frontend
npm run build
```

---

## 11. Project Completion Status

✅ **Completed:**

- System architecture design document
- Entity relationship diagram (Mermaid)
- Transaction workflow diagram (Mermaid)
- NestJS backend structure with 11 modules
- Swagger API documentation configuration
- React frontend with professional UI
- Multi-page navigation and dashboard
- Complete system documentation
- Technology stack justification
- Implementation roadmap

📦 **Deliverables in Repository:**

```
.
├── backend/              # NestJS application
├── frontend/             # React application
├── docs/                 # Documentation
│   ├── system-overview.md
│   ├── er-diagram.mmd
│   ├── system-architecture.mmd
│   └── transaction-flowchart.mmd
├── README.md             # Project overview
└── package.json          # Monorepo configuration
```

---

## 12. Additional Notes

### Multi-Currency Strategy

The system supports AUD, MYR, and USD:

- All transactions stored in original booking currency
- FX conversion at invoice and reporting time
- Daily rate table captures exchange rates
- Realized gains/losses tracked in GL
- Reporting available in home currency

### Compliance & Tax

**Malaysia (SST):**

- Sales and Service Tax
- Applicable to local travel services
- Tax rate configuration by supplier type
- Self-assessment reporting readiness

**Australia (GST):**

- Goods and Service Tax
- Threshold $75,000 AUD
- Tax invoice requirements
- PAYG withholding tracking

### Security Considerations

- JWT tokens with 24-hour expiration
- Refresh token rotation
- Role-based access control (RBAC)
- API key management for integrations
- Webhook signature validation
- Rate limiting on public APIs
- SQL injection prevention via ORM
- XSS protection in React frontend

### Future Enhancements

- Service mesh for microservice evolution
- Real-time WebSocket updates for dashboards
- Advanced analytics with data warehouse
- Machine learning for anomaly detection
- Mobile app with offline sync
- Advanced reconciliation tools
- Intercompany transaction management
- Consolidated reporting across entities

---

**End of Documentation**

Repository is ready for review at: https://github.com/[your-org]/zedtrago-accounting
