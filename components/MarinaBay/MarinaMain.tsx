"use client"

import styles from "./MarinaMain.module.css"
import React from "react";
import MarinaNavbar from "./MarinaNavbar";
import HomePage from "./HomePage";
import Discription from "./Discription";
import AmenitiesMain from "./Amenities";
import Configuration from "./Configuration";
import Footer from "../../components/home-components/Contact"






function Marinamain(){
    return(
        <>
        <div className={styles.MainContainer}>
        <MarinaNavbar/>
        <HomePage />
        <div id="Discription">
        <Discription/>
        </div>
         <div id="Amenities">
        <AmenitiesMain/>
        </div>
           <div id="Configuration">
        <Configuration/>
        </div>
<Footer />

        </div>
        
        </>
    )
}
export default Marinamain