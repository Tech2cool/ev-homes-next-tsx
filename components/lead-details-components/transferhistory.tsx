"use client";
import React from "react";
import styles from "./QuickAccess.module.css";
import { BiTransferAlt } from "react-icons/bi";
import { TbArrowsTransferDown } from "react-icons/tb";

const TransferHistory = () => {
  const visits = [
    {
      
      teamleader: "Ranjna Gupta",
      date: "05 Sep 25 -> 06 Oct 25 ",
      text: "Trandferred from",
      
      icon: <TbArrowsTransferDown />,
      
    },
    {
    
      teamleader: "Jaspreet Arora",
      date: "05 Oct 25 -> 16 Nov 25 ",
      text: "Trandferred from",
      
      icon: <TbArrowsTransferDown />,
      
    },
  ];

  return (
    <div className={styles.teamplat}>
      <div className={styles.fullList}>
        {visits.map((item, index) => (
          <div key={index} className={styles.cont}>
          
            <div className={styles.iconSection}>
              <div className={styles.circle}>
                {React.cloneElement(item.icon, {
                  className:  styles.callicon,
                })}
              </div>
              {index !== visits.length - 1 && <div className={styles.vline}></div>}
            </div>

            
            <div className={styles.maincot} >
              
              <div className={styles.firstrow}>
                <div className={styles.com} style={{alignItems:"center"}}>
                  <div className={styles.lable}>{item.teamleader}</div>
                  <div className={styles.call}  >
                        <p>{item.date}</p>
                      </div>
                </div>
                
              </div>

              <div className={styles.secrow}>
               
                <div className={styles.tran} style={{letterSpacing:"1px", display:"flex", gap:"10px"}}><BiTransferAlt className={styles.icontrans} /> {item.text}</div>
              </div>

             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferHistory;
