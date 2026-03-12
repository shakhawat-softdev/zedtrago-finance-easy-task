# Frontend API Services Architecture

## Overview

The frontend API services have been refactored from a monolithic single-file architecture to a **modular, module-wise approach**. Each business module now has its own dedicated service file with its own CRUD operations.

## Directory Structure

```
frontend/src/services/
├── baseApi.ts                 # Base RTK Query API configuration
├── api.ts                     # Main re-export file (backward compatible)
├── store.ts                   # Redux store configuration
└── modules/
    ├── index.ts               # Central export file for all modules
    ├── authService.ts         # Authentication (login, getMe)
    ├── customersService.ts    # Customer CRUD
    ├── bookingsService.ts     # Booking CRUD
    ├── invoicesService.ts     # Invoice CRUD
    ├── paymentsService.ts     # Payment CRUD
    ├── suppliersService.ts    # Supplier CRUD
    ├── commissionsService.ts  # Commission CRUD
    ├── currencyService.ts     # Currency rate CRUD
    ├── usersService.ts        # User management (read/update)
    ├── integrationsService.ts # Integration sync jobs
    ├── ledgerService.ts       # Ledger transactions
    └── reportingService.ts    # Financial reporting queries
```

## Module Services

Each module service file follows this pattern:

```typescript
import { baseApi } from "../baseApi";
import type { ModelType, DeleteResponse } from "../../utils/types";

export const modelService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getModels: builder.query<ModelType[], void>({ ... }),
    getModelById: builder.query<ModelType, string>({ ... }),
    createModel: builder.mutation<ModelType, Omit<ModelType, "id">>({ ... }),
    updateModel: builder.mutation<ModelType, UpdatePayload>({ ... }),
    deleteModel: builder.mutation<DeleteResponse, string>({ ... }),
  }),
});

export const {
  useGetModelsQuery,
  useGetModelByIdQuery,
  useCreateModelMutation,
  useUpdateModelMutation,
  useDeleteModelMutation,
} = modelService;
```

### Available Modules

#### Auth Service (`authService.ts`)

- `useLoginMutation` - User login
- `useGetMeQuery` - Get current user profile

#### Customers Service (`customersService.ts`)

- `useGetCustomersQuery` - Fetch all customers
- `useGetCustomerByIdQuery` - Fetch single customer
- `useCreateCustomerMutation` - Create new customer
- `useUpdateCustomerMutation` - Update customer
- `useDeleteCustomerMutation` - Delete customer

#### Bookings Service (`bookingsService.ts`)

- `useGetBookingsQuery` - Fetch all bookings
- `useGetBookingByIdQuery` - Fetch single booking
- `useCreateBookingMutation` - Create new booking
- `useUpdateBookingMutation` - Update booking
- `useDeleteBookingMutation` - Delete booking

#### Invoices Service (`invoicesService.ts`)

- `useGetInvoicesQuery`
- `useGetInvoiceByIdQuery`
- `useCreateInvoiceMutation`
- `useUpdateInvoiceMutation`
- `useDeleteInvoiceMutation`

#### Payments Service (`paymentsService.ts`)

- `useGetPaymentsQuery`
- `useGetPaymentByIdQuery`
- `useCreatePaymentMutation`
- `useUpdatePaymentMutation`
- `useDeletePaymentMutation`

#### Suppliers Service (`suppliersService.ts`)

- `useGetSuppliersQuery`
- `useGetSupplierByIdQuery`
- `useCreateSupplierMutation`
- `useUpdateSupplierMutation`
- `useDeleteSupplierMutation`

#### Commissions Service (`commissionsService.ts`)

- `useGetCommissionsQuery`
- `useGetCommissionByIdQuery`
- `useCreateCommissionMutation`
- `useUpdateCommissionMutation`
- `useDeleteCommissionMutation`

#### Currency Service (`currencyService.ts`)

- `useGetCurrencyRatesQuery`
- `useGetCurrencyRateByKeyQuery`
- `useCreateCurrencyRateMutation`
- `useUpdateCurrencyRateMutation`
- `useDeleteCurrencyRateMutation`

#### Users Service (`usersService.ts`)

- `useGetUsersQuery`
- `useGetUserByIdQuery`
- `useUpdateUserMutation`

#### Integrations Service (`integrationsService.ts`)

- `useListIntegrationConnectorsQuery`
- `useRunSyncJobMutation`

#### Ledger Service (`ledgerService.ts`)

- `useGetLedgerTransactionsQuery`
- `useGetLedgerTransactionByIdQuery`
- `useGetTrialBalanceQuery`
- `useCreateLedgerTransactionMutation`

#### Reporting Service (`reportingService.ts`)

- `useGetReportingDashboardQuery`
- `useGetReportingArAgingQuery`
- `useGetReportingApAgingQuery`
- `useGetReportingTaxQuery`
- `useGetReportingLedgerSummaryQuery`
- `useGetReportingCommissionsQuery`
- `useGetReportingPlSummaryQuery`

## Usage

### Option 1: Direct Module Import (Recommended)

Import hooks directly from the specific module:

```typescript
import {
  useGetCustomersQuery,
  useCreateCustomerMutation,
} from "../../services/modules/customersService";

export function CustomersPage() {
  const { data: customers } = useGetCustomersQuery();
  const [createCustomer] = useCreateCustomerMutation();
  // ...
}
```

### Option 2: Aggregate Import

Import from the modules index file:

```typescript
import {
  useGetCustomersQuery,
  useCreateCustomerMutation,
} from "../../services/modules";

export function CustomersPage() {
  const { data: customers } = useGetCustomersQuery();
  const [createCustomer] = useCreateCustomerMutation();
  // ...
}
```

### Option 3: Main API File (Backward Compatible)

For backward compatibility, the main `api.ts` file re-exports all hooks:

```typescript
import {
  useGetCustomersQuery,
  useCreateCustomerMutation,
} from "../../services/api";

export function CustomersPage() {
  const { data: customers } = useGetCustomersQuery();
  const [createCustomer] = useCreateCustomerMutation();
  // ...
}
```

## Base API Configuration

The `baseApi.ts` file contains:

- Base URL configuration
- HTTP headers preparation (token injection)
- All tag types for cache invalidation
- Distributed endpoints through `injectEndpoints`

```typescript
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => { ... },
  }),
  tagTypes: [
    "Customers",
    "Bookings",
    "Invoices",
    "Payments",
    // ... all tag types
  ],
  endpoints: () => ({}), // Empty - endpoints injected by modules
});
```

## Store Configuration

The Redux store uses the `baseApi`:

```typescript
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
```

## Benefits of Modular Architecture

1. **Separation of Concerns** - Each module manages its own endpoints
2. **Scalability** - Easy to add new modules without modifying existing code
3. **Maintainability** - Smaller, focused files are easier to understand and maintain
4. **Code Organization** - Clear folder structure mirrors business domain
5. **Tree-shaking** - Unused module services can be eliminated during bundling
6. **Lazy Loading** - Services can be code-split and loaded on demand
7. **Collaboration** - Team members can work on different modules independently

## Cache Invalidation

Each module service uses its own tag type for cache invalidation. For example:

- **Customers** mutations invalidate `["Customers"]`
- **Bookings** mutations invalidate `["Bookings"]`
- **Invoices** mutations invalidate `["Invoices"]`

This ensures that when you create, update, or delete a record, only the relevant data is refetched.

## API Base URL

The API base URL is determined from the environment variable `VITE_API_URL`. If not set, it defaults to `http://localhost:3000/api`:

```typescript
const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
```

Set the `VITE_API_URL` environment variable in your `.env` file:

```
VITE_API_URL=https://api.yourdomain.com
```

## Migration from Monolithic API

If migrating existing code from the old monolithic `api.ts`:

### Before:

```typescript
import { useGetCustomersQuery } from "../../services/api";
```

### After (Option 1 - Recommended):

```typescript
import { useGetCustomersQuery } from "../../services/modules/customersService";
```

### After (Option 2 - No changes needed):

```typescript
// Still works due to re-exports in api.ts
import { useGetCustomersQuery } from "../../services/api";
```

All existing imports continue to work without modification through the re-export system.

## Future Enhancements

- **Custom Hooks** - Create custom hooks that combine multiple service hooks
- **Request/Response Interceptors** - Add caching policies per module
- **Error Handling** - Implement centralized error handling per module
- **Optimistic Updates** - Add optimistic UI updates per module
- **Real-time Sync** - Integrate WebSocket support for live data

## File Sizes

- **Before**: Single `api.ts` ~500 lines
- **After**: 13 focused files totaling ~500 lines + baseApi configuration
- **Bundle Impact**: Minimal (tree-shaking optimizations)
- **Maintainability**: Significantly improved
