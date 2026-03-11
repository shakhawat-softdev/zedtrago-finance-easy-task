import { FormEvent, useState } from "react";

type LoginPageProps = {
  loading: boolean;
  onSubmit: (email: string, password: string) => Promise<void>;
};

export function LoginPage({ loading, onSubmit }: LoginPageProps) {
  const [email, setEmail] = useState("finance@zedtrago.com");
  const [password, setPassword] = useState("Passw0rd!");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await onSubmit(email, password);
    } catch {
      // Toast is handled in App.tsx for consistent global notifications.
    }
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-intro">
          <span className="eyebrow-label">Zedtrago Platform</span>
          <h2>
            Professional finance workspace for multi-service travel operations.
          </h2>
          <p>
            Access live booking, invoice, payment, and supplier workflows from a
            streamlined control surface connected to the backend API.
          </p>
        </div>

        <div className="auth-grid">
          <div className="auth-panel">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Enter Workspace"}
            </button>
          </div>

          <div className="auth-note">
            <strong>Demo Access</strong>
            <p>
              Use the seeded finance credentials to review the connected
              frontend experience.
            </p>
            <div className="auth-credential">
              <span>Email</span>
              <strong>finance@zedtrago.com</strong>
            </div>
            <div className="auth-credential">
              <span>Password</span>
              <strong>Passw0rd!</strong>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
