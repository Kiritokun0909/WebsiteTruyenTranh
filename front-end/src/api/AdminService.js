export const uploadManga = async (
  coverImage, mangaName, 
  author, ageLimit, description
) => {
  try {
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("coverImage", coverImage);
    formData.append("mangaName", mangaName);
    formData.append("author", author);
    formData.append("ageLimit", ageLimit);
    formData.append("description", description);

    const response = await fetch("/admin/upload-manga", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload manga");
    }
    return await response.json();
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
    console.log(response.status);
    return { code: response.status, message: message };
  } catch (error) {
    console.error("Error upload chapter:", error);
  }
};

