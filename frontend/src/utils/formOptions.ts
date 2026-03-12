export const COMMON_CURRENCIES = ["AUD", "MYR", "USD"] as const;

export const BOOKING_TYPES = [
  "hotel",
  "flight",
  "transfer",
  "package",
] as const;

export const BOOKING_STATUSES = [
  "draft",
  "confirmed",
  "ticketed",
  "cancelled",
] as const;

export const INVOICE_STATUSES = [
  "draft",
  "issued",
  "paid",
  "overdue",
  "void",
] as const;

export const PAYMENT_PROVIDERS = [
  "stripe",
  "paypal",
  "bank-transfer",
  "manual",
] as const;

export const PAYMENT_STATUSES = [
  "pending",
  "captured",
  "failed",
  "refunded",
] as const;

export const SUPPLIER_TYPES = ["hotel", "gds", "airline", "operator"] as const;

export const INTEGRATION_MODES = [
  "api",
  "message-bus",
  "manual",
  "file-drop",
] as const;

export const COMMISSION_STATUSES = ["accrued", "settled", "reversed"] as const;

export const SYNC_JOB_MODES = ["pull", "push", "webhook"] as const;

export const SYNC_JOB_SOURCES = [
  "hotel-supplier",
  "payment-gateway",
  "crm-platform",
  "gds-system",
] as const;

export const SYNC_JOB_RESOURCES = [
  "bookings",
  "payments",
  "customers",
  "invoices",
] as const;
