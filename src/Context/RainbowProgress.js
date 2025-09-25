import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [playsUsed, setPlaysUsed] = useState(0); // 0/3 plays used

  const incrementPlay = () => {
    if (playsUsed < 3) {
      // only allow up to 3 plays
      setPlaysUsed(prev => prev + 1);
    }
  };

  return (
    <AppContext.Provider value={{ playsUsed, incrementPlay }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
