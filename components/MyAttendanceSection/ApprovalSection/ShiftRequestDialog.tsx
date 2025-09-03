import React, { useRef, useState } from "react";
import styles from "./leavedialog.module.css";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { useClickOutside } from "../useClickOutside";
import Image from "next/image";
import { dateFormatOnly } from "@/hooks/useDateFormat";

interface ShiftRequestData {
  employeeName: string;
  appliedOn: Date;
  shiftrequestdate: Date;
  shift: string;
  reason: string;
  status: string;
}

interface ShiftRequestDialogProps {
  shift: ShiftRequestData | null;
  onClose: () => void;
}

const ShiftRequestDialog: React.FC<ShiftRequestDialogProps> = ({ shift, onClose }) => {
  const [showShiftRejectionReason, setShowShiftRejectionReason] = useState(false);
  const [showShiftApproveReason, setShowShiftApproveReason] = useState(false);
  const [shiftRejectionText, setShiftRejectionText] = useState("");
  const [shiftApproveText, setShiftApproveText] = useState("");
  const shiftDialogRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    refs: [shiftDialogRef],
    handler: onClose,
  });

  if (!shift) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogBox} ref={shiftDialogRef}>
        <div className={styles.upperSection}>
          <div className={styles.dialogHeader}>Approve Shift Request</div>
          <button onClick={onClose} className={styles.closeBtn}>
            X
          </button>

          <div className={styles.dateSection}>
            <div className={styles.appliedOn}>
              <div className={styles.sectionhead}>Applied On:</div>
              <div className={styles.sectionvalue}>{dateFormatOnly(shift.appliedOn)}</div>
            </div>
            <div className={styles.date}>
              <div className={styles.sectionhead}>Shift Request Date</div>
              <div className={styles.sectionvalue}>{dateFormatOnly(shift.shiftrequestdate)}</div>
            </div>
            <div className={styles.number}>
              <div className={styles.sectionhead}>Number of Days</div>
              <div className={styles.sectionvalue}>1</div>
            </div>
          </div>
        </div>

        <div className={styles.lowerShiftSection}>
          <div className={styles.name}>
            <div className={styles.profileContainer}>
              <Image
                src="https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
                alt="Profile"
                className={styles.profilePic}
                width={100}
                height={100}
                priority
              />
              <div className={styles.empDetails}>
                <div className={styles.empName}>{shift.employeeName}</div>
              </div>
            </div>
            <div className={styles.statusButton}>{shift.status}</div>
          </div>

          <div className={styles.details}>
            <div className={styles.type}>Shift : {shift.shift}</div>
            <div className={styles.reason}>Reason : {shift.reason}</div>
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
              <div className={styles.cardCount}>1/3</div>
            </div>

            <div className={styles.rejapprove}>
              <div
                className={styles.rejectButton}
                onClick={() => setShowShiftRejectionReason(!showShiftRejectionReason)}
              >
                <FaTimes className={styles.crossIcon} />
              </div>

              {showShiftRejectionReason && (
                <div className={styles.rejectionTooltip}>
                  <textarea
                    className={styles.rejectionTextarea}
                    placeholder="Enter reason for rejection..."
                    value={shiftRejectionText}
                    onChange={(e) => setShiftRejectionText(e.target.value)}
                  />
                  <button className={styles.submitRejection}>Submit</button>
                </div>
              )}

              <div
                className={styles.approveButton}
                onClick={() => setShowShiftApproveReason(!showShiftApproveReason)}
              >
                Approve
              </div>

              {showShiftApproveReason && (
                <div className={styles.approveToolTip}>
                  <textarea
                    className={styles.approveTextArea}
                    placeholder="Enter reason for approve..."
                    value={shiftApproveText}
                    onChange={(e) => setShiftApproveText(e.target.value)}
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

export default ShiftRequestDialog;
