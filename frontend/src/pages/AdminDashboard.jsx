import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/all-bookings', { withCredentials: true });
      setBookings(res.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error fetching bookings');
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>All Bookings</h3>
      {loading ? <p>Loading...</p> : (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>User</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Start</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>End</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{b.user.name} ({b.user.email})</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{b.start}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{b.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;