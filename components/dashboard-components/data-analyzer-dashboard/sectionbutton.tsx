"use client";
import styles from "./analyzerdashboard.module.css"

const sectionbutton = () => {
  

  return (
  <div className={styles.butionsection}>
   <button className={`${styles.animatedbutton} ${styles.overview}`}>
    <svg viewBox="0 0 24 24" className={styles.arrtwo}>
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
    </svg>
    <span className={styles.text}>Overview</span>
    <span className={styles.circle}></span>
    <svg viewBox="0 0 24 24" className={styles.arrone}>
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
    </svg>
  </button>
  <button className={`${styles.animatedbutton} ${styles.reports}`}>
    <svg viewBox="0 0 24 24" className={styles.arrtwo}>
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
    </svg>
    <span className={styles.text}>Reports</span>
    <span className={styles.circle}></span>
    <svg viewBox="0 0 24 24" className={styles.arrone}>
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
    </svg>
  </button>

  <button className={`${styles.animatedbutton} ${styles.tagging}`}>
    <svg viewBox="0 0 24 24" className={styles.arrtwo}>
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
    </svg>
    <span className={styles.text}>Tagging</span>
    <span className={styles.circle}></span>
    <svg viewBox="0 0 24 24" className={styles.arrone}>
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
    </svg>
  </button>

  <button className={`${styles.animatedbutton} ${styles.enquiry}`}>
    <svg viewBox="0 0 24 24" className={styles.arrtwo}>
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
    </svg>
    <span className={styles.text}>Enquiry</span>
    <span className={styles.circle}></span>
    <svg viewBox="0 0 24 24" className={styles.arrone}>
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
    </svg>
  </button>

  <button className={`${styles.animatedbutton} ${styles.inventory}`}>
    <svg viewBox="0 0 24 24" className={styles.arrtwo}>
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
    </svg>
    <span className={styles.text}>Inventory</span>
    <span className={styles.circle}></span>
    <svg viewBox="0 0 24 24" className={styles.arrone}>
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
    </svg>
  </button>
</div>

  );
};

export default sectionbutton;
