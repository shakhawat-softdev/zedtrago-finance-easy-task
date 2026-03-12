export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id?: string;
  fullName?: string;
  email: string;
  role?: string;
  status?: string;
  region?: string;
};

export type AuthTokenPayload = {
  sub: string;
  role: string;
  email: string;
};

export type Customer = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  market: string;
  preferredCurrency: string;
};

export type Booking = {
  id: string;
  customerId: string;
  supplierId: string;
  bookingType: string;
  status: string;
  bookingCurrency: string;
  grossAmount: number;
  netAmount: number;
  travelDate: string;
};

export type Invoice = {
  id: string;
  bookingId: string;
  invoiceNumber?: string;
  status: string;
  currency: string;
  totalAmount: number;
  dueDate: string;
};

export type Payment = {
  id: string;
  invoiceId: string;
  provider: string;
  status: string;
  currency: string;
  amount: number;
  receivedAt: string;
};

export type Supplier = {
  id: string;
  supplierName: string;
  supplierType: string;
  settlementCurrency: string;
  integrationMode: string;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
  region: string;
};

export type Commission = {
  id: string;
  bookingId: string;
  amount: number;
  rate: number;
  status: string;
};

export type CurrencyRate = {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  rateDate: string;
};

export type IntegrationConnector = {
  name: string;
  auth: string;
  retryPolicy: string;
};

export type SyncJobPayload = {
  source: string;
  mode: "pull" | "push" | "webhook";
  resource: string;
};

export type SyncJobResponse = SyncJobPayload & {
  status: string;
  correlationId: string;
  strategy: string;
};

export type LedgerEntryLine = {
  accountCode: string;
  debit: number;
  credit: number;
  description: string;
};

export type LedgerTransaction = {
  id: string;
  sourceEvent: string;
  referenceId: string;
  currency: string;
  entries: LedgerEntryLine[];
  postedAt: string;
};

export type CreateLedgerTransactionPayload = Omit<
  LedgerTransaction,
  "id" | "postedAt"
>;

export type TrialBalanceAccount = {
  code: string;
  name: string;
  debit: number;
  credit: number;
  balance: number;
};

export type TrialBalance = {
  accounts: TrialBalanceAccount[];
  totalDebit: number;
  totalCredit: number;
  balanced: boolean;
};

export type ReportFilter = {
  fromDate?: string;
  toDate?: string;
  market?: string;
};

export type AgingBucket = {
  count: number;
  total: number;
  invoices?: string[];
};

export type DashboardReport = {
  summary: {
    bookings: number;
    invoicedAmount: number;
    collectedAmount: number;
    outstandingReceivables: number;
    accruedCommission: number;
  };
  compliance: {
    malaysia: string;
    australia: string;
  };
  refreshMode: string;
};

export type AgingReport = {
  asOf: string;
  buckets: Record<string, AgingBucket>;
  grandTotal: number;
};

export type TaxJurisdictionReport = {
  taxCode: string;
  rate: number;
  taxableAmount: number;
  taxDue: number;
};

export type TaxReport = {
  period: string;
  malaysia: TaxJurisdictionReport;
  australia: TaxJurisdictionReport;
  totalTaxDue: number;
};

export type CommissionsBySupplier = {
  supplierId: string;
  supplierName: string;
  totalCommission: number;
  settled: number;
  pending: number;
};

export type CommissionsReport = {
  period: string;
  perSupplier: CommissionsBySupplier[];
  grandTotal: number;
  pendingSettlement: number;
};

export type ProfitLossSummary = {
  period: string;
  revenue: number;
  costOfSales: number;
  grossProfit: number;
  grossMarginPct: number;
  commissionIncome: number;
  netProfit: number;
};

export type DeleteResponse = {
  deleted: boolean;
};
