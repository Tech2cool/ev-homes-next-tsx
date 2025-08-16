import Image from "next/image";
import styles from "../VideosSection/Navbar.module.css";
import { TbLayoutNavbar } from "react-icons/tb";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNavbar = () => {
    console.log("ic0n is cliked");
    setOpen(true);
  };
  
    const handleNavbarClose = ()=>{
      setOpen(false);
    }
  return (
    <>
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
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Projects</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Videos</a>
          </li>

          <button className={styles.Loginbtn}>Login</button>
        </ul>
      </div>

      {/* navbar for mobile and tablet */}

      <div className={styles.NavContainerTwo}>
        <div className={styles.HomeIcon} onClick={handleNavbar}>
          <TbLayoutNavbar size={25}  />
        </div>

        {open && (
          <div className={styles.NavlinksContainer}>
            <div className={styles.HomeIconIn} onClick={handleNavbarClose}>
              <TbLayoutNavbar size={25} />
            </div>
            <div className={styles.NavLogo}>
              <Image
                src="/images/evhomeslogo_1.webp"
                alt="EV Homes Logo"
                width={150}
                height={50}
              />
            </div>
            <ul className={styles.NavLinksTwo}>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Projects</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Videos</a>
              </li>
            </ul>
          </div>
        )}
        <button className={styles.LoginbtnTwo}>Login</button>
      </div>
    </>
  );
}

export default Navbar;
