"use client";
import styles from "./upcoming.module.css";
import { useEffect, useState } from "react";

const bgImages: string[] = [
  "/images/soon1.jpg",
  "/images/soon4.jpg",
  "/images/soon5.jpg",
];

const rightImages: string[] = [
  "/images/soonback2.jpeg",
  "/images/soonback1.jpg",
  "/images/soonback3.jpg",
];

const Upcoming = () => {
  const [current, setCurrent] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const totalSlides = Math.min(bgImages.length, rightImages.length);
    const timer = setInterval(() => {
      handleSlideChange((current + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(timer);
  }, [current]);

  const handleSlideChange = (index: number) => {
    setCurrent(index);
    setAnimationKey(prev => prev + 1);
  };

  return (
    <>

      <div className={styles.projectscontainer}>
        <div
          key={animationKey}
          className={`${styles.fullBg} ${styles.zoomAnimation}`}
          style={{ backgroundImage: `url(${bgImages[current]})` }}
        ></div>

        <div className={styles.overlay}></div>

        <div className={styles.container}>
          {/* Left Side Buttons */}
          <div className={styles.leftSide}>
            <div className={styles.buttonContainer}>
              {bgImages.map((_, index) => (
                <button
                  key={index}
                  className={styles.dotBtn}
                  onClick={() => handleSlideChange(index)}
                >
                  <span className={styles.dot}></span>
                  {index === current && (
                    <svg
                      key={animationKey}
                      className={styles.progressRing}
                      width="40"
                      height="40"
                    >
                      <circle
                        className={styles.progressCircle}
                        cx="20"
                        cy="20"
                        r="18"
                      ></circle>
                    </svg>
                  )}
                </button>
              ))}

            </div>
            <div className={styles.contattext}>
              <p className={styles.contactmain} >Capitol Nine</p>
              <p className={styles.contactpara}>Launching soon Capital Nine a distinguished premium project</p>
            </div>
            <div className={styles.line}></div>
            <div
              className={styles.arrowDown}
              onClick={() => {
                window.scrollBy({
                  top: 700,
                  left: 0,
                  behavior: "smooth",
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                x="0px"
                y="0px"
                width="74px"
                height="50px"
                viewBox="0 0 74 40"
                enableBackground="new 0 0 74 40"
              >
                <g>
                  <circle
                    className={styles.shinecircle}
                    opacity="0.5"
                    fill="none"
                    stroke="#c2856265"
                    cx="71%"
                    cy="50%"
                    r="24%"
                  ></circle>
                </g>
                <polygon
                  fill="#C28562"
                  points="49.525,14.265 48.898,15.044 54.481,19.541 6.444,19.541 6.444,20.541 54.464,20.541 48.901,24.954 49.522,25.737 56.7,20.044 "
                ></polygon>
              </svg>
            </div>

          </div>


          <div className={styles.rightSide}>
            {rightImages.map((img, index) => (
              <div
                key={index}
                className={`${styles.cutImage} ${index === current ? styles.active : ""
                  }`}
                style={{ backgroundImage: `url(${img})` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Upcoming;
