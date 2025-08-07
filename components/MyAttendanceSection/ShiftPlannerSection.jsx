import React, { useRef, useState } from "react";
import styles from "./leavesection.module.css";
import { FaBagShopping, FaUserShield } from "react-icons/fa6";
import {
  MdOutlineFeedback,
  MdOutlineCallToAction,
  MdHolidayVillage,
} from "react-icons/md";
import { FaCalendarDay } from "react-icons/fa";
import ShiftPlannerForm from "./Forms/ShiftPlannerForm";
import { useClickOutside } from "./useClickOutside";
import Image from "next/image";
import { dateFormatOnly } from "@/hooks/useDateFormat";

// ✅ Dummy data to simulate backend
const dummyShiftPlannerData = [
  {
    appliedDate: "2025-04-25",
    requestedShift: { shiftName: "11:00am to 7:00pm" },
    requestedShiftDate: "2025-04-28",
    reason: "Personal reason",
    requestStatus: "pending",
  },
  {
    appliedDate: "2025-03-12",
    requestedShift: { shiftName: "9:00am to 5:00pm" },
    requestedShiftDate: "2025-03-15",
    reason: "Internal exam",
    requestStatus: "approved",
  },
  {
    appliedDate: "2025-02-02",
    requestedShift: { shiftName: "10:00am to 6:00pm" },
    requestedShiftDate: "2025-02-05",
    reason: "Family issue",
    requestStatus: "rejected",
  },
];

const ShiftPlannerSection = () => {
  const modalRef = useRef(null);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useClickOutside({
    refs: [modalRef],
    handler: () => setIsModalOpen(false),
    active: isModalOpen,
  });

  const filteredData =
    filter === "All"
      ? dummyShiftPlannerData
      : dummyShiftPlannerData.filter(
          (shift) => shift.requestStatus === filter.toLowerCase()
        );

  return (
    <div className={styles.maincontainer}>
      <div className={styles.leaveSection}>
        {/* Filter Cards */}
        <div className={styles.statsWithProgress}>
          <div className={styles.leavecontainer}>
            <div className={styles.leavecard} onClick={() => setFilter("All")}>
              <div className={styles.request}>Requested</div>
              <div className={styles.numberleave}>{dummyShiftPlannerData.length}</div>
            </div>
            <div className={styles.leavecard} onClick={() => setFilter("approved")}>
              <div className={styles.aproved}>Approved</div>
              <div className={styles.numberleave}>
                {dummyShiftPlannerData.filter(d => d.requestStatus === "approved").length}
              </div>
            </div>
            <div className={styles.leavecard} onClick={() => setFilter("rejected")}>
              <div className={styles.rejected}>Rejected</div>
              <div className={styles.numberleave}>
                {dummyShiftPlannerData.filter(d => d.requestStatus === "rejected").length}
              </div>
            </div>
            <div className={styles.leavecard} onClick={() => setFilter("pending")}>
              <div className={styles.pending}>Pending</div>
              <div className={styles.numberleave}>
                {dummyShiftPlannerData.filter(d => d.requestStatus === "pending").length}
              </div>
            </div>
          </div>
        </div>

        {/* Table and Mobile View */}
        <div className={styles.tableContainer}>
          <div className={styles.topBar}>
            <div className={styles.applyButton} onClick={() => setIsModalOpen(true)}>
              <FaUserShield className={styles.applyIcon} /> Request Shift
            </div>
          </div>

          {/* Desktop Table */}
          <div className={styles.tableDesktop}>
            {filteredData.length > 0 ? (
              <table className={styles.leaveTable}>
                <thead>
                  <tr>
                     <th>
                      <span className={styles.iconText}>
                        <FaBagShopping /> <span> Applied On</span>
                      </span>
                    </th>
                    <th>
                      <span className={styles.iconText}>
                        <FaBagShopping /> <span> Requested Shift</span>
                      </span>
                    </th>
                   <th>
                      <span className={styles.iconText}>
                        <FaCalendarDay /> <span> Shift Request Date</span>
                      </span>
                    </th>
                    <th>
                      <span className={styles.iconText}>
                        <MdOutlineFeedback /> <span> Reason</span>
                      </span>
                    </th>
                     <th>
                      <span className={styles.iconText}>
                        <MdOutlineCallToAction /> <span> Action</span>
                      </span>
                    </th>
                  
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((shift, index) => (
                    <tr key={index}>
                      <td>{dateFormatOnly(shift.appliedDate)}</td>
                      <td>{shift.requestedShift.shiftName}</td>
                      <td>{dateFormatOnly(shift.requestedShiftDate)}</td>
                      <td>{shift.reason}</td>
                      <td>
                        <span
                          className={
                            shift.requestStatus === "approved"
                              ? styles.statusApproved
                              : shift.requestStatus === "rejected"
                              ? styles.statusRejected
                              : styles.statusPending
                          }
                        >
                          {shift.requestStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.noDataContainer}>
                <Image
                  src="/images/nodata.png"
                  alt="No shift data"
                  className={styles.noDataImage}
                  width={300}
                  height={300}
                  priority
                />
                <div className={styles.noDataText}>No Shift Planner Applications.</div>
              </div>
            )}
          </div>

          {/* Mobile Cards */}
          <div className={styles.cardsMobile}>
            {filteredData.length > 0 ? (
              filteredData.map((shift, index) => (
                <div className={styles.leaveCardMobile} key={index}>
                  <div className={styles.firstSectMobile}>
                    <div><strong>Applied On:</strong> {dateFormatOnly(shift.appliedDate)}</div>
                    <div>
                      <span
                        className={
                          shift.requestStatus === "approved"
                            ? styles.statusApproved
                            : shift.requestStatus === "rejected"
                            ? styles.statusRejected
                            : styles.statusPending
                        }
                      >
                        {shift.requestStatus}
                      </span>
                    </div>
                  </div>
                  <div><strong>Shift Request Date:</strong> {dateFormatOnly(shift.requestedShiftDate)}</div>
                  <div><strong>Requested Shift:</strong> {shift.requestedShift.shiftName}</div>
                  <div><strong>Reason:</strong> {shift.reason}</div>
                </div>
              ))
            ) : (
              <div className={styles.noDataContainer}>
                <Image
                  src="/images/nodata.png"
                  alt="No shift data"
                  className={styles.noDataImage}
                  width={300}
                  height={300}
                  priority
                />
                <div className={styles.noDataText}>No Shift Planner Applications.</div>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                x
              </button>
              <ShiftPlannerForm oncencel={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftPlannerSection;
