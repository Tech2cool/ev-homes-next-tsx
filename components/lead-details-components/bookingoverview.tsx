"use client";
import React, { useState } from "react";
import styles from "./bookingOverview.module.css";
import BookingOverviewDialogue from "./BookingOverviewDialog";
import { Building, Calendar, User } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdPhoneInTalk } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { BsFillBuildingFill } from "react-icons/bs";
import { PiBuildingApartmentBold } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";

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
          <div className={styles.mainWrapper}>
            <div className={styles.header}>
              <div className={styles.titleArea}>
                <Building className={styles.icon} />
                <div className={styles.title}>Booking Overview</div>
              </div>

              <div className={styles.actions}>
                <button onClick={handlePdfDownload} className={styles.actionBtnPrimary}>
                  <i className="fas fa-file-pdf"></i>Booking PDF
                </button>

                {lead?.bookingRef?.costSheetUrl && (
                  <button
                    className={styles.actionBtnSecondary}
                  // onClick={() => window.open(lead.bookingRef.costSheetUrl, "_blank")}
                  >
                    <i className="fas fa-file-invoice"></i> Cost Sheet
                  </button>
                )}
              </div>
            </div>

            {/* Two Column Layout */}
            <div className={styles.grid}>

              {/* LEFT */}
              <div>
                <div className={styles.card}>
                  <h3 className={styles.cardHeader}>Project Details</h3>

                  <div className={styles.detailGrid}>
                    {[
                      ["Project Name", booking?.project?.name],
                      ["Building", booking?.buildingNo],
                      ["Floor", booking?.floor],
                      ["Unit Number", booking?.unitNo],
                      ["Carpet Area", lead?.bookingRef?.carpetArea],
                    ].map(([label, value], i) => (
                      <div key={i} className={styles.detailItem}>
                        <p className={styles.label}>{label}</p>
                        <p className={styles.value}>{value || "NA"}</p>
                      </div>
                    ))}
                    <div className={styles.detailItemFull}>
                      <p className={styles.label}>Apartment Choices</p>
                      <div className={styles.badgesRow}>
                        <span className={styles.badge}>{booking?.requirement ?? "NA"}</span>

                      </div>
                    </div>
                  </div>



                </div>
              </div>
              <div>
                <div className={styles.card}>
                  <h3 className={styles.cardHeader}>Booking Details</h3>

                  <div className={styles.detailGrid}>
                    {[
                      ["Booking Date", booking?.date?.toString().split("T")[0]],
                      ["Configuration", lead?.propertyType],
                      ["Parking",
                        Array.isArray(booking?.parking)
                          ? booking.parking
                            .map(p => {
                              if (typeof p === "string" || typeof p === "number") return p;
                              const floor = p.floor ?? "";
                              const num = p.number ?? "";
                              return [floor, num].filter(Boolean).join(" ");
                            })
                            .join(", ")
                          : booking?.parking ?? "NA"
                      ],


                      ["Closing Manager", booking?.closingManager?.firstName + " " + booking?.closingManager?.lastName],



                    ].map(([label, value], i) => (
                      <div key={i} className={styles.detailItem}>
                        <p className={styles.label}>{label}</p>
                        <p className={styles.value}>{value || "NA"}</p>
                      </div>
                    ))}

                  </div>
                  <div className={styles.assignto}>
                    <p className={styles.label}>Asign To</p>
                    <div className={styles.badgesRow}>
                      {Array.isArray(booking?.postSaleAssignTo)
                        ? booking.postSaleAssignTo
                          .map(emp => `${emp.firstName ?? ""} ${emp.lastName ?? ""}`.trim())
                          .join(", ")
                        : booking?.postSaleAssignTo ?? "NA"}
                    </div>
                  </div>


                </div>
              </div>

            </div>
            {/* RIGHT */}
            <div>
              <div className={styles.card}>
                <h3 className={styles.cardHeader}>Applicants</h3>

                <div className={styles.applicantsGrid}>
                  {lead?.bookingRef?.applicants?.map((app, i) => (
                    <div className={styles.appCard} key={i}>
                      <p className={styles.appName}>{app.firstName} {app.lastName}</p>

                      <div className={styles.appDetails}>
                        <div className={styles.phonedesign}><MdPhoneInTalk className={styles.Aapplianticon} /> {app.phoneNumber}</div>
                        {app.email && (
                          <div className={styles.phonedesign}><MdEmail className={styles.Aapplianticon} /> {app.email}</div>
                        )}

                        {app.address && (
                          <p className={styles.phonedesign}>
                            <FaLocationDot className={styles.Aapplianticon} />
                            {app.address}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>



            </div>
            <div className={styles.card}>
              <h3 className={styles.cardHeader}>Work Information</h3>

              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <p className={styles.label}>Occupation</p>
                  <p className={styles.value}>{lead?.occupation || "NA"}</p>
                </div>

                <div className={styles.detailItem}>
                  <p className={styles.label}>Remark</p>
                  <p className={styles.value}>{lead?.additionLinRemark || "NA"}</p>
                </div>

                {lead?.linkedIn && (
                  <button
                    className={styles.linkBtn}
                    onClick={() => window.open(lead.linkedIn, "_blank")}
                  >
                    🔗 View LinkedIn
                  </button>
                )}

                {lead?.uploadedLinkedIn && (
                  <button
                    className={styles.linkBtn}
                    onClick={() => window.open(lead.uploadedLinkedIn, "_blank")}
                  >
                    📄 Document
                  </button>
                )}
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
