import React, { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2, Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import TransactionForm from "./TransactionForm";

const fmt = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function applyFilters(transactions, filters) {
  const now   = new Date();
  return transactions.filter((t) => {
    const s = filters.search.toLowerCase();
    if (s && !t.description.toLowerCase().includes(s) && !t.category.toLowerCase().includes(s)) return false;
    if (filters.category !== "All" && t.category !== filters.category) return false;
    if (filters.type !== "All" && t.type !== filters.type) return false;

    if (filters.dateRange !== "All") {
      const td = new Date(t.date);
      const ms = {
        "This Month":    new Date(now.getFullYear(), now.getMonth(), 1),
        "Last Month":    new Date(now.getFullYear(), now.getMonth() - 1, 1),
        "Last 3 Months": new Date(now.getFullYear(), now.getMonth() - 3, 1),
      }[filters.dateRange];
      const me = filters.dateRange === "Last Month"
        ? new Date(now.getFullYear(), now.getMonth(), 0)
        : now;
      if (ms && (td < ms || td > me)) return false;
    }
    return true;
  });
}

const SortIcon = ({ field, sortBy, dir }) => {
  if (sortBy !== field) return <ArrowUpDown size={12} style={{ opacity: 0.4 }} />;
  return dir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
};

const TransactionList = () => {
  const { state, dispatch } = useApp();
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [editTx, setEditTx] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const isAdmin = state.role === "admin";

  const handleSort = (col) => {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => applyFilters(state.transactions, state.filters), [state.transactions, state.filters]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let av = a[sortBy], bv = b[sortBy];
      if (sortBy === "date") { av = new Date(av); bv = new Date(bv); }
      if (sortBy === "amount") { av = Number(av); bv = Number(bv); }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ?  1 : -1;
      return 0;
    });
  }, [filtered, sortBy, sortDir]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?"))
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const openEdit = (tx) => { setEditTx(tx); setShowForm(true); };
  const openAdd  = ()     => { setEditTx(null); setShowForm(true); };
  const closeForm = ()    => { setShowForm(false); setEditTx(null); };

  const COLS = [
    { key: "date",        label: "Date"        },
    { key: "description", label: "Description" },
    { key: "category",    label: "Category"    },
    { key: "type",        label: "Type"        },
    { key: "amount",      label: "Amount"      },
  ];

  return (
    <>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Showing <strong style={{ color: "var(--text-primary)" }}>{sorted.length}</strong> of {state.transactions.length} transactions
        </div>
        {isAdmin && (
          <button className="btn-primary" onClick={openAdd}>
            <Plus size={15} /> Add Transaction
          </button>
        )}
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        {sorted.length === 0 ? (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="12" y2="16" />
            </svg>
            <div>
              <div style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "4px" }}>No transactions found</div>
              <div style={{ fontSize: "0.8rem" }}>Try adjusting your filters or add a new transaction.</div>
            </div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  {COLS.map((c) => (
                    <th key={c.key} onClick={() => handleSort(c.key)}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        {c.label}
                        <SortIcon field={c.key} sortBy={sortBy} dir={sortDir} />
                      </span>
                    </th>
                  ))}
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {sorted.map((tx, i) => (
                  <tr key={tx.id} className="animate-fadeUp" style={{ animationDelay: `${i * 0.025}s` }}>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{fmtDate(tx.date)}</td>
                    <td style={{ fontWeight: 500 }}>{tx.description}</td>
                    <td>
                      <span style={{
                        background: "rgba(99,102,241,0.1)", color: "var(--accent)",
                        padding: "3px 10px", borderRadius: "99px",
                        fontSize: "0.72rem", fontWeight: 600,
                      }}>
                        {tx.category}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${tx.type}`}>{tx.type}</span>
                    </td>
                    <td style={{
                      fontWeight: 700,
                      color: tx.type === "income" ? "var(--income)" : "var(--expense)",
                    }}>
                      {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
                    </td>
                    {isAdmin && (
                      <td>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button className="btn-edit" onClick={() => openEdit(tx)}>
                            <Pencil size={11} style={{ display: "inline", marginRight: 3 }} />Edit
                          </button>
                          <button className="btn-danger" onClick={() => handleDelete(tx.id)}>
                            <Trash2 size={11} style={{ display: "inline", marginRight: 3 }} />Del
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && <TransactionForm tx={editTx} onClose={closeForm} />}
    </>
  );
};

export default TransactionList;
