"use client";
import { FaLocationDot } from "react-icons/fa6";
import styles from "./projectdesign.module.css";

interface ProjectProps {
  project: {
    title: string;
    subtitle: string;
    location: string;
    mainImg: string;
    smallImgs: string[];
    logo: string;
    description: string[];
  };
}

const Projectdesign = ({ project }: ProjectProps) => {
  return (
    <div className={styles.marinasection}>
      <div className={styles.container}>
        <div className={styles.imgcontainer}>
          <img src={project.mainImg} alt="about" className={styles.bgimg} />
          {project.smallImgs.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`small-${idx}`}
              className={idx === 0 ? styles.smallfirst : styles.smallsecond}
            />
          ))}

          <div className={styles.projectlogo}>
            <img src={project.logo} alt="logo" className={styles.logomarina} />
            <div className={styles.pulse}></div>
          </div>
        </div>

        <div className={styles.textcontainer}>
          <div className={styles.textarea}>
            <span className={styles.subtitle}>{project.subtitle}</span>
            <h2 className={styles.sectitle}>{project.title}</h2>
            <div className={styles.locationtext}>
              <FaLocationDot  className={styles.iconcolor} /> <p>{project.location}</p>
            </div>

            <p className={styles.discrip}>
              {project.description.map((desc, idx) => (
                <span key={idx}>{desc}</span>
              ))}
            </p>

            <div className={styles.btnWrapper}>
              <button className={styles.readMoreBtn}>
                Read More <span className={styles.arrow}>&#8594;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projectdesign;
