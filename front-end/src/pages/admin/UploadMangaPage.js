import React, { useState } from 'react';
import '../../styles/UploadManga.css';

const UploadForm = () => {
  const [mangaName, setMangaName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [orderNumbers, setOrderNumbers] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e, index) => {
    const files = [...images];
    files[index] = e.target.files[0];
    setImages(files);

    const orders = [...orderNumbers];
    orders[index] = index + 1;
    setOrderNumbers(orders);

    const previewFiles = [...previews];
    previewFiles[index] = URL.createObjectURL(e.target.files[0]);
    setPreviews(previewFiles);
  };

  const addImageField = () => {
    setImages([...images, null]);
    setOrderNumbers([...orderNumbers, images.length + 1]);
    setPreviews([...previews, null]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('mangaName', mangaName);
    formData.append('description', description);
    images.forEach((image, index) => {
      formData.append('listImage', image);
      formData.append('orderNumbers', orderNumbers[index]);
    });

    try {
      const response = await fetch('/admin/upload-manga', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Manga Name:</label>
          <input
            type="text"
            value={mangaName}
            onChange={(e) => setMangaName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          Add Image
        </button>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
