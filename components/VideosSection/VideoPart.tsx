import React, { useState, useRef, useEffect } from "react";
import styles from "./VideoPart.module.css";
import { CirclePause, CirclePlay, Pause, Play } from "lucide-react";
import { GrBackTen, GrForwardTen } from "react-icons/gr";

function VideoPart() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleStart = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const handleBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 10
      );
    }
  };

  const ForwardBack = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const videoTimeLine = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const VideoTimeLine = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  //  for working of timeline
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updatetime = () => setCurrentTime(video.currentTime);
    video?.addEventListener("timeupdate", updatetime);

    return () => {
      video?.removeEventListener("timeupdate", updatetime);
    };
  }, []);

  const handleseek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  return (
    <div className={styles.VideosContainer}>
      <div className={styles.VideoWrapper}>
        <video
          ref={videoRef}
          src="/images/Videos/sample_1.mp4"
          className={styles.Videobox}
          controls={false}
          width="100%"
          height="100%"
          onLoadedMetadata={videoTimeLine}
        />

        <div className={styles.ControlsContainer}>
          <div className={styles.ForwardBack}>
            <GrBackTen
              size={40}
              className={styles.ControlIcon}
              onClick={handleBackward}
            />
          </div>
          {isPlaying ? (
            <CirclePause className={styles.Icon} onClick={handlePause} />
          ) : (
            <CirclePlay className={styles.Icon} onClick={handleStart} />
          )}

          <div className={styles.ForwardBack}>
            <GrForwardTen
              size={40}
              className={styles.ControlIcon}
              onClick={ForwardBack}
            />
          </div>
        </div>
        <div className={styles.TimeLineContainer}>
          <input
            type="range"
            min={0}
            max={duration}
            onChange={handleseek}
            value={currentTime}
            step="0.1"
            className={styles.TimeLine}
          />
        </div>
        <div className={styles.BottomController}>
          <div className={styles.PlayPauseTwo}>
            {isPlaying?(
 <Pause className={styles.PauseTwo} onClick={handlePause}  />):(
       <Play className={styles.PlayTwo} onClick={handleStart}  /> )
}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPart;
