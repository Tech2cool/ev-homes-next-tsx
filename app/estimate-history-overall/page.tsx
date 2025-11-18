"use client";
import React, { useEffect, useState } from "react";
import styles from "@/components/lead-details-components/estimatesistory/list.module.css";
import EstimateListOverall from "@/components/lead-details-components/estimatesistory/estimateHistoryOverall";
import EstimateHistoryDetails from "@/components/lead-details-components/estimatesistory/estimatehistorydetails";
import { useIsMobile } from "@/hooks/use-mobile";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Headeres from "@/components/lead-details-components/estimatesistory/headeres";
import ReactDOM from "react-dom";
import leadDetails from "../lead-details/page";
import { useData } from "@/providers/dataContext";
import { useSearchParams } from "next/navigation";


const EstimateHistoryOverall: React.FC = () => {
  const isMobile = useIsMobile();
  const { getEstimateGenerated, } = useData();
//    const [estimatebyId, setEstimatebyId] = useState<EstimateGenerated[]>([]);
    const [selectedEstimate, setSelectedEstimate] = useState<EstimateGenerated | null>(null);
  const searchParams = useSearchParams();
  const leadId = searchParams.get('leadId');
    
     useEffect(() => {
      getEstimateGenerated();
    //  getClosingManagers;
   
     }, []);
 
  const handleCardClick = (estimate: EstimateGenerated) => {
   setSelectedEstimate(estimate);
  };

  const handleBack = () => {
   setSelectedEstimate(null);
  };

  return (
    <div className={styles.fullContainer}>
      <Headeres />

      {isMobile ? (
        <div>
          {selectedEstimate  ? (
            <>
              <div className={styles.backButtonWrapper}>
                <IoArrowBackCircleOutline
                  size={20}
                  className={styles.backIcon}
                  onClick={handleBack}
                />
              </div>
          <EstimateHistoryDetails estimate={selectedEstimate } />
            </>
          ) : (
            <EstimateListOverall onCardClick={handleCardClick} leadId={leadId} />
          )}
        </div>
      ) : (
        <div className={styles.listDetailsContainer}>
          <div className={styles.listContainerestm}>
            <EstimateListOverall onCardClick={handleCardClick} leadId={leadId} />
          </div>
          <div className={styles.listHistoryContainer}>
            {selectedEstimate ? (
             <EstimateHistoryDetails estimate={selectedEstimate} />
            ) : (
              <p className={styles.nocont}>
                Select a lead to see details
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EstimateHistoryOverall;
