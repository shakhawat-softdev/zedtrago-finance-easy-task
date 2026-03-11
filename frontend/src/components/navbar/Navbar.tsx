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

  return (
    <header className="topbar">
      <div className="topbar-copy">
        <span className="eyebrow-label">Zedtrago Finance Workspace</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="topbar-meta">
        <div className="meta-chip">
          <span className="meta-chip-label">Signed in</span>
          <strong>{userEmail ?? "Finance User"}</strong>
        </div>
        <div className="meta-chip muted">
          <span className="meta-chip-label">Today</span>
          <strong>{today}</strong>
        </div>
        <button className="btn danger" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
