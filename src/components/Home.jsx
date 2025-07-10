// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // If you want to use custom CSS

function Home() {
  return (
    <>
      <header className="navbar">
        <div className='navContent'>
            <div className="logo">UserAuth</div>
        <nav>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </nav>
        </div>
      </header>

      <main className="main-content">
        <h1>Welcome to User Authentication</h1>
        <p>Sign up or login to manage your profile</p>
        <div className="buttons">
          <Link to="/signup" className="btn primary">Sign Up</Link>
          <Link to="/login" className="btn secondary">Login</Link>
        </div>
      </main>

      <footer className="footer">
        © 2025 User Authentication System
      </footer>
    </>
  );
}

export default Home;
