"use client";
import React, { useState } from "react";
import bookstyle from "@/app/super-admin/booking-details/booking.module.css";
import { MdEmail } from "react-icons/md";

import { FaAddressCard, FaCity, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Building, Building2, User } from "lucide-react";
import styles from "@/app/super-admin/lead-details/lead-details.module.css";
import { IoPersonSharp } from "react-icons/io5";

interface ApplicantOverviewProps {
  booking?: PostSaleLead | null;
}

const ApplicantOverview: React.FC<ApplicantOverviewProps> = ({ booking }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div className={bookstyle.visitContainer}>
        <div className={bookstyle.headerRow}>
          <div>
            <h3 className={bookstyle.title}>Primary Address</h3>
          </div>
        </div>
        <div className={bookstyle.infoGrid}>
          <div
            className={`${bookstyle.infoItem} ${bookstyle.infoItemChannelPartner}`}
          >
            <p className={bookstyle.cardlabel}>
              <FaAddressCard
                className={`${bookstyle.iconbg} ${bookstyle.iconChannelPartner}`}
              />{" "}
              Address Line 1
            </p>
            <p className={bookstyle.cardvalue}>
              {booking?.addressLine1 ?? "N/A"}
            </p>
          </div>

          <div
            className={`${bookstyle.infoItem} ${bookstyle.infoItemLeadReceived}`}
          >
            <p className={bookstyle.cardlabel}>
              <FaAddressCard
                className={`${bookstyle.iconbg} ${bookstyle.iconLeadReceived}`}
              />{" "}
              Address Line 2
            </p>
            <p className={bookstyle.cardvalue}>
              {booking?.addressLine2 ?? "N/A"}
            </p>
          </div>
        </div>
        <div className={bookstyle.infoGrid}>
          <div
            className={`${bookstyle.infoItem} ${bookstyle.infoItemBookingDate}`}
          >
            <p className={bookstyle.cardlabel}>
              <FaCity
                className={`${bookstyle.iconbg} ${bookstyle.iconBookingDate}`}
              />{" "}
              City
            </p>
            <p className={bookstyle.cardvalue}>{booking?.city ?? "N/A"}</p>
          </div>

          <div
            className={`${bookstyle.infoItem} ${bookstyle.infoItemRevisitDate}`}
          >
            <p className={bookstyle.cardlabel}>
              <HiOutlineClipboardDocumentList
                className={`${bookstyle.iconbg} ${bookstyle.iconRevisitDate}`}
              />{" "}
              Pincode
            </p>
            <p className={bookstyle.cardvalue}>{booking?.pincode ?? "N/A"}</p>
          </div>

          <div
            className={`${bookstyle.infoItem} ${bookstyle.infoItemTeamLeader}`}
          >
            <p className={bookstyle.cardlabel}>
              <Building
                className={`${bookstyle.iconbg} ${bookstyle.iconTeamLeader}`}
              />{" "}
              No. of Applicants
            </p>
            <p className={bookstyle.cardvalue}>
              {booking?.applicants?.length.toString() ?? "N/A"}
            </p>
          </div>

          <div
            className={`${bookstyle.infoItem} ${bookstyle.infoItemRevisitDate}`}
          >
            <p className={bookstyle.cardlabel}>
              <Building2
                className={`${bookstyle.iconbg} ${bookstyle.iconRevisitDate}`}
              />{" "}
              KYC Received
            </p>
            <p className={bookstyle.cardvalue}>
              {booking?.preRegistrationCheckList?.kyc?.recieved ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.cardrow}>
        {booking?.applicants && booking.applicants.length > 0 ? (
          booking.applicants.map((applicant, index) => (
            <div key={index} className={styles.detailsCard}>
              <div className={styles.cardTitle}>
                <User className={styles.titleIcon} />
                Applicant {index + 1}
              </div>

              <div className={styles.cardContent}>
                <div className={styles.infoGrid}>
                  {/* Full Name */}
                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>
                      <IoPersonSharp size={11} color="#4a84ff" /> Full Name
                    </label>
                    <p className={styles.infoValue}>
                      {`${(applicant.prefix ?? "").trim()} ${
                        applicant.firstName ?? ""
                      } ${applicant.lastName ?? ""}`}
                    </p>
                  </div>

                  {/* Phone Number */}
                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>
                      <FaPhoneAlt size={11} color="#4a84ff" /> Phone Number
                    </label>
                    <p className={styles.infoValue}>
                      {`${applicant.countryCode ?? ""} ${
                        applicant.phoneNumber ?? ""
                      }`}
                    </p>
                  </div>

                  {/* Email */}
                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>
                      <MdEmail size={11} color="#4a84ff" /> Email
                    </label>
                    <p className={styles.infoValue}>
                      {applicant.email ?? "N/A"}
                    </p>
                  </div>

                  {/* Address */}
                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>
                      <FaAddressCard size={11} color="#4a84ff" /> Address
                    </label>
                    <p className={styles.infoValue}>
                      {`${applicant.addressLine1 ?? ""} ${
                        applicant.addressLine2 ?? ""
                      } ${applicant.city ?? ""} ${applicant.pincode ?? ""}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Applicants Found</p>
        )}
      </div>
    </div>
  );
};

export default ApplicantOverview;
