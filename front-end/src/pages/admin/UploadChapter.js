import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/admin/UploadManga.css";
import { uploadChapter } from "../../api/AdminService.js";
import { fetchManga } from "../../api/SiteService.js";

const UploadChapterPage = () => {
  const { mangaId } = useParams();
  const [manga, setManga] = useState([]);

  const [latestChapterName, setLatestChapterName] = useState(
    "Không có chương nào"
  );
  const [chapterName, setChapterName] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getManga = async () => {
      try {
        const data = await fetchManga(mangaId);
        setManga(data.manga);

        if (data.chapters.length !== 0) {
          setLatestChapterName(data.chapters[0].chapterName);
        }
      } catch (error) {
        console.error("Error getting manga:", error);
      }
    };
    getManga();
  }, [mangaId]);

  const handleImageChange = (e, index) => {
    const files = [...images];
    files[index] = e.target.files[0];
    setImages(files);

    const previewFiles = [...previews];
    previewFiles[index] = URL.createObjectURL(e.target.files[0]);
    setPreviews(previewFiles);
  };

  const addImageField = () => {
    setImages([...images, null]);
    setPreviews([...previews, null]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await uploadChapter(mangaId, chapterName, images);

      if (response.code === 201) {
        alert("Thêm chương mới thành công.");
        navigate("/manga/" + mangaId);
      } else {
        alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleButtonClick = (index) => {
    document.getElementById("fileInput-" + index).click();
  };

  return (
    <div className="upload-manga-layout">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          {manga.map((mangaItem) => (
            <div key={mangaItem.mangaId} className="manga-info">
              <div className="manga-cover">
                <img
                  src={mangaItem.coverImageUrl}
                  alt={mangaItem.mangaName}
                  className="manga-cover"
                />
              </div>

              <div className="manga-info-detail">
                <h4>{mangaItem.mangaName}</h4>
                <div className="list-info">
                  <p>
                    <strong>Tác giả:</strong> {mangaItem.authorName}
                  </p>
                  <p>
                    <strong>Độ tuổi:</strong> {mangaItem.ageLimit}+
                  </p>
                  <p>
                    <strong>Lượt xem:</strong> {mangaItem.numViews}
                  </p>
                  <p>
                    <strong>Lượt theo dõi:</strong> {mangaItem.numFollows}
                  </p>
                  <p>
                    <strong>Lượt yêu thích:</strong> {mangaItem.numLikes}
                  </p>
                  <p>
                    <strong>Chương mới nhất:</strong> {latestChapterName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="info-input" style={{ marginTop: "12px", marginBottom: "8px" }}>
          <label>Tên chapter mới:</label>
          <input
            type="text"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            required
          />
        </div>

        {images.map((image, index) => (
          <div key={index} className="cover-image">
            <label>Ảnh {index + 1}:</label>

            <div className="image-preview">
              {previews[index] ? (
                <img src={previews[index]} alt={`Ảnh ${index + 1}`} />
              ) : (
                <img src={""} alt={`Ảnh ${index + 1}`} />
              )}
            </div>

            <button type="button" onClick={() => handleButtonClick(index)}>
              Chọn ảnh
            </button>

            <input
              type="file"
              id={`fileInput-${index}`}
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e, index)}
            />
          </div>
        ))}

        <div className="submit-button">
          <button
            type="button"
            onClick={addImageField}
            style={{ margin: "4px" }}
          >
            Thêm ảnh
          </button>

          <button type="submit" style={{ margin: "4px" }}>
            Đăng chương
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadChapterPage;
