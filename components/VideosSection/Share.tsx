import React, { useState,useRef ,useEffect} from "react";
import styles from "./Share.module.css";
import { X } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";



function Share({onClose,currentVideo}:{onClose:()=>void,currentVideo:any} ) {

  const ShareRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    function handleShareOutside(e:MouseEvent){
      if(ShareRef.current && !ShareRef.current.contains(e.target as Node)){
          onClose();
      }
    }
    document.addEventListener("mousedown", handleShareOutside);

    return()=>{
      document.removeEventListener("mousedown",handleShareOutside);
    };


  },[onClose]);

  return (
    <>
    
    <div className={styles.ShareContainer} ref={ShareRef}>
        <div className={styles.first}>
          <h2 style={{fontWeight:"700", fontSize:"20px"}}>Share</h2>
          <button style={{cursor:"pointer"}} onClick={onClose}>
          <X  size={20} />
          </button>
        </div>

        <hr style={{ width: "100%" }} className={styles.WhiteLine} />

        <div className={styles.Second}>
          <input type="url" className={styles.input}  value={currentVideo.src}/>
          <button className={styles.copy}>Copy</button>
        </div>

        <p>
          <input
            type="checkbox"
            className={styles.Checkbox}
          />
          Starts at 00:00
        </p>

        <h2 className={styles.ShareHeader}>
          Share to Social Media
        </h2>

        <div className={styles.SocialMedia}>
          <div className={styles.Links}>
            <a href="https://x.com/evgroup1">
              <BsTwitterX /> <p>Twitter</p>
            </a>
          </div>
          <div className={styles.Links}>
            <a href="https://www.facebook.com/evgindia/">
              <FaFacebook /> <p> Facebook</p>
            </a>
          </div>
          <div className={styles.Links}>
            <a href="https://www.linkedin.com/company/ev-homes/?originalSubdomain=in">
              <FaLinkedin /> <p>LinkedIn</p>
            </a>
          </div>
          <div className={styles.Links}>
            <a href="https://api.whatsapp.com/send/?text=Ahire+EV+Homes+9+Square+Vashi+Testimonial++https%3A%2F%2Fevhomes.tech%2Fwatch%3FvideoId%3D684bf08fc826636ba0ba092e&type=custom_url&app_absent=0" >
              <div><FaWhatsapp /></div> <p>Whatsapp</p>
            </a>
          </div>
      
        </div>
      </div>

    </>
  );
}

export default Share;

