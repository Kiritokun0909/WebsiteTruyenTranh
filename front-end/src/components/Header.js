import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { fetchGenres } from "../api/SiteService";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccountMgr, setShowAccountMgr] = useState(false);
  const accountButtonRef = useRef(null);
  const accountSubMenuRef = useRef(null);

  const [showGenres, setShowGenres] = useState(false);
  const [genres, setGenres] = useState([]);
  const genresButtonRef = useRef(null);
  const subMenuRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    getGenres();
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getGenres = async () => {
    try {
      const data = await fetchGenres();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error get list genre:", error);
    }
  };

  const handleOutsideClick = (event) => {
    if (
      genresButtonRef.current &&
      !genresButtonRef.current.contains(event.target) &&
      subMenuRef.current &&
      !subMenuRef.current.contains(event.target)
    ) {
      setShowGenres(false);
    }

    if (
      accountButtonRef.current &&
      !accountButtonRef.current.contains(event.target) &&
      accountSubMenuRef.current &&
      !accountSubMenuRef.current.contains(event.target)
    ) {
      setShowAccountMgr(false);
    }
  };

  const handleMouseEnterGenres = () => {
    setShowGenres(true);
  };

  const handleMouseLeaveGenres = () => {
    setShowGenres(false);
  };

  const handleMouseEnterAccountMgr = () => {
    setShowAccountMgr(true);
  };

  const handleMouseLeaveAccountMgr = () => {
    setShowAccountMgr(false);
  };

  const handleFindClick = () => {
    navigate("/#");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      <div className="top-header">
        <div className="logo">
          <Link to="/">Manga Reader</Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <div className="auth-buttons">
            <button onClick={handleFindClick}>Tìm</button>
          </div>
        </div>
      </div>

      <div className="nav-bar">
        <ul>
          <li
            onMouseEnter={handleMouseEnterGenres}
            onMouseLeave={handleMouseLeaveGenres}
            ref={genresButtonRef}
          >
            <Link to="#">Thể loại</Link>
            {showGenres && (
              <ul className="sub-menu" ref={subMenuRef}>
                {genres.map((genre) => (
                  <li key={genre.GenreID}>
                    <Link
                      to={`/?genreId=${genre.GenreID}&pageNumber=1`}
                      className="genre-link"
                    >
                      {genre.GenreName}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link to="#">Khác</Link>
          </li>

          {isLoggedIn ? (
            <li
              onMouseEnter={handleMouseEnterAccountMgr}
              onMouseLeave={handleMouseLeaveAccountMgr}
              ref={accountButtonRef}
            >
              <Link to="#">
                Tài khoản
              </Link>
              {showAccountMgr && (
                <ul className="account-sub-menu" ref={accountSubMenuRef}>
                  <li>
                    <Link to="/account">Thông tin</Link>
                  </li>
                  <li >
                    <Link to="/like-list">Yêu thích</Link>
                  </li>
                  <li>
                    <Link to="/follow-list">Theo dõi</Link>
                  </li>
                  <li onClick={handleLogout}>
                    <Link to="/">Logout</Link>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <Link to="/login">Đăng nhập/Đăng ký</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
