import React from "react";
import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceTrendChart from "../components/dashboard/BalanceTrendChart";
import SpendingBreakdown from "../components/dashboard/SpendingBreakdown";

const DashboardPage = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
    <SummaryCards />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
      <BalanceTrendChart />
      <SpendingBreakdown />
    </div>
  </div>
);

export default DashboardPage;
