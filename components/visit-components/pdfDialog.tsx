"use client";

import { Download, FileText, Loader2, X } from "lucide-react";
import styles from "./dialogs.module.css";

const PdfDialog = ({ visit, isGenerating, onClose, onGenerate }:any) => {
  const handleOverlayClick = (e:any) => {
    if (e.target === e.currentTarget && !isGenerating) {
      onClose();
    }
  };

  return (
    <div className={styles.dialogOverlay} onClick={handleOverlayClick}>
      <div className={styles.dialogContainer}>
        <div className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>
            <FileText className={styles.titleIcon} />
            Generate PDF Report
          </h2>
          {!isGenerating && (
            <button className={styles.closeButton} onClick={onClose}>
              <X className={styles.closeIcon} />
            </button>
          )}
        </div>

        <div className={styles.dialogContent}>
          {!isGenerating ? (
            <>
              {/* Visit Summary */}
              <div className={styles.visitSummary}>
                <h3 className={styles.summaryTitle}>Visit Report Details</h3>
                <div className={styles.summaryContent}>
                  <p>
                    <strong>Client:</strong> {visit.namePrefix}{" "}
                    {visit.firstName} {visit.lastName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {visit.countryCode}{" "}
                    {visit.phoneNumber}
                  </p>
                  <p>
                    <strong>Visit Date:</strong>{" "}
                    {new Date(visit.date).toLocaleDateString("en-IN")}
                  </p>
                  <p>
                    <strong>Visit Type:</strong> {visit.visitType}
                  </p>
                  <p>
                    <strong>Source:</strong> {visit.source}
                  </p>
                  <p>
                    <strong>Status:</strong> {visit.approvalStatus}
                  </p>
                </div>
              </div>

              {/* PDF Options */}
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>Report Contents</h3>
                <div className={styles.pdfOptions}>
                  <div className={styles.optionItem}>
                    <input type="checkbox" id="personal" defaultChecked />
                    <label htmlFor="personal">Personal Information</label>
                  </div>
                  <div className={styles.optionItem}>
                    <input type="checkbox" id="visit" defaultChecked />
                    <label htmlFor="visit">Visit Details</label>
                  </div>
                  <div className={styles.optionItem}>
                    <input type="checkbox" id="project" defaultChecked />
                    <label htmlFor="project">Project Information</label>
                  </div>
                  <div className={styles.optionItem}>
                    <input type="checkbox" id="team" defaultChecked />
                    <label htmlFor="team">Team Information</label>
                  </div>
                  <div className={styles.optionItem}>
                    <input type="checkbox" id="approval" defaultChecked />
                    <label htmlFor="approval">Approval Status</label>
                  </div>
                  <div className={styles.optionItem}>
                    <input type="checkbox" id="feedback" defaultChecked />
                    <label htmlFor="feedback">Feedback</label>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.loadingSection}>
              <div className={styles.loadingContent}>
                <Loader2 className={styles.loadingSpinner} />
                <h3 className={styles.loadingTitle}>Generating PDF Report</h3>
                <p className={styles.loadingText}>
                  Please wait while we prepare your visit report...
                </p>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.dialogFooter}>
          {!isGenerating ? (
            <>
              <button className={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button className={styles.generateButton} onClick={onGenerate}>
                <Download className={styles.buttonIcon} />
                Generate PDF
              </button>
            </>
          ) : (
            <div className={styles.generatingFooter}>
              <p className={styles.generatingText}>
                Generating report... This may take a few moments.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfDialog;
