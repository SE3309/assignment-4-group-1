import React, {useEffect, useState} from 'react';
import './ClientDashboard.css';

const ClientDashboard = () => {
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    // Mock API call
    const fetchClientData = async () => {
      const mockData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        accounts: [
          {id: 1, type: 'Savings', balance: 5000},
          {id: 2, type: 'Checking', balance: 3000}],
      };
      setTimeout(() => setClientData(mockData), 500); // Simulate API delay
    };

    fetchClientData().then(r => console.log(r));
  }, []);

  if (!clientData) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {clientData.name}</h1>
      <div className="account-info">
        <h2>Account Information</h2>
        <p><strong>Email:</strong> {clientData.email}</p>
        <p><strong>Phone:</strong> {clientData.phone}</p>
        <h3>Accounts:</h3>
        {clientData.accounts.map(
            (account) => (<div key={account.id} className="account-card">
                  <p><strong>Account Type:</strong> {account.type}</p>
                  <p><strong>Balance:</strong> ${account.balance}</p>
                </div>))}
      </div>
      <div className="dashboard-actions">
        <button className="btn"
                onClick={() => window.location.href = '/transfer'}>
          Transfer Funds
        </button>
        <button className="btn"
                onClick={() => window.location.href = '/apply-loan'}>
          Apply for Loan
        </button>
      </div>
    </div>
  );
};

export default ClientDashboard;
