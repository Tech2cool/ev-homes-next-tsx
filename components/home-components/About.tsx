import React from "react";
import styles from "./home.module.css";

const About = () => {
  return (
    <div id="about" className={styles.aboutUs}>
      <h1 className={styles.heading}>EV HOMES</h1>
      <div className={styles.subtext}>
        EV Group to one of India&apos;s Leading and Fast Growing Engineering and
        Real Estate Company. To a Team of Entrepreneurs, focused on Quality and
        an excellent. Return on Investment. The Group has ideally positioned
        itself as a market leader in identifying and executing projects with
        realistic valuations, thus always performing above the market average.
        The Group has a diverse portfolio of Engineering and Real Estate assets
        under its management. The portfolio is also geographically diversified
        with a Pan India presence in Tier II & Tier III cities of Bangalore,
        Cochin & N.Mumbai and Globally focused on the Middle East market.
      </div>
    </div>
  );
};

export default About;
