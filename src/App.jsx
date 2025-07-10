// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import User from './components/User';
import EditProfile from './components/Edit';
import Signup from './Components/Signup';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/User" element={<User />} />
        <Route path="/Edit" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
