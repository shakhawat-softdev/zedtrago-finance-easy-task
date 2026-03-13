import { Link, useMatchRoute } from "@tanstack/react-router";

const MENU: Array<{ path: string; label: string; icon: string }> = [
  { path: "/", label: "Dashboard", icon: "01" },
  { path: "/reporting", label: "Reporting", icon: "02" },
  { path: "/ledger", label: "Ledger", icon: "03" },
  { path: "/integrations", label: "Integrations", icon: "04" },
  { path: "/customers", label: "Customers", icon: "05" },
  { path: "/bookings", label: "Bookings", icon: "06" },
  { path: "/invoices", label: "Invoices", icon: "07" },
  { path: "/payments", label: "Payments", icon: "08" },
  { path: "/suppliers", label: "Suppliers", icon: "09" },
  { path: "/commissions", label: "Commissions", icon: "10" },
  { path: "/currency", label: "Currency", icon: "11" },
  { path: "/users", label: "Users", icon: "12" },
];

export function Sidebar() {
  const matchRoute = useMatchRoute();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-badge">ZT</div>
        <div>
          <div className="logo">Zedtrago</div>
          <p className="sidebar-caption">Travel finance operations</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        {MENU.map((item) => {
          const isActive = !!matchRoute({
            to: item.path,
            fuzzy: item.path === "/" ? false : true,
          });
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${isActive ? "active" : ""}`}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
