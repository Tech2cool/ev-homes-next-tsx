import React from "react";
import styles from "./VideoDisc.module.css";
import Image from "next/image";
import { Forward, ThumbsUp } from 'lucide-react';  
import {ThumbsDown } from 'lucide-react';

function VideoDiscription() {
  return (
    <>
      <div className={styles.DiscMain}>
        <p className={styles.Thumbnail}>
          Ahire EV Homes 9 Square Vashi Testimonial
        </p>
        <div className={styles.Channel}>
          <div className={styles.ChannelLogo}>
            <Image src="/images/Channel.png" height={50} width={50} alt={""} />
          </div>
          <p className={styles.ChannelName}>EV Homes</p>
            <div className={styles.BtnContainer}>
                <div className={styles.LikeDislike}>
          <button className={styles.likebtn}><ThumbsUp className={styles.Btns}/> <p style={{fontWeight:"700", paddingLeft:"7px"}}>32k </p></button>
          <div className={styles.Breaker}></div>
          <button className={styles.dislike}><ThumbsDown  className={styles.Btns}  /></button>
          </div>
          <button className={styles.Sharebtn}><Forward className={styles.Btns}/><p style={{fontWeight:"700", paddingLeft:"7px"}}>Share</p></button>
     </div>
        </div>
        <div className={styles.DiscStorage}>
          <p style={{fontWeight:"700", paddingBottom:".5vw"}}>Description</p>
          <p>DESC</p>
        </div>
      </div>
    </>
  );
}
export default VideoDiscription;
