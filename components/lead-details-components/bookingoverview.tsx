"use client";
import React, { useState } from "react";
import styles from "@/app/super-admin/lead-details/lead-details.module.css";
import BookingOverviewDialogue from "./BookingOverviewDialog";
import { Building, Calendar, User } from "lucide-react";
import {  IoPersonSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import {  MdEmail } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { BsFillBuildingFill } from "react-icons/bs";
import { PiBuildingApartmentBold } from "react-icons/pi";
const visit = {
  prefix: "Mr.",
  firstName: "Rahul",
  lastName: "Sharma",
  countryCode: "+91",
  phoneNumber: "9876543210",
  altPhoneNumber: "9123456789",
  email: "rahulsharma@gmail.com",
  propertyType: "2BHK",
  channelPartner: { firmName: "Sunrise Realtors" },
  requirement: ["2BHK", "3BHK", "Penthouse"],
  project: [
    { name: "Green Valley Residency" },
    { name: "Ocean View Towers" }
  ],
  occupation: "Software Engineer",
  additionLinRemark: "Client is interested in sea-facing units.",
  linkedIn: "https://linkedin.com/in/rahulsharma",
  uploadedLinkedIn: "https://evhomes.tech/sample-doc.pdf",
  _id: "12345"
};


const BookingOverview = () => {
  const [visible, setVisible] = useState(false);
  const [bookingdetails, setbookingdetails] = useState(false);

  return (

    <>
      {
        !bookingdetails ? (
          // <div className={styles.bosec} onClick={() => setbookingdetails(true)}>
          //   <div className={styles.boctn}>
          //     <div className={styles.bonamerow}>
          //       <div className={styles.boname}>Deepak Test</div>
          //       <div className={`${styles.bostatus} ${styles.pending}`}>Pending</div>
          //     </div>

          //     <div className={styles.boid}>EST/25-26/175</div>

          //     <div className={styles.bonbtnctn}>
          //       <div className={styles.bocull}>
          //         <div className={styles.bolable}>Final Price</div>
          //         <div className={styles.bobtn}>₹ 36,40,000</div>
          //       </div>

          //       <div className={styles.bocull}>
          //         <div className={styles.bolable}>Expected</div>
          //         <div className={styles.bobtn}>₹ 36,40,000</div>
          //       </div>
          //     </div>
          //   </div>
          // </div>
         <div className={styles.detailsContent}>
           <div className={styles.cardrow}>
              <div className={styles.detailsCard}>
                <div className={styles.cardTitle}>
                  <User className={styles.titleIcon} />
                  Personal Information
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <label className={styles.infoLabel}>
                        <IoPersonSharp size={11} color="#4a84ff" /> Full Name
                      </label>
                      <p className={styles.infoValue}>
                        {visit?.prefix ?? ""} {visit?.firstName ?? ""}{" "}
                        {visit?.lastName ?? ""}
                      </p>
                    </div>

                    {/* Phone with Call Button */}
                    <div className={styles.infoItem}>
                      <label className={styles.infoLabel}>
                        <FaPhoneAlt size={11} color="#4a84ff" />
                        Phone Number
                      </label>
                      <p className={styles.infoValue}>


                        {visit?.phoneNumber ?? "NA"}
                      </p>
                    </div>
                    <div className={styles.infoItem}>
                      <label className={styles.infoLabel}>
                        <MdEmail size={11} color="#4a84ff" />
                        Email
                      </label>
                      <p className={styles.infoValue}>{visit.email ?? "NA"}</p>
                    </div>

                    <div className={styles.infoItem}>
                      <label className={styles.infoLabel}>
                        <FaPhoneAlt size={11} color="#4a84ff" />
                        Alt Phone
                      </label>
                      <div className={styles.phoneContainer}>
                        <p className={styles.infoValue}>

                          {visit.countryCode} {visit.altPhoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Project Information */}
              <div className={styles.detailsCard}>
                <div className={styles.cardTitle}>
                  <Building className={styles.titleIcon} />
                  Lead Information
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <label className={styles.infoLabel}>
                        <IoIosPerson size={12} color="#4a84ff" />
                        Property Type
                      </label>
                      <p className={styles.infoValue}>
                        {visit?.propertyType ?? "NA"}
                      </p>
                    </div>
                    <div className={styles.infoItem}>
                      <label className={styles.infoLabel}>
                        <IoIosPerson size={12} color="#4a84ff" />
                        Channel Partner
                      </label>
                      <p className={styles.infoValue}>
                        {visit?.channelPartner?.firmName ?? ""}
                      </p>
                    </div>
                    <div className={styles.infoItem} style={{ paddingLeft: "5px" }}>
                      <label className={styles.infoLabel}>
                        <PiBuildingApartmentBold size={14} color="#4a84ff" />
                        Apartment Choices
                      </label>
                      <div className={styles.choicesList}>
                        {visit.requirement?.map((choice: any, index: number) => (
                          <span key={choice} className={styles.choiceBadge}>
                            {choice}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <label className={styles.infoLabel}>
                        <BsFillBuildingFill size={12} color="#4a84ff" />
                        Projects
                      </label>
                      <div className={styles.projectsList}>
                        {visit.project?.map((project: any, index: number) => (
                          <span key={index} className={styles.projectBadge}>
                            {project?.name ?? ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.cardrow}>
              {/* Lead Information */}
              <div className={styles.detailsCard}>
                <div className={styles.cardTitle}>
                  <Calendar className={styles.titleIcon} />
                  Work Information
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.infoGridwork}>
                    <div className={styles.infoItem}>
                      <label className={styles.infoLabel}>
                        {" "}
                        <Calendar size={14} color="#4a84ff" />
                        Occupation
                      </label>
                      <p className={styles.infoValue}>
                        {visit?.occupation == "" || visit?.occupation == null
                          ? "NA"
                          : visit?.occupation}
                      </p>
                    </div>
                    <div className={styles.infoItem}>
                      <label className={styles.infoLabel}>
                        {" "}
                        <Calendar size={14} color="#4a84ff" />
                        Remark
                      </label>
                      <p className={styles.infoValue}>
                        {" "}
                        {visit?.additionLinRemark ?? "NA"}
                      </p>
                    </div>
                    <div
                      className={styles.infoItem}
                      style={{ flexDirection: "column" }}
                    >
                      {visit?.linkedIn && visit.linkedIn !== "" && (
                        <div className={styles.buttonGroup}>
                          {visit?.linkedIn && (
                            <button
                              className={`${styles.infoButton} ${styles.visitBtn}`}
                              onClick={() =>
                                window.open(
                                  visit.linkedIn || "https://evhomes.tech/",
                                  "_blank"
                                )
                              }
                            >
                              <span>🔗 Visit Profile</span>
                            </button>
                          )}

                          {visit?.uploadedLinkedIn && (
                            <button
                              className={`${styles.infoButton} ${styles.visitBtn}`}
                              onClick={() =>
                                window.open(
                                  visit.uploadedLinkedIn || "https://evhomes.tech/",
                                  "_blank"
                                )
                              }
                            >
                              <span>📄 View Document</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
         </div>
           
          

        ) :
          <BookingOverviewDialogue onClose={() => setVisible(false)} />
      }






    </>
  );
};

export default BookingOverview;
