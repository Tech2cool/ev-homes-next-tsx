"use client";
import React, { useState } from "react";
import styles from "./QuickAccess.module.css";
import { BiTransferAlt } from "react-icons/bi";
import { TbArrowsTransferDown } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import AddChannelPartner from "./Dailog/addchannelpartner";

const CPTransferHistory = () => {
  const [edittaging, setedittaging] = useState(false);

  const visits = [
    {
      date: "05 Sep 25",
      channelpartner: "Bhoomi Realty",
      taggeddate: "05 Sep 25 -> 06 Oct 25 ",
      text: "Approved",

      icon: <TbArrowsTransferDown />,

    },
    {
      date: "05 Oct 25",
      channelpartner: "Rohit Realtors",
      taggeddate: "05 Oct 25 -> 16 Nov 25 ",
      text: "Approved",

      icon: <TbArrowsTransferDown />,

    },
  ];

  return (
    <div className={styles.teamplat}>
      <div className={styles.fullList}>
        <div className={styles.editcnt} onClick={() => setedittaging(true)}><FaEdit /></div>
        {visits.map((item, index) => (
          <div key={index} className={styles.cont}>

            <div className={styles.iconSection}>
              <div className={styles.circle}>
                {React.cloneElement(item.icon, {
                  className: styles.callicon,
                })}
              </div>
              {index !== visits.length - 1 && <div className={styles.vline}></div>}
            </div>


            <div className={styles.maincot} >

              <div className={styles.firstrow}>
                <div className={styles.com} style={{ alignItems: "center" }}>
                  <div className={styles.lable}>{item.channelpartner}</div>
                  <div className={styles.call}  >
                    <p>{item.taggeddate}</p>
                  </div>

                </div>

              </div>
              <div className={styles.tag}>{item.date}</div>
              <div className={styles.secrow}>

                <div className={styles.tran} style={{ letterSpacing: "1px", display: "flex", gap: "10px" }}><BiTransferAlt className={styles.icontrans} /> {item.text}</div>
              </div>


            </div>

          </div>

        ))}
      </div>
      <div>

      </div>
      {edittaging && (
        <AddChannelPartner openclick={setedittaging} />
      )}
    </div>
  );
};

export default CPTransferHistory;
