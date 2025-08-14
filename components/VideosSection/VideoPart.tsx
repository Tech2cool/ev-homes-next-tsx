import React, { useState, useRef, useEffect, use } from "react";
import styles from "./VideoPart.module.css";

import {
  CirclePause,
  CirclePlay,
  Maximize,
  Pause,
  Play,
  Settings,
  Volume1,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { GrBackTen, GrForwardTen } from "react-icons/gr";

function VideoPart({currentVideo}:{currentVideo:any}) {  
  const inputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const volumeRef = useRef<HTMLInputElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [ShowSetting, setShowSetting] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControllers,setShowControllers] =useState(false);


  let speed = [0.25, 0.5, 0.75, 1, 1.25, 1.75, 2];

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
      setDuration(videoRef.current.duration || 0);
    }
  };

  useEffect(() => {
    if (inputRef.current && duration > 0) {
      const progress = (currentTime / duration) * 100;
      inputRef.current.style.setProperty("--progress", `${progress}%`);
    }
  }, [currentTime, duration]);

  //  for working of timeline
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updatetime = () => {
      setCurrentTime(video.currentTime);
    };
    const updateDuration = () => {
      setDuration(video.duration || 0);
    };

    video.addEventListener("timeupdate", updatetime);
    video.addEventListener("loadedmetadata", updateDuration);

    if (video.readyState >= 1) {
      updateDuration();
    }
    return () => {
      video.removeEventListener("timeupdate", updatetime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const handleseek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (volumeRef.current) {
      const progress = newVolume * 100;
      volumeRef.current.style.setProperty("--volumeProgress", `${progress}%`);
    }
  };

  const handleVideoMaxScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const SettingToggle = () => {
    setShowSetting(!ShowSetting);
  };

  const handleShowSetting = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowSetting(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes)} : ${String(seconds)}`;
  };



  return (
    <>
    <div className={styles.VideosContainer}
     onMouseEnter={()=>setShowControllers(true)}
          onMouseLeave={()=>setShowControllers(false)}>
      <div className={styles.VideoWrapper}>
        <video
          ref={videoRef}
          src={currentVideo.src}
          className={styles.Videobox}
          controls={false}
          width="100%"
          height="100%"
          onLoadedMetadata={videoTimeLine}
         
        />
      <div className={`${styles.ContrllersMain}  ${showControllers? styles.show : styles.hide}` } 
       >
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
            ref={inputRef}
            max={duration || 0}
            onChange={handleseek}
            value={currentTime}
            step="0.1"
            className={styles.TimeLine}
          />
        </div>
        <div className={styles.BottomController}>
          <div className={styles.LeftContainers}>
            <div className={styles.PlayPauseTwo}>
              {isPlaying ? (
                <Pause className={styles.PauseTwo} onClick={handlePause} />
              ) : (
                <Play className={styles.PlayTwo} onClick={handleStart} />
              )}
            </div>

            <div className={styles.soundRange}>
              {volume === 0 ? (
                <VolumeOff />
              ) : volume <= 0.5 ? (
                <Volume1 />
              ) : (
                <Volume2 />
              )}
            </div>
            <div>
              <input
                type="range"
                className={styles.soundRangeTwo}
                min={0}
                defaultValue={1}
                max={1}
                step={0.1}
                onChange={handleVolumeChange}
              />
            </div>

            <div
              className={styles.Timer}
              style={{ color: "white", fontSize: "14px", fontWeight: "700" }}
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className={styles.RightContainer}>
            <div className={styles.SettingWrapper}>
              <Settings
                onClick={SettingToggle}
                className={styles.SettingIcon}
              />
              {ShowSetting && (
                <div className={styles.SettingMenu}>
                  {speed.map((speed) => (
                    <div
                      key={speed}
                      className={`${styles.speedOption} 
                        ${playbackSpeed === speed ? styles.activeSpeed : ""}`}
                      onClick={() => handleShowSetting(speed)}
                    >
                      {" "}
                      {speed}X
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.Max}></div>
            <Maximize onClick={handleVideoMaxScreen} />
          </div>
        </div>
      </div>
    </div>
    </div>
   
    </>
  );
}

export default VideoPart;
