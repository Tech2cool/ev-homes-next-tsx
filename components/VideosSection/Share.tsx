import React from "react";
import  styles from "./Share.module.css"
import { X } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";

function Share(){
    return(
        <>
     {/* <div className={styles.ShareContainer}>
        <div className={styles.first}>
            <h2>Share</h2>
            <X />
        </div>
        <hr  style={{width:"100%"}} className={styles.WhiteLine} />
       <div className={styles.Second}>
            <input type="url" className={styles.input} />
            <button className={styles.copy}>Copy</button>
        </div>
        

<p>Starts at 01:01</p>
<h2>Share to Social Media</h2>
<div>
    <a href="#"> <BsTwitterX />Twitter</a>
      <a href="#"><FaFacebook /> Facebook</a> 
       <a href="#"> <FaLinkedin />LinkedIn</a>
         <a href="#"> <FaWhatsapp /> Whatsapp</a>
</div>


     </div> */}
        </>
    )
}
export default Share