export const RoleEnum = {
  ADMIN: 1,
  TRANSLATOR: 2,
  USER: 3,
};

const getToken = () => localStorage.getItem("authToken");
const getRoleId = () => localStorage.getItem("roleId");

export const isAuthenticated = () => {
  const token = getToken();
  return token !== null;
};

export const hasRole = (roleId) => {
  const userRoleId = parseInt(getRoleId(), 10);
  return userRoleId === roleId;
};
