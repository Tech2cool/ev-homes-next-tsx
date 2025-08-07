import React, { useRef } from "react";
import styles from "./ScrollSelection.module.css";
import { ChevronRight } from "lucide-react";


function ScrollSelection() {
  const Scrollref = useRef(null);

  const Scrollend = () => {
    if (Scrollref.current) {
      Scrollref.current.scrollLeft = Scrollref.current.scrollWidth;
    }
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.ScrollContainer} ref={Scrollref}>
        <div className={`${styles.Element} ${styles.All}`}>All</div>
        <div className={styles.Element}>EV 23 Malibu West</div>
        <div className={styles.Element}>EV 10 Marina Bay</div>
        <div className={styles.Element}>EV 9 Square</div>
        <div className={styles.Element}>Heart City</div>
      </div>
      <div className={`${styles.Element} ${styles.ScrollButton}`} onClick={Scrollend}>
        <ChevronRight />
      </div>
    </div>
  );
}

export default ScrollSelection;
