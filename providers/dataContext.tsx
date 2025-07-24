"use client";
import fetchAdapter from "@/adapter/fetchAdapter";
import React, { useState } from "react";

type DataProviderProps = {
  children: React.ReactNode;
};

type DataProviderState = {
  projects: OurProject[];
  getProjects:()=>void;

  //   setTheme: (theme: Theme) => void;
  //   toggleTheme: () => void;
};
const initialState: DataProviderState = {
  projects: [],
    getProjects:()=>{},

  //   setTheme: () => null,
  //   toggleTheme: () => null,
};

const dataProviderContext =
  React.createContext<DataProviderState>(initialState);

export function DataProvider({ children, ...props }: DataProviderProps) {
  const [projects, setProjects]=useState<OurProject[]>([]);

  const [loadingProject, setLoadingProject] = useState<Boolean>(false);
  const [error, setError] = useState("");




  const getProjects = async () => {
    setLoadingProject(true);
    setError("");

    try {
      let url = `/api/ourProjects`;
      const res = await fetchAdapter(url, {
        method: "get",
      });


      console.log(res?.data);
      setProjects(res?.data ?? []);
      setLoadingProject(false);

      return { success: true };
    } catch (err:any) {
      console.log(err);
      setError(err.message);
      setLoadingProject(false);

      return { success: false, message: err.message };
    } finally {
      setLoadingProject(false);
    }
  };




  const value = {
    projects: projects,
    getProjects:getProjects,
  };

  return (
    <dataProviderContext.Provider {...props} value={value}>
      {children}
    </dataProviderContext.Provider>
  );
}

export const useData = () => {
  const context = React.useContext(dataProviderContext);

  if (context === undefined)
    throw new Error("useData must be used within a DataProvider");

  return context;
};
