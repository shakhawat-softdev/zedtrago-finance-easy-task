export type MenuKey =
  | "dashboard"
  | "reporting"
  | "ledger"
  | "integrations"
  | "customers"
  | "bookings"
  | "invoices"
  | "payments"
  | "suppliers"
  | "commissions"
  | "currency"
  | "users";

type SidebarProps = {
  active: MenuKey;
  onSelect: (key: MenuKey) => void;
};

const MENU: Array<{ key: MenuKey; label: string; icon: string }> = [
  { key: "dashboard", label: "Dashboard", icon: "01" },
  { key: "reporting", label: "Reporting", icon: "02" },
  { key: "ledger", label: "Ledger", icon: "03" },
  { key: "integrations", label: "Integrations", icon: "04" },
  { key: "customers", label: "Customers", icon: "05" },
  { key: "bookings", label: "Bookings", icon: "06" },
  { key: "invoices", label: "Invoices", icon: "07" },
  { key: "payments", label: "Payments", icon: "08" },
  { key: "suppliers", label: "Suppliers", icon: "09" },
  { key: "commissions", label: "Commissions", icon: "10" },
  { key: "currency", label: "Currency", icon: "11" },
  { key: "users", label: "Users", icon: "12" },
];

export function Sidebar({ active, onSelect }: SidebarProps) {
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
        {MENU.map((item) => (
          <button
            key={item.key}
            className={`menu-item ${active === item.key ? "active" : ""}`}
            onClick={() => onSelect(item.key)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
