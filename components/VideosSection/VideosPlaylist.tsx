import React from "react";
import { useState } from "react";
import styles from "./VideosPlaylist.module.css";
function VideoPlaylist() {
  const PlayList = [
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Ahire EV Homes 9 Square Vashi Testimonial",
      Channel: "EV Homes",
      views: "32K",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Asok EV Homes 9 Square Vashi Testimonial",
      Channel: "EV Homes",
      views: "32K",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr. & Mrs. Athawale EV Homes 10 Marina Bay Vashi",
      Channel: "EV Homes",
      views: "32K",
    },
  ];
  return (
    <>
      {
        <div className={styles.PlaylistMainContainer}>
          <div className={styles.Structure}>
            <div>{PlayList.map((item,index)=>(
                <div key={index} className={styles.Playlist} >item.videotag
                 <div>item.thumbnail</div>
                  <div>item.Channel</div>
                  <div>item.views</div>
                </div>
                
            ))}</div>
          </div>
        </div>
      }
    </>
  );
}
export default VideoPlaylist;
