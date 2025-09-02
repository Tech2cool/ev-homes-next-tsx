"use client"
import React from "react";
import styles from "./MarinaNavbar.module.css";
import { House, Mail, MapPin, Phone, X } from "lucide-react";
import logo from ".././../public/images/malibu.webp";
import { FaDownload } from "react-icons/fa";
import Discription from "./Discription";
import { RiCloseFill, RiMenu4Fill } from "react-icons/ri";
import { Span } from "next/dist/trace";
import { useState,useEffect } from "react";

function MarinaNavbar() {
  const [show,setShow]=useState(false);
  const [showNavFirst,setShowNavFirst]=useState(true);
  const [NavSecBg,setNavSecBg]=useState(false);
  const [hrHide,setHrHide]=useState(true);

  useEffect(()=>{
    const handleScroll=()=>{
        if(window.scrollY>50){
          setShowNavFirst(false);
          setNavSecBg(true);
          setHrHide(false);
        } else{
          setShowNavFirst(true)
          setNavSecBg(false);
          setHrHide(true);
        }
    };
    window.addEventListener('scroll',handleScroll);
    return ()=> window.removeEventListener('scroll',handleScroll)
  },[])
  

  return (
    <>
      <div className={styles.NavMain}>
        { showNavFirst && <div className={styles.NavFirst}>
          <div className={styles.leftSide}>
            <House className={styles.HomeIcon} />

            <p className={styles.SiteName}>
              <MapPin className={styles.MapIcon} />
              <span> EV 23 Malibu West, Koparkhairne</span>
            </p>
          </div>

          <div className={styles.RightSide}>
            <div className={styles.ContactNumber}>
              <Phone className={styles.PhoneIcon} /> <span>+91 8291668777</span>
            </div>
            <svg
              stroke="currentColor"
              fill="gold"
              strokeWidth="0"
              viewBox="0 0 256 256"
              height="15"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M122.34,109.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0,0-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32ZM128,35.31,156.69,64,128,92.69,99.31,64Zm5.66,111a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32l40,40a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0,0-11.32ZM128,220.69,99.31,192,128,163.31,156.69,192Zm109.66-98.35-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,237.66,122.34ZM192,156.69,163.31,128,192,99.31,220.69,128Zm-82.34-34.35-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,109.66,122.34ZM64,156.69,35.31,128,64,99.31,92.69,128Z"></path>
            </svg>
            <p className={styles.MailId}>
              {" "}
              <Mail className={styles.MailIcon} /> deepak@ebvgroup.co.in
            </p>
          </div>
        </div> }
        { hrHide && <hr
          style={{
            border: "0.2px solid white",
            opacity: "0.2",
            margin: "0",
            marginLeft: "1vw",
          }}
        /> }

         <div className={`${styles.NavSecond} ${NavSecBg ? styles.NavSecBg : ""}`} >
   
          <img src="/images/malibu.webp" alt="logo" className={styles.Logo} />
       

          <ul className={styles.NavLinks}>
            <li>
              <a href="#">EV 23 Malibu West</a>
            </li>
            <li>
              <a href="#Discription">Description</a>
            </li>

            <li>
              <a href="#Amenities">Amenities</a>
            </li>

            <li>
              <a href="#Configuration">Configuration</a>
            </li>
          </ul>
          <a
            className={styles.BrochureBtn}
            href="/Brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDownload style={{ marginRight: "10px" }} />
            Brochure
          </a>
        </div>
      </div>
      <div className={styles.MobileNavbar}>
        <div className={styles.MobileHomeIcon}>
          <House className={styles.HomeIconTwo} />
        </div>
        <div className={styles.NavMeunContainer}>
          <img
            src="/images/malibu.webp"
            alt="logo"
            className={styles.MobileLogo}
          />
          { show ? (<RiCloseFill className={styles.NavClose} onClick={()=>setShow(false)}/>): 
        (  <RiMenu4Fill className={styles.NavMenu}  onClick={()=>setShow(true)}/>)
            
          }
          
 
        </div>
        {show &&
        <div className={styles.NavListContainer}>
          <div className={styles.MobileLogoInside}>
          <img
            src="/images/malibu.webp"
            alt="logo"
            className={styles.LogoMobileList}
          />
          </div>

          <ul className={styles.NavLinksMobile}>
            <li>
              <a href="#">EV 23 Malibu West</a>
            </li>
            <li>
              <a href="#Discription">Description</a>
            </li>

            <li>
              <a href="#Amenities">Amenities</a>
            </li>

            <li>
              <a href="#Configuration">Configuration</a>
            </li>
          </ul>
          <div className={styles.HrMain}>          <hr
            style={{
              backgroundColor: "white",
              width: "90%",
              marginTop: "5vw",
              marginBottom: "5vw",
            }}
          />
          </div>

          <div className={styles.NavContaintWrapper}>
            <div className={styles.SiteaddressMobile}>
          <p className={styles.SiteNameMobile}>
            <MapPin className={styles.MapIconMobile} />
            <span> EV 23 Malibu West, Koparkhairne</span>
          </p>
          </div>
          <div className={styles.ContactNumberMobile}>
            <p style={{ color: "orange" , fontSize:"0.7rem" }}>Contact Us On</p>
            <div className={styles.ContactMobile}>
              <Phone className={styles.PhoneIconMoible} />
              <p style={{whiteSpace:"nowrap", fontSize:"0.8rem"}}> +91 8291668777</p>
            </div>
            <p className={styles.MailIdMobile}>
              <Mail className={styles.MailIconMobile} /> deepak@ebvgroup.co.in
            </p>
          </div>
          <div className={styles.DownloadMobile}>
            <p style={{color:"orange"}}>Download Now!</p>
           <a
            className={styles.BrochureBtnMobile}
            href="/Brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDownload style={{ marginRight: "10px" }} />
            Brochure
          </a>
          </div>
          </div>
        </div>
}
        </div>
      
    </>
  );
}
export default MarinaNavbar;
