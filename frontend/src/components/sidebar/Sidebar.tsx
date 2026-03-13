import { Link, useMatchRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

const MENU_SECTIONS: Array<{
  title: string;
  items: Array<{ path: string; label: string }>;
}> = [
  {
    title: "Overview",
    items: [
      { path: "/", label: "Dashboard" },
      { path: "/reporting", label: "Reporting" },
      { path: "/ledger", label: "Ledger" },
      { path: "/integrations", label: "Integrations" },
    ],
  },
  {
    title: "Operations",
    items: [
      { path: "/customers", label: "Customers" },
      { path: "/bookings", label: "Bookings" },
      { path: "/invoices", label: "Invoices" },
      { path: "/payments", label: "Payments" },
      { path: "/suppliers", label: "Suppliers" },
      { path: "/commissions", label: "Commissions" },
      { path: "/currency", label: "Currency" },
    ],
  },
  {
    title: "Administration",
    items: [{ path: "/users", label: "Users" }],
  },
];

export function Sidebar() {
  const matchRoute = useMatchRoute();

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    Overview: true,
    Operations: false,
    Administration: false,
  });

  const activeSection = useMemo(() => {
    for (const section of MENU_SECTIONS) {
      for (const item of section.items) {
        const isActive = !!matchRoute({
          to: item.path,
          fuzzy: item.path === "/" ? false : true,
        });
        if (isActive) return section.title;
      }
    }
    return "Overview";
  }, [matchRoute]);

  useEffect(() => {
    setExpandedSections((prev) => ({
      ...prev,
      [activeSection]: true,
    }));
  }, [activeSection]);

  function toggleSection(title: string) {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-badge">ZT</div>
        <div>
          <div className="logo">Zedtrago</div>
          <p className="sidebar-caption">Travel finance operations</p>
        </div>
      </div>
      {MENU_SECTIONS.map((section) => (
        <div key={section.title} className="sidebar-section">
          <button
            className="sidebar-section-toggle"
            type="button"
            onClick={() => toggleSection(section.title)}
            aria-expanded={!!expandedSections[section.title]}
          >
            <h4 className="sidebar-section-title">{section.title}</h4>
            <span className="sidebar-section-caret" aria-hidden="true">
              {expandedSections[section.title] ? "-" : "+"}
            </span>
          </button>
          <nav
            className={`sidebar-nav ${
              expandedSections[section.title] ? "" : "collapsed"
            }`}
          >
            {section.items.map((item) => {
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
                  <span className="menu-text">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </aside>
  );
}
