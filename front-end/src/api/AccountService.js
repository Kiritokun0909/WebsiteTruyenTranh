export const fetchListLike = async (pageNumber) => {
  try {
    const token = localStorage.getItem("authToken");

    const apiURL = "/account/like-list/pageNumber=" + pageNumber;

    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`, // notice the Bearer before your token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch list like manga");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching list like manga:", error);
  }
};

export const fetchListFollow = async (pageNumber) => {
  try {
    const token = localStorage.getItem("authToken");

    const apiURL = "/account/follow-list/pageNumber=" + pageNumber;

    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`, // notice the Bearer before your token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch list follow manga");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching list follow manga:", error);
  }
};

export const getUsername = async () => {
  try {
    const token = localStorage.getItem("authToken");

    const apiURL = "/account/get-username";

    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`, // notice the Bearer before your token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get username");
    }
    return await response.json();
  } catch (error) {
    console.error("Error get username", error);
  }
};

export const updateUsername = async (username) => {
  try {
    const token = localStorage.getItem("authToken");

    const apiURL = "/account/update-username";

    const response = await fetch(apiURL, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newUsername: username }),
    });

    if (!response.ok) {
      throw new Error("Failed to update username");
    }
    return await response.json();
  } catch (error) {
    console.error("Error update username", error);
  }
};

export const updatePassword = async (password) => {
  try {
    const token = localStorage.getItem("authToken");

    const apiURL = "/account/update-password";

    const response = await fetch(apiURL, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPassword: password }),
    });

    if (!response.ok) {
      throw new Error("Failed to update password");
    }
    return await response.json();
  } catch (error) {
    console.error("Error update password", error);
  }
};

export const getLikeStatus = async (mangaId) => {
  try {
    const token = localStorage.getItem("authToken");

    const apiURL = "/account/is-like/" + mangaId;

    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const message = await response.json();
    return { code: response.status, message: message };
  } catch (error) {
    console.error("Error fetching list like manga:", error);
  }
}

export const getFollowStatus = async (mangaId) => {
  try {
    const token = localStorage.getItem("authToken");

    const apiURL = "/account/is-follow/" + mangaId;

    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const message = await response.json();
    return { code: response.status, message: message };
  } catch (error) {
    console.error("Error fetching list like manga:", error);
  }
}

export const likeManga = async (mangaId, isLike = false) => {
  try {
    const token = localStorage.getItem("authToken");

    const apiURL = "/account"
      + (isLike ? "/like-manga/" : "/unlike-manga/")
      + mangaId
    ;

    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const message = await response.json();
    return { code: response.status, message: message };
  } catch (error) {
    console.error("Error fetching list like manga:", error);
  }
}

export const followManga = async (mangaId, isFollow = false) => {
  try {
    const token = localStorage.getItem("authToken");

    const apiURL = "/account"
      + (isFollow ? "/follow-manga/" : "/unfollow-manga/")
      + mangaId
    ;

    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const message = await response.json();
    return { code: response.status, message: message };
  } catch (error) {
    console.error("Error fetching list like manga:", error);
  }
}


export const commentManga = async (mangaId, context) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch("/account/comment-manga/" + mangaId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ context: context }),
    });

    if (!response.ok) {
      throw new Error("Failed to comment manga");
    }
    return await response.json();
  } catch (error) {
    console.error("Error comment manga:", error);
  }
}

export const commentChapter = async (chapterId, context) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch("/account/comment-chapter/" + chapterId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ context: context }),
    });

    if (!response.ok) {
      throw new Error("Failed to comment chapter");
    }
    return await response.json();
  } catch (error) {
    console.error("Error comment chapter:", error);
  }
}