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
        <h2>Sign in</h2>
        <p>Connect frontend with backend API (RTK Query)</p>
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
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
