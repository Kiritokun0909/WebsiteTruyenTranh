// Get list genre from api
export const fetchGenres = async () => {
  try {
    const response = await fetch("/genres");
    if (!response.ok) {
      throw new Error("Failed to fetch list genre");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching list genre:", error);
  }
};

// Get list manga for homepage from api
export const fetchMangas = async (pageNumber) => {
  try {
    const response = await fetch("/mangas/pageNumber=" + pageNumber);
    if (!response.ok) {
      throw new Error("Failed to fetch list manga");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching list manga:", error);
  }
};

export const fetchManga = async (mangaId) => {
  try {
    const response = await fetch("/manga/" + mangaId);
    if (!response.ok) {
      throw new Error("Failed to fetch manga with id=" + mangaId);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching manga:", error);
  }
};

export const fetchChapter = async (chapterId) => {
  try {
    const response = await fetch("/chapter/" + chapterId);
    if (!response.ok) {
      throw new Error("Failed to fetch chapter with id=" + chapterId);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching chapter:", error);
  }
};