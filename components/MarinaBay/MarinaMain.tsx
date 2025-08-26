import { defaultOverrides } from "next/dist/server/require-hook";
import styles from "./MarinaMain.module.css"
import React from "react";
import MarinaNavbar from "./MarinaNavbar";
import HomePage from "./HomePage";
import Discription from "./Discription";
import AmenitiesMain from "./Amenities";
import Configuration from "./Configuration";





function Marinamain(){
    return(
        <>
        <div className={styles.MainContainer}>
        <MarinaNavbar/>
        <HomePage/>
        <Discription/>
        <AmenitiesMain/>
        <Configuration/>
        </div>
        </>
    )
}
export default Marinamain