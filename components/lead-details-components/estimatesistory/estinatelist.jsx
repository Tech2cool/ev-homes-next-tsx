"use client";
import React, { useState, useRef } from "react";
import styles from "./list.module.css";
import { BsPerson } from "react-icons/bs";
import { MdDetails } from "react-icons/md";
import { Folder } from "lucide-react";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { MdNoteAlt } from "react-icons/md";
import { useData } from "@/providers/dataContext";



const dummyEstimates = [
  {
    id: 1,
    lead: { firstName: "Ravi", lastName: "Sharma", countryCode: "+91", phoneNumber: "9876543210" },
    teamleader: { firstName: "Amit", lastName: "Patel" },
    generatedBy: { firstName: "Sita", lastName: "Singh" },
    project: { name: "Marina Bay" },
    estID: "EST123",
    flatNo: "A-102",
    date: "2025-10-23",
    select: "2",
    reject: "1",
    length: "5",
  },
  {
    id: 2,
    lead: { firstName: "Neha", lastName: "Verma", countryCode: "+91", phoneNumber: "9998877665" },
    teamleader: { firstName: "Rajesh", lastName: "Kumar" },
    generatedBy: { firstName: "Priya", lastName: "Nair" },
    project: { name: "Palm Heights" },
    estID: "EST456",
    flatNo: "B-305",
    date: "2025-10-21",
    select: "3",
    reject: "0",
    length: "8",

  },
  {
    id: 3,
    lead: { firstName: "Neha", lastName: "Verma", countryCode: "+91", phoneNumber: "9998877665" },
    teamleader: { firstName: "Rajesh", lastName: "Kumar" },
    generatedBy: { firstName: "Priya", lastName: "Nair" },
    project: { name: "Palm Heights" },
    estID: "EST456",
    flatNo: "B-305",
    date: "2025-10-21",
    select: "3",
    reject: "0",
    length: "8",

  },
];

const LeadCard = ({ estimate, onClick }) => {
  const {getEstimateGeneratedById} = useData();
    const [estimatebyId, setEstimatebyId] = useState<EstimateGenerated[]>([]);
  const [loadingEstimatebyId, setLoadingEstimatebyId] = useState<boolean>(false);
  
  return (
    <div className={styles.leadCard} onClick={onClick}>
      <div className={styles.fistrow}>
        <div className={styles.leadInfo}>

          <div className={styles.clientDetails}>

            <h4>{estimate.lead.firstName} {estimate.lead.lastName}</h4>
            <p className={styles.phone}>{estimate.lead.countryCode} {estimate.lead.phoneNumber}</p>


          </div>
          <div className={styles.clientDetails}>
            <div className={styles.lastpart}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", }}>
                <div style={{display:"flex", justifyContent:"center",alignItems:"center",gap:"5px",fontWeight: 600,color:"rgba(4, 161, 4, 1)"}}>
                   <FaCheckCircle color="rgba(4, 161, 4, 1)" size={13} />
                <span >{estimate.select}</span>
                </div>
               <div style={{display:"flex", justifyContent:"center",alignItems:"center",gap:"5px",fontWeight: 600,color:"red"}}>
                 <MdCancel  color="red" size={13} />
                <span >{estimate.reject}</span>
               </div>
               <div style={{display:"flex", justifyContent:"center",alignItems:"center",gap:"5px",fontWeight: 600,color:"yellow"}}>
                <MdNoteAlt color="yellow" size={13} />
                <span >{estimate.length}</span>
               </div>

              </div>
            </div>
          </div>
        </div>

    
        <div className={styles.etmcontainer}>
          <div className={styles.est}>
            <p style={{color:"rgba(255, 255, 255, 0.6)",}}>Est ID:</p>

            <p style={{color:"rgb(255, 255, 255)",}}>{estimate.estID}</p>
          </div>
          <div className={styles.est}>
            {estimate.date}
          </div>
        </div>


      </div>

      <div className={styles.leadMeta}>
        <div>
          {/* <p><strong>Est ID:</strong> {estimate.estID}</p> */}
        <div
  style={{
    display: "flex",
    justifyContent: "flex-start",
    position: "relative",
  }}
>
  <div style={{ display: "flex", gap: "6px", flexDirection: "column" }}>
    <div style={{ lineHeight: "18px" }}>
      <p
        className={styles.lable}
        style={{ display: "flex", alignItems: "center", gap: "2px" }}
      >
        <BsPerson color="#549eedff" size={12} /> Team Leader:
      </p>
      <p className={styles.value}>
        {estimate.teamleader.firstName} {estimate.teamleader.lastName}
      </p>
    </div>

    <div style={{ lineHeight: "18px" }}>
      <p
        className={styles.lable}
        style={{ display: "flex", alignItems: "center", gap: "2px" }}
      >
        <MdDetails color="#549eedff" size={12} /> Unit No:
      </p>
      <p className={styles.value}>{estimate.flatNo}</p>
    </div>
  </div>

  <div
    style={{
      display: "flex",
      gap: "6px",
      flexDirection: "column",
      position: "absolute",
      left: "60%", 
      transform: "translateX(-10%)", 
    }}
  >
    <div style={{ lineHeight: "18px" }}>
      <p
        className={styles.lable}
        style={{ display: "flex", alignItems: "center", gap: "2px" }}
      >
        <BsPerson color="#549eedff" size={12} /> Generated By:
      </p>
      <p className={styles.value}>
        {estimate.generatedBy.firstName} {estimate.generatedBy.lastName}
      </p>
    </div>

    <div style={{ lineHeight: "18px" }}>
      <p
        className={styles.lable}
        style={{ display: "flex", alignItems: "center", gap: "2px" }}
      >
        <Folder color="#549eedff" size={12} /> Project:
      </p>
      <p className={styles.value}>{estimate.project.name}</p>
    </div>
  </div>
</div>

        </div>


      </div>
    </div>
  );
};

const Estinatelist = ({ onCardClick }) => {
  const [leads] = useState(dummyEstimates);
  const observer = useRef(null);

  return (
    <div className={styles.leadListContainer}>
      {leads.map((lead, index) => (
        <LeadCard key={index} estimate={lead} onClick={() => onCardClick(lead)} />
      ))}
    </div>
  );
};

export default Estinatelist;
