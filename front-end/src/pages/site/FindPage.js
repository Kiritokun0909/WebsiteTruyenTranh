import React, { useEffect, useState } from "react";
import { Link, NavLink, useSearchParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../../styles/Home.css";
import "../../styles/Genre.css";
import { fetchMangasByKeyword } from "../../api/SiteService";

const FindPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mangas, setMangas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    const pageNumber = parseInt(searchParams.get("pageNumber"), 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
      navigate("/");
    } else {
      setCurrentPage(pageNumber);
      getMangasByKeyword(keyword, pageNumber);
    }
  }, [searchParams, navigate]);

  const getMangasByKeyword = async (keyword, pageNumber) => {
    try {
      const data = await fetchMangasByKeyword(keyword, pageNumber);
      setMangas(data.mangas);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error get list manga:", error);
    }
  };

  const handlePageClick = (event) => {
    const page = event.selected + 1;
    setSearchParams({ keyword: searchParams.get("keyword"), pageNumber: page });
  };

  return (
    <div className="home-layout">
      <div className="genre-info">
        <h5>
          {/* <NavLink to={`/`}></NavLink>Tìm kiếm */}
          Tìm kiếm
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

export default FindPage;
