export const fetchListLike = async (pageNumber) => {
    try {
      const token = localStorage.getItem('authToken');
  
      const apiURL = "/account/like-list/pageNumber=" + pageNumber;
  
      const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        },
    })
  
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
      const token = localStorage.getItem('authToken');
  
      const apiURL = "/account/follow-list/pageNumber=" + pageNumber;
  
      const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        },
    })
  
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
      const token = localStorage.getItem('authToken');
  
      const apiURL = "/account/get-username";
  
      const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        },
    })
  
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
      const token = localStorage.getItem('authToken');
  
      const apiURL = "/account/update-username";
  
      const response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ newUsername: username })
    })
  
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
      const token = localStorage.getItem('authToken');
  
      const apiURL = "/account/update-password";
  
      const response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: password })
    })
  
      if (!response.ok) {
        throw new Error("Failed to update password");
      }
      return await response.json();
    } catch (error) {
      console.error("Error update password", error);
    }
  };
  