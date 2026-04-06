import React, { useState } from "react";
import { DollarSign, Mail, Lock, Eye, EyeOff, TrendingUp, Shield, Sun, Moon } from "lucide-react";

const LoginScreen = ({ onLogin, darkMode, toggleDark }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [email, setEmail]               = useState("demo@expensetracker.com");
  const [password, setPassword]         = useState("password123");

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate brief loading for UX
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 600);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-base)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Floating dark-mode toggle — top right */}
      <button
        id="login-theme-toggle"
        aria-label="Toggle dark mode"
        onClick={toggleDark}
        className="theme-toggle"
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        style={{ position: "absolute", top: "20px", right: "20px", zIndex: 2 }}
      >
        <span className={`theme-toggle-knob ${darkMode ? "dark" : "light"}`}>
          {darkMode ? <Moon size={11} color="#fff" /> : <Sun size={11} color="#fff" />}
        </span>
      </button>

      <div style={{
        position: "absolute", top: "-15%", left: "-10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", right: "-10%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Floating stat chips  */}
      <div style={{
        position: "absolute", top: "12%", left: "8%",
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "12px", padding: "10px 16px",
        display: "flex", alignItems: "center", gap: "8px",
        animation: "fadeUp 0.6s ease 0.2s both",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      }} className="hidden lg:flex">
        <TrendingUp size={15} color="var(--income)" />
        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 }}>Portfolio up <strong style={{ color: "var(--income)" }}>+12.4%</strong></span>
      </div>

      <div style={{
        position: "absolute", bottom: "14%", right: "8%",
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "12px", padding: "10px 16px",
        display: "flex", alignItems: "center", gap: "8px",
        animation: "fadeUp 0.6s ease 0.4s both",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      }} className="hidden lg:flex">
        <Shield size={15} color="var(--accent)" />
        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 }}>Bank-grade <strong style={{ color: "var(--accent)" }}>security</strong></span>
      </div>

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: "440px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "24px",
        padding: "40px 36px",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.08)",
        animation: "scaleIn 0.35s ease",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "56px", height: "56px", borderRadius: "16px",
            background: "linear-gradient(135deg, #6366f1, #818cf8)",
            boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
            marginBottom: "18px",
          }}>
            <DollarSign size={26} color="#fff" />
          </div>

          <h1 style={{
            fontSize: "1.65rem", fontWeight: 800,
            color: "var(--text-primary)", letterSpacing: "-0.02em",
            lineHeight: 1.15, marginBottom: "8px",
          }}>
            FinTech Tracker
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            Sign in to manage your finances
          </p>
        </div>

        {/* Demo hint */}
        <div style={{
          background: "rgba(99,102,241,0.08)",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: "10px", padding: "10px 14px",
          fontSize: "0.78rem", color: "var(--text-muted)",
          marginBottom: "24px", textAlign: "center",
        }}>
          🔑 Demo credentials are pre-filled — just click Sign In
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

          {/* Email */}
          <div>
            <label style={{
              display: "block", fontSize: "0.78rem", fontWeight: 600,
              color: "var(--text-muted)", marginBottom: "7px", letterSpacing: "0.02em",
            }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={15} style={{
                position: "absolute", left: "12px", top: "50%",
                transform: "translateY(-50%)", color: "var(--text-faint)",
                pointerEvents: "none",
              }} />
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-dark"
                style={{ paddingLeft: "36px" }}
                placeholder="you@example.com"
                id="login-email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{
              display: "block", fontSize: "0.78rem", fontWeight: 600,
              color: "var(--text-muted)", marginBottom: "7px", letterSpacing: "0.02em",
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={15} style={{
                position: "absolute", left: "12px", top: "50%",
                transform: "translateY(-50%)", color: "var(--text-faint)",
                pointerEvents: "none",
              }} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="login-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-dark"
                style={{ paddingLeft: "36px", paddingRight: "40px" }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: "10px", top: "50%",
                  transform: "translateY(-50%)", background: "none",
                  border: "none", cursor: "pointer",
                  color: "var(--text-faint)", padding: "4px",
                  display: "flex", alignItems: "center",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--text-muted)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--text-faint)"}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div style={{ textAlign: "right", marginTop: "-10px" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--accent)", cursor: "pointer", fontWeight: 500 }}>
              Forgot password?
            </span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            id="login-submit"
            disabled={isLoading}
            style={{
              width: "100%", padding: "13px",
              background: isLoading
                ? "rgba(99,102,241,0.5)"
                : "linear-gradient(135deg, #6366f1, #4f46e5)",
              color: "#fff", border: "none", borderRadius: "10px",
              fontSize: "0.9rem", fontWeight: 700, cursor: isLoading ? "wait" : "pointer",
              boxShadow: isLoading ? "none" : "0 6px 20px rgba(99,102,241,0.4)",
              transition: "all 0.2s", letterSpacing: "0.01em",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            }}
            onMouseEnter={e => { if (!isLoading) e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {isLoading ? (
              <>
                <svg style={{ animation: "spin 0.8s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Signing in…
              </>
            ) : (
              "Sign in to Dashboard →"
            )}
          </button>
        </form>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--text-faint)", marginTop: "24px" }}>
          Protected by 256-bit AES encryption · Demo only
        </p>
      </div>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default LoginScreen;
