'use client'
import React from "react";
import styles from  "./VideosMain.module.css"
import Navbar from "./Navbar"
import VideoPart from "./VideoPart";
import VideoDiscription from "./VideoDisc";
import VideoPlaylist from "./VideosPlaylist";
function VideosMain(){
return(
   <>
    <div className={styles.MainContainer}>
           <Navbar/> 
         <div className={styles.SubContainer}>

            <div className={styles.LeftSide}>
            <VideoPart/>
            <VideoDiscription/>
            </div>
            <VideoPlaylist/>
            </div>
         </div>
           
                            
   </>
)
}
export default VideosMain; 
