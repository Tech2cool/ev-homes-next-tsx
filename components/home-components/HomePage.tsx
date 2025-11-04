import React, { useEffect } from "react";
import About from "./About";
import Hero from "./Hero";
import HomeNavbar from "./HomeNavbar";
import RecentProjects from "./RecentProjects";
import Gallary from "./Gallary";
import styles from "./home.module.css";
import Videos from "./Videos";
import Contact from "./Contact";
import { useData } from "@/providers/dataContext";

const HomePage = () => {
  const { getProjects } = useData();

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <HomeNavbar />
      <div className={styles.container}>
        {/* navbar only for home page */}
        {/* hero */}
        <Hero /> 
        {/* about */}
        <About />
        {/* Projects */}
        <RecentProjects />
        {/* Gallary */}
        <Gallary />
        {/* Videos */}
        <Videos />
        {/* Contact */}
        <Contact />
      </div>
    </>
  );
};

export default HomePage;
