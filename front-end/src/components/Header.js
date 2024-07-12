import React, {useEffect, useState, useRef } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [showGenres, setShowGenres] = useState(false);
  const [genres, setGenres] = useState([]);
  const genresButtonRef = useRef(null);
  const subMenuRef = useRef(null);


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

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const fetchGenres = async () => {
    try {
      // Replace with actual API endpoint
      const response = await fetch('/genres');
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      setGenres(data.genres); // Assuming API response contains an array of genres
    } catch (error) {
      console.error('Error fetching genres:', error);
      // Handle error (e.g., show error message, retry mechanism)
    }
  };

  const handleMouseEnter = () => {
    setShowGenres(true);
  };

  const handleMouseLeave = () => {
    setShowGenres(false);
  };

  return (
    <header>
      <div className="top-header">
        <div className="logo">
            <a href="/">Manga</a>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="auth-buttons">
          <button>Login/Register</button>
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
              <a href="#">Genres</a>
              {showGenres && (
                <ul className="sub-menu" ref={subMenuRef}>
                  {genres.map(genre => (
                    <li key={genre.id}>
                      <a href={`/genres/${genre.id}`} className="genre-link">{genre.name}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li><a href="#">Regions</a></li>
            <li><a href="#">Age</a></li>
            <li><a href="#">Other</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
