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

import PolicyPage from "./pages/admin/PolicyPage";
import GuidePage from "./pages/admin/GuidePage";
import UploadMangaPage from "./pages/admin/UploadManga";
import UploadChapterPage from "./pages/admin/UploadChapter";

import AccountPage from "./pages/account/AccountPage";
import LikePage from "./pages/account/LikePage";
import FollowPage from "./pages/account/FollowPage";
import UpdateMangaPage from "./pages/admin/UpdateManga";

import ProtectedRoute from "./components/ProtectedRoute";
import { RoleEnum } from "./utilities/auth";

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
            {/* Site route */}
            <Route
              path="/"
              element={
                genreId ? <GenrePage /> : keyword ? <FindPage /> : <HomePage />
              }
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/manga/:mangaId" element={<Manga />} />
            <Route path="/chapter/:id" element={<Chapter />} />

            
            {/* Route for user login */}
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/like-list"
              element={
                <ProtectedRoute>
                  <LikePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/follow-list"
              element={
                <ProtectedRoute>
                  <FollowPage />
                </ProtectedRoute>
              }
            />


            {/* Route for admin */}
            <Route
              path="/policy"
              element={
                <ProtectedRoute role={RoleEnum.ADMIN}>
                  <PolicyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/guide"
              element={
                <ProtectedRoute role={RoleEnum.ADMIN}>
                  <GuidePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-manga"
              element={
                <ProtectedRoute role={RoleEnum.ADMIN}>
                  <UploadMangaPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-manga/:mangaId"
              element={
                <ProtectedRoute role={RoleEnum.ADMIN}>
                  <UpdateMangaPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-chapter/:mangaId"
              element={
                <ProtectedRoute role={RoleEnum.ADMIN}>
                  <UploadChapterPage />
                </ProtectedRoute>
              }
            />
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
