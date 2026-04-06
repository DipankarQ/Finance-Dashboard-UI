import React, { useMemo } from "react";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import { useApp } from "../../context/AppContext";

const CARDS = [
  {
    id: "balance",
    label: "Total Balance",
    icon: Wallet,
    color: "var(--accent)",
    bg: "rgba(99,102,241,0.12)",
    border: "rgba(99,102,241,0.25)",
    format: "currency",
  },
  {
    id: "income",
    label: "Total Income",
    icon: TrendingUp,
    color: "var(--income)",
    bg: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.25)",
    format: "currency",
  },
  {
    id: "expense",
    label: "Total Expenses",
    icon: TrendingDown,
    color: "var(--expense)",
    bg: "rgba(244,63,94,0.12)",
    border: "rgba(244,63,94,0.25)",
    format: "currency",
  },
  {
    id: "savingsRate",
    label: "Savings Rate",
    icon: PiggyBank,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.25)",
    format: "percent",
  },
];

const fmt = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const SummaryCards = () => {
  const { state } = useApp();

  const stats = useMemo(() => {
    const { transactions } = state;
    const income  = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const balance = income - expense;
    const savingsRate = income > 0 ? Math.round(((income - expense) / income) * 100) : 0;
    return { balance, income, expense, savingsRate };
  }, [state]);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
    }}>
      {CARDS.map((card, i) => {
        const Icon = card.icon;
        const value = stats[card.id];
        const display = card.format === "currency" ? fmt(value) : `${value}%`;

        return (
          <div
            key={card.id}
            className={`card animate-fadeUp delay-${i + 1}`}
            style={{ padding: "20px", position: "relative", overflow: "hidden" }}
          >
            {/* Background glow */}
            <div style={{
              position: "absolute", top: -20, right: -20,
              width: 100, height: 100, borderRadius: "50%",
              background: card.bg, filter: "blur(24px)", pointerEvents: "none",
            }} />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {card.label}
              </div>
              <div style={{
                background: card.bg, border: `1px solid ${card.border}`,
                borderRadius: "8px", padding: "7px",
              }}>
                <Icon size={16} color={card.color} />
              </div>
            </div>

            <div className="stat-num" style={{ color: card.color }}>
              {display}
            </div>

            {/* Subtle divider + label */}
            <div style={{ marginTop: "10px", fontSize: "0.72rem", color: "var(--text-faint)" }}>
              {card.id === "balance"     && `${state.transactions.length} transactions total`}
              {card.id === "income"      && `From ${state.transactions.filter(t => t.type === "income").length} income entries`}
              {card.id === "expense"     && `From ${state.transactions.filter(t => t.type === "expense").length} expense entries`}
              {card.id === "savingsRate" && (value >= 20 ? "🎉 Great savings!" : value >= 0 ? "Keep it up!" : "⚠️ Overspending")}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
