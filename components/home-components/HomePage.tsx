import React from "react";
import About from "./About";
import Hero from "./Hero";
import HomeNavbar from "./HomeNavbar";
import RecentProjects from "./RecentProjects";
import Gallary from "./Gallary";
import styles from "./home.module.css";

const HomePage = () => {
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
      </div>
    </>
  );
};

export default HomePage;
