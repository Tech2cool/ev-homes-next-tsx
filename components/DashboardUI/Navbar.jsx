"use client";
import styles from "./navbar.module.css";
import { MdNotifications, MdAccountCircle } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { Map } from "lucide-react"; 

const imageSrc = "/images/evhomeslogo_1.webp";

function Navbar() {  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={styles.Navbar}>
        <div className={styles.logo}>
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt="EV Homes Logo"
            width={140}
            height={45}
            priority
            quality={90}
            className={styles.logoImage}
          />
        </div>

        <div className={styles.HomeMenu} onClick={() => setIsOpen(!isOpen)}>
          <FaHome size={28} />        
        </div>
        <ul
          className={`${styles.navlinks} ${styles.InsideNav} ${
            isOpen ? styles.show : ""
          }`}
        >
          <div
            className={styles.HomeNavbarLogo}
            onClick={() => setIsOpen(false)}
          >
            <FaHome size={30} color="white" />
          </div>
          <div className={styles.MobileNavbarLogo}>
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt="EV Homes Logo"
              width={150}
              height={80}
              priority
              quality={90}
              className={styles.MobileNavbarLogoImage}
            />
          </div>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Dashboard</a>
          </li>
          <li>
            <a href="#">Leads</a>
          </li>
          <li>
            <a href="#">Visits</a>
          </li>
          <li>
            <a href="#">Attendance</a>
          </li>
        </ul>

        <div className={styles.icons}>
          <MdNotifications  className={styles.iconone} />
          <MdAccountCircle  className={styles.icontwo} />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
