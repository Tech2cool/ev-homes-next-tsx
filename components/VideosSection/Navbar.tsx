import Image from "next/image"; 
import styles from "../VideosSection/Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.Navbar}>
          <div className={styles.Logo}>
          <Image 
            src="/images/evhomeslogo_1.webp"  
            alt="EV Homes Logo"
            width={250}
            height={50}
          />
        </div>

        <ul className={styles.NavLinks}>
            
          <li><a href="#">Home</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Videos</a></li>
          
        <button className={styles.Loginbtn}>Login</button>
        </ul>
    </div>
  );
}

export default Navbar;
