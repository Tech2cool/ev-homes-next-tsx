"use client";

import React, { useState, useRef } from "react";
import styles from "./leavesection.module.css";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { LuAlarmClock } from "react-icons/lu";
import { FaBagShopping } from "react-icons/fa6";
import { MdOutlineFeedback, MdOutlineCallToAction } from "react-icons/md";
import { FaCalendarCheck, FaCalendarDay, FaFileUpload } from "react-icons/fa";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import LeaveForm from "./Forms/LeaveForm";
import { useClickOutside } from "./useClickOutside";
import Image from "next/image";
import { dateFormatOnly } from "@/hooks/useDateFormat";

// Types
interface LeaveType {
  leave: string;
}

interface LeaveData {
  appliedOn: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  leaveType: LeaveType;
  leaveReason: string;
  leaveStatus: "approved" | "pending" | "rejected";
  attachedFile?: string;
}

interface LeaveInfo {
  casualLeave: number;
  compensatoryoff: number;
  paidLeave: number;
}

// Dummy data
const dummyLeaveInfo: LeaveInfo = {
  casualLeave: 4,
  compensatoryoff: 2,
  paidLeave: 3,
};

const dummyMyLeaveData: LeaveData[] = [
  {
    appliedOn: "2025-04-25",
    startDate: "2025-04-28",
    endDate: "2025-04-29",
    numberOfDays: 2,
    leaveType: { leave: "Casual Leave" },
    leaveReason: "Personal reason",
    leaveStatus: "pending",
    attachedFile: "",
  },
  {
    appliedOn: "2025-03-12",
    startDate: "2025-03-15",
    endDate: "2025-03-20",
    numberOfDays: 6,
    leaveType: { leave: "Comp Off" },
    leaveReason: "Internal exam",
    leaveStatus: "approved",
    attachedFile: "",
  },
  {
    appliedOn: "2025-02-02",
    startDate: "2025-02-05",
    endDate: "2025-02-10",
    numberOfDays: 6,
    leaveType: { leave: "Paid Leave" },
    leaveReason: "Personal work",
    leaveStatus: "rejected",
    attachedFile: "",
  },
];

export default function LeaveSection() {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<"All" | "approved" | "pending" | "rejected">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myLeaveData: LeaveData[] = dummyMyLeaveData;
  const leaveInfo: LeaveInfo = dummyLeaveInfo;

  useClickOutside({
    refs: [modalRef],
    handler: () => setIsModalOpen(false),
    active: isModalOpen,
  });

  const { casualLeave: casualCount, compensatoryoff: compCount, paidLeave: paidCount } = leaveInfo;
  const totalDaysAll = casualCount + compCount + paidCount;

  const casualPercent = totalDaysAll ? (casualCount / totalDaysAll) * 100 : 0;
  const compPercent = totalDaysAll ? (compCount / totalDaysAll) * 100 : 0;
  const paidPercent = totalDaysAll ? (paidCount / totalDaysAll) * 100 : 0;

  return (
    <div className={styles.maincontainer}>
      <div className={styles.leaveSection}>
        {/* Stats Cards + Progress Bars */}
        <div className={styles.statsWithProgress}>
          <div className={styles.leavecontainer}>
            <div className={styles.leavecard} onClick={() => setFilter("All")}>
              <div className={styles.request}>Requested</div>
              <div className={styles.numberleave}>{myLeaveData.length}</div>
            </div>
            <div className={styles.leavecard} onClick={() => setFilter("approved")}>
              <div className={styles.aproved}>Approved</div>
              <div className={styles.numberleave}>
                {myLeaveData.filter((l) => l.leaveStatus === "approved").length}
              </div>
            </div>
            <div className={styles.leavecard} onClick={() => setFilter("rejected")}>
              <div className={styles.rejected}>Rejected</div>
              <div className={styles.numberleave}>
                {myLeaveData.filter((l) => l.leaveStatus === "rejected").length}
              </div>
            </div>
            <div className={styles.leavecard} onClick={() => setFilter("pending")}>
              <div className={styles.pending}>Pending</div>
              <div className={styles.numberleave}>
                {myLeaveData.filter((l) => l.leaveStatus === "pending").length}
              </div>
            </div>
          </div>

          <div className={styles.progressContainer}>
            <div className={styles.leaveHeadline}>
              <LuAlarmClock /> Your Leave
            </div>
            <div className={styles.progressGroup}>
              <div className={styles.labelColumn}>
                <span>Casual Leave</span>
                <span>Comp Off</span>
                <span>Paid Leave</span>
              </div>
              <div className={styles.barColumn}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFillCL} style={{ width: `${casualPercent}%` }} />
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFillCO} style={{ width: `${compPercent}%` }} />
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFillPL} style={{ width: `${paidPercent}%` }} />
                </div>
              </div>
              <div className={styles.countColumn}>
                <span>{casualCount}</span>
                <span>{compCount}</span>
                <span>{paidCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table & Mobile Cards */}
        <div className={styles.tableContainer}>
          <div className={styles.topBar}>
            <div className={styles.applyButton} onClick={() => setIsModalOpen(true)}>
              <FaPersonWalkingLuggage className={styles.applyIcon} /> Apply Leave
            </div>
          </div>

          {/* Desktop Table */}
          <div className={styles.tableDesktop}>
            {myLeaveData.length > 0 ? (
              <table className={styles.leaveTable}>
                <thead>
                  <tr>
                    <th><span className={styles.iconText}><FaBagShopping /> <span>Applied On</span></span></th>
                    <th><span className={styles.iconText}><FaCalendarDay /> <span>Duration</span></span></th>
                    <th><span className={styles.iconText}><FaCalendarCheck /> <span>Total days</span></span></th>
                    <th><span className={styles.iconText}><PiAirplaneTakeoffFill /> <span>Leave Type</span></span></th>
                    <th><span className={styles.iconText}><MdOutlineFeedback /> <span>Reason</span></span></th>
                    <th><span className={styles.iconText}><FaFileUpload /> <span>Attachment</span></span></th>
                    <th><span className={styles.iconText}><MdOutlineCallToAction /> <span>Action</span></span></th>
                  </tr>
                </thead>
                <tbody>
                  {myLeaveData.filter((l) => filter === "All" || l.leaveStatus === filter).map((l, index) => (
                    <tr key={index}>
                      <td>{dateFormatOnly(l.appliedOn)}</td>
                      <td>{dateFormatOnly(l.startDate)} to {dateFormatOnly(l.endDate)}</td>
                      <td>{l.numberOfDays}</td>
                      <td>{l.leaveType.leave}</td>
                      <td>{l.leaveReason}</td>
                      <td>{l.attachedFile ? <a href={l.attachedFile}>View</a> : "-"}</td>
                      <td>
                        <span className={
                          l.leaveStatus === "approved"
                            ? styles.statusApproved
                            : l.leaveStatus === "rejected"
                            ? styles.statusRejected
                            : styles.statusPending
                        }>
                          {l.leaveStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.noDataContainer}>
                <Image src="/images/nodata.png" alt="No leave data" width={300} height={300} />
                <div className={styles.noDataText}>
                  &quot;No leave requests from you so far.&quot;
                </div>
              </div>
            )}
          </div>

          {/* Mobile Cards */}
          <div className={styles.cardsMobile}>
            {myLeaveData.filter((l) => filter === "All" || l.leaveStatus === filter).map((l, index) => (
              <div className={styles.leaveCardMobile} key={index}>
                <div className={styles.firstSectMobile}>
                  <div><strong>Applied On:</strong> {dateFormatOnly(l.appliedOn)}</div>
                  <div>
                    <span className={
                      l.leaveStatus === "approved"
                        ? styles.statusApproved
                        : l.leaveStatus === "rejected"
                        ? styles.statusRejected
                        : styles.statusPending
                    }>
                      {l.leaveStatus}
                    </span>
                  </div>
                </div>
                <div><strong>Duration:</strong> {dateFormatOnly(l.startDate)} to {dateFormatOnly(l.endDate)}</div>
                <div><strong>Total Days:</strong> {l.numberOfDays}</div>
                <div><strong>Leave Type:</strong> {l.leaveType.leave}</div>
                <div><strong>Reason:</strong> {l.leaveReason}</div>
                <div><strong>Attachment:</strong> {l.attachedFile ? <a href={l.attachedFile}>View</a> : "-"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>x</button>
              <LeaveForm oncancel={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
