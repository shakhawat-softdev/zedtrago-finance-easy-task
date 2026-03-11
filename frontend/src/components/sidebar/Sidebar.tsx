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

const MENU: Array<{ key: MenuKey; label: string }> = [
  { key: "dashboard", label: "Dashboard" },
  { key: "customers", label: "Customers" },
  { key: "bookings", label: "Bookings" },
  { key: "invoices", label: "Invoices" },
  { key: "payments", label: "Payments" },
  { key: "suppliers", label: "Suppliers" },
];

export function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="logo">Zedtrago</div>
      <nav>
        {MENU.map((item) => (
          <button
            key={item.key}
            className={`menu-item ${active === item.key ? "active" : ""}`}
            onClick={() => onSelect(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
