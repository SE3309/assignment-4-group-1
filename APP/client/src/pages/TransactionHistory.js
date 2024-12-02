import React, { useState, useEffect } from 'react';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    transactionType: '',
    minAmount: '',
    maxAmount: '',
  });

  // Fetch transactions (simulate API call)
  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactions'); // Replace with real API
      const data = await response.json();
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const { startDate, endDate, transactionType, minAmount, maxAmount } = filters;
    const date = new Date(transaction.date);

    const matchesDate =
      (!startDate || date >= new Date(startDate)) &&
      (!endDate || date <= new Date(endDate));

    const matchesType =
      !transactionType || transaction.type.toLowerCase() === transactionType.toLowerCase();

    const matchesAmount =
      (!minAmount || transaction.amount >= parseFloat(minAmount)) &&
      (!maxAmount || transaction.amount <= parseFloat(maxAmount));

    return matchesDate && matchesType && matchesAmount;
  });

  return (
    <div className="transaction-history-container">
      <h1>Transaction History</h1>
      <div className="filters">
        <h3>Filter Transactions</h3>
        <div className="filter-group">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>Transaction Type:</label>
          <select
            name="transactionType"
            value={filters.transactionType}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Min Amount:</label>
          <input
            type="number"
            name="minAmount"
            value={filters.minAmount}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>Max Amount:</label>
          <input
            type="number"
            name="maxAmount"
            value={filters.maxAmount}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.type}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
