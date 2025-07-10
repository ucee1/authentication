// src/components/Signup.js
import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your POST request here
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(formData);

    console.log(response.ok);
    setTimeout(() => {
      response.ok && navigate("/login");
    }, 2000);

    // if (response.ok) {
    //     navigate("/login");
    //   redirect("/login");
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Create an Account</h2>
  
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          required
          onChange={handleChange}
          placeholder="Enter your full name"
        />
  
        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleChange}
          placeholder="Enter your email"
        />
  
        <label>Address</label>
        <input type="text" name="address" required onChange={handleChange} />
  
        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
          placeholder="Enter a password"
        />
  
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirm_password"
          required
          onChange={handleChange}
          placeholder="Re-enter your password"
        />
  
        <button type="submit">
          <Link to="/login">signup</Link>
        </button>
  
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}


export default Signup;
