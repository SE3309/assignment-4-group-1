import React, { useState } from 'react';
import './ApplyLoan.css';

const ApplyLoan = () => {
  const [formData, setFormData] = useState({
    loanType: '',
    loanAmount: '',
    loanTerm: '',
    reason: '',
  });
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.loanAmount <= 0) {
      setMessage('Loan amount must be greater than zero.');
      return;
    }

    try {
      // Simulate API call
      const response = await fetch('/api/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Loan application submitted successfully!');
      } else {
        setMessage('Failed to submit loan application. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred during loan submission.');
    }
  };

  // Handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="apply-loan-container">
      <h1>Apply for a Loan</h1>
      <form onSubmit={handleSubmit} className="apply-loan-form">
        <div className="form-group">
          <label>Loan Type:</label>
          <select
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            required
          >
            <option value="">Select Loan Type</option>
            <option value="personal">Personal Loan</option>
            <option value="home">Home Loan</option>
            <option value="auto">Auto Loan</option>
          </select>
        </div>
        <div className="form-group">
          <label>Loan Amount:</label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Loan Term (in years):</label>
          <input
            type="number"
            name="loanTerm"
            value={formData.loanTerm}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Reason for Loan:</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn">
          Submit Application
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ApplyLoan;
