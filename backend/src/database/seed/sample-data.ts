import { AccountEntity } from "../entities/account.entity";
import { BookingEntity } from "../entities/booking.entity";
import { CommissionEntity } from "../entities/commission.entity";
import { CurrencyRateEntity } from "../entities/currency-rate.entity";
import { CustomerEntity } from "../entities/customer.entity";
import { InvoiceEntity } from "../entities/invoice.entity";
import { LedgerTransactionEntity } from "../entities/ledger-transaction.entity";
import { PaymentEntity } from "../entities/payment.entity";
import { SupplierEntity } from "../entities/supplier.entity";
import { UserEntity } from "../entities/user.entity";

export const users: UserEntity[] = [
  {
    id: "usr-001",
    fullName: "Aina Rahman",
    email: "finance@zedtrago.com",
    role: "finance_manager",
    status: "active",
    region: "MY",
  },
  {
    id: "usr-002",
    fullName: "Mason Lee",
    email: "ops.au@zedtrago.com",
    role: "operations_admin",
    status: "active",
    region: "AU",
  },
];

export const customers: CustomerEntity[] = [
  {
    id: "cus-001",
    companyName: "Blue Orbit Travel",
    contactName: "Sarah Tan",
    email: "sarah@blueorbit.example",
    market: "Malaysia",
    preferredCurrency: "MYR",
  },
  {
    id: "cus-002",
    companyName: "Coral Coast Holidays",
    contactName: "Liam Turner",
    email: "liam@coralcoast.example",
    market: "Australia",
    preferredCurrency: "AUD",
  },
];

export const suppliers: SupplierEntity[] = [
  {
    id: "sup-001",
    supplierName: "Pacific Suites Group",
    supplierType: "hotel",
    settlementCurrency: "AUD",
    integrationMode: "api",
  },
  {
    id: "sup-002",
    supplierName: "Skylink GDS",
    supplierType: "gds",
    settlementCurrency: "USD",
    integrationMode: "message-bus",
  },
];

export const bookings: BookingEntity[] = [
  {
    id: "bok-1001",
    customerId: "cus-002",
    supplierId: "sup-001",
    bookingType: "hotel",
    status: "confirmed",
    bookingCurrency: "AUD",
    grossAmount: 2480,
    netAmount: 2200,
    travelDate: "2026-04-18T00:00:00.000Z",
  },
  {
    id: "bok-1002",
    customerId: "cus-001",
    supplierId: "sup-002",
    bookingType: "flight",
    status: "ticketed",
    bookingCurrency: "USD",
    grossAmount: 1450,
    netAmount: 1310,
    travelDate: "2026-05-03T00:00:00.000Z",
  },
];

export const invoices: InvoiceEntity[] = [
  {
    id: "inv-1001",
    bookingId: "bok-1001",
    invoiceNumber: "INV-2026-0001",
    status: "issued",
    currency: "AUD",
    totalAmount: 2480,
    dueDate: "2026-03-20",
  },
  {
    id: "inv-1002",
    bookingId: "bok-1002",
    invoiceNumber: "INV-2026-0002",
    status: "issued",
    currency: "USD",
    totalAmount: 1450,
    dueDate: "2026-03-22",
  },
];

export const payments: PaymentEntity[] = [
  {
    id: "pay-1001",
    invoiceId: "inv-1001",
    provider: "stripe",
    status: "captured",
    currency: "AUD",
    amount: 2480,
    receivedAt: "2026-03-10T11:00:00.000Z",
  },
];

export const commissions: CommissionEntity[] = [
  {
    id: "com-1001",
    bookingId: "bok-1001",
    amount: 280,
    rate: 11.29,
    status: "accrued",
  },
  {
    id: "com-1002",
    bookingId: "bok-1002",
    amount: 140,
    rate: 9.65,
    status: "accrued",
  },
];

export const accounts: AccountEntity[] = [
  {
    id: "acc-1100",
    code: "1100",
    name: "Accounts Receivable",
    type: "asset",
    baseCurrency: "USD",
  },
  {
    id: "acc-2100",
    code: "2100",
    name: "Supplier Payable",
    type: "liability",
    baseCurrency: "USD",
  },
  {
    id: "acc-4100",
    code: "4100",
    name: "Travel Revenue",
    type: "revenue",
    baseCurrency: "USD",
  },
  {
    id: "acc-5100",
    code: "5100",
    name: "Commission Expense",
    type: "expense",
    baseCurrency: "USD",
  },
];

export const ledgerTransactions: LedgerTransactionEntity[] = [
  {
    id: "led-1001",
    sourceEvent: "booking_confirmed",
    referenceId: "bok-1001",
    currency: "AUD",
    postedAt: "2026-03-10T10:05:00.000Z",
    entries: [
      {
        accountCode: "1100",
        debit: 2480,
        credit: 0,
        description: "Invoice receivable created for booking bok-1001",
      },
      {
        accountCode: "4100",
        debit: 0,
        credit: 2480,
        description: "Revenue recognized for hotel booking",
      },
    ],
  },
  {
    id: "led-1002",
    sourceEvent: "commission_accrued",
    referenceId: "com-1001",
    currency: "AUD",
    postedAt: "2026-03-10T10:10:00.000Z",
    entries: [
      {
        accountCode: "5100",
        debit: 280,
        credit: 0,
        description: "Commission expense accrued",
      },
      {
        accountCode: "2100",
        debit: 0,
        credit: 280,
        description: "Supplier commission payable created",
      },
    ],
  },
];

export const currencyRates: CurrencyRateEntity[] = [
  {
    fromCurrency: "AUD",
    toCurrency: "MYR",
    rate: 3.09,
    rateDate: "2026-03-10",
  },
  {
    fromCurrency: "USD",
    toCurrency: "MYR",
    rate: 4.44,
    rateDate: "2026-03-10",
  },
  {
    fromCurrency: "AUD",
    toCurrency: "USD",
    rate: 0.65,
    rateDate: "2026-03-10",
  },
];
