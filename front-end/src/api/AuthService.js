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



