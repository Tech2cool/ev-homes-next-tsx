"use client";

import fetchAdapter from "@/adapter/fetchAdapter";
import React from "react";
import { createContext, useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";

type UserProviderProps = {
  children: React.ReactNode;
};


type userSuccess = {
  success:boolean,
  message?: null| undefined | string,
};


//model
type UserProviderState = {
  user: Employee | null;
  login: (email: string, password: string) => Promise<userSuccess>;
  logout: () => void;
  loading: boolean;
  error: string | null | undefined;
};

//initial values should define here
const initialState: UserProviderState = {
  user: null,
  login:async (email, password) => ({success:false}),
  logout: () => {},
  loading: false,
  error: null,
}; 

const userContext = React.createContext<UserProviderState>(initialState);

export const UserProvider = ({ children, ...props }: UserProviderProps) => {
  const [user, setUser] = useState<Employee | null>(null);
  const [socketInfo, setSocketInfo] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>(null);
  const socketRef = useRef(null);

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  //   const initSocket = (userData = user) => {
  //     if (!userData) return;

  //     if (socketRef.current) {
  //       console.log("Socket already exists, skipping init.");
  //       return;
  //     }

  //     // const socket = io("https://api.evhomes.tech", {
  //     //   transports: ["websocket"],
  //     //   reconnection: true,
  //     // });

  //     socket.on("connect", () => {
  //       console.log("Socket connected:", socket.id);
  //       socket.emit("userConnected", {
  //         userId: userData._id,
  //         platform: "web",
  //       });
  //     });

  //     socket.on("callCustomer", (data) => {
  //       console.log("callCustomer event:", data);
  //       // Add UI feedback (e.g., toast) here
  //     });

  //     socket.on("onChangeUserInfo", (data) => {
  //       console.log("onChangeUserInfo event:", data);
  //       // Add UI feedback (e.g., toast) here
  //       setSocketInfo(data);
  //     });

  //     socket.on("disconnect", () => {
  //       console.log("Socket disconnected");
  //     });

  //     socketRef.current = socket;
  //   };

  //   const reconnectSocket = () => {
  //     if (socketRef.current) {
  //       socketRef.current.disconnect();
  //       socketRef.current = null;
  //     }
  //     initSocket();
  //   };

  //   useEffect(() => {
  //     if (user) initSocket();
  //     return () => {
  //       if (socketRef.current) {
  //         socketRef.current.disconnect();
  //         socketRef.current = null;
  //       }
  //     };
  //   }, [user]);

  const login = async (email: string, password: string): Promise<userSuccess> => {
    setLoading(true);
    setError("");

    // console.log("here");
    try {
      const res = await fetchAdapter("/api/employee-login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    //   console.log(res);
      if (res.code != 200) {
        setError(res?.message);
        return { success: false, message: res?.message };
      }
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }

      setUser(res?.data);
      return { success: true, ...res.data };
    } catch (err:any) {
        setError(err.message);
        return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
        return { success: false};
  };

  const logout = async () => {
    await fetchAdapter("/api/employee-logout", {
      method: "POST",
    });

    localStorage.removeItem("user");
    // Clear cookies for access and refresh tokens

    setUser(null);
  };

  const value = {
    user: user,
    loading: loading,
    error: error,
    login: login,
    logout: logout,
    setLoading: setLoading,
  };

  return (
    <userContext.Provider {...props} value={value} >
      {children}
    </userContext.Provider>
  );
};
export const useUser = () => {
  const context = React.useContext(userContext);

  if (context === undefined)
    throw new Error("useData must be used within a DataProvider");

  return context;
};
