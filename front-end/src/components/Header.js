import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { fetchGenres } from "../api/SiteService";

const Header = () => {
  const [showGenres, setShowGenres] = useState(false);
  const [genres, setGenres] = useState([]);
  const genresButtonRef = useRef(null);
  const subMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
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
  };

  const handleMouseEnter = () => {
    setShowGenres(true);
  };

  const handleMouseLeave = () => {
    setShowGenres(false);
  };

  const handleLoginRegisterClick = () => {
    navigate("/#");
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
            <button onClick={handleLoginRegisterClick}>Find</button>
          </div>
        </div>
      </div>

      <div className="nav-bar">
      <ul>
            <li
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={genresButtonRef}
            >
              <Link to="#">Genres</Link>
              {showGenres && (
                <ul className="sub-menu" ref={subMenuRef}>
                  {genres.map((genre) => (
                    <li key={genre.GenreID}>
                      <Link
                        to={`/genres/${genre.GenreID}`}
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
              <Link to="#">Other</Link>
            </li>

            <li>
              <Link to="/login">Login/Register</Link>
            </li>
          </ul>
      </div>
    </div>
  );
};

export default Header;
