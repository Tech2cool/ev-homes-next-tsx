"use client";
import { FaLocationDot } from "react-icons/fa6";

import styles from "./malibudesign.module.css";


const Malibudesign = () => {


    return (
        <>
            <div className={styles.teamplet}>
                <div className={styles.textcontan}>
                    <img src="/images/23 malibhu.png" alt="" className={styles.logo} />
                    <div className={styles.textarea}>
                        <div className={styles.location}>
                            <FaLocationDot color="#c49b66" /> <p>Koparkhairne</p>

                        </div>
                        <div className={styles.title}>
                            EV 23 Malibu West
                        </div>
                        <p className={styles.discrip}>
                            <span>Welcome to EV 23 Malibu West 🌴✨</span>
                            <span>Ultra-Luxury Living Inspired by Malibu, California.</span>
                            <span>Developed by EV Homes Construction Pvt Ltd, a name synonymous with quality and innovation, EV 23 Malibu West is an ultra-luxury residential project located in Kopar Khairane Sector 23, Navi Mumbai.</span>
                            <span>Inspired by the opulent beachfront lifestyle of Malibu, California, this development offers a range of 2 BHK and 3 BHK sea-facing residences designed to provide both comfort and elegance.</span>
                            <span>Each home is thoughtfully crafted to offer breathtaking sea views and a peaceful living experience.</span>
                            <span>🌟 World-Class Amenities</span>
                            <span>At EV 23 Malibu West, we believe in offering more than just a home – it’s a lifestyle.</span>
                            <span>The project features a range of curated amenities for residents:</span>
                            <span>🏊 Zuma 23 – An infinity pool with stunning sea views, perfect for relaxation.</span>
                            <span>🌌 Crystal Venue 23 – Kopar Khairane’s first sky banquet hall for special events.</span>
                            <span>⚽ Sky Arena 23 – A rooftop sports turf for sports enthusiasts.</span>
                            <span>🛝 23 Play Land – A vibrant, specially designed kids’ play area.</span>
                            <span>🧘‍♀️ Dhyana Center 23 – A tranquil sea-facing meditation center.</span>
                            <span>🏃‍♂️ Dash 23 – A jogging track for fitness lovers.</span>
                            <span>🏋️ Titan 23 – A fully equipped gym for your health goals.</span>
                            <span>📍 Prime Location</span>
                            <span>Situated in Kopar Khairane Sector 23, this project offers easy access to key locations such as:</span>
                            <span>🛒 Local Market & D-Mart for daily essentials.</span>
                            <span>🏥 Hospitals for your healthcare needs.</span>
                            <span>🏫 Christ Academy for quality education.</span>
                            <span>🚆 Kopar Khairane Railway Station for seamless connectivity.</span>
                            <span>With prices starting from ₹2.09 Crores (All Inclusive), EV 23 Malibu West is the perfect place to experience a life of luxury, elegance, and convenience.</span>
                            <span>📞 Contact us today to book your viewing appointment!</span>
                            <span>🌴 EV 23 Malibu West – Where Dreams Meet Reality. 🌟</span>
                        </p>
                        <div className={styles.btnWrapper}>
                            <button className={styles.readMoreBtn}>
                                Read More <span className={styles.arrow}>&#8594;</span>
                            </button>
                        </div>
                    </div>

                </div>
                <div className={styles.imgcontan}>
                    <div className={styles.imgdes}>
                        <div className={styles.sideImg}>
                            <img src="/images/malibu.jpeg" alt="img1" />
                        </div>
                        <div className={styles.sideImg}>
                            <img src="/images/malibu2.jpeg" alt="img2" />
                        </div>
                        <div className={styles.sideImg}>
                            <img src="/images/malibu3.jpeg" alt="img3" />
                        </div>
                    </div>


                </div>

            </div>

        </>
    );
};

export default Malibudesign;
