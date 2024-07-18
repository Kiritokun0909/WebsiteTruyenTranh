import React from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import "./styles/App.css";

import HomePage from './pages/HomePage';
import GenrePage from './pages/GenrePage';
import Privacy from './pages/PrivacyPage';
import LoginPage from './pages/LoginPage';
import Manga from './pages/MangaPage';
import Chapter from './pages/ChapterPage';
import NoPage from './pages/NoPage';


function App() {

  const [searchParams] = useSearchParams();
  const genreId = searchParams.get('genreId');

  return (
    <div className='App'>
      <Header />

      <div className='content'>
        <Routes>
          <Route path="/" element={genreId ? <GenrePage /> : <HomePage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/manga/:id" element={<Manga />} />
          <Route path="/chapter/:id" element={<Chapter />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
