"use client";
import React from "react";
import styles from "../MarinaBay/Discription.module.css";
import "../../public/images/DisImage.webp";
import { useState } from "react";
import "../../public/images/DiscImgTwo.webp";
import { CiLocationOn } from "react-icons/ci";
import "./../../public/images/marketIcon.webp";
import "./../../public/images/hospitalIcon.webp";
import "./../../public/images/academyIcon.webp";
import "./../../public/images/railwayIcon.webp";
import { useRef, useEffect } from "react";

const Discription = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [highlight, setShowlight] = useState(false);
  const [showPrime, setShowPrime] = useState(false);

  const primeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event:MouseEvent) {
      if(primeRef.current &&  primeRef.current.contains(event.target as Node)){
        setShowPrime(false);
      } else{
         setShowPrime(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // if (!showPrime) return null;
  const handleShowPrime = () => {
    setShowPrime(true);
  };

  const handleHighlight = () => {
    setShowlight(true);
  };
  const handleClose = () => {
    setShowInfo(false);
  };
  const DisInfo = `Welcome to EV 23 Malibu West 🌴✨ Ultra-Luxury Living Inspired by
            Malibu, California Developed by EV Homes Construction Pvt Ltd, a
            name synonymous with quality and innovation, EV 23 Malibu West is an
            ultra-luxury residential project located in Kopar Khairane Sector
            23, Navi Mumbai. Inspired by the opulent beachfront lifestyle of
            Malibu, California, this development offers a range of 2 BHK and 3
            BHK sea-facing residences designed to provide both comfort and
            elegance. Each home is thoughtfully crafted to offer breathtaking
            sea views and a peaceful living experience. 🌟 World-Class Amenities
            At EV 23 Malibu West, we believe in offering more than just a home –
            it’s a lifestyle. The project features a range of curated amenities
            for residents: 🏊 Zuma 23 – An infinity pool with stunning sea
            views, perfect for relaxation. 🌌 Crystal Venue 23 – Kopar
            Khairane’s first sky banquet hall for special events. ⚽ Sky Arena
            23 – A rooftop sports turf for sports enthusiasts. 🛝 23 Play Land –
            A vibrant, specially designed kids’ play area. 🧘‍♀️ Dhyana Center 23 –
            A tranquil sea-facing meditation center. 🏃‍♂️ Dash 23 – A jogging
            track for fitness lovers. 🏋️ Titan 23 – A fully equipped gym for
            your health goals. 📍 Prime Location Situated in Kopar Khairane
            Sector 23, this project offers easy access to key locations such as:
            🛒 Local Market & D-Mart for daily essentials. 🏥 Hospitals for your
            healthcare needs. 🏫 Christ Academy for quality education. 🚆 Kopar
            Khairane Railway Station for seamless connectivity. With prices
            starting from ₹2.09 Crores (All Inclusive), EV 23 Malibu West is the
            perfect place to experience a life of luxury, elegance, and
            convenience. 📞 Contact us today to book your viewing appointment!
            🌴 EV 23 Malibu West – Where Dreams Meet Reality. 🌟`;
  const handleInfo = () => {
    setShowInfo(true);
  };
  return (
    <>
      <div className={styles.DisMain}>
        <div className={styles.DisInfo}>
          <h2 className={styles.Heading} style={{ fontWeight: "700" }}>
            Discover EV 23 Malibu West
          </h2>

          {!showInfo && (
            <p className={`${styles.DisDetail} ${styles.clamp}`}>{DisInfo}</p>
          )}

          {!showInfo && (
            <button className={styles.KnowMoreBtn} onClick={handleInfo}>
              Know More
            </button>
          )}

          <p className={styles.ContactHeading}>Get In Touch Today ! </p>
          <div className={styles.Number}>+91 8291668777</div>
        </div>
        {showInfo && (
          <div className={styles.FullInfoMain}>
            <div className={styles.FullInfo}>
              <h2
                style={{
                  fontSize: "2rem",
                  marginBottom: "1vw",
                  marginTop: "2vw",
                  whiteSpace: "nowrap",
                }}
              >
                {" "}
                Project Discription
              </h2>
              <p className={styles.FullDis}>
                Welcome to EV 23 Malibu West 🌴✨ Ultra-Luxury Living Inspired
                by Malibu, California Developed by EV Homes Construction Pvt
                Ltd, a name synonymous with quality and innovation, EV 23 Malibu
                West is an ultra-luxury residential project located in Kopar
                Khairane Sector 23, Navi Mumbai. Inspired by the opulent
                beachfront lifestyle of Malibu, California, this development
                offers a range of 2 BHK and 3 BHK sea-facing residences designed
                to provide both comfort and elegance. Each home is thoughtfully
                crafted to offer breathtaking sea views and a peaceful living
                experience. 🌟 World-Class Amenities At EV 23 Malibu West, we
                believe in offering more than just a home – it’s a lifestyle.
                The project features a range of curated amenities for residents:
                🏊 Zuma 23 – An infinity pool with stunning sea views, perfect
                for relaxation. 🌌 Crystal Venue 23 – Kopar Khairane’s first sky
                banquet hall for special events. ⚽ Sky Arena 23 – A rooftop
                sports turf for sports enthusiasts. 🛝 23 Play Land – A vibrant,
                specially designed kids’ play area. 🧘‍♀️ Dhyana Center 23 – A
                tranquil sea-facing meditation center. 🏃‍♂️ Dash 23 – A jogging
                track for fitness lovers. 🏋️ Titan 23 – A fully equipped gym for
                your health goals. 📍 Prime Location Situated in Kopar Khairane
                Sector 23, this project offers easy access to key locations such
                as: 🛒 Local Market & D-Mart for daily essentials. 🏥 Hospitals
                for your healthcare needs. 🏫 Christ Academy for quality
                education. 🚆 Kopar Khairane Railway Station for seamless
                connectivity. With prices starting from ₹2.09 Crores (All
                Inclusive), EV 23 Malibu West is the perfect place to experience
                a life of luxury, elegance, and convenience. 📞 Contact us today
                to book your viewing appointment! 🌴 EV 23 Malibu West – Where
                Dreams Meet Reality. 🌟
              </p>
              <button onClick={handleClose} className={styles.CloseDiscInfoBtn}>
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className={styles.LandmarkMain}>
          <CiLocationOn
            className={styles.LandMarkIcon}
            onClick={handleShowPrime}
          />
          <div className={styles.IconBottom}></div>
          <p className={styles.LandmarkAbout}>
            📍 Want to know why this location is prime? Click me!
          </p>
        </div>
        {showPrime && (
          <div className={styles.primeMain} ref={primeRef}>
            <div className={styles.primeContent}>
              <h2 className={styles.PrimeHeading}>📍Prime Location</h2>
              <div className={styles.PrimeTag}>
                <p>Situated in Kopar Khairane Sector 23 ,</p>
                <p>this project offers easy access to key locations such as:</p>
                <div className={styles.primeImagesContainer}>
                  <div className={styles.PrimeCircle}>
                    <img
                      src="/images/marketIcon.webp"
                      className={styles.primeimg}
                    />
                    <p className={`${styles.PrimeText} ${styles.PrimeTextOne}`}>
                      Local Market & D-Mart for daily essentials.
                    </p>
                  </div>

                  <div className={styles.PrimeCircle}>
                    <img
                      src="/images/hospitalIcon.webp"
                      className={styles.primeimg}
                    />
                    <p className={`${styles.PrimeText} ${styles.PrimeTextTwo}`}>
                      Hospitals for your healthcare needs.
                    </p>
                  </div>
                  <div className={styles.PrimeCircle}>
                    <img
                      src="/images/academyIcon.webp"
                      className={styles.primeimg}
                    />
                    <p className={`${styles.PrimeText} ${styles.PrimeTextThree}`}>
                      Christ Academy for quality education.
                    </p>
                  </div>
                  <div className={styles.PrimeCircle}>
                    <img
                      src="/images/railwayIcon.webp"
                      className={styles.primeimg}
                    />
                    <p className={`${styles.PrimeText} ${styles.PrimeTextFour}`}>    
                      Kopar Khairane Railway Station for seamless connectivity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div></div>
          </div>
        )}
      </div>

      {/* images */}
      <img
        src="/images/DiscImgTwo.webp"
        alt="bigimage"
        className={styles.ParentImage}
      />
      <img
        src="/images/DiscImgTwo.webp"
        alt="smallimage"
        className={styles.ChildImage}
      />
    </>
  );
};

export default Discription;
