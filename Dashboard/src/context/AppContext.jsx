import React, { createContext, useContext, useReducer, useEffect } from "react";
import { MOCK_TRANSACTIONS } from "../data/mockData";

// ─── Dark Mode init (runs before first render) ────────────────────────────────
const getInitialDark = () => {
  try {
    const saved = localStorage.getItem("fintech-dark-mode");
    if (saved !== null) return JSON.parse(saved);
  } catch { /* localStorage not available */ }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
};

// ─── Initial State ───────────────────────────────────────────────────────────
const initialState = {
  transactions: MOCK_TRANSACTIONS,
  role: "admin",           // "admin" | "viewer"
  activeTab: "dashboard",  // "dashboard" | "transactions" | "insights"
  darkMode: getInitialDark(),
  filters: {
    search: "",
    category: "All",
    type: "All",
    dateRange: "All",
  },
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case "SET_ROLE":
      return { ...state, role: action.payload };

    case "SET_TAB":
      return { ...state, activeTab: action.payload };

    case "SET_FILTER":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case "RESET_FILTERS":
      return { ...state, filters: initialState.filters };

    case "TOGGLE_DARK":
      return { ...state, darkMode: !state.darkMode };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children, initialDarkMode }) {
  const startState = initialDarkMode !== undefined
    ? { ...initialState, darkMode: initialDarkMode }
    : initialState;
  const [state, dispatch] = useReducer(reducer, startState);

  // Sync darkMode to <html> class + localStorage whenever it changes
  useEffect(() => {
    const html = document.documentElement;
    if (state.darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    try { localStorage.setItem("fintech-dark-mode", JSON.stringify(state.darkMode)); } catch { /* ignore */ }
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
