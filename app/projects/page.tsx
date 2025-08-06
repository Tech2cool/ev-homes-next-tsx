"use client";
// import { useState } from "react"
import styles from "./projectShowcase.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useData } from "@/providers/dataContext";
import Footer from "../../components/home-components/Contact";
import Navbar from "../../components/home-components/HomeNavbar";
import { ArrowRightCircleIcon, ArrowUpFromDot, ArrowUpFromDotIcon, Locate, Map, MapIcon, MapPinCheck, PlayIcon, ReceiptIndianRupeeIcon, Youtube } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


const ProjectShowCase = () => {
  const imageSrc = "/images/HomePageImage.png";
  const { projects } = useData();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const formatDescription = (desc: string): string[] => {
    if (!desc) return [];

    return desc
      .split(/[\n\r]+/) // Split by line breaks
      .map((line) => line.trim()) // Remove extra whitespace
      .filter((line) => line.length > 0) // Remove empty lines
      .slice(0, 30); // Take only first 30 lines
  };

  // const [currentIndex, setCurrentIndex] = useState(0)
  // const currentProject = projects[currentIndex]
  const router = useRouter();
  const { theme } = useTheme()
  const imageS =
    theme === "dark"
      ? "/images/dark-abstract-background.jpg"
      : "/images/white.jpg";
  return (
    <>
      <Navbar />
      <div id="projects" className={styles.projects}>
        {/* <div className={styles.imageShowCase}>
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt="Hero Background"
            fill
            priority
            quality={75}
          />
          <div
            className={styles.projectHead}
            onClick={() => window.scrollBy({ top: 400, behavior: "smooth" })}
          >
            <div>Projects</div>
            <div className={styles.secondText}>
              projects -- premium projects
            </div>
          </div>
        </div> */}


        <div className={styles.projectSection}>
          <div className={styles.mainimg}>
            {mounted && (
              <Image
                src={imageS}
                alt="Hero Background"
                fill
                priority
                quality={75}
                objectFit="cover"
              />

            )}

          </div>
          <div className={styles.projectcontainer}>
            <div className={styles.projectimg}>
              <Image src={"/images/Base.png"}
                alt="Hero Background"
                fill
                priority
                quality={75}
                
              />
              <div className={styles.imgblur}></div>
              <h2>EV 9 Square</h2>
              <div className={styles.locationimg}>
                <div><MapPinCheck className={styles.locationIcon} size={8} /></div>
                <p>Vashi</p>
              </div>
              <div className={styles.imgbutton}>Read More...</div>
              <div className={styles.slidercontainer}>
                <div className={styles.slidertrack}>
                  <div className={styles.slide}>
                    <img src="/images/gim.png" alt="1" />
                    <div className={styles.overlay}>
                      <p className={styles.slideText}>Gym</p>
                    </div>
                  </div>
                  <div className={styles.slide}>
                    <img src="/images/Banquet hall.png" alt="2" />
                    <div className={styles.overlay}>
                      <p className={styles.slideText}>Banquet hall</p>
                    </div>
                  </div>
                  <div className={styles.slide}>
                    <img src="/images/sky lounge.png" alt="3" />
                    <div className={styles.overlay}>
                      <p className={styles.slideText}>sky lounge</p>
                    </div>
                  </div>
                  <div className={styles.slide}>
                    <img src="/images/sport trufts.png" alt="4" />
                    <div className={styles.overlay}>
                      <p className={styles.slideText}>sport trufts</p>
                    </div>
                  </div>
                  <div className={styles.slide}>
                    <img src="/images/Workspace.png" alt="5" />
                    <div className={styles.overlay}>
                      <p className={styles.slideText}>Workspace</p>
                    </div>
                  </div>
                  <div className={styles.slide}>
                    <img src="/images/meditation center.png" alt="6" />
                    <div className={styles.overlay}>
                      <p className={styles.slideText}>meditation center</p>
                    </div>
                  </div>
                  <div className={styles.slide}>
                    <img src="/images/park.png" alt="7" />
                    <div className={styles.overlay}>
                      <p className={styles.slideText}>park</p>
                    </div>
                  </div>
                  <div className={styles.slide}>
                    <img src="/images/tennis court.png" alt="8" />
                    <div className={styles.overlay}>
                      <p className={styles.slideText}>tennis court</p>
                    </div>
                  </div>
                  <div className={styles.slide}>
                    <img src="/images/infinity sky pool.png" alt="9" />
                    <div className={styles.overlay}>
                      <p className={styles.slideText}>infinity sky pool</p>
                    </div>
                  </div>
                  <div className={styles.slide}>
                    <img src="/images/flowwer garden.png" alt="10" />
                    <div className={styles.overlay}>
                      <p className={styles.slideText}>flowwer garden</p>
                    </div>
                  </div>
                  <div className={styles.slide}>
                    <img src="/images/jopgging track.png" alt="11" />
                    <div className={styles.overlay}>
                      <p className={styles.slideText}>jopgging track</p>
                    </div>
                  </div>
                </div>
              </div>



            </div>

          </div>
          <div className={styles.pd}> </div>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.projectContent}>
                {/* Left Section: Project Info */}
                <div className={styles.projectInfo}>
                  <div className={styles.projectHeader}>
                    <h2 className={styles.projHead}>{project.name}</h2>
                    <div className={styles.projectDivider}></div>
                  </div>

                  <div className={styles.descriptionContainer}>
                    {formatDescription(project.description ?? "").length > 0 ? (
                      <ul className={styles.descriptionList}>
                        {formatDescription(project.description ?? "").map(
                          (line, i) => (
                            <li key={i} className={styles.descriptionItem}>
                              {line}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <div className={styles.noDescription}>
                        No description available
                      </div>
                    )}
                  </div>

                  <div className={styles.location}>
                    <div className={styles.locationIcon}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
                          stroke="#c49b66"
                          strokeWidth="2"
                        />
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                          stroke="#c49b66"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <span className={styles.locationText}>
                      {project.locationName}
                    </span>
                  </div>
                </div>

                {/* Right Section: Images */}
                <div className={styles.projectImages}>
                  <div className={styles.imageGrid}>
                    <div className={styles.mainImageContainer}>
                      {project.carouselImages?.[0] && (
                        <Image
                          src={project.carouselImages[0] || "/placeholder.svg"}
                          // src={project.carouselImages?.[1] || "/placeholder.svg"}
                          alt={`Main image of ${project.name}`}
                          fill
                          priority
                          quality={75}
                          className={styles.mainImage}
                        />
                      )}
                      <div className={styles.boxtext}>
                        <div className={styles.boxWrapper}>
                          <div className={styles.boxname}>{project.name}</div>
                          <div className={styles.circleIcon}>
                            <ArrowRightCircleIcon />
                          </div>
                        </div>


                        <div className={styles.boxImg}>
                          <Image
                            src={project.carouselImages?.[1] || "/placeholder.svg"}
                            alt="small preview"
                            width={40}
                            height={40}
                            className={styles.smallImage}
                          />
                        </div>
                      </div>


                      <div className={styles.imageOverlay}></div>
                      <div className={styles.imageText}>
                        <p>
                          <span className={styles.verticalLine}></span>
                          Discover an exclusive lifestyle at {project.name} right here in {project.locationName}
                        </p>
                      </div>
                      <div className={styles.testim}>
                        <div><PlayIcon size={15} /></div>
                        <p>Testimonials</p>
                      </div>
                      <div className={styles.loca}>
                        <div><Locate size={15} /></div>
                        <p>Location</p>
                      </div>
                    </div>

                    {/* <div className={styles.thumbnailGrid}>
                      {project.carouselImages?.slice(1, 3).map((img, i) => (
                        <div key={i} className={styles.thumbnailContainer}>
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Image ${i + 2} of ${project.name}`}
                            fill
                            priority
                            quality={75}
                            className={styles.thumbnailImage}
                          />
                          <div className={styles.imageOverlay}></div>
                        </div>
                      ))}
                    </div> */}

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Footer />
        {/* <div className={styles.footerSection}>
          <div className={styles.footerDivider}>
            <div className={styles.designWrapper}>
              <Image
                src={"/images/design1.png"}
                alt="Design"
                fill
                priority
                quality={75}
              />
            </div>
            <div className={styles.lineWithLogo}>
              <div className={styles.leftLine}></div>
              <div className={styles.logoWrapper}>
                <Image
                  src={"/images/evhomeslogo_1.webp"}
                  alt="Logo"
                  fill
                  priority
                  quality={90}
                />
              </div>
              <div className={styles.rightLine}></div>
            </div>
          </div>

          <div className={styles.mainFooter}>
            <div className={styles.footerContent}>
              <div className={styles.footerColumn}>
                <div className={styles.quicklinks}>
                  <div className={styles.head}>QUICK LINKS</div>
                  <div className={styles.linksList}>
                    <div
                      className={styles.footerLink}
                      onClick={() => router.push("/")}
                    >
                      HOME
                    </div>
                    <div
                      className={styles.footerLink}
                      onClick={() => router.push("/projects")}
                    >
                      PROJECTS
                    </div>
                    <div
                      className={styles.footerLink}
                      onClick={() => router.push("/contact")}
                    >
                      CONTACT US
                    </div>
                    <div
                      className={styles.footerLink}
                      onClick={() => router.push("/watch")}
                    >
                      VIDEOS
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.footerColumn}>
                <div className={styles.addressSection}>
                  <div className={styles.head}>CONTACT</div>
                  <div className={styles.contactInfo}>
                    <div className={styles.cityName}>MUMBAI</div>
                    <div className={styles.address}>
                      211&212, Vardhaman Chambers A Wing
                      <br />
                      Plot No.84, Sector - 17 Vashi,
                      <br />
                      Navi Mumbai - 400 703.
                    </div>
                    <div className={styles.phone}>Tel: +91 98209 04400</div>
                  </div>
                </div>
              </div>

              <div className={styles.footerColumn}>
                <div className={styles.projectsName}>
                  <div className={styles.head}>OUR PROJECTS</div>
                  <div className={styles.projectsList}>
                    {projects.slice(0, 6).map((project) => (
                      <div key={project._id} className={styles.projectLink}>
                        <a href={`/projects`}>{project.name}</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ProjectShowCase;
