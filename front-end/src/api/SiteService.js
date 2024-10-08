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

export const fetchGenre = async (genreId) => {
  try {
    const response = await fetch("/genre/" + genreId);
    if (!response.ok) {
      throw new Error("Failed to fetch genre");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching genre:", error);
  }
};

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

export const fetchMangasByGenre = async (genreId, pageNumber) => {
  try {
    const response = await fetch("/mangas/genreId=" + genreId +"&pageNumber=" + pageNumber);
    if (!response.ok) {
      throw new Error("Failed to fetch list manga by genre");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching list manga by genre:", error);
  }
};

export const fetchMangasByKeyword = async (keyword, pageNumber) => {
  try {
    const response = await fetch("/mangas/keyword=" + keyword +"&pageNumber=" + pageNumber);
    if (!response.ok) {
      throw new Error("Failed to fetch list manga by keyword");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching list manga by keyword:", error);
  }
};

export const fetchManga = async (mangaId) => {
  try {
    const response = await fetch("/manga/" + mangaId);
    if (!response.ok) {
      throw new Error("Failed to fetch manga with id=" + mangaId);
    }

    // console.log(response.json());
    return await response.json();
  } catch (error) {
    console.error("Error fetching manga:", error);
  }
};

export const fetchChapter = async (chapterId) => {
  try {
    const response = await fetch("/chapter/" + chapterId);
    if (!response.ok) {
     console.log("Failed to fetch chapter with id=" + chapterId);
    }
    return await response;
  } catch (error) {
    console.error("Error fetching chapter:", error);
  }
};

export const fetchMangaComment = async (mangaId, pageNumber) => {
  try {
    const response = await fetch("/manga/" + mangaId + "/comment/" + pageNumber);
    if (!response.ok) {
      throw new Error("Failed to fetch list manga");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching list manga comment:", error);
  }
};

export const fetchChapterComment = async (chapterId, pageNumber) => {
  try {
    const response = await fetch("/chapter/" + chapterId + "/comment/" + pageNumber);
    if (!response.ok) {
      throw new Error("Failed to fetch list chapter comment");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching list chapter comment:", error);
  }
};