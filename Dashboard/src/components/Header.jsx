import React from "react";
import { Shield, Eye, Bell, Sun, Moon } from "lucide-react";
import { useApp } from "../context/AppContext";

const PAGE_TITLES = {
  dashboard:    { title: "Dashboard",    subtitle: "Here's your financial overview" },
  transactions: { title: "Transactions", subtitle: "Manage and track your money" },
  insights:     { title: "Insights",     subtitle: "Understand your spending patterns" },
};

const Header = () => {
  const { state, dispatch } = useApp();
  const { title, subtitle } = PAGE_TITLES[state.activeTab] || PAGE_TITLES.dashboard;

  const now     = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 0",
      marginBottom: "8px",
      flexWrap: "wrap",
      gap: "12px",
    }}>
      {/* Left: Page title */}
      <div style={{ paddingLeft: "2px" }}>
        <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.15 }}>
          {title}
        </h1>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "3px" }}>
          {dateStr} · {subtitle}
        </p>
      </div>

      {/* Right: Dark toggle + Role badge + notification + avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

        {/* ── Dark / Light mode toggle ── */}
        <button
          id="theme-toggle"
          aria-label="Toggle dark mode"
          onClick={() => dispatch({ type: "TOGGLE_DARK" })}
          className="theme-toggle"
          title={state.darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <span className={`theme-toggle-knob ${state.darkMode ? "dark" : "light"}`}>
            {state.darkMode
              ? <Moon  size={11} color="#fff" />
              : <Sun   size={11} color="#fff" />}
          </span>
        </button>

        {/* Notification bell */}
        <button style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          padding: "9px",
          cursor: "pointer",
          color: "var(--text-muted)",
          position: "relative",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)";   e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          <Bell size={16} />
          <span style={{
            position: "absolute", top: 6, right: 6,
            width: 7, height: 7, borderRadius: "50%",
            background: "var(--expense)",
            border: "1.5px solid var(--bg-card)",
          }} />
        </button>

        {/* Role badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: "7px",
          background: state.role === "admin" ? "rgba(99,102,241,0.12)" : "rgba(16,185,129,0.12)",
          border: `1px solid ${state.role === "admin" ? "rgba(99,102,241,0.25)" : "rgba(16,185,129,0.25)"}`,
          borderRadius: "10px",
          padding: "8px 14px",
          fontSize: "0.82rem",
          fontWeight: 700,
          color: state.role === "admin" ? "var(--accent)" : "var(--income)",
        }}>
          {state.role === "admin" ? <Shield size={14} /> : <Eye size={14} />}
          {state.role === "admin" ? "Admin Mode" : "Viewer Mode"}
        </div>

        {/* Avatar */}
        <div style={{
          width: 38, height: 38, borderRadius: "10px",
          background: "linear-gradient(135deg,#6366f1,#818cf8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: "0.9rem", color: "#fff",
          boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
          flexShrink: 0,
        }}>
          {state.role === "admin" ? "A" : "V"}
        </div>
      </div>
    </div>
  );
};

export default Header;
