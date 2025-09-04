"use client";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import Image from "next/image";
import { useTheme } from "next-themes";

const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by skipping image rendering until mounted
  const imageSrc =
    "https://cdn.evhomes.tech/05e35771-5741-4918-ad11-86b4a731a466-malibu_west.jpg";
  /*theme === "dark"
      ? "/images/hero_bg_image_transparent.png"
      : "/images/Homewhitetheme.png";*/

  return (
    <div id="home" className={styles.heroBackground}>
      <div className={styles.goldenOverlay}></div>
      <div className={styles.sparkles}></div>

      {/* Render image only after mount to avoid hydration mismatch */}
      {mounted && (
        <Image
          src={imageSrc}
          alt="Hero Background"
          fill
          priority
          quality={75}
          className={styles.image}
        />
      )}

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
