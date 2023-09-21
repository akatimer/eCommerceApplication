import { useContext } from 'react';
import { AuthContextType, AuthContext } from '../AuthContext/AuthContext';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
