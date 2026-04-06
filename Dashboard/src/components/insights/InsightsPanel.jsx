import React, { useMemo } from "react";
import { TrendingUp, TrendingDown, Trophy, AlertTriangle, Star } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { getMonthlyData, getCategoryTotals } from "../../data/mockData";

const fmt = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const PALETTE = ["#6366f1","#10b981","#f59e0b","#f43f5e","#3b82f6","#8b5cf6","#ec4899","#14b8a6"];

const InsightsPanel = () => {
  const { state } = useApp();
  const { transactions } = state;

  const monthly    = useMemo(() => getMonthlyData(transactions), [transactions]);
  const catTotals  = useMemo(() => getCategoryTotals(transactions), [transactions]);

  // Top spending category
  const topCat     = catTotals[0];

  // Latest 2 months for comparison
  const lastM      = monthly[monthly.length - 1];
  const prevM      = monthly[monthly.length - 2];
  const expenseDelta = lastM && prevM ? lastM.expense - prevM.expense : null;
  const expenseDeltaPct = prevM?.expense ? ((expenseDelta / prevM.expense) * 100).toFixed(1) : null;

  // Savings score
  const totalIncome  = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const savingsRate  = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  const scoreColor = savingsRate >= 20 ? "var(--income)" : savingsRate >= 0 ? "#f59e0b" : "var(--expense)";
  const scoreIcon  = savingsRate >= 20 ? Trophy : savingsRate >= 0 ? Star : AlertTriangle;
  const ScoreIcon  = scoreIcon;

  // Bar chart max
  const maxExp = Math.max(...(monthly.map(m => m.expense) || [1]));
  const maxInc = Math.max(...(monthly.map(m => m.income)  || [1]));
  const barMax = Math.max(maxExp, maxInc, 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Row 1: Key insight cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>

        {/* Top spending category */}
        {topCat && (
          <div className="card animate-fadeUp delay-1" style={{ padding: "20px" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
              🏆 Highest Spend Category
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--expense)", marginBottom: "6px" }}>
              {topCat.category}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {fmt(topCat.amount)} total spent
            </div>
            <div style={{ marginTop: "10px", background: "var(--bg-base)", borderRadius: "6px", height: 6 }}>
              <div style={{
                width: `${Math.min((topCat.amount / totalExpense) * 100, 100).toFixed(1)}%`,
                height: "100%", borderRadius: "6px",
                background: "linear-gradient(90deg, var(--expense), #fb7185)",
                transition: "width 0.6s ease",
              }} />
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-faint)", marginTop: "5px" }}>
              {((topCat.amount / totalExpense) * 100).toFixed(1)}% of total expenses
            </div>
          </div>
        )}

        {/* Monthly expense change */}
        {expenseDelta !== null && (
          <div className="card animate-fadeUp delay-2" style={{ padding: "20px" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
              📊 Month-Over-Month
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
              {expenseDelta > 0
                ? <TrendingUp size={20} color="var(--expense)" />
                : <TrendingDown size={20} color="var(--income)" />}
              <span style={{ fontSize: "1.5rem", fontWeight: 800, color: expenseDelta > 0 ? "var(--expense)" : "var(--income)" }}>
                {expenseDelta > 0 ? "+" : ""}{expenseDeltaPct}%
              </span>
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
              Expenses {expenseDelta > 0 ? "increased" : "decreased"} from{" "}
              <strong>{prevM.month}</strong> to <strong>{lastM.month}</strong>
            </div>
            <div style={{ marginTop: "8px", fontSize: "0.75rem", color: "var(--text-faint)" }}>
              {prevM.month}: {fmt(prevM.expense)} → {lastM.month}: {fmt(lastM.expense)}
            </div>
          </div>
        )}

        {/* Savings score */}
        <div className="card animate-fadeUp delay-3" style={{ padding: "20px" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
            💰 Savings Score
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <ScoreIcon size={20} color={scoreColor} />
            <span style={{ fontSize: "1.5rem", fontWeight: 800, color: scoreColor }}>
              {savingsRate.toFixed(1)}%
            </span>
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {savingsRate >= 30 ? "Excellent! You're well above the 20% benchmark."
             : savingsRate >= 20 ? "Good savings rate — keep it up!"
             : savingsRate >= 0  ? "Below 20% target. Try cutting non-essentials."
             :                     "You're spending more than you earn!"}
          </div>
          {/* Arc */}
          <div style={{ marginTop: "10px", background: "var(--bg-base)", borderRadius: "6px", height: 6 }}>
            <div style={{
              width: `${Math.min(Math.max(savingsRate, 0), 100).toFixed(1)}%`,
              height: "100%", borderRadius: "6px",
              background: `linear-gradient(90deg, ${scoreColor}, #fff2)`,
              transition: "width 0.6s ease",
            }} />
          </div>
        </div>
      </div>

      {/* Monthly comparison bar chart */}
      <div className="card animate-fadeUp delay-4" style={{ padding: "24px" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "4px" }}>Monthly Comparison</h2>
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "20px" }}>Income vs Expenses per month</p>

        {monthly.length === 0 ? (
          <div className="empty-state"><p>No monthly data available.</p></div>
        ) : (
          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "160px", overflow: "hidden" }}>
            {monthly.map((m) => (
              <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%", justifyContent: "flex-end" }}>
                {/* Bars */}
                <div style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: "120px", width: "100%" }}>
                  <div style={{
                    flex: 1, borderRadius: "4px 4px 0 0",
                    height: `${(m.income / barMax) * 100}%`,
                    background: "var(--income)", opacity: 0.85, minHeight: 4,
                    transition: "height 0.5s ease",
                  }} title={`Income: ${fmt(m.income)}`} />
                  <div style={{
                    flex: 1, borderRadius: "4px 4px 0 0",
                    height: `${(m.expense / barMax) * 100}%`,
                    background: "var(--expense)", opacity: 0.85, minHeight: 4,
                    transition: "height 0.5s ease",
                  }} title={`Expense: ${fmt(m.expense)}`} />
                </div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-faint)", fontWeight: 600 }}>{m.month}</div>
              </div>
            ))}
          </div>
        )}

        {/* Legend */}
        <div style={{ display: "flex", gap: "20px", marginTop: "14px" }}>
          {[{c:"var(--income)", l:"Income"}, {c:"var(--expense)", l:"Expense"}].map(l => (
            <div key={l.l} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: 10, height: 10, borderRadius: "3px", background: l.c }} />
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{l.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category breakdown table */}
      <div className="card animate-fadeUp delay-5" style={{ padding: "24px" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "4px" }}>Expense Breakdown by Category</h2>
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "16px" }}>All-time spending analysis</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {catTotals.map((d, i) => (
            <div key={d.category}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "3px", background: PALETTE[i % PALETTE.length] }} />
                  <span style={{ fontSize: "0.82rem", fontWeight: 500 }}>{d.category}</span>
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>{fmt(d.amount)}</span>
              </div>
              <div style={{ background: "var(--bg-base)", borderRadius: "99px", height: 5 }}>
                <div style={{
                  height: "100%", borderRadius: "99px",
                  width: `${((d.amount / totalExpense) * 100).toFixed(1)}%`,
                  background: PALETTE[i % PALETTE.length],
                  transition: "width 0.6s ease",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;
