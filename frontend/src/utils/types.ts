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
