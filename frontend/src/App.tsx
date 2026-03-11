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

function App() {
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();
  const [active, setActive] = useState<MenuKey>("dashboard");

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
        <Navbar
          title="Zedtrago Ops Console"
          userEmail={user?.email}
          onLogout={logout}
        />
        <section>
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
