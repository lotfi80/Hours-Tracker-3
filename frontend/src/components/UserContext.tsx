// import {
//   createContext,
//   useState,

//   // useEffect,
//   ReactNode,
// } from "react";

// interface User {
//   _id: string;
//   username: string;
// }

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const saveUser = (user: User | null) => {
//     setUser(user);
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser: saveUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

import React, { createContext, useState, ReactNode } from "react";

interface User {
  _id: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const saveUser = (user: User | null) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser: saveUser }}>
      {children}
    </UserContext.Provider>
  );
};
