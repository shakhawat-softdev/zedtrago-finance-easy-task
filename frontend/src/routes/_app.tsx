import { createRoute, Outlet, redirect } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import { Navbar } from "../components/navbar/Navbar";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useAuth } from "../hooks/useAuth";
import { useRouterState } from "@tanstack/react-router";

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Operations Dashboard",
    subtitle:
      "Monitor bookings, billing, collections, and supplier activity in one place.",
  },
  "/reporting": {
    title: "Finance Reporting",
    subtitle:
      "Review aging, tax, commissions, profitability, and ledger balances.",
  },
  "/ledger": {
    title: "Ledger Operations",
    subtitle:
      "Inspect trial balance output and post balanced journal transactions.",
  },
  "/integrations": {
    title: "Integration Control",
    subtitle:
      "Review connector patterns and queue external sync jobs across channels.",
  },
  "/customers": {
    title: "Customer Portfolio",
    subtitle:
      "Manage agency profiles, commercial contacts, and preferred market settings.",
  },
  "/bookings": {
    title: "Booking Operations",
    subtitle:
      "Track customer bookings, supplier allocation, and travel movement data.",
  },
  "/invoices": {
    title: "Invoice Control",
    subtitle:
      "Issue, review, and monitor receivables tied to confirmed travel services.",
  },
  "/payments": {
    title: "Payment Tracking",
    subtitle:
      "Review captured payments, gateways, and collection timing across invoices.",
  },
  "/suppliers": {
    title: "Supplier Network",
    subtitle:
      "Maintain supplier relationships, settlement currencies, and integration modes.",
  },
  "/commissions": {
    title: "Commission Tracking",
    subtitle: "Manage supplier commission accruals and settlement readiness.",
  },
  "/currency": {
    title: "FX Rate Control",
    subtitle:
      "Maintain multi-currency conversion rates for financial workflows.",
  },
  "/users": {
    title: "User Directory",
    subtitle:
      "Review platform access roles and update finance operations user details.",
  },
};

function AppLayout() {
  const { user, logout } = useAuth();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const meta = PAGE_META[pathname] ?? PAGE_META["/"];

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <div className="app-backdrop app-backdrop-one" />
        <div className="app-backdrop app-backdrop-two" />
        <Navbar
          title={meta.title}
          subtitle={meta.subtitle}
          userEmail={user?.email}
          onLogout={logout}
        />
        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  id: "_app",
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: AppLayout,
});
