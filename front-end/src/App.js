import React from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/App.css";

import HomePage from "./pages/site/HomePage";
import GenrePage from "./pages/site/GenrePage";
import FindPage from "./pages/site/FindPage";
import Privacy from "./pages/site/PrivacyPage";
import LoginPage from "./pages/site/LoginPage";
import Manga from "./pages/site/MangaPage";
import Chapter from "./pages/site/ChapterPage";
import NoPage from "./pages/site/NoPage";

import UploadMangaPage from "./pages/admin/UploadManga";
import UploadChapterPage from "./pages/admin/UploadChapter";

import AccountPage from "./pages/account/AccountPage";
import LikePage from "./pages/account/LikePage";
import FollowPage from "./pages/account/FollowPage";
import UpdateMangaPage from "./pages/admin/UpdateManga";

function App() {
  const [searchParams] = useSearchParams();
  const genreId = searchParams.get("genreId");
  const keyword = searchParams.get("keyword");

  return (
    <div className="App">
      <Header />

      <div className="content">
        <div className="column-item__sidebar-one"></div>

        <div className="column-item__main-column">
          <Routes>
          <Route path="/" 
              element={
                genreId ? <GenrePage /> : 
                (keyword ? <FindPage /> : <HomePage />)
              } 
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/manga/:mangaId" element={<Manga />} />
            <Route path="/chapter/:id" element={<Chapter />} />

            <Route path="/account" element={<AccountPage />} />
            <Route path="/like-list" element={<LikePage />} />
            <Route path="/follow-list" element={<FollowPage />} />

            <Route path="/upload-manga" element={<UploadMangaPage />} />
            <Route path="/update-manga/:mangaId" element={<UpdateMangaPage />}/>
            <Route path="/upload-chapter/:mangaId" element={<UploadChapterPage />} />
            <Route path="/*" element={<NoPage />} />
          </Routes>
        </div>

        <div className="column-item__sidebar-two"></div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
