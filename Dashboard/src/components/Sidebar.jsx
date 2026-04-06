import React, { useState } from "react";
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  DollarSign, LogOut, ChevronDown, Shield, Eye, Menu, X
} from "lucide-react";
import { useApp } from "../context/AppContext";

const NAV_ITEMS = [
  { id: "dashboard",     label: "Dashboard",     icon: LayoutDashboard },
  { id: "transactions",  label: "Transactions",  icon: ArrowLeftRight  },
  { id: "insights",      label: "Insights",       icon: Lightbulb       },
];

const SidebarContent = ({ onLogout, onClose }) => {
  const { state, dispatch } = useApp();
  const [roleOpen, setRoleOpen] = useState(false);

  const setTab  = (tab)  => { dispatch({ type: "SET_TAB",  payload: tab  }); onClose?.(); };
  const setRole = (role) => { dispatch({ type: "SET_ROLE", payload: role }); setRoleOpen(false); };

  return (
    <div
      style={{
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "24px 16px",
        gap: "6px",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 6px", marginBottom: "28px" }}>
        <div style={{
          background: "linear-gradient(135deg,#6366f1,#818cf8)",
          borderRadius: "10px", padding: "8px",
          boxShadow: "0 4px 14px rgba(99,102,241,0.35)"
        }}>
          <DollarSign size={18} color="#fff" />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text-primary)" }}>FinTech</div>
          <div style={{ fontSize: "0.65rem", color: "var(--text-faint)", marginTop: "-2px" }}>Tracker</div>
        </div>
        {onClose && (
          <button onClick={onClose} className="btn-ghost" style={{ marginLeft: "auto", padding: "4px 8px" }}>
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav label */}
      <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 8px", marginBottom: "4px" }}>
        Menu
      </div>

      {/* Nav Items */}
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`nav-item ${state.activeTab === item.id ? "active" : ""}`}
            onClick={() => setTab(item.id)}
          >
            <Icon size={17} />
            {item.label}
          </button>
        );
      })}

      {/* Spacer */}
      <div style={{ flex: 1 }} />
      <hr className="divider" style={{ marginBottom: "16px" }} />

      {/* Role Switcher */}
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 8px", marginBottom: "6px" }}>
          Active Role
        </div>
        <button
          className="btn-ghost"
          style={{ width: "100%", justifyContent: "space-between" }}
          onClick={() => setRoleOpen(!roleOpen)}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {state.role === "admin" ? <Shield size={15} color="var(--accent)" /> : <Eye size={15} color="var(--income)" />}
            <span style={{ color: state.role === "admin" ? "var(--accent)" : "var(--income)", fontWeight: 600 }}>
              {state.role === "admin" ? "Admin" : "Viewer"}
            </span>
          </span>
          <ChevronDown size={14} style={{ transform: roleOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        </button>

        {roleOpen && (
          <div style={{
            position: "absolute", bottom: "calc(100% + 8px)", left: 0, right: 0,
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "10px", overflow: "hidden", zIndex: 10,
            animation: "scaleIn 0.15s ease"
          }}>
            {[
              { value: "admin",  icon: Shield, label: "Admin",  color: "var(--accent)",  desc: "Full access" },
              { value: "viewer", icon: Eye,    label: "Viewer", color: "var(--income)",  desc: "Read only"   },
            ].map((r) => {
              const RIcon = r.icon;
              return (
                <button
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  style={{
                    width: "100%", background: state.role === r.value ? "rgba(255,255,255,0.04)" : "transparent",
                    border: "none", padding: "11px 14px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "10px", color: "var(--text-primary)",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.background = state.role === r.value ? "rgba(255,255,255,0.04)" : "transparent"}
                >
                  <RIcon size={15} color={r.color} />
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>{r.label}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-faint)" }}>{r.desc}</div>
                  </div>
                  {state.role === r.value && (
                    <div style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: r.color }} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="btn-ghost"
        style={{ width: "100%", marginTop: "8px", color: "var(--expense)", borderColor: "rgba(244,63,94,0.2)" }}
      >
        <LogOut size={15} />
        Logout
      </button>
    </div>
  );
};

const Sidebar = ({ onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div style={{ width: "220px", flexShrink: 0, height: "100vh", position: "sticky", top: 0 }}
           className="hidden lg:block">
        <SidebarContent onLogout={onLogout} />
      </div>

      {/* Mobile burger */}
      <button
        className="btn-ghost lg:hidden"
        style={{ position: "fixed", top: 16, left: 16, zIndex: 40, padding: "8px" }}
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
          <div style={{
            position: "fixed", top: 0, left: 0, bottom: 0, width: 240,
            zIndex: 40, animation: "fadeUp 0.2s ease"
          }}>
            <SidebarContent onLogout={onLogout} onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;