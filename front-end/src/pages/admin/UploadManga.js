import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/UploadManga.css";
import { uploadManga } from "../../api/AdminService.js";

const UploadMangaPage = () => {
  const [mangaName, setMangaName] = useState("");
  const [author, setAuthor] = useState("");
  const [ageLimit, setAgeLimit] = useState(0);
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [previewCoverImage, setPreviewCoverImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setPreviewCoverImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await uploadManga(coverImage, mangaName, author, ageLimit, description);
    
    if (response.code === 201){
      alert("Thêm manga mới thành công.");
      navigate("/");
    }
    else{
      alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Ảnh bìa:</label>
          <input type="file" onChange={handleImageChange} />
          {previewCoverImage && (
            <div className="image-preview">
              <img src={previewCoverImage} alt="Ảnh bìa" />
            </div>
          )}
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

        <button type="submit">Đăng truyện</button>
      </form>
    </div>
  );
};

export default UploadMangaPage;
