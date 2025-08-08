import React, { useRef, useState } from "react";
import styles from "./leavedialog.module.css";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { RiAttachment2 } from "react-icons/ri";
import { useClickOutside } from "../useClickOutside";
import Image from "next/image";
import { dateFormatOnly } from "@/hooks/useDateFormat";

const ReimbursementDialog = ({ reim, onClose }) => {
  const [showReimRejectionReason, setShowReimRejectionReason] = useState(false);
  const [showReimApproveReason, setShowReimApproveReason] = useState(false);
  const [reimRejectionText, setReimRejectionText] = useState("");
  const [reimApproveText, setReimApproveText] = useState("");
  const reimDialogRef = useRef(null);

  useClickOutside({
    refs: [reimDialogRef],
    handler: onClose,
  });

  if (!reim) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogBox} ref={reimDialogRef}>
        <div className={styles.upperSection}>
          <div className={styles.dialogHeader}>
            Approve Reimbursement Request
          </div>
          <button onClick={onClose} className={styles.closeBtn}>
            X
          </button>

          <div className={styles.dateSection}>
            <div className={styles.appliedOn}>
              <div className={styles.sectionhead}>Applied On:</div>
              <div className={styles.sectionvalue}>{dateFormatOnly(reim?.appliedOn)}</div>
            </div>
            <div className={styles.date}>
              <div className={styles.sectionhead}>Reimburse Date</div>
              <div className={styles.sectionvalue}>{dateFormatOnly(reim?.reimDate)}</div>
            </div>
            <div className={styles.number}>
              <div className={styles.sectionhead}>Amount</div>
              <div className={styles.sectionvalue}>{reim?.amount}</div>
            </div>
          </div>
        </div>
        <div className={styles.lowerReimSection}>
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
                <div className={styles.empName}>{reim?.employeeName}</div>
                {/* <div className={styles.empPhone}>123456789</div> */}
              </div>
            </div>
            <div className={styles.statusButton}>{reim?.status}</div>
          </div>

          <div className={styles.details}>
            <div className={styles.type}>Reim Type : {reim.reimburseType}</div>
            <div className={styles.type}>Approval By : {reim.approvalBy}</div>
            <div className={styles.reason}>Remark : {reim.remark}</div>
          </div>
          <div className={styles.reimTwoAttachments}>
            <div className={styles.attachment}>
              {" "}
              <RiAttachment2 /> attached file
            </div>
            <div className={styles.attachment}>
              {" "}
              <RiAttachment2 /> attached bill invoice
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
                  setShowReimRejectionReason(!showReimRejectionReason)
                }
              >
                <FaTimes className={styles.crossIcon} />
              </div>

              {showReimRejectionReason && (
                <div className={styles.rejectionTooltip}>
                  <textarea
                    className={styles.rejectionTextarea}
                    placeholder="Enter reason for rejection..."
                    value={reimRejectionText}
                    onChange={(e) => setReimRejectionText(e.target.value)}
                  />
                  <button className={styles.submitRejection}>Submit</button>
                </div>
              )}

              <div
                className={styles.approveButton}
                onClick={() => setShowReimApproveReason(!showReimApproveReason)}
              >
                Approve
              </div>

              {showReimApproveReason && (
                <div className={styles.approveToolTip}>
                  <textarea
                    className={styles.approveTextArea}
                    placeholder="Enter reason for approve..."
                    value={reimApproveText}
                    onChange={(e) => setReimApproveText(e.target.value)}
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

export default ReimbursementDialog;

