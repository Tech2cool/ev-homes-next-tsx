"use client";
import React, { useState } from "react";
import styles from "./bookingOverview.module.css";
import BookingOverviewDialogue from "./BookingOverviewDialog";
import { Building, Calendar, User } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { BsFillBuildingFill } from "react-icons/bs";
import { PiBuildingApartmentBold } from "react-icons/pi";

interface BookingOverviewProps {
  lead?: Lead | null;
}

const BookingOverview: React.FC<BookingOverviewProps> = ({ lead }) => {
  const [visible, setVisible] = useState(false);
  const [bookingdetails, setbookingdetails] = useState(false);

  const booking = lead?.bookingRef;


  const handlePdfDownload = () => {
    // PDF download logic would go here
    console.log("Downloading booking PDF...");
    alert("Booking PDF download initiated!");
  };

  const handleCostSheet = () => {
    // Cost sheet logic would go here
    console.log("Opening cost sheet...");
    alert("Cost sheet opened!");
  };
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
          //  <div className={styles.detailsContent}>
          //    <div className={styles.cardrow}>
          //       <div className={styles.detailsCard}>
          //         <div className={styles.cardTitle}>
          //           <User className={styles.titleIcon} />
          //           Project Information
          //         </div>
          //         <div className={styles.cardContent}>
          //           <div className={styles.infoGrid}>
          //             <div className={styles.infoItem}>
          //               <label className={styles.infoLabel}>
          //                 <IoPersonSharp size={11} color="#4a84ff" /> Project Name
          //               </label>
          //               <p className={styles.infoValue}>
          //                 {booking?.project?.name ?? ""} 
          //               </p>
          //             </div>

          //             {/* Phone with Call Button */}
          //             <div className={styles.infoItem}>
          //               <label className={styles.infoLabel}>
          //                 <FaPhoneAlt size={11} color="#4a84ff" />
          //                 Floor
          //               </label>
          //               <p className={styles.infoValue}>


          //                 {booking?.floor ?? "NA"}
          //               </p>
          //             </div>
          //             <div className={styles.infoItem}>
          //               <label className={styles.infoLabel}>
          //                 <MdEmail size={11} color="#4a84ff" />
          //                 Building
          //               </label>
          //               <p className={styles.infoValue}>{booking?.buildingNo ?? "NA"}</p>
          //             </div>

          //             <div className={styles.infoItem}>
          //               <label className={styles.infoLabel}>
          //                 <FaPhoneAlt size={11} color="#4a84ff" />
          //                 Unit Number
          //               </label>
          //               <div className={styles.phoneContainer}>
          //                 <p className={styles.infoValue}>

          //                   {booking?.unitNo??""}
          //                 </p>
          //               </div>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //       {/* Project Information */}
          //       <div className={styles.detailsCard}>
          //         <div className={styles.cardTitle}>
          //           <Building className={styles.titleIcon} />
          //           Booking Information
          //         </div>
          //         <div className={styles.cardContent}>
          //           <div className={styles.infoGrid}>
          //             <div className={styles.infoItem}>
          //               <label className={styles.infoLabel}>
          //                 <IoIosPerson size={12} color="#4a84ff" />
          //                Configuration
          //               </label>
          //               <p className={styles.infoValue}>
          //                 {lead?.propertyType ?? "NA"}
          //               </p>
          //             </div>
          //             <div className={styles.infoItem}>
          //               <label className={styles.infoLabel}>
          //                 <IoIosPerson size={12} color="#4a84ff" />
          //                 Channel Partner
          //               </label>
          //               <p className={styles.infoValue}>
          //                 {lead?.channelPartner?.firmName ?? ""}
          //               </p>
          //             </div>
          //             <div className={styles.infoItem} style={{ paddingLeft: "5px" }}>
          //               <label className={styles.infoLabel}>
          //                 <PiBuildingApartmentBold size={14} color="#4a84ff" />
          //                 Apartment Choices
          //               </label>
          //               <div className={styles.choicesList}>
          //                 {lead?.requirement?.map((choice: any, index: number) => (
          //                   <span key={choice} className={styles.choiceBadge}>
          //                     {choice}
          //                   </span>
          //                 ))}
          //               </div>
          //             </div>
          //             <div className={styles.infoItem}>
          //               <label className={styles.infoLabel}>
          //                 <BsFillBuildingFill size={12} color="#4a84ff" />
          //                 Projects
          //               </label>
          //               <div className={styles.projectsList}>
          //                 {lead?.project?.map((project: any, index: number) => (
          //                   <span key={index} className={styles.projectBadge}>
          //                     {project?.name ?? ""}
          //                   </span>
          //                 ))}
          //               </div>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     </div>

          //     <div className={styles.cardrow}>
          //       {/* Lead Information */}
          //       <div className={styles.detailsCard}>
          //         <div className={styles.cardTitle}>
          //           <Calendar className={styles.titleIcon} />
          //           Work Information
          //         </div>
          //         <div className={styles.cardContent}>
          //           <div className={styles.infoGridwork}>
          //             <div className={styles.infoItem}>
          //               <label className={styles.infoLabel}>
          //                 {" "}
          //                 <Calendar size={14} color="#4a84ff" />
          //                 Occupation
          //               </label>
          //               <p className={styles.infoValue}>
          //                 {lead?.occupation == "" || lead?.occupation == null
          //                   ? "NA"
          //                   : lead?.occupation}
          //               </p>
          //             </div>
          //             <div className={styles.infoItem}>
          //               <label className={styles.infoLabel}>
          //                 {" "}
          //                 <Calendar size={14} color="#4a84ff" />
          //                 Remark
          //               </label>
          //               <p className={styles.infoValue}>
          //                 {" "}
          //                 {lead?.additionLinRemark ?? "NA"}
          //               </p>
          //             </div>
          //             <div
          //               className={styles.infoItem}
          //               style={{ flexDirection: "column" }}
          //             >
          //               {lead?.linkedIn && lead.linkedIn !== "" && (
          //                 <div className={styles.buttonGroup}>
          //                   {lead?.linkedIn && (
          //                     <button
          //                       className={`${styles.infoButton} ${styles.leadBtn}`}
          //                       onClick={() =>
          //                         window.open(
          //                           lead.linkedIn || "https://evhomes.tech/",
          //                           "_blank"
          //                         )
          //                       }
          //                     >
          //                       <span>🔗 lead Profile</span>
          //                     </button>
          //                   )}

          //                   {lead?.uploadedLinkedIn && (
          //                     <button
          //                       className={`${styles.infoButton} ${styles.leadBtn}`}
          //                       onClick={() =>
          //                         window.open(
          //                           lead.uploadedLinkedIn || "https://evhomes.tech/",
          //                           "_blank"
          //                         )
          //                       }
          //                     >
          //                       <span>📄 View Document</span>
          //                     </button>
          //                   )}
          //                 </div>
          //               )}
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //  </div>
          <div className={styles.bookingPage}>
            <div className={styles.bookingContainer}>

              {/* Header */}
              <header className={styles.bookingHeader}>
                <div className={styles.logo}>
                  <Building /> Booking Overview
                </div>

                <div className={styles.headerActions}>
                  <button className={`${styles.btn} ${styles.btnPdf}`} onClick={handlePdfDownload}>
                    <i className="fas fa-file-pdf"></i> Booking PDF
                  </button>
                  {lead?.bookingRef?.costSheetUrl ? (
                    <button
                      className={`${styles.btn} ${styles.btnCost}`}
                    
                    >
                      <i className="fas fa-file-invoice-dollar"></i> Cost Sheet
                    </button>
                  ) : null}


                </div>
              </header>

              {/* Content */}
              <div className={styles.content}>

                {/* LEFT COLUMN */}
                <div className={styles.leftColumn}>

                  <div className={styles.card}>
                    <h2 className={styles.cardTitle}>
                      <i className="fas fa-home"></i> Project & Unit Details
                    </h2>

                    <div className={styles.infoGrid}>

                      <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Project Name</div>
                        <div className={styles.infoValue}>{booking?.project?.name ?? "NA"}</div>
                      </div>

                      <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Floor</div>
                        <div className={styles.infoValue}>{booking?.floor ?? "NA"}</div>
                      </div>

                      <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Building</div>
                        <div className={styles.infoValue}>{booking?.buildingNo ?? "NA"}</div>
                      </div>

                      <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Unit Number</div>
                        <div className={styles.infoValue}>{booking?.unitNo ?? "NA"}</div>
                      </div>

                      <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Configuration</div>
                        <div className={styles.infoValue}>{lead?.propertyType ?? "NA"}</div>
                      </div>

                      <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Apartment Choices</div>
                        <div className={styles.choicesList}>
                          {lead?.requirement?.map((choice, i) => (
                            <span key={i} className={styles.choiceBadge}>{choice}</span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Closing Manager</div>
                        <div className={styles.infoValue}>{`${lead?.teamLeader?.firstName ?? ""} ${lead?.teamLeader?.lastName ?? ""}`}</div>
                      </div>

                      <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Date</div>
                        <div className={styles.infoValue}>{lead?.bookingRef?.date
                          ? new Date(lead.bookingRef.date).toLocaleDateString("en-IN")
                          : "NA"}</div>
                      </div>

                      <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Parking</div>
                        <div className={styles.infoValue}>
                          {Array.isArray(lead?.bookingRef?.parking)
                            ? lead.bookingRef.parking.map(p => p).join(", ")
                            : lead?.bookingRef?.parking || "NA"}
                        </div>

                      </div>

                      <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Carpet Area</div>
                        <div className={styles.infoValue}>{lead?.bookingRef?.carpetArea ?? ""}</div>
                      </div>

                      <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Assigned To</div>
                        <div className={styles.infoValue}>
                          {Array.isArray(lead?.bookingRef?.postSaleAssignTo)
                            ? lead.bookingRef.postSaleAssignTo.map(emp => emp.firstName).join(", ")
                            : lead?.bookingRef?.postSaleAssignTo || "NA"}
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

                <div className={styles.rightColumn}>

                  {/* Applicant Details */}
                  <div className={styles.card}>
                    <h2 className={styles.cardTitle}>
                      <i className="fas fa-users"></i> Applicant Details
                    </h2>

                    <div className={styles.applicantList}>
                      {lead?.bookingRef?.applicants?.length ? (
                        lead.bookingRef.applicants.map((app, i) => (
                          <div className={styles.applicantCard}>

                            <div className={styles.applicantHeader}>
                              <div className={styles.applicantName}>{`${app.firstName || "NA"} ${app.lastName || "NA"}`}</div>

                            </div>

                            <div className={styles.applicantContact}>
                              <div className={styles.contactItem}>📞 {app.phoneNumber || "NA"}</div>
                              <div className={styles.contactItem}>✉️ {app.email || "NA"}</div>
                            </div>

                            <div className={styles.infoItem} style={{ marginTop: "15px" }}>
                              <div className={styles.infoLabel}>Address</div>
                              <div className={styles.infoValue}>{app.address || "NA"}</div>
                            </div>

                          </div>
                        ))
                      ) : (
                        <div className={styles.noData}>No applicants found</div>
                      )}
                    </div>


                  </div>



                  <div className={styles.card}>
                    <h2 className={styles.cardTitle}>
                      <Calendar /> Work Information
                    </h2>

                    <div className={styles.infoGrid}>
                      <div className={styles.infoItem}>
                        <label className={styles.infoLabel}>Occupation</label>
                        <p className={styles.infoValue}>{lead?.occupation || "NA"}</p>
                      </div>

                      <div className={styles.infoItem}>
                        <label className={styles.infoLabel}>Remark</label>
                        <p className={styles.infoValue}>{lead?.additionLinRemark ?? "NA"}</p>
                      </div>

                      {lead?.linkedIn && (
                        <div className={styles.infoItem}>
                          <button
                            className={`${styles.infoButton}`}
                            onClick={() => window.open(lead.linkedIn, "_blank")}
                          >
                            🔗 LinkedIn Profile
                          </button>

                          {lead?.uploadedLinkedIn && (
                            <button
                              className={`${styles.infoButton}`}
                              onClick={() => window.open(lead.uploadedLinkedIn, "_blank")}
                            >
                              📄 View Document
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
