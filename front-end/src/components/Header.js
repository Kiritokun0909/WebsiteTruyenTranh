import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { fetchGenres } from "../api/SiteService";

const useDropdownVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);
  const subMenuRef = useRef(null);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const handleOutsideClick = (event) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      subMenuRef.current &&
      !subMenuRef.current.contains(event.target)
    ) {
      hide();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return { isVisible, show, hide, buttonRef, subMenuRef };
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [genres, setGenres] = useState([]);

  const genresDropdown = useDropdownVisibility();
  const adminDropdown = useDropdownVisibility();
  const accountDropdown = useDropdownVisibility();

  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    const roleId = localStorage.getItem("roleId");
    setIsAdmin(!!roleId ? roleId === "1" : false);

    getGenres();
  }, []);

  const getGenres = async () => {
    try {
      const data = await fetchGenres();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error get list genre:", error);
    }
  };

  const handleFindClick = () => {
    navigate(`/?keyword=${searchText}&pageNumber=1`);
  };

  const handleLogout = () => {
    if (window.confirm("Bạn chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("roleId");
      setIsLoggedIn(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="top-header">
        <div className="logo">
          <Link to="/">Manga Reader</Link>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="auth-buttons">
            <button onClick={handleFindClick}>Tìm</button>
          </div>
        </div>
      </div>

      <div className="nav-bar">
        <ul>
          <li
            onMouseEnter={genresDropdown.show}
            onMouseLeave={genresDropdown.hide}
            ref={genresDropdown.buttonRef}
          >
            <Link to="#">Thể loại</Link>
            {genresDropdown.isVisible && (
              <ul className="sub-menu" ref={genresDropdown.subMenuRef}>
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

          {isAdmin ? (
            <li
              onMouseEnter={adminDropdown.show}
              onMouseLeave={adminDropdown.hide}
              ref={adminDropdown.buttonRef}
            >
              <Link to="#">Quản lý</Link>
              {adminDropdown.isVisible && (
                <ul className="account-sub-menu" ref={adminDropdown.subMenuRef}>
                  <li>
                    <Link to="/upload-manga">Đăng truyện</Link>
                  </li>
                  <li>
                    <Link to="/guide">Hướng dẫn</Link>
                  </li>
                  <li>
                    <Link to="/policy">Quy định</Link>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li></li>
          )}

          {isLoggedIn ? (
            <li
              onMouseEnter={accountDropdown.show}
              onMouseLeave={accountDropdown.hide}
              ref={accountDropdown.buttonRef}
            >
              <Link to="#">Tài khoản</Link>
              {accountDropdown.isVisible && (
                <ul
                  className="account-sub-menu"
                  ref={accountDropdown.subMenuRef}
                >
                  <li>
                    <Link to="/account">Thông tin</Link>
                  </li>
                  <li>
                    <Link to="/like-list">Yêu thích</Link>
                  </li>
                  <li>
                    <Link to="/follow-list">Theo dõi</Link>
                  </li>
                  <li onClick={handleLogout}>
                    <Link to="#">Đăng xuất</Link>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <Link to="/login">Đăng nhập</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
