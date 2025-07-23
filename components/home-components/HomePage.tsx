import React from "react";
import About from "./About";
import Hero from "./Hero";
import HomeNavbar from "./HomeNavbar";
import RecentProjects from "./RecentProjects";

const HomePage = () => {
  return (
    <div>
      {/* navbar only for home page */}
      <HomeNavbar />
      {/* hero */}
      <Hero />
      {/* about */}
      <About />
      {/* Projects */}
      <RecentProjects />
      {/* Gallary */}
    </div>
  );
};

export default HomePage;
