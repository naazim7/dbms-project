import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function logout() {
   
    setUser('');
  }

  useEffect(() => {


    const userData = localStorage.getItem('userData');

    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);



  return (
    <UserContext.Provider value={{ user, setUser,logout }}>
      {isLoading ? (
        <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
    </div>
      ) : (
        <>
          {children}
        </>
      )}
    </UserContext.Provider>
  );
}
