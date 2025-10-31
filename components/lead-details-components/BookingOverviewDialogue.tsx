"use client";
import React from "react";
import styles from "./BOverviewDialouge.module.css";

interface BookingOverviewDialogueProps {
  onClose: () => void;
}

const BookingOverviewDialogue: React.FC<BookingOverviewDialogueProps> = ({ onClose }) => {
  const DetailedPrice = [
    { tag: "Customer Asking Price", Price: 3620000 },
    { tag: "Our Final Price (Minimum)", Price: 3640000 },
  ];

  const NegOverview = [
    { tag: "Customer is asking for", Price: "3620000", tagtwo: "Target price from customer" },
    { tag: "Remark", Price: "aokaak", tagtwo: "customer provided this remark" },
  ];

  const CpOverview = [
    { tag: "Approved request of ", Price: "3620000", tagtwo: "Target price from customer" },
    { tag: "my firm is agreed on ", Percentage: "0.5 %  Rs 3600000", tagtwo: "Brokerage amount" },
    { tag: "Remark ", status: "NA", tagtwo: "Customer provided this remark" },
    { tag: "Approved Date ", status: "NA", tagtwo: "Approval Date from CP" },
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.dialogueBox}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        <div className={styles.pagemain}>
          {/* Customer Info */}
          <div className={styles.CustomerInfoMain}>
            <h2 className={styles.Heading}>Customer Information</h2>
            <div className={styles.NameAndDateMain}>
              <p>Name:<span> Deepak, Test</span></p>
              <p>Date:<span> 09 Jun 25</span></p>
            </div>
            <p>Phone:<span> 991168992</span></p>
          </div>

          {/* Two Main Containers */}
          <div className={styles.Twocontainermain}>
            <div className={styles.DetailedPriceMain}>
              <h2 className={styles.Heading}>Detailed Price Breakdown</h2>
              <div className={styles.DpriceContainer}>
                {DetailedPrice.map((e, index) => (
                  <div key={index} className={styles.PriceBox}>
                    <p>{e.tag}</p>
                    <p>{e.Price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.NegotiationOverview}>
              <h2 className={styles.Heading}>Negotiation Overview</h2>
              <div className={styles.ContainerOne}>
                {NegOverview.map((item, pos) => (
                  <div key={pos} className={styles.negobox}>
                    <p>{item.tag}</p>
                    <p>{item.Price}</p>
                    <p>{item.tagtwo}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Channel Partner Overview */}
          <div className={styles.ChannelPartnerMain}>
            <h2 className={styles.Heading}>Channel Partner Overview</h2>
            <div className={styles.ContainersMain}>
              {CpOverview.map((item, index) => (
                <div key={index} className={styles.box}>
                  <div className={styles.topRow}>
                    <span className={styles.tag}>{item.tag}</span>
                  </div>
                  <span className={styles.value}>
                    {item.Price || item.Percentage || item.status}
                  </span>
                  <div className={styles.bottomRow}>
                    <span className={styles.tagtwo}>{item.tagtwo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingOverviewDialogue;
