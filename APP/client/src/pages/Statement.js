import React, {useEffect, useState} from 'react';
import './Statement.css';

const Statement = () => {
  const [statements, setStatements] = useState([]);

  // Simulate API call
  useEffect(() => {
    const fetchStatements = async () => {
      const mockData = [
        {
          id: 1,
          date: '2023-12-01',
          description: 'Monthly Statement',
          amount: 1500.0,
          balance: 5000.0,
        }, {
          id: 2,
          date: '2023-11-01',
          description: 'Monthly Statement',
          amount: 2000.0,
          balance: 3500.0,
        }];
      setTimeout(() => setStatements(mockData), 500); // Simulate API delay
    };

    fetchStatements().then(r => console.log(r));
  }, []);

  if (statements.length === 0) return <div>Loading...</div>;

  return (
    <div className="statement-container">
      <h1>Account Statements</h1>
      <table className="statement-table">
        <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Balance</th>
        </tr>
        </thead>
        <tbody>
        {statements.map((statement) => (<tr key={statement.id}>
              <td>{statement.date}</td>
              <td>{statement.description}</td>
              <td>${statement.amount.toFixed(2)}</td>
              <td>${statement.balance.toFixed(2)}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default Statement;
