import React from "react";
import styles from "./HomePage.module.css"
import "../../public/images/malibuone.webp"

function HomePage(){
    return(
        <>
        <div className={styles.ScrollMain}>
        <h2>this is homepage</h2>
        <img src="/images/malibuone.webp" alt="malibuimage" className={styles.bildone} />
        </div>
        </>
    )
}
export default HomePage