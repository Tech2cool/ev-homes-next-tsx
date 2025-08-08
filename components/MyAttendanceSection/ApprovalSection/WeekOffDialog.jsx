import React, { useRef, useState } from "react";
import styles from "./leavedialog.module.css";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { useClickOutside } from "../useClickOutside";
import Image from "next/image";
import { dateFormatOnly } from "@/hooks/useDateFormat";

const WeekOffDialog = ({ weekoffSelect, onClose }) => {
  const [showWeekoffRejectionReason, setShowWeekoffRejectionReason] =
    useState(false);
  const [showWeekoffApproveReason, setShowWeekoffApproveReason] =
    useState(false);
  const [weekOffRejectionText, setWeekOffRejectionText] = useState("");
  const [weekoffApproveText, setWeekoffApproveText] = useState("");
  const weekOffDialogRef = useRef(null);

  useClickOutside({
    refs: [weekOffDialogRef],
    handler: onClose,
  });
  if (!weekoffSelect) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogBox} ref={weekOffDialogRef}>
        <div className={styles.upperSection}>
          <div className={styles.dialogHeader}>Approve WeekOff Request</div>
          <button onClick={onClose} className={styles.closeBtn}>
            X
          </button>

          <div className={styles.dateSectionWeekOff}>
            <div className={styles.appliedOn}>
              <div className={styles.sectionhead}>Applied On:</div>
              <div className={styles.sectionvalue}>{dateFormatOnly(weekoffSelect?.appliedOn)}</div>
            </div>
            <div className={styles.date}>
              <div className={styles.sectionhead}>WeekOff Date </div>
              <div className={styles.sectionvalue}>{dateFormatOnly(weekoffSelect?.weekoffdate)}</div>
            </div>
            <div className={styles.number}>
              <div className={styles.sectionhead}>Remark</div>
              <div className={styles.sectionvalue}>NA</div>
            </div>
          </div>
        </div>
        <div className={styles.lowerWeekOffSection}>
          <div className={styles.name}>
            <div className={styles.profileContainer}>
              <Image
                src="https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
                alt="Profile"
                className={styles.profilePic}
                width={100}
                height={100}
                priority={true}
              />
              <div className={styles.empDetails}>
                <div className={styles.empName}>{weekoffSelect?.employeeName}</div>
                <div className={styles.empPhone}>123456789</div>
              </div>
            </div>
            <div className={styles.statusButton}>{weekoffSelect?.status}</div>
          </div>

          <div className={styles.details}>
            <div className={styles.reason}>
              WeekOff Reason : {weekoffSelect?.reason}
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.subBottomSection}>
            <div className={styles.forback}>
              <div className={styles.iconCircle}>
                <FaArrowLeft />
              </div>
              <div className={styles.iconCircle}>
                <FaArrowRight />
              </div>
              <div className={styles.cardCount}> 1/3</div>
            </div>

            <div className={styles.rejapprove}>
              <div
                className={styles.rejectButton}
                onClick={() =>
                  setShowWeekoffRejectionReason(!showWeekoffRejectionReason)
                }
              >
                <FaTimes className={styles.crossIcon} />
              </div>

              {showWeekoffRejectionReason && (
                <div className={styles.rejectionTooltip}>
                  <textarea
                    className={styles.rejectionTextarea}
                    placeholder="Enter reason for rejection..."
                    value={weekOffRejectionText}
                    onChange={(e) => setWeekOffRejectionText(e.target.value)}
                  />
                  <button className={styles.submitRejection}>Submit</button>
                </div>
              )}

              <div
                className={styles.approveButton}
                onClick={() =>
                  setShowWeekoffApproveReason(!showWeekoffApproveReason)
                }
              >
                Approve
              </div>

              {showWeekoffApproveReason && (
                <div className={styles.approveToolTip}>
                  <textarea
                    className={styles.approveTextArea}
                    placeholder="Enter reason for approve..."
                    value={weekoffApproveText}
                    onChange={(e) => setWeekoffApproveText(e.target.value)}
                  />
                  <button className={styles.submitRejection}>Submit</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekOffDialog;
