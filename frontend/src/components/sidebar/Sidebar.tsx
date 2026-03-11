export type MenuKey =
  | "dashboard"
  | "customers"
  | "bookings"
  | "invoices"
  | "payments"
  | "suppliers";

type SidebarProps = {
  active: MenuKey;
  onSelect: (key: MenuKey) => void;
};

const MENU: Array<{ key: MenuKey; label: string; icon: string }> = [
  { key: "dashboard", label: "Dashboard", icon: "01" },
  { key: "customers", label: "Customers", icon: "02" },
  { key: "bookings", label: "Bookings", icon: "03" },
  { key: "invoices", label: "Invoices", icon: "04" },
  { key: "payments", label: "Payments", icon: "05" },
  { key: "suppliers", label: "Suppliers", icon: "06" },
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
      <div className="sidebar-footer card">
        <span className="eyebrow-label">Workspace</span>
        <strong>Finance Control</strong>
        <p>
          Receivables, payables, and supplier settlements aligned in one view.
        </p>
      </div>
    </aside>
  );
}
