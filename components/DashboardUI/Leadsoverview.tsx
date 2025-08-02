import React from "react";
import styles from "../DashboardUI/Leadsoverview.module.css";
import { CircleCheck, CircleX, Hourglass, Users } from "lucide-react";

 const leadsOverview = {
    TotalLeads : 31976,
    Approved :30602,
    Rejected: 1,
    Pending :87
 };


const pendingData = [
  {
    name: "Deepak Karki",
    feedbackPending: 260,
    assignPending: 10,
  },
  {
    name: "Vicky Mane",
    feedbackPending: 125,
    assignPending: 256,
  },

  {
    name: "Jaspreet Arorra",
    feedbackPending: 314,
    assignPending: 12,
  },
];

function Leadsoverview() {
  return (
    <>
      <div className={styles.mainleads}>
        <h2 className={styles.heading}>Leads overview </h2>
        <div className={styles.ContainerWrapper}>
        < div className={styles.leadsoverview}>
          <div className={`${styles.cardone} ${styles.card}`}>
            {" "}
            <Users color="blue" className={styles.Icons} /> 
            <p>Total Leads</p>   <p>{leadsOverview.TotalLeads} </p>
          </div>
          <div className={`${styles.cardtwo} ${styles.card}`}>
            {" "}
            <CircleCheck color="green"  className={styles.Icons}  />
            <p>Approved </p><p>{leadsOverview.Approved}</p>
          </div>
          <div className={`${styles.cardthree} ${styles.card}`}>
            {" "}
            <CircleX color="red"  className={styles.Icons}  />
           <p> Rejected </p> <p>{leadsOverview.Rejected}</p>
          </div>
          <div className={`${styles.cardfour} ${styles.card}`}>
            {" "}
            <Hourglass color="yellow"  className={styles.Icons} />
           <p> Pending </p> <p> {leadsOverview.Pending} </p>
          </div>
          
        </div>
        </div>
        <div>
          <div className={styles.assign}>Assign / Feedback Pending</div>
          <div className={styles.assignWrapper}>
            {pendingData.map((ele,i) => (
              <div key={i} className={styles.leadercontainer}>
                <div className={`${styles.container}`}>
                  <h2 className={styles.leadername}>{ele.name}</h2>
                  <div className={styles.feedback}>
                    <p>{ele.feedbackPending}</p>
                    <p>Feedback Pending</p>
                  </div>
                  <div className={`${styles.feedback} ${styles.pending}`}>
                    <p>{ele.assignPending}</p>
                    <p>Assign <p> Pending</p></p>
                  </div>
                </div>
              </div>
            ))}
   
          </div>
        </div>
      </div>
    </>
  );
}
export default Leadsoverview;
