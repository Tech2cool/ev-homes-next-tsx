import React from "react";
import { useState } from "react";
import styles from "./VideosPlaylist.module.css";
import { EllipsisVertical } from "lucide-react";
import ScrollSelection from "./ScrollSection";

function VideoPlaylist({onVideoClick,onShareClick}: {onVideoClick: (video: any) => void , onShareClick:any;
}) {


  const PlayList = [
    {
       src: "images/Videos/sample_1.mp4",
       thumbnail: "Ahire EV Homes 9 Square Vashi Testimonial",
       heading: "Ahire EV Homes 9 Square Vashi Testimonial",
       Channel: "ev two",
       views: "100K views",
       likes:"50k"
    },
    {
      src: "images/Videos/sample_1.mp4",
      thumbnail: "Mr.Asok EV Homes 9 Square Vashi Testimonial",
      heading: "Mr.Asok EV Homes 9 Square Vashi Testimonial",
      Channel: "EV three",
      views: "532K views",
       likes:"37k"
    },
    {
      src: "images/Videos/sample.mp4",
      thumbnail: "Mr.Arihant Jain EV Homes 9 Square Vashi Testimonia",
      heading: "Mr.Arihant Jain EV Homes 9 Square Vashi Testimonia",
      Channel: "EV four",
      views: "222K views",
       likes:"10k"
    },
    {
      src: "images/Videos/sample.mp4",
      thumbnail: "Mr.Anurag Tripathi EV Homes 9 Square Vashi Testimonial",
      heading: "Mr.Anurag Tripathi EV Homes 9 Square Vashi Testimonial",
      Channel: "EV five",
      views: "100K views",
       likes:"25k"
    },
    {
      src: "images/Videos/sample.mp4",
      thumbnail: "Mr. & Mrs. Athawale EV Homes 10 Marina Bay Vashi",
      heading: "Mr. & Mrs. Athawale EV Homes 10 Marina Bay Vashi",
      Channel: "EV six",
      views: "320K views",
       likes:"1k"
    },
  ];


  return (
    <>
      <div className={styles.PlaylistMainContainer}>
        <ScrollSelection />
        {
          <div className={styles.PlaylistMainContainer}>
            {PlayList.map((item, index) => (
              <div
                onClick={() => onVideoClick(item)}
                key={index}
                className={styles.Playlist}
              >
                <video controls={false} className={styles.Videobox}>
                  <source src={item.src} type="video/mp4" />
                </video>
                <div className={styles.PlayListInfo}>
                  <div className={styles.ThumbnailRow}>
                    <div className={styles.PlaylistThumbnail}>
                      {item.thumbnail}
                    </div> 
                    <button className={styles.PlaylistShare} onClick={onShareClick}>
                    <EllipsisVertical className={styles.icon} />
                    </button>
                    
                  </div>
                  <div className={styles.Channel}>{item.Channel}</div>
                  <div className={styles.views}>{item.views}</div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </>
  );
}
export default VideoPlaylist;
