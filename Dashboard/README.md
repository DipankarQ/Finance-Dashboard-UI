# FinTech Tracker — Finance Dashboard UI

A responsive personal finance dashboard built with **React + Vite + Tailwind CSS**. It includes a protected login screen, dark/light theme, and tabbed views for dashboard metrics, transactions, and insights.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Features](#features)
- [Architecture & Approach](#architecture--approach)
- [Component Overview](#component-overview)
- [Demo Credentials](#demo-credentials)

---

## Overview

FinTech Tracker is a front-end finance dashboard that simulates an authenticated budgeting app. Users log in before accessing the app. After login, a **sidebar + header + main content** layout shows one of three sections: **Dashboard** (summary cards and charts), **Transactions** (list, filters, add/edit/delete), and **Insights**. Data is mocked in `src/data/mockData.js` for demonstration.

---

## Tech Stack

| Technology | Purpose |
| ------------ | --------- |
| [React 19](https://react.dev/) | UI components |
| [Vite](https://vitejs.dev/) | Dev server and production build |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling (`@tailwindcss/vite`) |
| [Lucide React](https://lucide.dev/) | Icons |
| [React Icons](https://react-icons.github.io/react-icons/) | Additional icon set (where used) |
| [React Router DOM](https://reactrouter.com/) | Included in the project; navigation is currently driven by **tab state** in `AppContext`, not URL routes |

---

## Project Structure

```bash
Dashboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── dashboard/          # SummaryCards, BalanceTrendChart, SpendingBreakdown
│   │   ├── insights/           # InsightsPanel
│   │   ├── transactions/       # TransactionForm, TransactionList, FilterBar
│   │   ├── DashboardLayout.jsx # Shell: sidebar + header + active page
│   │   ├── Header.jsx
│   │   ├── LoginScreen.jsx
│   │   └── Sidebar.jsx
│   ├── App.jsx                 # Auth gate, login dark mode, AppProvider
│   ├── context/
│   │   └── AppContext.jsx      # Global state (reducer)
│   ├── data/
│   │   └── mockData.js         # Seed transactions
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── TransactionsPage.jsx
│   │   └── InsightsPage.jsx
│   ├── main.jsx
│   └── index.css               # Global styles and CSS variables
├── package.json
└── README.md
```

---

## Features

### Authentication gate

- Login screen is shown until the user signs in (`isLoggedIn` in `App.jsx`).
- No backend; login is simulated for UI and UX only.

### Dark mode

- Toggle on the login screen; preference is stored in `localStorage` (`fintech-dark-mode`).
- Inside the dashboard, `AppContext` keeps `darkMode` in sync with the `<html>` `dark` class.

### Tab navigation

- `activeTab` in `AppContext` is one of `dashboard`, `transactions`, or `insights`.
- `DashboardLayout` maps that value to `DashboardPage`, `TransactionsPage`, or `InsightsPage`.
- Sidebar dispatches `SET_TAB`; optional **admin / viewer** role is stored for UI permissions.

### Transactions

- CRUD-style actions via reducer: add, edit, delete transactions from mock data.
- Filter bar supports search, category, type, and date range (state in `AppContext`).

### Dashboard views

- Summary cards, balance trend chart, and spending breakdown using dashboard components.

### Insights

- Dedicated insights panel content on the Insights page.

---

## Architecture & Approach

### State management

Global UI and data state live in **`AppContext`** using **`useReducer`**:

- **Transactions** — list seeded from `mockData`, updated by add/edit/delete actions.
- **`activeTab`** — current section (`dashboard` | `transactions` | `insights`).
- **`role`** — `admin` | `viewer` for permission-sensitive UI.
- **`darkMode`** — synced to the document and storage.
- **`filters`** — transaction list filters; `RESET_FILTERS` restores defaults.

`App.jsx` wraps the dashboard in `AppProvider` and passes initial dark mode from the login flow so theme stays consistent after login.

### Layout

- **Two-column shell**: fixed sidebar + fluid main column with **Header** and the active **page** component.
- Responsive sidebar includes a mobile menu pattern (see `Sidebar.jsx`).

---

## Component Overview

| Area | Responsibility |
| ------ | ---------------- |
| `App.jsx` | Login vs dashboard, login-only dark toggle, `AppProvider` |
| `LoginScreen.jsx` | Form, loading simulation, demo pre-fill |
| `DashboardLayout.jsx` | Sidebar + main column; renders active page from `PAGE_MAP` |
| `Sidebar.jsx` | Nav items, logout, role switcher, mobile drawer |
| `Header.jsx` | Top bar for the main content area |
| `pages/*` | Compose feature sections per tab |
| `components/dashboard/*` | Charts and summary widgets |
| `components/transactions/*` | List, form, filters |
| `components/insights/*` | Insights UI |

---

## Demo Credentials

|Field|Value|
|-----|-----|
|Email|`demo@expensetracker.com`|
|Password|`password123`|

These values are pre-filled on the login form for local development.
