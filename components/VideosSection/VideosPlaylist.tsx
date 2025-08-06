import React from "react";
import { useState } from "react";
import styles from "./VideosPlaylist.module.css";
import { EllipsisVertical } from "lucide-react";
import ScrollSelection from "./ScrollSection";


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
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Asok EV Homes 9 Square Vashi Testimonial",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Arihant Jain EV Homes 9 Square Vashi Testimonia",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Anurag Tripathi EV Homes 9 Square Vashi Testimonial",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr. & Mrs. Athawale EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Bhoj EV Homes 9 Square Vashi Testimonial",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Abhishek Thakur EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mrs. Margaret Kingsley EV Homes 9 Square Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr. Bala Rao EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr. Narenkumar Kundu EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Dhaval Shah EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Dev EV Homes 10 Marina Bay Vashi Testimonial",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Sodhi EV Homes 10 Marina Bay Vashi Testimonial",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Patil EV Homes 10 Marina Bay Vashi Testimonial",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Aditya Agarwal EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Sameer Thakur EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Saumitri EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Solaskar EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Sunil Sutake EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr. Suresh Waghmare EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Vaibhav Harihar EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Vaibhav Harihar EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Mayur Sinkar EV Homes 10 Marina Bay Vashi",

      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr. Rohan Karanth EV Homes 10 Marina Bay Vashi",
      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Tarun Sharma EV Homes 10 Marina Bay Vashi",
      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Ashutosh Singh & Family EV Homes 9 Square Vashi",
      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Deepak Makhija & Family EV Homes 10 Marina Bay",
      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Rakesh Kacholia EV Homes 9 Square Vashi",
      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.&Mrs.Banerjee EV Homes 9 Square Vashi Testimonial",
      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.&Mrs.Bali EV Homes 25 Malibu West Vashi",
      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mrs.Thelma & Family EV Homes 10 Marina Bay Vashi",
      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Sagar Satpute EV Homes 10 Marina Bay Vashi",
      Channel: "EV Homes",
      views: "32K views",
    },
    {
      videotag: (
        <video controls className={styles.Videobox}>
          <source src="images/Videos/sample.mp4" type="video/mp4" />
        </video>
      ),
      thumbnail: "Mr.Prasad Gujar EV Homes 10 Marina Bay Vashi",
      Channel: "EV Homes",
      views: "32K views",
    },
  ];
  return (
    <>
    <div className={styles.PlaylistMainContainer}>
      <ScrollSelection />
      {
        <div className={styles.PlaylistMainContainer}>
          {PlayList.map((item, index) => (
            <div key={index} className={styles.Playlist}>
              {item.videotag}
              <div className={styles.PlayListInfo}>
                <div className={styles.ThumbnailRow}>
                  <div className={styles.PlaylistThumbnail}>
                    {item.thumbnail}
                  </div>
                  <EllipsisVertical className={styles.icon} />
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
