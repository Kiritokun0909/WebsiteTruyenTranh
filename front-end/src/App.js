import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Privacy from './pages/PrivacyPage';
import LoginPage from './pages/LoginPage';
import Manga from './pages/MangaPage';
import Chapter from './pages/ChapterPage';
import "./styles/App.css";

function App() {

  return (
    <div className='App'>
      <Header />

      <div className='content'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<HomePage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/manga/:id" element={<Manga />} />
          <Route path="/chapter/:id" element={<Chapter />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
