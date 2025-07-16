// src/utils/auth.js

const USER_KEY = 'logged_user';
const USERS = [{ username: 'admin@mail.com', password: 'password', name: 'Admin User' }];

export const login = (username, password) => {
  const user = USERS.find((u) => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const updateUserName = (name) => {
  const user = getCurrentUser();
  if (user) {
    user.name = name;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};
