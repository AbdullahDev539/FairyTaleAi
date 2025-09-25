import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const addToFavorites = story => {
    setFavorites(prev =>
      prev.some(s => s.id === story.id) ? prev : [...prev, story],
    );
  };

  const removeFromFavorites = id => {
    setFavorites(prev => prev.filter(s => s.id !== id));
  };

  const addToRecentlyPlayed = story => {
    setRecentlyPlayed(prev => {
      // remove if already in list
      const filtered = prev.filter(s => s.id !== story.id);
      return [story, ...filtered].slice(0, 20);
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        recentlyPlayed,
        addToRecentlyPlayed,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
