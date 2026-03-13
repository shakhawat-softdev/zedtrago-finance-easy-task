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
          <div className="auth-brand-row">
            <span className="eyebrow-label">Zedtrago Platform</span>
            <span className="auth-security-pill">Secure Access</span>
          </div>
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
            <h3>Sign In</h3>
            <p className="auth-panel-copy">
              Use your finance operations credentials to continue.
            </p>
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="finance@zedtrago.com"
              required
            />
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
            />
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Enter Workspace"}
            </button>
          </div>

          <aside className="auth-note">
            <h3>Finance Command Center</h3>
            <p>
              Centralize receivables, payables, reconciliations, and reporting
              with a secure workspace designed for daily finance operations.
            </p>

            <div className="auth-credential">
              <span>Compliance Coverage</span>
              <strong>SST (MY) and GST (AU) Ready</strong>
            </div>
            <div className="auth-credential">
              <span>Service Reliability</span>
              <strong>Continuous API Monitoring Enabled</strong>
            </div>

            <ul className="auth-feature-list">
              <li>Role-based access for finance teams</li>
              <li>Real-time booking to ledger visibility</li>
              <li>Audit-ready transaction lifecycle records</li>
            </ul>
          </aside>
        </div>
      </form>
    </div>
  );
}
