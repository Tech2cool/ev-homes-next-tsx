import styles from "../VideosSection/VideoPart.module.css"
import React from "react"

function VideoPart() {
  return (
    <div className={styles.VideosContainer}>
  <video controls className={styles.Videobox}>
    <source src="images/Videos/sample.mp4" type="video/mp4" />
  </video>
</div>

  );
}

export default VideoPart;