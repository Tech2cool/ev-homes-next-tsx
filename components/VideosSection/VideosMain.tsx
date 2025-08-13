"use client";
import React, { useState } from "react";
import styles from "./VideosMain.module.css";
import Navbar from "./Navbar";
import VideoPart from "./VideoPart";
import VideoDiscription from "./VideoDisc";
import VideoPlaylist from "./VideosPlaylist";
function VideosMain() {
  const [currentVideo, setCurrentVideo] = useState({
    src: "images/Videos/sample.mp4",
    thumbnail: "Ahire EV Homes 9 Square Vashi Testimonial",
    heading: "Ahire EV Homes 9 Square Vashi Testimonial",
    Channel: "EV Homes",
    views: "32K views",
    likes: "30k",
  });

  const onVideoClick = (video: any) => {
    setCurrentVideo(video);
  };

  return (
    <>
      <div className={styles.MainContainer}>
        <Navbar />
        <div className={styles.SubContainer}>
          <div className={styles.LeftSide}>
            <VideoPart currentVideo={currentVideo} />
            <VideoDiscription currentVideo={currentVideo} />
          </div>

          <VideoPlaylist onVideoClick={onVideoClick} />
        </div>
      </div>
    </>
  );
}
export default VideosMain;
