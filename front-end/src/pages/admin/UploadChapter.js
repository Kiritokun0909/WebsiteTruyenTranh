import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/UploadManga.css';
import { uploadChapter } from "../../api/AdminService.js";

const UploadChapterPage = () => {
  const { mangaId } = useParams();
  const [chapterName, setChapterName] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const navigate = useNavigate();

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

      if (response.code === 201){
        alert("Thêm chương mới thành công.");
        navigate("/");
      }
      else{
        alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
          <label>MangaId: {mangaId}</label>
        </div>

        <div>
          <label>Tên chapter:</label>
          <input
            type="text"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
          />
        </div>

        {images.map((image, index) => (
          <div key={index}>
            <label>Image {index + 1}:</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, index)}
            />
            {previews[index] && (
              <div className="image-preview">
                <img src={previews[index]} alt={`Preview ${index + 1}`} />
              </div>
            )}
          </div>
        ))}

        <button type="button" onClick={addImageField}>
          Thêm ảnh
        </button>

        <button type="submit">Đăng chương</button>
      </form>
    </div>
  );
};

export default UploadChapterPage;
