import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/UploadManga.css";
import { fetchGenres, fetchManga } from "../../api/SiteService";
import { updateManga } from "../../api/AdminService";

const UpdateMangaPage = () => {
  const { mangaId } = useParams();

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

        setMangaName(manga.StoryName);
        setAuthor(manga.AuthorName);
        setAgeLimit(manga.AgeLimit);
        setDescription(manga.Description);;
        setPreviewCoverImage(manga.CoverImageUrl);

        const ids = listGenre.map(genre => String(genre.GenreID));
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
    const uniqueIds = [...new Set(selectedGenres.map(id => String(id)))];
    setSelectedGenres(uniqueIds);

    // console.log('submit selected genres: ', selectedGenres);
    const response = await updateManga(mangaId, coverImage, mangaName, author
      , ageLimit, description, selectedGenres);
    
    if (response.code === 200){
      alert("Cập nhật manga thành công.");
      navigate("/manga/" + mangaId);
    }
    else{
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

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Ảnh bìa:</label>
          <input type="file" onChange={handleImageChange} />
          <div className="image-preview">
              <img src={previewCoverImage} alt="Ảnh bìa" />
            </div>
        </div>

        <div>
          <label>Tên manga:</label>
          <input
            type="text"
            value={mangaName}
            onChange={(e) => setMangaName(e.target.value)}
          />
        </div>

        <div>
          <label>Tác giả:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div>
          <label>Tuổi:</label>
          <input
            type="number"
            value={ageLimit}
            onChange={(e) => setAgeLimit(e.target.value)}
          />
        </div>

        <div>
          <label>Mô tả:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Thể loại:</label>
          <div className="genres-list">
            {genres.map((genre) => (
              <div key={genre.GenreID}>
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

        <button type="submit">Cập nhật truyện</button>
      </form>
    </div>
  );
};

export default UpdateMangaPage;
