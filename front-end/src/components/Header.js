import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [showGenres, setShowGenres] = useState(false);
  const [genres, setGenres] = useState([]);
  const genresButtonRef = useRef(null);
  const subMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    // Add event listener to handle clicks outside the genres button and drop-down
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

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const fetchGenres = async () => {
    try {
      // Replace with actual API endpoint
      const response = await fetch("/genres");
      if (!response.ok) {
        throw new Error("Failed to fetch genres");
      }
      const data = await response.json();
      setGenres(data.genres); // Assuming API response contains an array of genres
    } catch (error) {
      console.error("Error fetching genres:", error);
      // Handle error (e.g., show error message, retry mechanism)
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
    <header>
      <div className="top-header">
        <div className="logo">
          <Link to="/">Manga Reader</Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="auth-buttons">
          <button onClick={handleLoginRegisterClick}>Find</button>
        </div>
      </div>

      <div className="nav-bar">
        <nav>
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
