import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

function PatientDashboard() {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSlots();
      fetchBookings();
    }
  }, [user]);

  const fetchSlots = async () => {
    try {
      const res = await axios.get('/api/slots', { withCredentials: true });
      setSlots(res.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error fetching slots');
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/my-bookings', { withCredentials: true });
      setBookings(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error fetching bookings');
    }
  };

  const handleBook = async (slotId) => {
    try {
      await axios.post('/api/book', { slotId }, { withCredentials: true });
      fetchSlots();
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Booking failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Patient Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Available Slots (Next 7 Days, UTC)</h3>
      {loading ? <p>Loading...</p> : (
        <ul>
          {slots.map(slot => (
            <li key={slot.id}>
              {slot.start} - {slot.end} <button onClick={() => handleBook(slot.id)}>Book</button>
            </li>
          ))}
        </ul>
      )}
      <h3>My Bookings</h3>
      <ul>
        {bookings.map(b => (
          <li key={b.id}>{b.start} - {b.end}</li>
        ))}
      </ul>
    </div>
  );
}

export default PatientDashboard;