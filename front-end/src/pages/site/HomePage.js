import React, { useEffect, useState } from "react";
import { Link, NavLink, useSearchParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../../styles/Home.css";
import { fetchMangas } from "../../api/SiteService";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mangas, setMangas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const page = parseInt(searchParams.get("pageNumber"), 10);

    if (isNaN(page) || page < 1) {
      navigate("/");
      setCurrentPage(1);
      getMangas(1);
    } else {
      setCurrentPage(page);
      getMangas(page);
    }
  }, [searchParams, navigate]);

  const getMangas = async (page) => {
    try {
      const data = await fetchMangas(page);
      setMangas(data.mangas);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error get list manga:", error);
    }
  };

  const handlePageClick = (event) => {
    const page = event.selected + 1;
    setSearchParams({ pageNumber: page });
  };

  return (
    <div className="home-layout">
      <div className="home-header">
        <h3>Truyện mới cập nhật</h3>
      </div>

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
                {manga.NumChapter}
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

export default HomePage;
