import React from "react";
import styles from "./Amenities.module.css";
import "../../public/images/AmentiesBg.webp";
import "../../public/images/poolimg.webp";
import "../../public/images/gymimg.webp";
import "../../public/images/banquetimg.webp";

import "../../public/images/meditationimg.webp";
import "../../public/images/trackimg.webp";
import "../../public/images/kidsareaimg.webp";


const AmenitiesMain = () => {
  return (
    <>
      <div className={styles.AmenitesMain}>
        <div className={styles.AmentiesContaint}>
          <div className={styles.AmenitesHeading}>
            <svg
              stroke="currentColor"
              fill="gold"
              strokeWidth="0"
              viewBox="0 0 256 256"
              height="30"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M122.34,109.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0,0-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32ZM128,35.31,156.69,64,128,92.69,99.31,64Zm5.66,111a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32l40,40a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0,0-11.32ZM128,220.69,99.31,192,128,163.31,156.69,192Zm109.66-98.35-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,237.66,122.34ZM192,156.69,163.31,128,192,99.31,220.69,128Zm-82.34-34.35-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,109.66,122.34ZM64,156.69,35.31,128,64,99.31,92.69,128Z"></path>
            </svg>
            <h2>Amenities</h2>
          </div>
          <div className={styles.AmenitiesFirst}>
            <div className={styles.ImgContainer}>
              <img
                src="/images/poolimg.webp"
                alt="poolimg"
                className={styles.AmentiesImg}
              />
              <div className={styles.AmenitesText}>
                <p>EV-23</p>
                <p>Swimming</p>
              </div>
            </div>
            <div className={`${styles.ImgContainer} ${styles.Centerimg}`}>
              <img
                src="/images/gymimg.webp"
                alt="gymimg"
                className={styles.AmentiesImg}
              />
             <div className={styles.AmenitesText}>
                <p>EV-23</p>
                <p>Gym</p>
              </div>
            </div>
            <div className={styles.ImgContainer}>
              <img
                src="/images/banquetimg.webp"
                alt="banqueteimg"
                className={styles.AmentiesImg}
              />
             <div className={styles.AmenitesText}>
                <p>EV-23</p>
                <p>Banquet</p>
              </div>
            </div>
          </div>
             <div className={styles.AmenitesInfo}>
                <p> <span style={{color:"rgb(179, 135, 53)"}}>🏊 Zuma 23</span> – An infinity pool with stunning sea views, perfect for relaxation.</p>
                <p> <span style={{color:"rgb(179, 135, 53)"}}>🌌Crystal Venue 23 </span> – Kopar Khairane’s first sky banquet hall for special events.</p>
                <p><span  style={{color:"rgb(179, 135, 53)"}}>🛝 23 Play Land </span> – A vibrant, specially designed kids’ play area.</p>
              </div>
              

              <div className={styles.AmentiesSecond}>
                <div className={styles.ImgContainerTwo}>
                     <img
                src="/images/meditationimg.webp"
                alt="meditationimg"
                 className={styles.AmentiesImg}
              />
               <div className={styles.AmenitesTextTwo}>
                <p>EV-23</p>
                <p>Meditation</p>
              </div>

                </div>
                <div className={`${styles.ImgContainerTwo} ${styles.CenterimgTwo}`}>
                     <img
                src="/images/trackimg.webp"
                alt="meditationimg"
                className={styles.AmentiesImg}
              />
               <div className={styles.AmenitesTextTwo}>
                <p>EV-23</p>
                <p>Jogging...</p>
              </div>
                </div>

                <div className={styles.ImgContainerTwo}>
                     <img
                src="/images/kidsareaimg.webp"
                alt="meditationimg"
                 className={styles.AmentiesImg}
              />
               <div className={styles.AmenitesTextTwo}>
                <p>EV-23</p>
                <p>Kids Play...</p>
              </div>
                </div>
                
              </div>
              <div className={styles.AmentiesInfoTwo}>
                <p><span style={{color:"rgb(179, 135, 53)"}}>🏋️ Titan 23  </span>– A fully equipped gym for your health goals.</p>
                <p><span style={{color:"rgb(179, 135, 53)"}}>🧘‍♀️ Dhyana Center 23 </span>– A tranquil sea-facing meditation center.</p>
                <p><span style={{color:"rgb(179, 135, 53)"}}>🏃‍♂️ Dash 23</span> – A jogging track for fitness lovers</p>
              </div>

        </div>
      </div>
    </>
  );
};
export default AmenitiesMain;
