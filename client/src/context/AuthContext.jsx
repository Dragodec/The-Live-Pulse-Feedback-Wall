import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import { socket } from '../lib/socket';
import { toast } from 'sonner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
      socket.connect();
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    const handleUnauthorized = () => setUser(null);
    window.addEventListener('auth-unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth-unauthorized', handleUnauthorized);
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      setUser(data);
      socket.connect();
      toast.success(`Welcome back, ${data.username}`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
      throw err;
    }
  };

  const signup = async (credentials) => {
    try {
      const { data } = await api.post('/auth/signup', credentials);
      setUser(data);
      socket.connect();
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      socket.disconnect();
      toast.info("Logged out");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);