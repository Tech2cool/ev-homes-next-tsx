import React, { useRef, useState } from "react";
import styles from "./leavedialog.module.css";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { RiAttachment2 } from "react-icons/ri";
import { useClickOutside } from "../useClickOutside";
import Image from "next/image";
import { dateFormatOnly, timeFormatOnly } from "@/hooks/useDateFormat";

const RegularizationDialog = ({ reguSelect, onClose }) => {
  const [showReguRejectionReason, setShowReguRejectionReason] = useState(false);
  const [showReguApproveReason, setShowReguApproveReason] = useState(false);
  const [reguRejectionText, setReguRejectionText] = useState("");
  const [reguApproveText, setReguApproveText] = useState("");
  const reguDialogRef = useRef(null);

  useClickOutside({
    refs: [reguDialogRef],
    handler: onClose,
  });

  if (!reguSelect) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogBox} ref={reguDialogRef}>
        <div className={styles.upperSection}>
          <div className={styles.dialogHeader}>
            Approve Regularization Request
          </div>
          <button onClick={onClose} className={styles.closeBtn}>
            X
          </button>

          <div className={styles.dateSection}>
            <div className={styles.appliedOn}>
              <div className={styles.sectionhead}>Applied On:</div>
              <div className={styles.sectionvalue}>{dateFormatOnly(reguSelect?.appliedOn)}</div>
            </div>
            <div className={styles.date}>
              <div className={styles.sectionhead}>Check In </div>
              <div className={styles.sectionvalue}>{timeFormatOnly(reguSelect?.checkIn)}</div>
            </div>
            <div className={styles.number}>
              <div className={styles.sectionhead}>Check Out</div>
              <div className={styles.sectionvalue}>{timeFormatOnly(reguSelect?.checkOut )}</div>
            </div>
          </div>
        </div>
        <div className={styles.lowerReguSection}>
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
                <div className={styles.empName}>{reguSelect?.employeeName}</div>
                {/* <div className={styles.empPhone}>123456789</div> */}
              </div>
            </div>
            <div className={styles.statusButton}>{reguSelect?.status}</div>
          </div>

          <div className={styles.details}>
            <div className={styles.type}>Regu Date : {dateFormatOnly(reguSelect?.regularizeDate)}</div>
            <div className={styles.type}>Regu Type : {reguSelect?.reguType}</div>
            <div className={styles.reason}>Regu Reason : {reguSelect?.reason}</div>
          </div>
          {/* <div className={styles.attachment}>
            {" "}
            <RiAttachment2 /> attachment
          </div> */}
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
                  setShowReguRejectionReason(!showReguRejectionReason)
                }
              >
                <FaTimes className={styles.crossIcon} />
              </div>

              {showReguRejectionReason && (
                <div className={styles.rejectionTooltip}>
                  <textarea
                    className={styles.rejectionTextarea}
                    placeholder="Enter reason for rejection..."
                    value={reguRejectionText}
                    onChange={(e) => setReguRejectionText(e.target.value)}
                  />
                  <button className={styles.submitRejection}>Submit</button>
                </div>
              )}

              <div
                className={styles.approveButton}
                onClick={() => setShowReguApproveReason(!showReguApproveReason)}
              >
                Approve
              </div>

              {showReguApproveReason && (
                <div className={styles.approveToolTip}>
                  <textarea
                    className={styles.approveTextArea}
                    placeholder="Enter reason for approve..."
                    value={reguApproveText}
                    onChange={(e) => setReguApproveText(e.target.value)}
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

export default RegularizationDialog;
