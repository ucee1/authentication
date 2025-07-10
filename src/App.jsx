// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import User from './Components/User';
import EditProfile from './Components/Edit';


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
