import { useState } from "react";
import { Navbar } from "./components/navbar/Navbar";
import { MenuKey, Sidebar } from "./components/sidebar/Sidebar";
import { useAuth } from "./hooks/useAuth";
import { BookingsPage } from "./pages/bookings/BookingsPage";
import { CommissionsPage } from "./pages/commissions/CommissionsPage";
import { CustomersPage } from "./pages/customers/CustomersPage";
import { CurrencyPage } from "./pages/currency/CurrencyPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { IntegrationsPage } from "./pages/integrations/IntegrationsPage";
import { InvoicesPage } from "./pages/invoices/InvoicesPage";
import { LedgerPage } from "./pages/ledger/LedgerPage";
import { LoginPage } from "./pages/login/LoginPage";
import { PaymentsPage } from "./pages/payments/PaymentsPage";
import { ReportingPage } from "./pages/reporting/ReportingPage";
import { SuppliersPage } from "./pages/suppliers/SuppliersPage";
import { UsersPage } from "./pages/users/UsersPage";
import { toastError, toastSuccess } from "./utils/notify";

const PAGE_META: Record<MenuKey, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Operations Dashboard",
    subtitle:
      "Monitor bookings, billing, collections, and supplier activity in one place.",
  },
  reporting: {
    title: "Finance Reporting",
    subtitle:
      "Review aging, tax, commissions, profitability, and ledger balances from dedicated reporting services.",
  },
  ledger: {
    title: "Ledger Operations",
    subtitle:
      "Inspect trial balance output and post balanced journal transactions from upstream business events.",
  },
  integrations: {
    title: "Integration Control",
    subtitle:
      "Review connector patterns and queue external sync jobs across booking, payment, and CRM channels.",
  },
  customers: {
    title: "Customer Portfolio",
    subtitle:
      "Manage agency profiles, commercial contacts, and preferred market settings.",
  },
  bookings: {
    title: "Booking Operations",
    subtitle:
      "Track customer bookings, supplier allocation, and travel movement data.",
  },
  invoices: {
    title: "Invoice Control",
    subtitle:
      "Issue, review, and monitor receivables tied to confirmed travel services.",
  },
  payments: {
    title: "Payment Tracking",
    subtitle:
      "Review captured payments, gateways, and collection timing across invoices.",
  },
  suppliers: {
    title: "Supplier Network",
    subtitle:
      "Maintain supplier relationships, settlement currencies, and integration modes.",
  },
  commissions: {
    title: "Commission Tracking",
    subtitle:
      "Manage supplier commission accruals and settlement readiness against booking events.",
  },
  currency: {
    title: "FX Rate Control",
    subtitle:
      "Maintain multi-currency conversion rates used by financial workflows and reporting.",
  },
  users: {
    title: "User Directory",
    subtitle:
      "Review platform access roles and update finance operations user details.",
  },
};

function App() {
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();
  const [active, setActive] = useState<MenuKey>("dashboard");
  const pageMeta = PAGE_META[active];

  if (!isAuthenticated) {
    return (
      <LoginPage
        loading={isLoading}
        onSubmit={async (email, password): Promise<void> => {
          try {
            await login({ email, password });
            toastSuccess("Login successful");
          } catch {
            toastError("Invalid credentials");
            throw new Error("Invalid credentials");
          }
          return;
        }}
      />
    );
  }

  return (
    <div className="app-shell">
      <Sidebar active={active} onSelect={setActive} />
      <main className="app-main">
        <div className="app-backdrop app-backdrop-one" />
        <div className="app-backdrop app-backdrop-two" />
        <Navbar
          title={pageMeta.title}
          subtitle={pageMeta.subtitle}
          userEmail={user?.email}
          onLogout={logout}
        />
        <section className="page-content">
          {active === "dashboard" && <DashboardPage />}
          {active === "reporting" && <ReportingPage />}
          {active === "ledger" && <LedgerPage />}
          {active === "integrations" && <IntegrationsPage />}
          {active === "customers" && <CustomersPage />}
          {active === "bookings" && <BookingsPage />}
          {active === "invoices" && <InvoicesPage />}
          {active === "payments" && <PaymentsPage />}
          {active === "suppliers" && <SuppliersPage />}
          {active === "commissions" && <CommissionsPage />}
          {active === "currency" && <CurrencyPage />}
          {active === "users" && <UsersPage />}
        </section>
      </main>
    </div>
  );
}

export default App;
