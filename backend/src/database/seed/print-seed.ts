import {
  accounts,
  bookings,
  commissions,
  currencyRates,
  customers,
  invoices,
  ledgerTransactions,
  payments,
  suppliers,
  users,
} from "./sample-data";

console.log(
  JSON.stringify(
    {
      users,
      customers,
      suppliers,
      bookings,
      invoices,
      payments,
      commissions,
      accounts,
      ledgerTransactions,
      currencyRates,
    },
    null,
    2,
  ),
);
