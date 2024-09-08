import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { URL } from "../url"; // Make sure URL is correctly imported from your configuration

export const UserContext = createContext({});

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/refetch");
      setUser(res.data);
    } catch (err) {
      console.log("Error fetching user data:", err);
      setUser(null); // Ensure user is set to null on failure
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
