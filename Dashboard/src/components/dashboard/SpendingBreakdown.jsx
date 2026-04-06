import React, { useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { getCategoryTotals } from "../../data/mockData";

const PALETTE = [
  "#6366f1", "#10b981", "#f59e0b", "#f43f5e",
  "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6",
];

const SpendingBreakdown = () => {
  const { state } = useApp();

  const data = useMemo(() => getCategoryTotals(state.transactions), [state.transactions]);
  const total = data.reduce((s, d) => s + d.amount, 0);

  if (!data.length) {
    return (
      <div className="card" style={{ padding: "24px" }}>
        <div className="empty-state"><p>No spending data.</p></div>
      </div>
    );
  }

  // Donut
  const R   = 70, STROKE = 22, CX = 95, CY = 95;
  const CIRC = 2 * Math.PI * R;

  let offset = 0;
  const segments = data.map((d, i) => {
    const pct   = d.amount / total;
    const dash  = pct * CIRC;
    const gap   = CIRC - dash;
    const seg   = { ...d, pct, dash, gap, offset, color: PALETTE[i % PALETTE.length] };
    offset += dash;
    return seg;
  });

  const fmt = (n) => `$${n >= 1000 ? (n / 1000).toFixed(1) + "k" : n.toFixed(0)}`;

  return (
    <div className="card animate-fadeUp delay-3" style={{ padding: "24px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Spending Breakdown</h2>
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>By category</p>
      </div>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
        {/* Donut */}
        <div style={{ flexShrink: 0 }}>
          <svg width="190" height="190" viewBox="0 0 190 190">
            {segments.map((seg, i) => (
              <circle
                key={i}
                cx={CX} cy={CY} r={R}
                fill="none"
                stroke={seg.color}
                strokeWidth={STROKE}
                strokeDasharray={`${seg.dash} ${seg.gap}`}
                strokeDashoffset={-seg.offset}
                style={{ transform: "rotate(-90deg)", transformOrigin: `${CX}px ${CY}px`, transition: "stroke-dasharray 0.5s ease" }}
              >
                <title>{seg.category}: {fmt(seg.amount)} ({(seg.pct * 100).toFixed(1)}%)</title>
              </circle>
            ))}
            {/* Center text */}
            <text x={CX} y={CY - 6} textAnchor="middle" fill="var(--text-muted)" fontSize="10">Total</text>
            <text x={CX} y={CY + 12} textAnchor="middle" fill="var(--text-primary)" fontSize="15" fontWeight="700">
              {fmt(total)}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minWidth: 150 }}>
          {data.slice(0, 6).map((d, i) => (
            <div key={d.category} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: 10, height: 10, borderRadius: "3px", background: PALETTE[i % PALETTE.length], flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: "0.78rem", color: "var(--text-muted)" }}>{d.category}</div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}>{fmt(d.amount)}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-faint)", width: 36, textAlign: "right" }}>
                {(d.amount / total * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;
