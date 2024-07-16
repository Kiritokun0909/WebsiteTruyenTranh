// src/components/Header.js
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "../styles/Manga.css";

const Manga = () => {
  const { id } = useParams();
  const [manga, setManga] = useState([]);
  const [genres, setGenres] = useState([]);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await fetch("/manga/" + id);
        if (!response.ok) {
          throw new Error("Failed to fetch list mangas");
        }
        const data = await response.json();
        setManga(data.manga);
        setGenres(data.genres);
        setChapters(data.chapters);

        
      } catch (error) {
        console.error("Error fetching mangas:", error);
      }
    };

    fetchMangas();
  }, [id]);

  return (
    <div className="manga">
      <div className="column-layout">
        <div className="column-item sidebar-one"></div>

        <div className="column-item main-column">
          {manga.map((manga) => (
            <div key={manga.MangaID} className="manga-detail">
              <div className="manga-detail-head">
                <div className="manga-cover">
                  <img
                    src={manga.CoverImageUrl}
                    alt={manga.StoryName}
                    className="manga-cover"
                  />
                </div>

                <div className="manga-info">
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
              <div className="manga-description"></div>
            </div>
          ))}

          <div className="manga-description">
            <div className="genre-list">
              {genres.map((genre) => (
                <NavLink key={genre.GenreID} to={`/genre/${genre.GenreID}`}>
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
                    <NavLink
                      to={`/manga/${id}/chapter/${chapter.ChapterID}`}>
                      {chapter.ChapterName}
                    </NavLink>
                  </div>
                  <div className="publish-date">
                    {chapter.PublishedDate}
                  </div>
                </div>
              ))}
          </div>
          
          <div className="header-title ">
            <h4>Comments</h4>
          </div>
          <div className="manga-comment">
            
          </div>
        </div>

        <div className="column-item sidebar-two"></div>
      </div>
    </div>
  );
};

export default Manga;
