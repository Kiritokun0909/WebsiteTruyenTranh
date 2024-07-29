import React from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import "./styles/App.css";

import HomePage from './pages/site/HomePage';
import GenrePage from './pages/site/GenrePage';
import Privacy from './pages/site/PrivacyPage';
import LoginPage from './pages/site/LoginPage';
import Manga from './pages/site/MangaPage';
import Chapter from './pages/site/ChapterPage';
import NoPage from './pages/site/NoPage';

// import UploadForm from './pages/admin/UploadMangaPage';
import UploadMangaPage from './pages/admin/UploadManga';
import UploadChapterPage from './pages/admin/UploadChapter';

import AccountPage from './pages/account/AccountPage';
import LikePage from './pages/account/LikePage';
import FollowPage from './pages/account/FollowPage';



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
          <Route path="/manga/:mangaId" element={<Manga />} />
          <Route path="/chapter/:id" element={<Chapter />} />


          <Route path='/account' element={<AccountPage />} />
          <Route path='/like-list' element={<LikePage />} />
          <Route path='/follow-list' element={<FollowPage />} />

          {/* <Route path="/upload-manga" element={<UploadForm />} /> */}
          <Route path="/upload-manga" element={<UploadMangaPage />} />
          <Route path="/upload-chapter/:mangaId" element={<UploadChapterPage />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
