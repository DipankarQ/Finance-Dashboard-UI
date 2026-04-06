import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardPage from "../pages/DashboardPage";
import TransactionsPage from "../pages/TransactionsPage";
import InsightsPage from "../pages/InsightsPage";
import { useApp } from "../context/AppContext";

const PAGE_MAP = {
  dashboard:    DashboardPage,
  transactions: TransactionsPage,
  insights:     InsightsPage,
};

const DashboardLayout = ({ onLogout }) => {
  const { state } = useApp();
  const ActivePage = PAGE_MAP[state.activeTab] || DashboardPage;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>
      {/* Sidebar */}
      <Sidebar onLogout={onLogout} />

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{
          flex: 1,
          padding: "0 24px 32px 24px",
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          paddingTop: 0,
        }}>
          {/* Top spacing for mobile burger button */}
          <div className="lg:hidden" style={{ height: "56px" }} />
          <Header />
          <ActivePage />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;