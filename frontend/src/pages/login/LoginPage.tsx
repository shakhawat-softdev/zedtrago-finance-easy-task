import { FormEvent, useState } from "react";

type LoginPageProps = {
  loading: boolean;
  onSubmit: (email: string, password: string) => Promise<void>;
};

export function LoginPage({ loading, onSubmit }: LoginPageProps) {
  const [email, setEmail] = useState("finance@zedtrago.com");
  const [password, setPassword] = useState("Passw0rd!");
  const [rememberMe, setRememberMe] = useState(true);

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
            Finance operations workspace for high-volume travel businesses.
          </h2>
          <p>
            Access receivables, payables, reconciliations, and compliance
            reporting from a secure control center connected to live operational
            data.
          </p>
          <div className="auth-stat-row">
            <div className="auth-stat">
              <span>Settlement Visibility</span>
              <strong>Live Gateway and Ledger Sync</strong>
            </div>
            <div className="auth-stat">
              <span>Tax Readiness</span>
              <strong>SST and GST Coverage</strong>
            </div>
          </div>
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
              autoComplete="email"
            />
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />

            <div className="auth-row-inline">
              <label className="auth-checkbox-label" htmlFor="remember-me">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Keep me signed in on this device
              </label>
              <span className="auth-help-text">Need help? Contact Admin</span>
            </div>

            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Enter Workspace"}
            </button>

            <p className="auth-footnote">
              Protected with token-based authentication and role-aware access
              control.
            </p>
          </div>

          <aside className="auth-note">
            <h3>Finance Command Center</h3>
            <p>
              Built for finance teams that operate across bookings, invoicing,
              collections, supplier settlements, and audit workflows.
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
