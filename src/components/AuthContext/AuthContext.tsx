import React, { createContext, useState } from 'react';

export interface AuthContextType {
  loggedOut: boolean;
  setLoggedOut: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedOut, setLoggedOut] = useState(true);

  return (
    <AuthContext.Provider value={{ loggedOut, setLoggedOut }}>{children}</AuthContext.Provider>
  );
};
