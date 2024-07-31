export const RoleEnum = {
  ADMIN: 1,
  TRANSLATOR: 2,
  USER: 3,
};

export const login = async (email, password) => {
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    return response;
  } catch (error) {
    console.error("Error login:", error);
    throw error;
  }
};

export const register = async (email, password) => {
  try {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    return response;
  } catch (error) {
    console.error("Error register:", error);
    throw error;
  }
};

const getToken = () => localStorage.getItem('authToken');
const getRoleId = () => localStorage.getItem('roleId');

export const isAuthenticated = () => {
  const token = getToken();
  return token !== null;
};

export const hasRole = (roleId) => {
  const userRoleId = getRoleId();
  return userRoleId === roleId;
};

