import React, { useRef, useState } from "react";
import styles from "./leavesection.module.css";
import { MdOutlineFeedback, MdOutlineCallToAction } from "react-icons/md";
import {
  FaCalendarCheck,
  FaCalendarDay,
  FaClock,
  FaTypo3,
} from "react-icons/fa";
import RegularizationFrom from "./Forms/RegularizationForm";
import { useClickOutside } from "./useClickOutside";
import Image from "next/image";
import { dateFormatOnly, timeFormatOnly } from "@/hooks/useDateFormat";

const dummyRegularizationData = [
  {
    appliedOn: "2025-04-25",
    regularizationDate: "2025-04-06",
    checkInTime: null,
    checkOutTime: null,
    type: "WeekOff",
    reason: "Forgot to apply for week off",
    regularizationStatus: "pending",
  },
  {
    appliedOn: "2025-04-22",
    regularizationDate: "2025-04-01",
    checkInTime: "2025-04-01T09:00:00Z",
    checkOutTime: "2025-04-01T18:00:00Z",
    type: "Half Day",
    reason: "System issue",
    regularizationStatus: "approved",
  },
  {
    appliedOn: "2025-04-10",
    regularizationDate: "2025-03-28",
    checkInTime: "2025-03-28T10:00:00Z",
    checkOutTime: "2025-03-28T16:00:00Z",
    type: "Full Day",
    reason: "Meeting overran",
    regularizationStatus: "rejected",
  },
];

const Regularization = () => {
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
      ? dummyRegularizationData
      : dummyRegularizationData.filter(
          (item) => item.regularizationStatus === filter.toLowerCase()
        );

  return (
    <div className={styles.maincontainer}>
      <div className={styles.leaveSection}>
        {/* Filter Cards */}
        <div className={styles.statsWithProgress}>
          <div className={styles.leavecontainer}>
            <div className={styles.leavecard} onClick={() => setFilter("All")}>
              <div className={styles.request}>Requested</div>
              <div className={styles.numberleave}>{dummyRegularizationData.length}</div>
            </div>
            <div className={styles.leavecard} onClick={() => setFilter("approved")}>
              <div className={styles.aproved}>Approved</div>
              <div className={styles.numberleave}>
                {dummyRegularizationData.filter((d) => d.regularizationStatus === "approved").length}
              </div>
            </div>
            <div className={styles.leavecard} onClick={() => setFilter("rejected")}>
              <div className={styles.rejected}>Rejected</div>
              <div className={styles.numberleave}>
                {dummyRegularizationData.filter((d) => d.regularizationStatus === "rejected").length}
              </div>
            </div>
            <div className={styles.leavecard} onClick={() => setFilter("pending")}>
              <div className={styles.pending}>Pending</div>
              <div className={styles.numberleave}>
                {dummyRegularizationData.filter((d) => d.regularizationStatus === "pending").length}
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className={styles.tableContainer}>
          <div className={styles.topBar}>
            <div className={styles.applyButton} onClick={() => setIsModalOpen(true)}>
              <FaClock className={styles.applyIcon} /> Apply Regularization
            </div>
          </div>

          {/* Desktop Table View */}
          <div className={styles.tableDesktop}>
            {filteredData.length > 0 ? (
              <table className={styles.leaveTable}>
                <thead>
                 
                  <tr>
                    <th>
                      <span className={styles.iconText}>
                        <FaCalendarCheck /> <span>Applied On</span>
                      </span>
                    </th>
                    <th>
                      <span className={styles.iconText}>
                        <FaCalendarDay /> <span>Regularize Date</span>
                      </span>
                    </th>
                    <th>
                      <span className={styles.iconText}>
                        <FaClock /> <span> Check In</span>
                      </span>
                    </th>
                    <th>
                      <span className={styles.iconText}>
                        <FaClock /> <span>Check Out</span>
                      </span>
                    </th>
                    <th>
                      <span className={styles.iconText}>
                        <FaTypo3 /> <span>Type</span>
                      </span>
                    </th>
                    <th>
                      <span className={styles.iconText}>
                        <MdOutlineFeedback /> <span>Reason</span>
                      </span>
                    </th>
                    <th>
                      <span className={styles.iconText}>
                        <MdOutlineCallToAction /> <span>Action</span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{dateFormatOnly(item.appliedOn)}</td>
                      <td>{dateFormatOnly(item.regularizationDate)}</td>
                      <td>{timeFormatOnly(item.checkInTime)}</td>
                      <td>{timeFormatOnly(item.checkOutTime)}</td>
                      <td>{item.type}</td>
                      <td>{item.reason}</td>
                      <td>
                        <span
                          className={
                            item.regularizationStatus === "approved"
                              ? styles.statusApproved
                              : item.regularizationStatus === "rejected"
                              ? styles.statusRejected
                              : styles.statusPending
                          }
                        >
                          {item.regularizationStatus}
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
                  alt="No data"
                  className={styles.noDataImage}
                  width={300}
                  height={300}
                  priority
                />
                <div className={styles.noDataText}>
                  "No regularizations submitted. Keep up the punctuality!"
                </div>
              </div>
            )}
          </div>

          {/* Mobile Card View */}
          <div className={styles.cardsMobile}>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div className={styles.leaveCardMobile} key={index}>
                  <div className={styles.firstSectMobile}>
                    <div><strong>Applied On:</strong> {dateFormatOnly(item.appliedOn)}</div>
                    <div>
                      <span
                        className={
                          item.regularizationStatus === "approved"
                            ? styles.statusApproved
                            : item.regularizationStatus === "rejected"
                            ? styles.statusRejected
                            : styles.statusPending
                        }
                      >
                        {item.regularizationStatus}
                      </span>
                    </div>
                  </div>
                  <div><strong>Regularize Date:</strong> {dateFormatOnly(item.regularizationDate)}</div>
                  <div><strong>Check In:</strong> {timeFormatOnly(item.checkInTime)}</div>
                  <div><strong>Check Out:</strong> {timeFormatOnly(item.checkOutTime)}</div>
                  <div><strong>Type:</strong> {item.type}</div>
                  <div><strong>Reason:</strong> {item.reason}</div>
                </div>
              ))
            ) : (
              <div className={styles.noDataContainer}>
                <Image
                  src="/images/nodata.png"
                  alt="No data"
                  className={styles.noDataImage}
                  width={300}
                  height={300}
                  priority
                />
                <div className={styles.noDataText}>
                  "No regularizations submitted. Keep up the punctuality!"
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
              <button
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                x
              </button>
              <RegularizationFrom oncancel={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Regularization;
