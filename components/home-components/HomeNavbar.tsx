"use client";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import Image from "next/image";
import { FaUser, FaUserCircle } from "react-icons/fa";
import ProfileDialogBox from "@/components/Dialogs/Profiledialog";
import { useUser } from "@/providers/userContext";

const imageSrc = "/images/evhomeslogo_1.webp";

const HomeNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const { user } = useUser();

  // scroll blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // active section highlight
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScroll = () => {
      const scrollY = window.scrollY;
      sections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop - 100;
        const height = el.offsetHeight;
        const id = el.getAttribute("id");
        if (scrollY >= top && scrollY < top + height && id) {
          setActiveSection(id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.navContainer}>
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

          <ul
            className={`${styles.navLinks} ${
              isMobileMenuOpen ? styles.mobileMenuOpen : ""
            }`}
          >
            <li
              className={
                !activeSection || activeSection === "home" ? styles.active : ""
              }
            >
              <Link href="/" className={styles.navLink}>
                <span>Home</span>
              </Link>
            </li>
            
            <li className={activeSection === "projects" ? styles.active : ""}>
              <Link href="/projects" className={styles.navLink}>
                <span>Projects</span>
              </Link>
            </li>
            <li className={activeSection === "gallery" ? styles.active : ""}>
              <Link href="#gallery" className={styles.navLink}>
                <span>Gallery</span>
              </Link>
            </li>
            <li className={activeSection === "videos" ? styles.active : ""}>
              <Link href="#videos" className={styles.navLink}>
                <span>Videos</span>
              </Link>
            </li>
            <li className={activeSection === "about" ? styles.active : ""}>
              <Link href="/contact" className={styles.navLink}>
                <span>About Us</span>
              </Link>
            </li>
                          {!user ? (
                <li>
                  <Link
                    href="/login"
                    className={`${styles.navLink} ${styles.loginBtn}`}
                  >
                    <span>Login</span>
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className={`${styles.navLink}`}
                    >
                      <span>Dashboard</span>
                    </Link>
                  </li>

                  <li
                    className={styles.userIconWrapper}
                    onClick={() => setOpenProfileDialog(true)} // ✅ correct
                  >
                    <FaUserCircle className={styles.userIcon} />
                  </li>
                </>
              )}

            <ul>

              <ProfileDialogBox
                isOpen={openProfileDialog}
                onClose={() => setOpenProfileDialog(false)}
              />
            </ul>
            <li className={styles.themeToggleWrapper}>
              <ThemeToggle />
            </li>
            {/* <FaUserCircle
              className={styles.icon}
              onClick={() => setOpenProfileDialog(true)}
            /> */}
          </ul>

          <button
            className={styles.mobileMenuToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`${styles.hamburger} ${
                isMobileMenuOpen ? styles.hamburgerOpen : ""
              }`}
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </nav>
      <ProfileDialogBox
        isOpen={openProfileDialog}
        onClose={() => setOpenProfileDialog(false)}
      />
    </>
  );
};

export default HomeNavbar;
