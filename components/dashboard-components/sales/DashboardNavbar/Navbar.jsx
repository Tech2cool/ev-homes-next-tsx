import styles from "./navbar.module.css";
import { MdNotifications, MdAccountCircle } from "react-icons/md";
import Image from "next/image";

// import evhomeslogo from "../../../../public/images/evhomeslogo_1.webp";
const imageSrc = "/images/evhomeslogo_1.webp";

function Navbar() {
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
        <ul className={styles.navlinks}>
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
          <MdNotifications size={24}  className={styles.iconone} />
          <MdAccountCircle size={24}   className={styles.icontwo}/>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
