import './App.css';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Manga from './pages/Manga/Manga'
import AnimeDetail from './pages/AnimeDetail/AnimeDetail';
import Footer from './components/Footer/Footer'

function App() {
  useEffect(() => {
  axios.get(`${process.env.REACT_APP_API_BASE}/api/test`)
    .then(res => {
      console.log(res.data.message);
      alert(res.data.message); // shows "Connected from Vercel!"
    })
    .catch(err => {
      alert("Backend not reachable");
      console.error(err);
    });
}, []);
  return (
 <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:animeId" element={<AnimeDetail />} />
        <Route path="/manga" element={<Manga />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
