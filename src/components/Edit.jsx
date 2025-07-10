// src/components/EditProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Edit.css';

const EditProfile = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    currentPassword: '',
    newPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch user data on mount
  useEffect(() => {
    fetch('http://localhost:4000/api/user', {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('User not authenticated');
        return res.json();
      })
      .then((data) => {
        setForm((prev) => ({
          ...prev,
          name: data.name,
          address: data.address,
        }));
      })
      .catch((err) => {
        console.error(err);
        navigate('/login');
      });
  }, [navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:4000/edit-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Update failed');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          placeholder="Current Password"
          required
        />
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="New Password"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
