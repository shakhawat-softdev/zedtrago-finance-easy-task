import { Route as RootRoute } from "./routes/__root";
import { Route as LoginRoute } from "./routes/login";
import { Route as AppRoute } from "./routes/_app";
import { Route as IndexRoute } from "./routes/index";
import { Route as ReportingRoute } from "./routes/reporting";
import { Route as LedgerRoute } from "./routes/ledger";
import { Route as IntegrationsRoute } from "./routes/integrations";
import { Route as CustomersRoute } from "./routes/customers";
import { Route as BookingsRoute } from "./routes/bookings";
import { Route as InvoicesRoute } from "./routes/invoices";
import { Route as PaymentsRoute } from "./routes/payments";
import { Route as SuppliersRoute } from "./routes/suppliers";
import { Route as CommissionsRoute } from "./routes/commissions";
import { Route as CurrencyRoute } from "./routes/currency";
import { Route as UsersRoute } from "./routes/users";

const appWithChildren = AppRoute.addChildren([
  IndexRoute,
  ReportingRoute,
  LedgerRoute,
  IntegrationsRoute,
  CustomersRoute,
  BookingsRoute,
  InvoicesRoute,
  PaymentsRoute,
  SuppliersRoute,
  CommissionsRoute,
  CurrencyRoute,
  UsersRoute,
]);

export const routeTree = RootRoute.addChildren([LoginRoute, appWithChildren]);
