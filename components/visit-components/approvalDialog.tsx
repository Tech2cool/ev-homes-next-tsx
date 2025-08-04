"use client";

import { useState } from "react";
import { X, Check, XCircle, MessageSquare } from "lucide-react";
import styles from "./dialogs.module.css";

const ApprovalDialog = ({ visit, onClose, onSubmit }:any) => {
  const [action, setAction] = useState("approve");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!remark.trim()) {
      setError("Remark is required");
      return;
    }

    onSubmit(action, remark.trim());
  };

  const handleOverlayClick = (e:any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.dialogOverlay} onClick={handleOverlayClick}>
      <div className={styles.dialogContainer}>
        <div className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>
            <Check className={styles.titleIcon} />
            Approval Decision
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.dialogContent}>
          {/* Visit Summary */}
          <div className={styles.visitSummary}>
            <h3 className={styles.summaryTitle}>Visit Details</h3>
            <div className={styles.summaryContent}>
              <p>
                <strong>Client:</strong> {visit.namePrefix} {visit.firstName}{" "}
                {visit.lastName}
              </p>
              <p>
                <strong>Phone:</strong> {visit.countryCode} {visit.phoneNumber}
              </p>
              <p>
                <strong>Visit Type:</strong> {visit.visitType}
              </p>
              <p>
                <strong>Source:</strong> {visit.source}
              </p>
              <p>
                <strong>Location:</strong> {visit?.location?.name}
              </p>
            </div>
          </div>

          {/* Action Selection */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              <MessageSquare className={styles.sectionIcon} />
              Decision
            </h3>

            <div className={styles.actionButtons}>
              <button
                className={`${styles.actionButton} ${styles.rejectButton} ${
                  action === "reject" ? styles.active : ""
                }`}
                onClick={() => setAction("reject")}
              >
                <XCircle className={styles.actionIcon} />
                Reject
              </button>

              <button
                className={`${styles.actionButton} ${styles.approveButton} ${
                  action === "approve" ? styles.active : ""
                }`}
                onClick={() => setAction("approve")}
              >
                <Check className={styles.actionIcon} />
                Approve
              </button>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Remark *
                <span className={styles.labelNote}>
                  ({action === "approve" ? "Approval" : "Rejection"} reason)
                </span>
              </label>
              <textarea
                value={remark}
                onChange={(e) => {
                  setRemark(e.target.value);
                  if (error) setError("");
                }}
                className={`${styles.formTextarea} ${
                  error ? styles.formInputError : ""
                }`}
                placeholder={`Enter ${
                  action === "approve" ? "approval" : "rejection"
                } remark...`}
                rows={4}
              />
              {error && <span className={styles.errorText}>{error}</span>}
            </div>
          </div>
        </div>

        <div className={styles.dialogFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            className={`${styles.submitButton} ${
              action === "approve" ? styles.approveSubmit : styles.rejectSubmit
            }`}
            onClick={handleSubmit}
          >
            {action === "approve" ? (
              <>
                <Check className={styles.buttonIcon} />
                Approve Visit
              </>
            ) : (
              <>
                <XCircle className={styles.buttonIcon} />
                Reject Visit
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalDialog;
