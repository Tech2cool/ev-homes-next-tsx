"use client"
import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import "../../public/images/malibuOne.jpeg";
import "../../public/images/malibuTwo.jpeg";
import "../../public/images/malibuThree.jpeg";
import "../../public/images/designlight.png"
import { Divide, Tag, X } from "lucide-react";
import { strict } from "assert";
import "../../public/images/leftBtn.png";
import "../../public/images/rightBtn.png"
import "../../public/images/leftFilledBtn.png"
import "../../public/images/rightFilledBtn.png"
import "../../public/images/evhomes.jpeg"


function HomePage() {
  const [currentImage, SetcurrentImage] = useState(0);
  const [animate,setAnimate]=useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      SetcurrentImage((prev) => (prev + 1) % ScrollList.length);
      setAnimate((prev)=>prev +1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);   

  const ScrollWorkRight = ()=>{
    SetcurrentImage((prev)=>(prev + 1)% ScrollList.length);
    setAnimate((prev)=>prev +1);
  }

  const ScrollWorkLeft = ()=>{
       SetcurrentImage((prev)=>(prev - 1 +ScrollList.length)% ScrollList.length);
    setAnimate((prev)=>prev +1);
  }


  const ScrollList = [
    {
      image:  "/images/malibuOne.jpeg",
      tag: "Spacious",
      imageTwo : "/images/designlight.png",
      heading:"Your Home Journey \n Begins Here!",
     headingTwo : "Discover homes designed for modern living"
    },
    {
      image:  "/images/malibuTwo.jpeg",
      tag: "Modern",
         imageTwo : "/images/designlight.png",
          heading:"Designs that Inspire \nLiving",
            headingTwo : "Crafted with contemporary aesthetics in mind"
    },
    {
      image : "/images/malibuThree.jpeg",
      tag: "Elegant",
         imageTwo : "/images/designlight.png",
          heading:"Where Luxury Meets\n Comfort",
            headingTwo : "Every corner reflects timeless elegance   "
    },
    {
      image : "/images/evhomes.jpeg",
      tag: "Peaceful",
         imageTwo : "/images/designlight.png",
          heading:"Tranquility in Every \nCorner",
            headingTwo : "Experience peace in every square foot"
    },
    {
      image : "/images/evhomes.jpeg",
      tag: "Connected",
         imageTwo : "/images/designlight.png",
          heading:"Live Closer to What\n Matters",
            headingTwo : "Stay near work, family, and fun"
    },

  ];
  return (
    <>
      <div className={styles.ImageContainer}>
        
        <img
          src={ScrollList[currentImage].image}
          alt="malibu"
          className={styles.building}
        />
        <div className={styles.tagContainer} key={animate + "-tagcon"}>
        <p className={styles.tag} key={animate + "-tag"}>{ScrollList[currentImage].tag}</p>
         <img
         key={animate + "-img"}
          src={ScrollList[currentImage].imageTwo}
          className={styles.desginImage}
        />
        </div>

        <div className={styles.headingOne} key={animate + "h1"}>{ScrollList[currentImage].heading}</div>
        <div className={styles.headingTwo} key={animate + "-h2"}>{ScrollList[currentImage].headingTwo}</div>
        <div className={styles.ScrollBtnMain}>
            <div className={styles.ScrollBtnWrapper}>
            <img src="/images/leftBtn.png" alt="leftbtn"  className={styles.ScrollBtn}/>
              <img src="/images/leftFilledBtn.png" alt="leftfilledbtn" onClick={ScrollWorkLeft} className={styles.ScrollFilledBtn}/>
              </div>
       
        <div className={styles.ScrollBtnWrapper}>
                <img src="/images/rightBtn.png" alt="rightbtn"  className={styles.ScrollBtn}/>
              <img src="/images/rightFilledBtn.png" alt="rightfilledbtn" onClick={ScrollWorkRight} className={styles.ScrollFilledBtn}/>
        </div>
        </div>


      </div>
    </>
  );
}
export default HomePage; 
