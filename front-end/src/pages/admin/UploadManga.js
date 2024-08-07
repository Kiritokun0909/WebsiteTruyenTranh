import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/UploadManga.css";
import "../../styles/Loading.css";
import { uploadManga } from "../../api/AdminService.js";
import { fetchGenres } from "../../api/SiteService";

const UploadMangaPage = () => {
  const [mangaName, setMangaName] = useState("");
  const [author, setAuthor] = useState("");
  const [ageLimit, setAgeLimit] = useState(0);
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [previewCoverImage, setPreviewCoverImage] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error get list genre:", error);
      }
    };

    getGenres();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setPreviewCoverImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if coverImage is provided
    if (!coverImage) {
      alert("Vui lòng tải lên ảnh bìa.");
      return;
    }

    setIsLoading(true);
    const response = await uploadManga(
      coverImage,
      mangaName,
      author,
      ageLimit,
      description,
      selectedGenres
    );
    setIsLoading(false);

    if (response.code === 201) {
      alert("Thêm manga mới thành công.");
      navigate("/");
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
        <h3>Đăng truyện mới</h3>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="cover-image">
          <label>Ảnh bìa:</label>

          <div className="image-preview">
            {previewCoverImage ? (
              <img src={previewCoverImage} alt="Ảnh bìa" />
            ) : (
              <img src={""} alt="Ảnh bìa" />
            )}
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
            required
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
                    onChange={handleGenreChange}
                  />
                  {genre.GenreName}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="submit-button">
          <button type="submit">Đăng truyện</button>
        </div>
      </form>
    </div>
  );
};

export default UploadMangaPage;
