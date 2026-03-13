type NavbarProps = {
  title: string;
  subtitle: string;
  userEmail?: string;
  onLogout: () => void;
};

export function Navbar({ title, subtitle, userEmail, onLogout }: NavbarProps) {
  const today = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());
  const userLabel = userEmail ?? "Finance User";
  const userInitial = userLabel.charAt(0).toUpperCase();

  return (
    <header className="topbar">
      <div className="topbar-copy topbar-head">
        <div className="topbar-eyebrow-row">
          <span className="eyebrow-label">Zedtrago Finance Workspace</span>
          <span className="topbar-live-pill">Live Console</span>
        </div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="topbar-meta">
        <div className="meta-chip">
          <span className="meta-chip-label">Signed in</span>
          <strong>{userLabel}</strong>
        </div>
        <div className="meta-chip muted">
          <span className="meta-chip-label">Today</span>
          <strong>{today}</strong>
        </div>
        <div className="topbar-user-avatar" aria-hidden="true">
          {userInitial}
        </div>
        <button className="btn danger" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
