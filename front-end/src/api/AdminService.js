export const uploadManga = async (
  coverImage, mangaName, author, 
  ageLimit, description, selectedGenres
) => {
  try {
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("coverImage", coverImage);
    formData.append("mangaName", mangaName);
    formData.append("author", author);
    formData.append("ageLimit", ageLimit);
    formData.append("description", description);
    selectedGenres.forEach((genre) => {
      if (!genre) { return; }
      formData.append('selectedGenres', genre);
    });


    const response = await fetch("/admin/upload-manga", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const message = await response.json();
    return { code: response.status, message: message };
  } catch (error) {
    console.error("Error upload manga:", error);
  }
};

export const updateManga = async (
  mangaId, coverImage, mangaName, author, 
  ageLimit, description, selectedGenres
) => {
  try {
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append('mangaId', mangaId);
    formData.append('mangaName', mangaName);
    formData.append('author', author);
    formData.append('ageLimit', ageLimit);
    formData.append('description', description);
    
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    selectedGenres.forEach((genre) => {
      if (!genre) { return; }
      formData.append('selectedGenres', genre);
    });


    const response = await fetch("/admin/update-manga", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const message = await response.json();
    return { code: response.status, message: message };
  } catch (error) {
    console.error("Error upload manga:", error);
  }
};


export const uploadChapter = async (mangaId, chapterName, chapterImages) => {
  try {
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("chapterName", chapterName);
    console.log(chapterImages);
    chapterImages.forEach((image) => {
      if (!image) { return; }
      formData.append('chapterImages', image);
    });
    
    const response = await fetch("/admin/upload-chapter/" + mangaId, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const message = await response.json();
    return { code: response.status, message: message };
  } catch (error) {
    console.error("Error upload chapter:", error);
  }
};

export const removeChapter = async (chapterId) => {
  try {
    const token = localStorage.getItem("authToken");
    
    const response = await fetch("/admin/remove-chapter/" + chapterId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const message = await response.json();
    return { code: response.status, message: message };
  } catch (error) {
    console.error("Error upload chapter:", error);
  }
};