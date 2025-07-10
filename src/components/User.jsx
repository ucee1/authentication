// src/components/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './User.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user data (assuming JWT cookie is set)
    fetch('http://localhost:4000/api/user', {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        setError('Failed to load user. Please log in again.');
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = async () => {
    await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include',
    });
    navigate('/');
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;

    await fetch('http://localhost:4000/delete-user', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
    });

    navigate('/');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <header>
        <div className="nav">
          <h1 className="logo">UserAuth</h1>
          <div className="nav-links">
            <button onClick={handleDelete}>Delete My Account</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <main>
        <div className="profile-card">
          <div className="profile-header">
            <h2>Your Profile</h2>
            <button className="edit-btn" onClick={() => navigate('/edit')}>Edit Profile</button>
          </div>
          <hr />
          <div className="profile-info">
            <p><strong>Username:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Member Since:</strong> {/* Add created_at if available */}</p>
          </div>
        </div>
      </main>

      <footer>
        <p>© 2025 User Authentication System</p>
      </footer>
    </div>
  );
}

export default UserProfile;
