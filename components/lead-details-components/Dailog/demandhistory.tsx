"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { MdCancel, MdSearch } from "react-icons/md";
import comstyles from "./dailog.module.css";
import styles from "./bookingdailog.module.css";

interface DemandHistoryProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PaymentCard {
  title: string;
  subtitle: string;
  data: { label: string; value: string }[];
}

const DemandHistory: React.FC<DemandHistoryProps> = ({ openclick }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");

  // 💾 All card data
  const paymentCards: PaymentCard[] = [
    {
      title: "💰 Payment Summary",
      subtitle: "Below are the details of payments made toward the demand.",
      data: [
        { label: "Total Payment", value: "₹ 80,00,000" },
        { label: "Booking", value: "₹ 5,00,000" },
        { label: "GST", value: "₹ 30,000" },
        { label: "TDS", value: "₹ 1,45,236" },
      ],
    },
    {
      title: "🏦 Second Payment Summary",
      subtitle: "Second installment and charges recorded in the demand.",
      data: [
        { label: "Total Payment", value: "₹ 40,00,000" },
        { label: "Booking", value: "₹ 2,50,000" },
        { label: "GST", value: "₹ 15,000" },
        { label: "TDS", value: "₹ 72,618" },
      ],
    },
  ];

  const filteredCards = paymentCards.filter(
    (card) =>
      card.title.toLowerCase().includes(search.toLowerCase()) ||
      card.data.some(
        (item) =>
          item.label.toLowerCase().includes(search.toLowerCase()) ||
          item.value.toLowerCase().includes(search.toLowerCase())
      )
  );

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        openclick(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openclick]);

  return ReactDOM.createPortal(
    <div className={comstyles.dialogOverlay}>
      <div ref={dialogRef} className={`${comstyles.dialogBox} ${styles.darkBox}`}>
        <MdCancel onClick={() => openclick(false)} className={styles.closeIcon} />

        <h3 className={styles.dialogTitle}>🧾 Demand History</h3>

        <div className={styles.searchBar}>
          <MdSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by Flat No or Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.infoSection}>
          {filteredCards.length > 0 ? (
            filteredCards.map((card, index) => (
              <div key={index} className={styles.infoCard}>
                <h4 className={styles.cardTitle}>{card.title}</h4>
                <p className={styles.cardSubtitle}>{card.subtitle}</p>

                {card.data.map((item, idx) => (
                  <div key={idx} className={styles.infoRow}>
                    <span className={styles.infoLabel}>{item.label}</span>
                    <span className={styles.infoValue}>{item.value}</span>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className={styles.noResult}>No matching records found.</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DemandHistory;
