"use client";
import { FaLocationDot } from "react-icons/fa6";
import styles from "./otherproject.module.css";

const OtherProject = () => {
    return (
        <>
            <div className={styles.teamplet}>
                <h2 className={styles.title}>Majestic Abode</h2>
                <p className={styles.linetwo}>Luxury Homes Crafted For You</p>

                <div className={styles.imgsection}>
                    <div className={styles.imgsectionone}>
                        <img src="/images/parad1.png" alt="Paradise 1" />
                        <p className={styles.titleproject}>EV Paradise</p>
                        <div className={styles.locationtext}>
                            <FaLocationDot color="#c49b66" /> <p className={styles.location}>Nerul</p>
                        </div>
                        <div className={styles.btnWrapper}>
                            <button className={styles.readMoreBtn}>
                                Read More <span className={styles.arrow}>&#8594;</span>
                            </button>
                        </div>
                    </div>

                    <div className={styles.imgsectiontwo}>
                        <img src="/images/evheartcity.png" alt="Paradise 2" />
                        <p className={styles.titleproject}>EV Heart City</p>
                        <div className={styles.locationtext}>
                            <FaLocationDot color="#c49b66" /> <p className={styles.location}>Mosare</p>
                        </div>
                        <div className={styles.btnWrapper}>
                            <button className={styles.readMoreBtn}>
                                Read More <span className={styles.arrow}>&#8594;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtherProject;
