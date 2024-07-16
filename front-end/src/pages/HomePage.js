// src/components/Header.js
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../styles/Home.css";

const HomePage = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    fetchListManga();
  }, []);

  const fetchListManga = async (pageNumber) => {
    try {
      const response = await fetch("/mangas/pageNumber=" + pageNumber);
      if (!response.ok) {
        throw new Error("Failed to fetch list mangas");
      }
      const data = await response.json();
      setMangas(data.mangas);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching list manga:", error);
    }
  };

  const handlePageClick = (event) => {
    fetchListManga(+event.selected + 1);
  };

  return (
    <div className="Home">
      <div className="column-layout">
        <div className="column-item sidebar-one"></div>

        <div className="column-item main-column">
          <h1>Latest Updates</h1>
          <div className="manga-list">
            {mangas.map((manga) => (
              <div key={manga.MangaID} className="manga-item">
                <Link to={`/manga/${manga.MangaID}`}>
                  <img
                    src={manga.CoverImageUrl}
                    alt={manga.StoryName}
                    className="manga-cover"
                  />
                </Link>
                <nav id="manga-name">
                  <NavLink to={`/manga/${manga.MangaID}`} title={manga.StoryName}>
                    {manga.StoryName}
                  </NavLink>
                </nav>
                <nav id="chapter">
                  <NavLink to={`/manga/${manga.MangaID}/${manga.NumChapter}`}>
                    Chapter {manga.NumChapter}
                  </NavLink>
                </nav>
              </div>
            ))}
          </div>

          <div className="pagination">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              previousLabel="Previous"
              onPageChange={handlePageClick}
              pageCount={totalPages}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </div>

        <div className="column-item sidebar-two"></div>
      </div>
    </div>
  );
};

export default HomePage;
