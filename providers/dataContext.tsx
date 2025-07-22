import React from "react";

type DataProviderProps = {
  children: React.ReactNode;
};

type DataProviderState = {
  projects: OurProject[];
  //   setTheme: (theme: Theme) => void;
  //   toggleTheme: () => void;
};
const initialState: DataProviderState = {
  projects: [],
  //   setTheme: () => null,
  //   toggleTheme: () => null,
};

const dataProviderContext =
  React.createContext<DataProviderState>(initialState);

export function DataProvider({ children, ...props }: DataProviderProps) {
  const [projects, setProjects] = React.useState<OurProject[]>([]);

  const value = {
    projects: projects,
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
