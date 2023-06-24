import React, { useEffect } from'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

//Add page to see list of added projects using .sort() or .filter()
//Checkboxes for Job occupation maybe?

function App() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      // Running on the server-side, connect to MongoDB
      const connectDB = require('./db');
      connectDB();
    }
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;