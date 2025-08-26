'use client'
import React, { useState } from "react";
import styles from "../MarinaBay/Configuration.module.css"
import "../../public/images/AmentiesBg.webp"
import "../../public/images/configCardsimg.webp"

const Configuration = () => {
  const [select, setSelect] = useState("all");

  const cards = [
    {
      src: "/images/configCardsimg.webp",
      Rera: "RERA ID: P51700078094",
      area: "Carpet Area: 674 sq.ft",
      config: "2 BHK",
      price: "₹2,00,00,000"
    },
    {
      src: "/images/configCardsimg.webp",
      Rera: "RERA ID: P51700078094",
      area: "Carpet Area: 809 sq.ft",
      config: "3 BHK",
      price: "₹2,30,00,000"
    },
    {
      src: "/images/configCardsimg.webp",
      Rera: "RERA ID: P51700078094",
      area: "Carpet Area: 871 sq.ft",
      config: "3 BHK",
      price: "₹2,50,00,000"
    }
  ];

  const filterSelect =
    select === "all" ? cards : cards.filter((item) => item.config === select);

  return (
    <div className={styles.ConfigMain}>
      <div className={styles.configStart}>
        <h2 className={styles.configHeader}>Configuration</h2>
        <div className={styles.FlatBtns}>
          <button
            className={styles.BtnDesgin}
            onClick={() => setSelect(select === "2 BHK"  ? "all":"2 BHK")}
          >
            <span>2 BHK</span>
          </button>
          <button
            className={styles.BtnDesgin}
            onClick={() => setSelect(select==="3 BHK"?"all":"3 BHK")}
          >
            <span>3 BHK</span>
          </button>
          
        </div>
      </div>

      <div className={styles.CardsMain}>
        {filterSelect.map((item, index) => (
          <div key={index} className={styles.cardInfo}>
            <img src={item.src} alt="building" className={styles.CardImg} />
            <p>{item.Rera}</p>
            <p>{item.area}</p>
            <p>Configuration: {item.config}</p>
            <p style={{ color: "orange" }}>Price: {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Configuration;
