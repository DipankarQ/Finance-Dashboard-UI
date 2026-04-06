import React from "react";
import { Search, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";

const DATE_RANGES = ["All", "This Month", "Last Month", "Last 3 Months"];

const FilterBar = () => {
  const { state, dispatch } = useApp();
  const { filters } = state;

  const set = (key, value) => dispatch({ type: "SET_FILTER", payload: { [key]: value } });
  const reset = () => dispatch({ type: "RESET_FILTERS" });

  const hasActive =
    filters.search || filters.category !== "All" || filters.type !== "All" || filters.dateRange !== "All";

  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center",
      padding: "16px", background: "var(--bg-card)", borderRadius: "var(--radius)",
      border: "1px solid var(--border)", marginBottom: "16px",
    }}>
      {/* Search */}
      <div style={{ position: "relative", flex: "1", minWidth: "180px" }}>
        <Search size={15} style={{
          position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
          color: "var(--text-faint)", pointerEvents: "none",
        }} />
        <input
          className="input-dark"
          style={{ paddingLeft: "32px" }}
          placeholder="Search transactions…"
          value={filters.search}
          onChange={(e) => set("search", e.target.value)}
        />
      </div>

      {/* Category */}
      <select className="input-dark" style={{ width: "auto", minWidth: 140 }}
        value={filters.category} onChange={(e) => set("category", e.target.value)}>
        <option value="All">All Categories</option>
        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      {/* Type */}
      <select className="input-dark" style={{ width: "auto", minWidth: 120 }}
        value={filters.type} onChange={(e) => set("type", e.target.value)}>
        <option value="All">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Date range */}
      <select className="input-dark" style={{ width: "auto", minWidth: 140 }}
        value={filters.dateRange} onChange={(e) => set("dateRange", e.target.value)}>
        {DATE_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>

      {/* Reset */}
      {hasActive && (
        <button className="btn-ghost" onClick={reset} style={{ color: "var(--expense)", borderColor: "rgba(244,63,94,0.25)" }}>
          <X size={14} /> Clear
        </button>
      )}
    </div>
  );
};

export default FilterBar;
