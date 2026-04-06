import React from "react";
import FilterBar from "../components/transactions/FilterBar";
import TransactionList from "../components/transactions/TransactionList";

const TransactionsPage = () => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <FilterBar />
    <TransactionList />
  </div>
);

export default TransactionsPage;
