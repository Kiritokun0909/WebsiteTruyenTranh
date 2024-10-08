import React, { useEffect, useState } from "react";
import { Link, NavLink, useSearchParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../../styles/Home.css";
import "../../styles/Genre.css";
import { fetchMangasByGenre, fetchGenre } from "../../api/SiteService";

const GenrePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mangas, setMangas] = useState([]);
  const [genreName, setGenreName] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let genreId = parseInt(searchParams.get("genreId"), 10);
    let pageNumber = parseInt(searchParams.get("pageNumber"), 10);

    if (isNaN(genreId) || genreId < 1 || isNaN(pageNumber) || pageNumber < 1) {
      navigate("/");
    } else {
      setCurrentPage(pageNumber);
      getMangasByGenre(genreId, pageNumber);
    }

    getGenre(genreId);
  }, [searchParams, navigate]);

  const getMangasByGenre = async (genreId, pageNumber) => {
    try {
      const data = await fetchMangasByGenre(genreId, pageNumber);
      setMangas(data.mangas);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error get list manga:", error);
    }
  };

  const getGenre = async (genreId) => {
    try {
      const data = await fetchGenre(genreId);
      setGenreName(data.genreName);
    } catch (error) {
      console.error("Error get genre:", error);
    }
  };

  const handlePageClick = (event) => {
    const page = event.selected + 1;
    setSearchParams({ genreId: searchParams.get("genreId"), pageNumber: page });
  };

  return (
    <div className="home-layout">
      <div className="genre-info">
        <h5>
          <NavLink to={`/`}>Trang chủ</NavLink>/Thể loại/{genreName}
        </h5>
      </div>

      <div className="manga-list">
        {mangas.map((manga) => (
          <div key={manga.mangaId} className="manga-item">
            <Link to={`/manga/${manga.mangaId}`}>
              <img
                src={manga.coverImageUrl}
                alt={manga.mangaName}
                className="manga-cover"
              />
            </Link>
            <nav id="manga-name">
              <NavLink to={`/manga/${manga.mangaId}`} title={manga.mangaName}>
                {manga.mangaName}
              </NavLink>
            </nav>
            <nav id="chapter">
              <NavLink to={`/manga/${manga.mangaId}`}>
                {manga.newChapterName}
              </NavLink>
            </nav>
          </div>
        ))}
      </div>

      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Trang kế"
          previousLabel="Trang trước"
          onPageChange={handlePageClick}
          pageCount={totalPages}
          forcePage={currentPage - 1}
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
  );
};

export default GenrePage;
