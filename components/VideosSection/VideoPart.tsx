import React from "react";
import { useState, useRef } from "react";
import styles from "./VideoPart.module.css";
import ReactPlayer from "react-player";
import { CirclePause, CirclePlay } from "lucide-react";

function VideoPart() {
  const playerRef = useRef<any>(null);
  const [isplaying, setIsplaying] = useState(false);

  return (
    <>
      <div className={styles.VideosContainer}>
        <ReactPlayer
           src="/images/Videos/sample.mp4"
          className={styles.Videobox}
          ref={playerRef}
          playing={isplaying}
          controls={false}
          width={790}
          height={450}  
        />
         <div className={styles.VideoController}>
        <button className={styles.Start}>
          <CirclePlay width={200}  size={50}/>
        </button>
        <button className={styles.Pause}>
          <CirclePause />
        </button>
      </div>
      </div>
     
    </>
  );
}
export default VideoPart;
