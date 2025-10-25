"use client";
import { useEffect, useState } from "react";
import styles from "./liveproject.module.css";
import { PiArrowBendDoubleUpLeftFill, PiArrowBendDoubleUpRightFill } from "react-icons/pi";
const bgImages = [
    { name: "Malibu west", img: "/images/malibu.jpeg", title: "EV 23 Malibu West." },
    { name: "Nine Square", img: "/images/ninesquare1.png", title: "EV 9 Square. " },
    { name: "Marina bay", img: "/images/marina1.png", title: "EV 10 Marina bay. " },
    { name: "EV Paradise", img: "/images/parad1.png", title: "EV Paradise. " },
    { name: "EV Heart City", img: "/images/evheartcity.png", title: "EV Heart City. " },
];

const Liveproject = () => {
    const [current, setCurrent] = useState(0);
    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % bgImages.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + bgImages.length) % bgImages.length);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % bgImages.length);
        }, 3000); // 3 sec delay
        return () => clearInterval(interval);
    }, []);
    const getVisibleSlides = () => {
        const total = bgImages.length;
        const slides = [];
        for (let i = -1; i <= 1; i++) {
            slides.push(bgImages[(current + i + total) % total]);
        }
        return slides;
    };
    return (
        <div className={styles.container}>
            <div className={styles.sliderWrapper}>
                {bgImages.map((img, index) => (
                    <div
                        key={index}
                        className={`${styles.slide} ${index === current ? styles.active : ""}`}
                        style={{ backgroundImage: `url(${img.img})` }}
                    ></div>
                ))}
            </div>

            <div className={styles.overlay}></div>
            <div key={current} className={`${styles.hesding}`}>
                <p>
                    {bgImages[current].title}
                </p>
                <div className={styles.btnWrapper}>
                    <button className={styles.readMoreBtn}>
                        Read More <span className={styles.arrow}>&#8594;</span>
                    </button>
                </div>
            </div>

            <div className={styles.minislider}>
                <div className={styles.miniWrapper}>
                    <button className={`${styles.navBtn} ${styles.navLeft}`} onClick={prevSlide}>
                        <PiArrowBendDoubleUpLeftFill  color="#ffffffff"/>

                    </button>

                    {getVisibleSlides().map((img, index) => (
                        <div
                            key={index}
                            className={`${styles.slidercontainer} ${index === 1 ? styles.activeMini : styles.sideMini}`}
                        >
                            <div className={styles.slidercontant}>
                                <p>{img.name}</p>
                                <img src={img.img} alt={`Mini ${index}`} />
                            </div>
                        </div>
                    ))}

                    <button className={`${styles.navBtn} ${styles.navRight}`} onClick={nextSlide}>
                        <PiArrowBendDoubleUpRightFill  color="#ffffffff"/>
                    </button>
                </div>
            </div>


            <div className={styles.hero}>
                <div className={styles.heroContainer}>

                    <p key={current}>
                        Welcome to the world of luxury living,
                        where every corner is crafted with elegance and style.
                        Experience spacious interiors with panoramic views,
                        designed for comfort, class, and sophistication.
                        Your dream home awaits in the heart of exclusivity.
                    </p>

                    <div className={styles.abouttag}>
                        <div className={styles.circleText}>
                            <img src="/images/evhomelogo.png" alt="img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Liveproject;
