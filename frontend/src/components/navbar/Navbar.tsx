type NavbarProps = {
  title: string;
  userEmail?: string;
  onLogout: () => void;
};

export function Navbar({ title, userEmail, onLogout }: NavbarProps) {
  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>
        <p>{userEmail ?? ""}</p>
      </div>
      <button className="btn danger" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}
