// src/components/Header.js
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "../styles/Chapter.css";

import { fetchChapter } from "../api/SiteService";

const Chapter = () => {
  const { id } = useParams();
  const [mangaId, setMangaId] = useState([]);
  const [mangaName, setMangaName] = useState([]);
  const [chapterName, setChapterName] = useState([]);
  const [previousChapterId, setPreviousChapterId] = useState([]);
  const [nextChapterId, setNextChapterId] = useState([]);
  const [chapter, setChapter] = useState([]);

  useEffect(() => {
    getChapter(id);
  }, [id]);

  const getChapter = async (chapterId) => {
    try {
      const data = await fetchChapter(chapterId);
      setMangaId(data.mangaId);
      setMangaName(data.mangaName);
      setChapterName(data.chapterName);
      setPreviousChapterId(data.previousChapterId);
      setNextChapterId(data.nextChapterId);
      setChapter(data.chapter);
    } catch (error) {
      console.error("Error get chapter:", error);
    }
  };

  return (
    <div className="chapter-layout">
      <div className="chapter-item__sidebar-one"></div>

      <div className="chapter-item__main-column">
        <div className="chapter-info">
          <h3>
            <NavLink to={`/manga/${mangaId}`}>{mangaName}</NavLink> -{" "}
            {chapterName}
          </h3>
        </div>

        <div className="chapter-navigate">
          {previousChapterId ? (
            <NavLink to={`/chapter/${previousChapterId}`}>Previous</NavLink>
          ) : (
            <NavLink to="#" className="nav-disable">Previous</NavLink>
          )}

          {nextChapterId ? (
            <NavLink to={`/chapter/${nextChapterId}`}>Next</NavLink>
          ) : (
            <NavLink to="#" className="nav-disable">Next</NavLink>
          )}
        </div>

        <div className="chapter-images">
          {chapter.map((images) => (
            <div key={images.OrderNumber} className="chapter-image">
              <img src={images.ImageUrl} alt="images" className="chapter-image" />
            </div>
          ))}
        </div>

        <div className="chapter-navigate">
          {previousChapterId ? (
            <NavLink to={`/chapter/${previousChapterId}`}>Previous</NavLink>
          ) : (
            <NavLink to="#" className="nav-disable">Previous</NavLink>
          )}

          {nextChapterId ? (
            <NavLink to={`/chapter/${nextChapterId}`}>Next</NavLink>
          ) : (
            <NavLink to="#" className="nav-disable">Next</NavLink>
          )}
        </div>

        <div className="chapter-comment">Comment</div>
      </div>

      <div className="chapter-item__sidebar-two"></div>
    </div>
  );
};

export default Chapter;
