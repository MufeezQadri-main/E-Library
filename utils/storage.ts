import { User, Book } from '../types';

export const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('currentUser');
  return stored ? JSON.parse(stored) : null;
};

export const getStoredBooks = (): Book[] => {
  const stored = localStorage.getItem('books');
  return stored ? JSON.parse(stored) : [];
};

export const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem('users');
  return stored ? JSON.parse(stored) : [];
};

export const saveUser = (user: User) => {
  const users = getStoredUsers();
  const updatedUsers = [...users, user];
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const authenticateUser = (email: string, password: string): User | null => {
  // For demo purposes, we'll use a simple email check
  const users = getStoredUsers();
  const user = users.find(u => u.email === email);
  return user || null;
};