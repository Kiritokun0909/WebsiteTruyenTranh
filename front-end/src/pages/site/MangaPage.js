// src/components/Header.js
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "../../styles/Manga.css";

import { fetchManga } from "../../api/SiteService";

const Manga = () => {
  const { id } = useParams();
  const [manga, setManga] = useState([]);
  const [genres, setGenres] = useState([]);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    getManga(id);
  }, [id]);

  const getManga = async (mangaId) => {
    try {
      const data = await fetchManga(mangaId);
      setManga(data.manga);
      setGenres(data.genres);
      setChapters(data.chapters);
    } catch (error) {
      console.error("Error get manga:", error);
    }
  };

  return (
    <div className="manga-layout">
      <div className="manga-item__sidebar-one"></div>

      <div className="manga-item__main-column">
        {manga.map((manga) => (
          <div key={manga.MangaID} className="manga-info">
            <div className="manga-cover">
              <img
                src={manga.CoverImageUrl}
                alt={manga.StoryName}
                className="manga-cover"
              />
            </div>

            <div className="manga-info-detail">
              <h4>{manga.StoryName}</h4>
              <div className="list-info">
                <p>
                  <strong>Author:</strong> {manga.AuthorName}
                </p>
                <p>
                  <strong>Age:</strong> {manga.AgeLimit}+
                </p>
                <p>
                  <strong>Views:</strong> {manga.NumViews}
                </p>
                <p>
                  <strong>Follows:</strong> {manga.NumViews}
                </p>
                <p>
                  <strong>Likes:</strong> {manga.NumViews}
                </p>
              </div>

              <div className="btn-like-follow">
                <button type="button" id="btn-like">
                  Like
                </button>
                <button type="button" id="btn-follow">
                  Follow
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="manga-description">
          <div className="genre-list">
            {genres.map((genre) => (
              <NavLink key={genre.GenreID} to={`/?genreId=${genre.GenreID}&pageNumber=1`}>
                {genre.GenreName}
              </NavLink>
            ))}
          </div>
          {manga.map((manga) => (
            <div key={manga.MangaID} className="description">
              <strong>Description:</strong> {manga.Description}
            </div>
          ))}
        </div>

        <div className="header-title">
          <h4>List Chapter</h4>
        </div>
        <div className="manga-chapter">
          {chapters.map((chapter) => (
            <div key={chapter.ChapterID} className="chapter-row">
              <div className="chapter-name">
                <NavLink to={`/chapter/${chapter.ChapterID}`}>
                  {chapter.ChapterName}
                </NavLink>
              </div>
              <div className="publish-date">{chapter.PublishedDate}</div>
            </div>
          ))}
        </div>

        <div className="header-title ">
          <h4>Comments</h4>
        </div>
        <div className="manga-comment"></div>
      </div>

      <div className="manga-item__sidebar-two"></div>
    </div>
  );
};

export default Manga;
