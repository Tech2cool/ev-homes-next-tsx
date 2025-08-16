import React from "react";
import styles from "./VideoDisc.module.css";
import Image from "next/image";
import { Forward, ThumbsUp } from "lucide-react";
import { ThumbsDown } from "lucide-react";
import { useState } from "react";

function VideoDiscription({
  currentVideo,
  onShareClick,
}: {
  currentVideo: any;
  onShareClick: () => void;
}) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const handlelike = () => {
    setLike((prev) => !prev);
    if (!like) {
      setDislike(false);
    }
  };

  const handleDislike = () => {
    setDislike((prev) => !prev);
    if (!dislike) {
      setLike(false);
    }
  };

  return (
    <>
      <div className={styles.DiscMain}>
        <p className={styles.Thumbnail}>
          {currentVideo?.heading ?? "not available"}
        </p>
        <div className={styles.Channel}>
          <div className={styles.ChannelLogo}>
            <Image src="/images/Channel.png" height={50} width={50} alt={""} />
          </div>
          <p className={styles.ChannelName}>{currentVideo.Channel}</p>
          <div className={styles.BtnContainer}>
            
            <div className={styles.LikeDislike}>
              <button className={styles.likebtn} onClick={handlelike}>
                <ThumbsUp
                  className={styles.Btns}
                  fill={like ? "white" : "normal"}
                  stroke="white"
                />
                <p style={{ fontWeight: "700", paddingLeft: "7px" }}>
                  {currentVideo.likes}
                </p>
              </button>
              <div className={styles.Breaker}></div>
              <button className={styles.dislike} onClick={handleDislike}>
                <ThumbsDown
                  className={styles.Btns}
                  fill={dislike ? "white" : "normal"}
                  stroke="white"
                />
              </button>
            </div>
            <button className={styles.Sharebtn} onClick={onShareClick}>
              <Forward className={styles.Btns} />
              <p style={{ fontWeight: "700", paddingLeft: "7px" }}>Share</p>
            </button>
          </div>
        </div>
        <div className={styles.DiscStorage}>
          <p style={{ fontWeight: "700", paddingBottom: ".5vw" }}>
            Description
          </p>
          <p>DESC</p>
        </div>
      </div>
    </>
  );
}
export default VideoDiscription;


