import React, { useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { getMonthlyData } from "../../data/mockData";

const W = 600, H = 200, PAD = { top: 20, right: 20, bottom: 36, left: 52 };
const CHART_W = W - PAD.left - PAD.right;
const CHART_H = H - PAD.top  - PAD.bottom;

const BalanceTrendChart = () => {
  const { state } = useApp();

  const monthly = useMemo(() => getMonthlyData(state.transactions), [state.transactions]);

  if (monthly.length < 2) {
    return (
      <div className="card animate-fadeUp delay-2" style={{ padding: "24px" }}>
        <p style={{ color: "var(--text-faint)", fontSize: "0.875rem" }}>Not enough data for trend.</p>
      </div>
    );
  }

  const balances  = monthly.map((m) => m.balance);
  const incomes   = monthly.map((m) => m.income);
  const expenses  = monthly.map((m) => m.expense);

  const allVals   = [...balances, ...incomes, ...expenses];
  const minVal    = Math.min(...allVals);
  const maxVal    = Math.max(...allVals);
  const range     = maxVal - minVal || 1;

  const xStep = CHART_W / (monthly.length - 1);
  const toX = (i) => PAD.left + i * xStep;
  const toY = (v) => PAD.top + CHART_H - ((v - minVal) / range) * CHART_H;

  const makePath = (values) =>
    values.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(" ");

  const makeArea = (values) => {
    const line    = values.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(" ");
    const bottom  = ` L ${toX(values.length - 1).toFixed(1)} ${(PAD.top + CHART_H).toFixed(1)} L ${PAD.left.toFixed(1)} ${(PAD.top + CHART_H).toFixed(1)} Z`;
    return line + bottom;
  };

  // Y-axis ticks
  const yTicks = 4;
  const yLabels = Array.from({ length: yTicks + 1 }, (_, i) => {
    const v = minVal + (range * i) / yTicks;
    return { y: toY(v), label: v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${Math.round(v)}` };
  });

  const fmt = (n) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="card animate-fadeUp delay-2" style={{ padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Balance Trend</h2>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>Monthly income vs. expenses vs. net</p>
        </div>
        {/* Legend */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {[
            { color: "var(--income)", label: "Income"  },
            { color: "var(--expense)", label: "Expense" },
            { color: "var(--accent)", label: "Balance" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{ width: 10, height: 3, borderRadius: "2px", background: l.color }} />
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Chart */}
      <div style={{ overflowX: "auto" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", minWidth: 320 }}>
          <defs>
            <linearGradient id="grad-income" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(16,185,129,0.25)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0)" />
            </linearGradient>
            <linearGradient id="grad-expense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(244,63,94,0.15)" />
              <stop offset="100%" stopColor="rgba(244,63,94,0)" />
            </linearGradient>
            <linearGradient id="grad-balance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(99,102,241,0.25)" />
              <stop offset="100%" stopColor="rgba(99,102,241,0)" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yLabels.map((t, i) => (
            <g key={i}>
              <line x1={PAD.left} y1={t.y} x2={W - PAD.right} y2={t.y}
                stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 3" />
              <text x={PAD.left - 6} y={t.y + 4} textAnchor="end"
                fill="rgba(148,163,184,0.8)" fontSize="10">{t.label}</text>
            </g>
          ))}

          {/* Area fills */}
          <path d={makeArea(incomes)}  fill="url(#grad-income)"  />
          <path d={makeArea(expenses)} fill="url(#grad-expense)" />
          <path d={makeArea(balances)} fill="url(#grad-balance)" />

          {/* Lines */}
          <path d={makePath(incomes)}  fill="none" stroke="var(--income)"  strokeWidth="2" />
          <path d={makePath(expenses)} fill="none" stroke="var(--expense)" strokeWidth="2" />
          <path d={makePath(balances)} fill="none" stroke="var(--accent)"  strokeWidth="2.5" />

          {/* Dots */}
          {monthly.map((m, i) => (
            <g key={i}>
              <circle cx={toX(i)} cy={toY(m.income)}  r="4" fill="var(--income)"  />
              <circle cx={toX(i)} cy={toY(m.expense)} r="4" fill="var(--expense)" />
              <circle cx={toX(i)} cy={toY(m.balance)} r="5" fill="var(--accent)"
                stroke="var(--bg-card)" strokeWidth="2" />

              {/* X label */}
              <text x={toX(i)} y={H - 8} textAnchor="middle"
                fill="rgba(148,163,184,0.7)" fontSize="10.5" fontWeight="500">
                {m.month}
              </text>

              {/* Tooltip on balance dot */}
              <title>{m.month}: Balance {fmt(m.balance)}</title>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default BalanceTrendChart;
