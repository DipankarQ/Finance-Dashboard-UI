import React, { useState } from "react";
import { X, Save } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";

const TransactionForm = ({ tx, onClose }) => {
  const { dispatch } = useApp();
  const isEdit = !!tx;

  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    date:        tx?.date        || today,
    description: tx?.description || "",
    amount:      tx?.amount      || "",
    category:    tx?.category    || CATEGORIES[0],
    type:        tx?.type        || "expense",
  });
  const [error, setError] = useState("");

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description.trim()) return setError("Description is required.");
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      return setError("Please enter a valid positive amount.");

    const payload = {
      ...(tx || {}),
      id: tx?.id || `t${Date.now()}`,
      date: form.date,
      description: form.description.trim(),
      amount: parseFloat(Number(form.amount).toFixed(2)),
      category: form.category,
      type: form.type,
    };

    dispatch({ type: isEdit ? "EDIT_TRANSACTION" : "ADD_TRANSACTION", payload });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
            {isEdit ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button className="btn-ghost" style={{ padding: "5px 8px" }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Type toggle */}
        <div style={{
          display: "flex", background: "var(--bg-base)", borderRadius: "8px",
          padding: "4px", marginBottom: "20px",
        }}>
          {["expense", "income"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set("type", t)}
              style={{
                flex: 1, padding: "8px", border: "none", borderRadius: "6px", cursor: "pointer",
                fontWeight: 600, fontSize: "0.82rem", transition: "all 0.2s",
                background: form.type === t
                  ? (t === "income" ? "var(--income)" : "var(--expense)")
                  : "transparent",
                color: form.type === t ? "#fff" : "var(--text-faint)",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Date */}
          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
              Date
            </label>
            <input type="date" className="input-dark" value={form.date}
              onChange={(e) => set("date", e.target.value)} required />
          </div>

          {/* Description */}
          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
              Description
            </label>
            <input type="text" className="input-dark" placeholder="e.g. Monthly Salary, Grocery run…"
              value={form.description} onChange={(e) => set("description", e.target.value)} required />
          </div>

          {/* Amount */}
          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
              Amount ($)
            </label>
            <input type="number" className="input-dark" placeholder="0.00" min="0.01" step="0.01"
              value={form.amount} onChange={(e) => set("amount", e.target.value)} required />
          </div>

          {/* Category */}
          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
              Category
            </label>
            <select className="input-dark" value={form.category} onChange={(e) => set("category", e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)",
              borderRadius: "8px", padding: "10px 14px",
              color: "var(--expense)", fontSize: "0.82rem",
            }}>
              {error}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            <button type="button" className="btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ flex: 2 }}>
              <Save size={14} /> {isEdit ? "Save Changes" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
