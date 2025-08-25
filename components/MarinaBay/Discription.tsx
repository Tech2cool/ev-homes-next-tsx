"use client";
import React from "react";
import styles from "../MarinaBay/Discription.module.css";
import "../../public/images/DisImage.webp";
import { useState } from "react";
import "../../public/images/DiscImgTwo.webp";
import { CiLocationOn } from "react-icons/ci";

const Discription = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [highlight,setShowlight]=useState(false);
  const handleHighlight = ()=>{
    setShowlight(true)
  }
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
              <button
                onClick={handleClose}
                style={{
                  border: "none",
                  backgroundColor: "black",
                  color: "white",
                  height: "2vw",
                  width: "4vw",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {/* prime location section */}
      <div className={styles.PrimeLocationMain} >
  <button 
    onClick={handleHighlight} 
    className={styles.IconButton}
    aria-label="Show Prime Location"
  >
    <CiLocationOn className={styles.LandMarkIcon} />
  </button>
      </div>
      <div className={styles.IconBottom}></div>
      {/* inside content of landmarkicon */}
      { highlight && ( 
      <div className={styles.PrimeLocationMain}>
        <h2 className={styles.LocationHeading}>📍 Prime Location</h2>
        <p style={{ fontSize: "1.2rem" }}>
          Situated in Kopar Khairane Sector 23{" "}
        </p>
        <p>this project offers easy access to key locations such as:</p>

        <div className={styles.LocationHighlights}>
          <div className={styles.LandMarkImg}>
            <img src="images/marketIcon.webp" alt="marketimg" />
            <p>Local Market & D-Mart for daily essentials.</p>
          </div>
       
          <div className={styles.LandMarkImg}>
            <img src="/images/hospitalIcon.webp" alt="hospital" />
            <div className={styles.HighlightTagline}>
            <p>Hospitals for your healthcare needs.</p>
            </div>
          </div>
          <div className={styles.LandMarkImg}>
            <img src="/images/academyIcon.webp" alt="acadamy" />
            <p>Hospitals for your healthcare needs.</p>
          </div>
          <div className={styles.LandMarkImg}>
            <img src="/images/railwayIcon.webp" alt="railway" />
            <p>Kopar Khairane Railway Station for seamless connectivity.</p>
          </div>
        </div>
      </div>
)}

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
