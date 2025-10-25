"use client";
import React, { useState } from "react";
import styles from "./list.module.css";
import Estinatelist from "./estinatelist";
import EstimateHistoryDetails from "./estimatehistorydetails";
import { useIsMobile } from "@/hooks/use-mobile";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Headeres from "./headeres";
import ReactDOM from "react-dom";

interface LeadData {
  id: number;
  lead: {
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
  };
  teamleader: {
    firstName: string;
    lastName: string;
  };
  generatedBy: {
    firstName: string;
    lastName: string;
  };
  project: {
    name: string;
  };
  estID: string;
  flatNo: string;
  date: string;
  select: string;
  reject: string;
  length: string;
}

const EstimateHistory: React.FC = () => {
  const isMobile = useIsMobile();
  const [selectedEstimate, setSelectedEstimate] = useState<LeadData | null>(null);

  const handleCardClick = (lead: LeadData) => {
    setSelectedEstimate(lead);
  };

  const handleBack = () => {
    setSelectedEstimate(null);
  };

  return ReactDOM.createPortal(
    <div className={styles.fullContainer}>
      <Headeres />

      {isMobile ? (
        <div>
          {selectedEstimate ? (
            <>
              <div className={styles.backButtonWrapper}>
                <IoArrowBackCircleOutline
                  size={20}
                  className={styles.backIcon}
                  onClick={handleBack}
                />
              </div>
              <EstimateHistoryDetails lead={selectedEstimate} />
            </>
          ) : (
            <Estinatelist onCardClick={handleCardClick} />
          )}
        </div>
      ) : (
        <div className={styles.listDetailsContainer}>
          <div className={styles.listContainerestm}>
            <Estinatelist onCardClick={handleCardClick} />
          </div>
          <div className={styles.listHistoryContainer}>
            {selectedEstimate ? (
              <EstimateHistoryDetails lead={selectedEstimate} />
            ) : (
              <p className={styles.nocont}>
                Select a lead to see details
              </p>
            )}
          </div>
        </div>
      )}
    </div>,
        document.body
  );
};

export default EstimateHistory;
