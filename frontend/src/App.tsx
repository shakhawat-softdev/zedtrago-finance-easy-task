import { useState } from "react";
import { Navbar } from "./components/navbar/Navbar";
import { MenuKey, Sidebar } from "./components/sidebar/Sidebar";
import { useAuth } from "./hooks/useAuth";
import { BookingsPage } from "./pages/bookings/BookingsPage";
import { CustomersPage } from "./pages/customers/CustomersPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { InvoicesPage } from "./pages/invoices/InvoicesPage";
import { LoginPage } from "./pages/login/LoginPage";
import { PaymentsPage } from "./pages/payments/PaymentsPage";
import { SuppliersPage } from "./pages/suppliers/SuppliersPage";
import { toastError, toastSuccess } from "./utils/notify";

const PAGE_META: Record<MenuKey, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Operations Dashboard",
    subtitle:
      "Monitor bookings, billing, collections, and supplier activity in one place.",
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
          {active === "customers" && <CustomersPage />}
          {active === "bookings" && <BookingsPage />}
          {active === "invoices" && <InvoicesPage />}
          {active === "payments" && <PaymentsPage />}
          {active === "suppliers" && <SuppliersPage />}
        </section>
      </main>
    </div>
  );
}

export default App;
