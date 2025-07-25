"use client";
import fetchAdapter from "@/adapter/fetchAdapter";
import React, { useState } from "react";

type DataProviderProps = {
  children: React.ReactNode;
};

//model
type DataProviderState = {
  projects: OurProject[];
  getProjects: () => void;

  testimonials: Testimonial[];
  getTestimonals: () => void;

  loadingTestimonial: boolean;
  //   setTheme: (theme: Theme) => void;
  //   toggleTheme: () => void;
};

//initial values should define here
const initialState: DataProviderState = {
  projects: [],
  getProjects: () => {},

  testimonials: [],
  getTestimonals: () => {},

  loadingTestimonial: false,
  // setLoadingTestimonial: () => {},

  //   setTheme: () => null,
  //   toggleTheme: () => null,
};

const dataProviderContext =
  React.createContext<DataProviderState>(initialState);

export function DataProvider({ children, ...props }: DataProviderProps) {
  const [projects, setProjects] = useState<OurProject[]>([]);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonial, setLoadingTestimonial] = useState<boolean>(false);
  const [loadingProject, setLoadingProject] = useState<boolean>(false);
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
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoadingProject(false);

      return { success: false, message: err.message };
    } finally {
      setLoadingProject(false);
    }
  };

  //get all testimonials
  const getTestimonals = async () => {
    setLoadingTestimonial(true);
    setError("");

    try {
      let url = `/api/testimonial`;
      const res = await fetchAdapter(url, {
        method: "get",
      });

      setTestimonials(res?.data);
      setLoadingTestimonial(false);
      console.log(res?.data);
      return { success: true };
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoadingTestimonial(false);

      return { success: false, message: err.message };
    } finally {
      setLoadingTestimonial(false);
    }
  };

  const value = {
    projects: projects,
    testimonials: testimonials,
    loadingTestimonial: loadingTestimonial,
    getProjects: getProjects,
    getTestimonals: getTestimonals,
    setLoadingTestimonial: setLoadingTestimonial,
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
