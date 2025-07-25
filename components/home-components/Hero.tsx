import React from "react";
import styles from "./home.module.css";
import Image from "next/image";
import { useTheme } from "next-themes";
// const imageSrc = "/images/hero_bg_image_transparent.png";

const Hero = () => {
  const { theme } = useTheme();
   const imageSrc =
    theme === "dark"
      ? "/images/hero_bg_image_transparent.png"
      : "/images/Homewhitetheme.png";
  return (
    <div id="home" className={styles.heroBackground}>
      <div className={styles.goldenOverlay}></div>
      {/* Sparkles behind the image */}
      <div className={styles.sparkles}></div>

      <Image
          src={imageSrc}
        alt="Hero Background"
        fill
        priority
        quality={75}
        className={styles.image}
      />
      <div className={styles.heroContent}>
        <button
          className={styles.btn}
          onClick={() => {
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className={styles.scroll}></div>
        </button>
      </div>
    </div>
  );
};

export default Hero;
