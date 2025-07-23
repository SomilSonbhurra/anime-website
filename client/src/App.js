import './App.css';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About'
import Manga from './pages/Manga/Manga'
import AnimeDetail from './pages/AnimeDetail/AnimeDetail';
import Footer from './components/Footer/Footer'

function App() {
  return (
 <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/anime/:animeId" element={<AnimeDetail />} />
        <Route path="/manga" element={<Manga />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
