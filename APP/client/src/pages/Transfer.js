import React, { useState, useEffect } from 'react';
import './Transfer.css';

const Transfer = () => {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    sourceAccount: '',
    destinationAccount: '',
    amount: '',
  });
  const [message, setMessage] = useState('');

  // Fetch user accounts (simulate API call)
  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await fetch('/api/accounts'); // Replace with real API
      const data = await response.json();
      setAccounts(data);
    };
    fetchAccounts();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.sourceAccount === formData.destinationAccount) {
      setMessage('Source and destination accounts cannot be the same.');
      return;
    }
    if (formData.amount <= 0) {
      setMessage('Transfer amount must be greater than zero.');
      return;
    }

    try {
      // Simulate API call for fund transfer
      const response = await fetch('/api/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Transfer successful!');
      } else {
        setMessage('Failed to complete the transfer. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred during the transfer.');
    }
  };

  // Handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="transfer-container">
      <h1>Transfer Funds</h1>
      <form onSubmit={handleSubmit} className="transfer-form">
        <div className="form-group">
          <label>Source Account:</label>
          <select
            name="sourceAccount"
            value={formData.sourceAccount}
            onChange={handleChange}
            required
          >
            <option value="">Select an account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.type} - ${account.balance}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Destination Account:</label>
          <select
            name="destinationAccount"
            value={formData.destinationAccount}
            onChange={handleChange}
            required
          >
            <option value="">Select an account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.type} - ${account.balance}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">
          Transfer
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Transfer;
