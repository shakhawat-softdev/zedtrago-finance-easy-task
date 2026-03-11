import React from "react";

interface NavItem {
  label: string;
  page: string;
  icon: string;
}

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const primaryNav: NavItem[] = [
    { label: "Overview", page: "home", icon: "🏠" },
    { label: "Dashboard", page: "dashboard", icon: "📊" },
    { label: "Modules", page: "modules", icon: "🔧" },
    { label: "Architecture", page: "architecture", icon: "🏗️" },
  ];

  const secondaryNav: NavItem[] = [
    { label: "Database", page: "database", icon: "🗄️" },
    { label: "API Reference", page: "api-reference", icon: "📘" },
    { label: "Roadmap", page: "roadmap", icon: "🗺️" },
  ];

  const allNav = [...primaryNav, ...secondaryNav];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-icon">⚙️</span>
          <span className="brand-text">Zedtrago</span>
        </div>

        <ul className="nav-menu">
          {allNav.map((item) => (
            <li key={item.page}>
              <button
                className={`nav-link ${currentPage === item.page ? "active" : ""}`}
                onClick={() => onNavigate(item.page)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a
            href="http://localhost:3000/api/docs"
            target="_blank"
            rel="noreferrer"
            className="nav-link-external"
          >
            Swagger
          </a>
        </div>
      </div>

      <style>{`
        .navigation {
          position: sticky;
          top: 0;
          backdrop-filter: blur(12px);
          background: rgba(247, 239, 230, 0.8);
          border-bottom: 1px solid var(--border);
          z-index: 100;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          height: 64px;
          gap: 16px;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 1.2rem;
          color: #0f1d2e;
          cursor: pointer;
          flex-shrink: 0;
        }

        .brand-icon {
          font-size: 1.4rem;
        }

        .brand-text {
          background: linear-gradient(135deg, #0b7285, #ef8354);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 0;
          margin: 0;
          padding: 0;
          flex: 1;
          flex-wrap: wrap;
          align-items: center;
        }

        .nav-menu li {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border: none;
          background: none;
          color: #31455f;
          font-weight: 500;
          cursor: pointer;
          font-size: 0.88rem;
          transition: all 0.2s;
          position: relative;
          border-radius: 8px;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #0b7285;
          background: rgba(11, 114, 133, 0.07);
        }

        .nav-link.active {
          color: #0b7285;
          font-weight: 600;
          background: rgba(11, 114, 133, 0.1);
        }

        .nav-icon {
          font-size: 1rem;
        }

        .nav-actions {
          flex-shrink: 0;
        }

        .nav-link-external {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: linear-gradient(135deg, #0b7285, #195b73);
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.88rem;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .nav-link-external:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(11, 114, 133, 0.3);
        }

        @media (max-width: 768px) {
          .nav-container {
            flex-wrap: wrap;
            height: auto;
            padding: 12px 16px;
          }

          .nav-brand {
            width: 100%;
          }

          .nav-menu {
            width: 100%;
            gap: 2px;
          }

          .nav-link {
            padding: 7px 10px;
            font-size: 0.82rem;
          }

          .nav-actions {
            width: 100%;
          }

          .nav-link-external {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
