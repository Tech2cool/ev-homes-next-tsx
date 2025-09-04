import React, { useRef, useState } from "react";
import styles from "./leavedialog.module.css";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { RiAttachment2 } from "react-icons/ri";
import { useClickOutside } from "../useClickOutside";
import { dateFormatOnly } from "@/hooks/useDateFormat";
interface AssetData {
  employeeName: string;
  appliedOn: Date | string;
  assetDate: Date | string;
  assetType: string;
  remark?: string;
  status?: string;
  quantity: number;
  attachment?: string;
}
interface AssetDialogProps {
  asset: AssetData | null;
  onClose: () => void;
}

const AssetDialog: React.FC<AssetDialogProps> = ({ asset, onClose }) => {
  const [showAssetRejectionReason, setShowAssetRejectionReason] =
    useState(false);
  const [showAssetApproveReason, setShowAssetApproveReason] = useState(false);
  const [assetRejectionText, setAssetRejectionText] = useState("");
  const [assetApproveText, setAssetApproveText] = useState("");
  const assetDialogRef = useRef(null);

  useClickOutside({
    refs: [assetDialogRef],
    handler: onClose,
  });

  if (!asset) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogBox} ref={assetDialogRef}>
        <div className={styles.upperSection}>
          <div className={styles.dialogHeader}>Approve Asset Request</div>
          <button onClick={onClose} className={styles.closeBtn}>
            X
          </button>

          <div className={styles.dateSection}>
            <div className={styles.appliedOn}>
              <div className={styles.sectionhead}>Applied On:</div>
              <div className={styles.sectionvalue}>{dateFormatOnly(asset.appliedOn)}</div>
            </div>
            <div className={styles.date}>
              <div className={styles.sectionhead}>Asset Date</div>
              <div className={styles.sectionvalue}>{dateFormatOnly(asset?.assetDate)}</div>
            </div>
            <div className={styles.number}>
              <div className={styles.sectionhead}>Quantity</div>
              <div className={styles.sectionvalue}>{asset?.quantity} No.</div>
            </div>
          </div>
        </div>
        <div className={styles.lowerAssetSection}>
          <div className={styles.name}>
            <div className={styles.profileContainer}>
              {/* <img
                src="https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"
                alt="Profile"
                className={styles.profilePic}
              /> */}
              <Image
                src="https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
                alt="Profile"
                className={styles.profilePic}
                width={100}
                height={100}
                priority={true}
              />
              <div className={styles.empDetails}>
                <div className={styles.empName}>{asset?.employeeName}</div>
                {/* <div className={styles.empPhone}>123456789</div> */}
              </div>
            </div>
            <div className={styles.statusButton}>{asset?.status}</div>
          </div>

          <div className={styles.details}>
            <div className={styles.type}>Asset Type : {asset?.assetType}</div>
            <div className={styles.reason}>Asset Reason : {asset?.remark}</div>
          </div>
          <div className={styles.attachment}>
            {" "}
            <RiAttachment2 /> {asset?.attachment || "No Attachment"}
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
                  setShowAssetRejectionReason(!showAssetRejectionReason)
                }
              >
                <FaTimes className={styles.crossIcon} />
              </div>

              {showAssetRejectionReason && (
                <div className={styles.rejectionTooltip}>
                  <textarea
                    className={styles.rejectionTextarea}
                    placeholder="Enter reason for rejection..."
                    value={assetRejectionText}
                    onChange={(e) => setAssetRejectionText(e.target.value)}
                  />
                  <button className={styles.submitRejection}>Submit</button>
                </div>
              )}

              <div
                className={styles.approveButton}
                onClick={() =>
                  setShowAssetApproveReason(!showAssetApproveReason)
                }
              >
                Approve
              </div>

              {showAssetApproveReason && (
                <div className={styles.approveToolTip}>
                  <textarea
                    className={styles.approveTextArea}
                    placeholder="Enter reason for approve..."
                    value={assetApproveText}
                    onChange={(e) => setAssetApproveText(e.target.value)}
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

export default AssetDialog;
