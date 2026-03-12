# Modular Services Usage Examples

This file demonstrates how to use the new modular API services in your frontend components.

## Example 1: Simple CRUD Page (Customers)

### Using Module-Specific Import (Recommended)

```typescript
import { FormEvent, useState } from "react";
import { useGetCustomersQuery, useCreateCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation } from "../../services/modules/customersService";
import type { Customer } from "../../utils/types";

export function CustomersPage() {
  const { data: customers = [], isLoading, refetch } = useGetCustomersQuery();
  const [createCustomer, { isLoading: creating }] = useCreateCustomerMutation();
  const [updateCustomer, { isLoading: updating }] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const [form, setForm] = useState({
    companyName: "",
    contactEmail: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await createCustomer(form).unwrap();
      refetch();
      setForm({ companyName: "", contactEmail: "" });
    } catch (error) {
      console.error("Failed to create customer", error);
    }
  }

  async function onDelete(id: string) {
    try {
      await deleteCustomer(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete customer", error);
    }
  }

  if (isLoading) return <div>Loading customers...</div>;

  return (
    <div>
      <h1>Customers</h1>

      <form onSubmit={onSubmit}>
        <input
          placeholder="Company Name"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          required
        />
        <input
          placeholder="Contact Email"
          type="email"
          value={form.contactEmail}
          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
          required
        />
        <button type="submit" disabled={creating}>
          {creating ? "Creating..." : "Add Customer"}
        </button>
      </form>

      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.companyName} ({customer.id})
            <button onClick={() => onDelete(customer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Example 2: Related Data with Dropdowns (Bookings)

```typescript
import { useGetBookingsQuery, useCreateBookingMutation } from "../../services/modules/bookingsService";
import { useGetCustomersQuery } from "../../services/modules/customersService";
import { useGetSuppliersQuery } from "../../services/modules/suppliersService";

export function BookingsPage() {
  const { data: customers = [] } = useGetCustomersQuery();
  const { data: suppliers = [] } = useGetSuppliersQuery();
  const { data: bookings = [] } = useGetBookingsQuery();
  const [createBooking, { isLoading: creating }] = useCreateBookingMutation();

  const [form, setForm] = useState({
    customerId: "",
    supplierId: "",
    bookingType: "hotel",
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await createBooking(form).unwrap();
      setForm({ customerId: "", supplierId: "", bookingType: "hotel" });
    } catch (error) {
      console.error("Failed to create booking", error);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <select
        value={form.customerId}
        onChange={(e) => setForm({ ...form, customerId: e.target.value })}
        required
      >
        <option value="">Select Customer</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>{c.companyName}</option>
        ))}
      </select>

      <select
        value={form.supplierId}
        onChange={(e) => setForm({ ...form, supplierId: e.target.value })}
        required
      >
        <option value="">Select Supplier</option>
        {suppliers.map((s) => (
          <option key={s.id} value={s.id}>{s.supplierName}</option>
        ))}
      </select>

      <select
        value={form.bookingType}
        onChange={(e) => setForm({ ...form, bookingType: e.target.value })}
      >
        <option value="hotel">Hotel</option>
        <option value="flight">Flight</option>
        <option value="transfer">Transfer</option>
        <option value="package">Package</option>
      </select>

      <button type="submit" disabled={creating}>
        {creating ? "Creating..." : "Create Booking"}
      </button>
    </form>
  );
}
```

## Example 3: Reporting with Filters

```typescript
import { useState } from "react";
import { useGetReportingDashboardQuery, useGetReportingArAgingQuery } from "../../services/modules/reportingService";
import type { ReportFilter } from "../../utils/types";

export function DashboardPage() {
  const [filters, setFilters] = useState<ReportFilter>({});

  // Queries update when filters change
  const { data: dashboard, isLoading: dashboardLoading } =
    useGetReportingDashboardQuery(
      filters.fromDate || filters.toDate || filters.market ? filters : undefined
    );

  const { data: arAging, isLoading: agingLoading } =
    useGetReportingArAgingQuery(
      filters.fromDate || filters.toDate || filters.market ? filters : undefined
    );

  return (
    <div>
      <div>
        <label>From Date</label>
        <input
          type="date"
          value={filters.fromDate || ""}
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value || undefined })}
        />
      </div>

      <div>
        <label>To Date</label>
        <input
          type="date"
          value={filters.toDate || ""}
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value || undefined })}
        />
      </div>

      <div>
        <label>Market</label>
        <select value={filters.market || ""} onChange={(e) => setFilters({ ...filters, market: e.target.value || undefined })}>
          <option value="">All Markets</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Australia">Australia</option>
        </select>
      </div>

      {dashboardLoading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div>
          <h2>Dashboard</h2>
          <p>Total Invoiced: ${dashboard?.summary?.invoicedAmount}</p>
          <p>Total Collected: ${dashboard?.summary?.collectedAmount}</p>
        </div>
      )}

      {agingLoading ? (
        <p>Loading aging report...</p>
      ) : (
        <div>
          <h2>AR Aging</h2>
          <p>Grand Total: ${arAging?.grandTotal}</p>
        </div>
      )}
    </div>
  );
}
```

## Example 4: Using Aggregate Import

```typescript
// Import multiple hooks from modules index
import {
  useGetBookingsQuery,
  useGetInvoicesQuery,
  useGetPaymentsQuery,
  useCreatePaymentMutation
} from "../../services/modules";

export function PaymentDashboard() {
  const { data: bookings } = useGetBookingsQuery();
  const { data: invoices } = useGetInvoicesQuery();
  const { data: payments } = useGetPaymentsQuery();
  const [createPayment] = useCreatePaymentMutation();

  // Use all hooks together
  const totalBookings = bookings?.length ?? 0;
  const totalInvoices = invoices?.length ?? 0;
  const totalPayments = payments?.length ?? 0;

  return (
    <div>
      <h1>Payment Overview</h1>
      <div>Bookings: {totalBookings}</div>
      <div>Invoices: {totalInvoices}</div>
      <div>Payments: {totalPayments}</div>
    </div>
  );
}
```

## Example 5: Error Handling with Specific Module

```typescript
import { useCreateCustomerMutation } from "../../services/modules/customersService";
import { toastError, toastSuccess } from "../../utils/notify";

export function CustomerForm() {
  const [createCustomer, { isLoading, error }] = useCreateCustomerMutation();

  async function handleSubmit(formData: any) {
    try {
      const result = await createCustomer(formData).unwrap();
      toastSuccess(`Customer ${result.companyName} created successfully`);
    } catch (err: any) {
      toastError(err?.data?.message || "Failed to create customer");
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit({ companyName: "Test Co", contactEmail: "test@test.com" });
    }}>
      {error && <div className="error">{error.data?.message}</div>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
```

## Example 6: Composition - Combining Multiple Services

```typescript
import { useGetBookingsQuery, useUpdateBookingMutation, useDeleteBookingMutation } from "../../services/modules/bookingsService";
import { useGetCustomersQuery } from "../../services/modules/customersService";
import { useGetInvoicesQuery } from "../../services/modules/invoicesService";
import { useState } from "react";

export function BookingManagement() {
  const { data: bookings = [] } = useGetBookingsQuery();
  const { data: customers = [] } = useGetCustomersQuery();
  const { data: invoices = [] } = useGetInvoicesQuery();
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  const selectedBookingData = bookings.find(b => b.id === selectedBooking);
  const relatedInvoices = invoices.filter(inv => inv.bookingId === selectedBooking);
  const customerName = customers.find(c => c.id === selectedBookingData?.customerId)?.companyName;

  return (
    <div>
      <h1>Booking Management</h1>

      <select value={selectedBooking || ""} onChange={(e) => setSelectedBooking(e.target.value)}>
        <option value="">Select a booking</option>
        {bookings.map(b => (
          <option key={b.id} value={b.id}>{b.id} - {b.bookingType}</option>
        ))}
      </select>

      {selectedBookingData && (
        <div>
          <h2>Booking Details for {selectedBookingData.id}</h2>
          <p>Customer: {customerName}</p>
          <p>Type: {selectedBookingData.bookingType}</p>
          <p>Status: {selectedBookingData.status}</p>

          <h3>Related Invoices ({relatedInvoices.length})</h3>
          <ul>
            {relatedInvoices.map(inv => (
              <li key={inv.id}>{inv.id} - ${inv.totalAmount}</li>
            ))}
          </ul>

          <button onClick={() => deleteBooking(selectedBookingData.id)}>
            Delete Booking
          </button>
        </div>
      )}
    </div>
  );
}
```

## Example 7: Backward Compatible Import (Old Style)

```typescript
// This still works due to re-exports in api.ts
import {
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useGetBookingsQuery
} from "../../services/api";

export function LegacyComponent() {
  const { data: customers } = useGetCustomersQuery();
  const { data: bookings } = useGetBookingsQuery();
  const [createCustomer] = useCreateCustomerMutation();

  // All hooks work exactly the same as before
  return <div>{customers?.length} customers, {bookings?.length} bookings</div>;
}
```

## Import Patterns Summary

| Pattern             | Use Case                 | Example                                          |
| ------------------- | ------------------------ | ------------------------------------------------ |
| **Module-Specific** | Single module operations | `from "../../services/modules/customersService"` |
| **Modules Index**   | Multiple related modules | `from "../../services/modules"`                  |
| **Main API**        | Backward compatibility   | `from "../../services/api"`                      |

## Best Practices

1. ✅ **Use module-specific imports** for better tree-shaking
2. ✅ **Use modules index** when composing multiple services
3. ✅ **Never import from baseApi** (it's internal)
4. ✅ **Keep error handling consistent** across modules
5. ✅ **Use type-safe hooks** - let TypeScript guide you
6. ✅ **Always unwrap mutations** with `.unwrap()` for error handling
7. ✅ **Refetch data** after mutations to keep cache in sync
8. ✅ **Handle loading states** for better UX

## Common Patterns

### Refetch After Mutation

```typescript
const { data, refetch } = useGetCustomersQuery();
const [createCustomer] = useCreateCustomerMutation();

await createCustomer(data).unwrap();
refetch(); // Refresh the list
```

### Optional Query Execution

```typescript
const { data } = useGetBookingsQuery();
// Query runs only if dependency is not undefined
const { data: details } = useGetBookingByIdQuery(selectedId || "", {
  skip: !selectedId,
});
```

### Error and Loading States

```typescript
const { data, isLoading, error } = useGetCustomersQuery();

if (isLoading) return <Loading />;
if (error) return <Error message={error.message} />;
return <CustomerList customers={data} />;
```

---

**For more details, see SERVICES_ARCHITECTURE.md**
