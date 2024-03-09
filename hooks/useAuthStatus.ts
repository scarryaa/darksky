import { useState } from 'react';

interface AuthStatusType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAuthStatus = (): AuthStatusType => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return { isLoggedIn, setIsLoggedIn };
};
