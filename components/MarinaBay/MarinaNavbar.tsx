import React from "react";
import styles from "./MarinaNavbar.module.css";
import { House, Mail, MapPin, Phone } from "lucide-react";
import logo from ".././../public/images/malibu.webp";
import { FaDownload } from "react-icons/fa";
import "../../public/pdf/"

function MarinaNavbar() {
  return (
    <>
      <div className={styles.NavMain}>
        <div className={styles.NavFirst}>
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
        </div>
        <hr
          style={{
            border: "0.2px solid white",
            opacity: "0.2",
            margin: "0",
            marginLeft: "1vw",
          }}
        />

        <div className={styles.NavSecond}>
          <img src="/images/malibu.webp" alt="logo" className={styles.Logo} />

          <ul className={styles.NavLinks}>
            <li>
              <a href="#">EV 23 Malibu West</a>
            </li>
            <li>
              <a href="#">Description</a>
            </li>

            <li>
              <a href="#">Amenities</a>
            </li>

            <li>
              <a href="#">Configuration</a>
            </li>
          </ul>
          <button className={styles.BrochureBtn}><FaDownload  style={{marginRight:"10px"}}/><p> Brochure</p></button>
        </div>
      </div>
    </>
  );
}
export default MarinaNavbar;
