"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./list.module.css";
import { BsPerson } from "react-icons/bs";
import { MdDetails } from "react-icons/md";
import { Folder } from "lucide-react";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { MdNoteAlt } from "react-icons/md";
import { useData } from "@/providers/dataContext";



interface EstimateListOverallProps {
  onCardClick: (estimate: EstimateGenerated) => void;
  leadId?:  string | null;
}


const EstimateListOverall: React.FC<EstimateListOverallProps> = ({ onCardClick, leadId }) => {
  const { getEstimateGenerated ,estimateAll} = useData();
  // const [estimates, setEstimates] = useState<EstimateGenerated[]>([]);
  const [loadingEstimatebyId, setLoadingEstimatebyId] = useState<boolean>(false);

  useEffect(() => {
         getEstimateGenerated();

    // const fetchEstimates = async () => {
    //   if (!lead?._id) {
    //     console.error("No lead ID provided");
    //     return;
    //   }

    //   setLoadingEstimateAll(true);
    //   try {
    //     // Call the function from your context
    //     const result = await getEstimateGenerated(lead._id);
        
    //     if (result.success) {
    //       // The data should already be set in the context, but we can also set it locally
    //       // If your context doesn't provide the data directly, you might need to modify the context
    //       console.log("Estimates fetched successfully");
    //     } else {
    //       console.error("Failed to fetch estimates:", result.message);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching estimates:", error);
    //   } finally {
    //     setLoadingEstimateAll(false);
    //   }
    // };

    // fetchEstimates();
  }, [leadId]);

  // If your context provides the estimates data directly, you can use this:
  // const { estimatebyId, loadingEstimatebyId } = useData();

  // For now, using dummy data or you'll need to get the data from context
  const displayEstimates = estimateAll.length > 0 ? estimateAll : [];

  if (loadingEstimatebyId) {
    return <div className={styles.leadListContainer}>Loading estimates...</div>;
  }

  if (!displayEstimates || displayEstimates.length === 0) {
    return <div className={styles.leadListContainer}>No estimates found</div>;
  }

  return (
    <div className={styles.leadListContainer}>
      {displayEstimates.map((estimate, index) => (
        <LeadCard 
          key={estimate.id || `estimate-${index}`} 
          estimate={estimate} 
          onClick={() => onCardClick(estimate)} 
        />
      ))}
    </div>
  );
};


const LeadCard: React.FC<{ estimate: EstimateGenerated; onClick: () => void }> = ({ 
  estimate, 
  onClick 
}) => {
  return (
    <div className={styles.leadCard} onClick={onClick}>
      <div className={styles.fistrow}>
        <div className={styles.leadInfo}>
          <div className={styles.clientDetails}>
            <h4>{estimate.lead?.firstName} {estimate.lead?.lastName}</h4>
            <p className={styles.phone}>
              {estimate.lead?.countryCode} {estimate.lead?.phoneNumber}
            </p>
          </div>
          <div className={styles.clientDetails}>
            <div className={styles.lastpart}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {/* You might want to update these based on your actual EstimateGenerated fields */}
                <div style={{display:"flex", justifyContent:"center",alignItems:"center",gap:"5px",fontWeight: 600,color:"rgba(4, 161, 4, 1)"}}>
                   <FaCheckCircle color="rgba(4, 161, 4, 1)" size={13} />
                {/* <span>{estimate.select || "0"}</span> */}
                </div>
               <div style={{display:"flex", justifyContent:"center",alignItems:"center",gap:"5px",fontWeight: 600,color:"red"}}>
                 <MdCancel color="red" size={13} />
                {/* <span>{estimate.reject || "0"}</span> */}
               </div>
               <div style={{display:"flex", justifyContent:"center",alignItems:"center",gap:"5px",fontWeight: 600,color:"yellow"}}>
                <MdNoteAlt color="yellow" size={13} />
                {/* <span>{estimate.length || "0"}</span> */}
               </div>
              </div>
            </div>
          </div>
        </div>
    
        <div className={styles.etmcontainer}>
          <div className={styles.est}>
            <p style={{color:"rgba(255, 255, 255, 0.6)"}}>Est ID:</p>
            <p style={{color:"rgb(255, 255, 255)"}}>{estimate.estID}</p>
          </div>
          <div className={styles.est}>
            {estimate.estimateDate ? new Date(estimate.estimateDate).toLocaleDateString() : 'No date'}
          </div>
        </div>
      </div>

      <div className={styles.leadMeta}>
        <div>
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
                  {estimate.teamLeader?.firstName} {estimate.teamLeader?.lastName}
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
                  {estimate.generatedBy?.firstName} {estimate.generatedBy?.lastName}
                </p>
              </div>

              <div style={{ lineHeight: "18px" }}>
                <p
                  className={styles.lable}
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  <Folder color="#549eedff" size={12} /> Project:
                </p>
                <p className={styles.value}>{estimate.project?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateListOverall;