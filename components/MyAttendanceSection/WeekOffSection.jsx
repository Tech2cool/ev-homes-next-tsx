import React, { useState, useRef } from "react";
import styles from "./leavesection.module.css";
import Image from "next/image";
import { FaBagShopping, FaCalendarDay } from "react-icons/fa6";
import { MdOutlineFeedback, MdOutlineCallToAction, MdHolidayVillage } from "react-icons/md";
import WeekOffForm from "./Forms/WeekoffForm";
import { useClickOutside } from "./useClickOutside";
import { dateFormatOnly } from "@/hooks/useDateFormat";

const dummyWeekOffData = [
  {
    appliedOn: "2025-08-01",
    weekoffDate: "2025-08-07",
    reason: "Family event",
    weekoffStatus: "approved",
  },
  {
    appliedOn: "2025-08-02",
    weekoffDate: "2025-08-10",
    reason: "Medical appointment",
    weekoffStatus: "pending",
  },
  {
    appliedOn: "2025-08-03",
    weekoffDate: "2025-08-15",
    reason: "Personal work",
    weekoffStatus: "rejected",
  },
];

const WeekOffSection = () => {
  const modalRef = useRef(null);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useClickOutside({
    refs: [modalRef],
    handler: () => setIsModalOpen(false),
    active: isModalOpen,
  });

  const filteredWeekOffs = dummyWeekOffData.filter((w) =>
    filter === "All" ? true : w.weekoffStatus === filter
  );

  return (
    <div className={styles.maincontainer}>
      <div className={styles.leaveSection}>
        <div className={styles.statsWithProgress}>
          <div className={styles.leavecontainer}>
            <div className={styles.leavecard} onClick={() => setFilter("All")}>
              <div className={styles.request}>Requested</div>
              <div className={styles.numberleave}>{dummyWeekOffData.length}</div>
            </div>
            <div className={styles.leavecard} onClick={() => setFilter("approved")}>
              <div className={styles.aproved}>Approved</div>
              <div className={styles.numberleave}>
                {dummyWeekOffData.filter((w) => w.weekoffStatus === "approved").length}
              </div>
            </div>
            <div className={styles.leavecard} onClick={() => setFilter("rejected")}>
              <div className={styles.rejected}>Rejected</div>
              <div className={styles.numberleave}>
                {dummyWeekOffData.filter((w) => w.weekoffStatus === "rejected").length}
              </div>
            </div>
            <div className={styles.leavecard} onClick={() => setFilter("pending")}>
              <div className={styles.pending}>Pending</div>
              <div className={styles.numberleave}>
                {dummyWeekOffData.filter((w) => w.weekoffStatus === "pending").length}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.topBar}>
            <div className={styles.applyButton} onClick={() => setIsModalOpen(true)}>
              <MdHolidayVillage className={styles.applyIcon} /> Apply WeekOff
            </div>
          </div>

          {/* Desktop Table */}
          <div className={styles.tableDesktop}>
            {filteredWeekOffs.length > 0 ? (
              <table className={styles.leaveTable}>
                <thead>
                  <tr>
                    <th>
                      <span className={styles.iconText}>
                        <FaBagShopping /> <span>Applied On</span>
                      </span>
                    </th>
                    <th>
                      <span className={styles.iconText}>
                        <FaCalendarDay /> <span>WeekOff Date</span>
                      </span>
                    </th>
                    <th>
                      <span className={styles.iconText}>
                        <MdOutlineFeedback /> <span>Reason</span>
                      </span>
                    </th>
                    <th>
                      <span className={styles.iconText}>
                        <MdOutlineCallToAction /> <span>Status</span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWeekOffs.map((weekoff, index) => (
                    <tr key={index}>
                      <td>{dateFormatOnly(weekoff.appliedOn)}</td>
                      <td>{dateFormatOnly(weekoff.weekoffDate)}</td>
                      <td>{weekoff.reason}</td>
                      <td>
                        <span
                          className={
                            weekoff.weekoffStatus === "approved"
                              ? styles.statusApproved
                              : weekoff.weekoffStatus === "rejected"
                              ? styles.statusRejected
                              : styles.statusPending
                          }
                        >
                          {weekoff.weekoffStatus}
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
                  alt="No weekoff data"
                  className={styles.noDataImage}
                  width={300}
                  height={300}
                  priority
                />
                <div className={styles.noDataText}>
                  You haven’t requested any week offs yet.
                </div>
              </div>
            )}
          </div>

          {/* Mobile Cards */}
          <div className={styles.cardsMobile}>
            {filteredWeekOffs.map((weekoff, index) => (
              <div className={styles.leaveCardMobile} key={index}>
                <div className={styles.firstSectMobile}>
                  <div>
                    <strong>Applied On:</strong> {dateFormatOnly(weekoff.appliedOn)}
                  </div>
                  <div>
                    <span
                      className={
                        weekoff.weekoffStatus === "approved"
                          ? styles.statusApproved
                          : weekoff.weekoffStatus === "rejected"
                          ? styles.statusRejected
                          : styles.statusPending
                      }
                    >
                      {weekoff.weekoffStatus}
                    </span>
                  </div>
                </div>
                <div>
                  <strong>Weekoff Date:</strong> {dateFormatOnly(weekoff.weekoffDate)}
                </div>
                <div>
                  <strong>Reason:</strong> {weekoff.reason}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for WeekOff Form */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                x
              </button>
              <WeekOffForm onCancel={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeekOffSection;
