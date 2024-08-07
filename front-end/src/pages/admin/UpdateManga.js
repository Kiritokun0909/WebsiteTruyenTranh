import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/admin/UploadManga.css";
import "../../styles/Loading.css";
import { fetchGenres, fetchManga } from "../../api/SiteService";
import { updateManga } from "../../api/AdminService";

const UpdateMangaPage = () => {
  const { mangaId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [mangaName, setMangaName] = useState("");
  const [author, setAuthor] = useState("");
  const [ageLimit, setAgeLimit] = useState(0);
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [previewCoverImage, setPreviewCoverImage] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getManga = async () => {
      try {
        const data = await fetchManga(mangaId);
        const manga = data.manga[0];
        const listGenre = data.genres;

        setMangaName(manga.mangaName);
        setAuthor(manga.authorName);
        setAgeLimit(manga.ageLimit);
        setDescription(manga.description);
        setPreviewCoverImage(manga.coverImageUrl);

        const ids = listGenre.map((genre) => String(genre.genreId));
        setSelectedGenres(ids);
      } catch (error) {
        console.error("Error getting manga:", error);
      }
    };

    const getGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error getting list of genres:", error);
      }
    };

    getGenres();
    getManga();
  }, [mangaId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setPreviewCoverImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Remove duplicates
    const uniqueIds = [...new Set(selectedGenres.map((id) => String(id)))];
    setSelectedGenres(uniqueIds);

    setIsLoading(true);

    // console.log('submit selected genres: ', selectedGenres);
    const response = await updateManga(
      mangaId,
      coverImage,
      mangaName,
      author,
      ageLimit,
      description,
      selectedGenres
    );

    setIsLoading(false);

    if (response.code === 200) {
      alert("Cập nhật manga thành công.");
      navigate("/manga/" + mangaId);
    } else {
      alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
    }
  };

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;

    setSelectedGenres((prevSelectedGenres) =>
      checked
        ? [...prevSelectedGenres, value]
        : prevSelectedGenres.filter((genre) => genre !== value)
    );
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="upload-manga-layout">
      {isLoading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}

      <div className="home-header">
        <h3>Cập nhật thông tin truyện</h3>
      </div>

      <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="cover-image">
            <label>Ảnh bìa:</label>

            <div className="image-preview">
              <img src={previewCoverImage} alt="Ảnh bìa" />
            </div>

            <button type="button" onClick={handleButtonClick}>
              Chọn ảnh
            </button>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          <div className="info-input">
            <label>Tên manga:</label>
            <input
              className="info-input"
              type="text"
              value={mangaName}
              onChange={(e) => setMangaName(e.target.value)}
            />
          </div>

          <div className="info-input">
            <label>Tác giả:</label>
            <input
              className="info-input"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="info-input">
            <label>Tuổi:</label>
            <input
              className="age"
              type="number"
              value={ageLimit}
              onChange={(e) => setAgeLimit(e.target.value)}
            />
          </div>

          <div className="info-input">
            <label>Mô tả:</label>
            <textarea
              className="upload-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="upload-genres">
            <label>Thể loại:</label>
            <div className="genres-list">
              {genres.map((genre) => (
                <div key={genre.GenreID} className="genre-item">
                  <label>
                    <input
                      type="checkbox"
                      value={genre.GenreID}
                      checked={selectedGenres.includes(String(genre.GenreID))}
                      onChange={handleGenreChange}
                    />
                    {genre.GenreName}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="submit-button">
            <button type="submit">Cập nhật truyện</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMangaPage;
