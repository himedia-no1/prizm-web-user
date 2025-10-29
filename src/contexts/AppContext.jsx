'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    }
    return false;
  });
  const [modalType, setModalType] = useState(null);
  const [modalProps, setModalProps] = useState({});

  useEffect(() => {
    // Apply theme to document
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';

    // Save preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const openModal = (type, props = {}) => {
    setModalType(type);
    setModalProps(props);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps({});
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
    modalType,
    modalProps,
    openModal,
    closeModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export default AppContext;
