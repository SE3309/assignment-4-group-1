import React, { useState, useEffect } from 'react';
import './StaffDashboard.css';

const StaffDashboard = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Mock API call
    const fetchClients = async () => {
      const mockData = [
        { id: 1, name: 'Alice Smith', email: 'alice@example.com', phone: '123-123-1234' },
        { id: 2, name: 'Bob Johnson', email: 'bob@example.com', phone: '987-654-3210' },
      ];
      setTimeout(() => setClients(mockData), 500); // Simulate API delay
    };

    fetchClients();
  }, []);

  if (clients.length === 0) return <div>Loading...</div>;

  return (
    <div className="staff-dashboard-container">
      <h1>Staff Dashboard</h1>
      <h2>Clients</h2>
      <table className="clients-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>
                <button className="btn" onClick={() => alert(`Viewing ${client.name}`)}>
                  View
                </button>
                <button className="btn" onClick={() => alert(`Editing ${client.name}`)}>
                  Edit
                </button>
                <button className="btn danger" onClick={() => alert(`Deleting ${client.name}`)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffDashboard;
