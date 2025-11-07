"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css";
import { AiFillPicture } from "react-icons/ai";
import { PiBagFill } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import ReactDOM from "react-dom";
import { FaFilePdf } from "react-icons/fa";
import { GrDocumentPdf, GrDocumentText } from "react-icons/gr";
import { IoIosDocument } from "react-icons/io";

interface UploadDocumentProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormState {
  documentType: string;
  customField: string;
  photo: File | null;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({ openclick }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setformData] = useState<FormState>({
    documentType: "",
    customField: "",
    photo: null,
  });

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        openclick(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openclick]);

  const handleCancel = () => {
    setformData({ documentType: "", customField: "", photo: null });
    setErrors({});
    openclick(false);
  };

  const onChangeField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.documentType.trim()) newErrors.documentType = "Please select document type";
    if (formData.documentType === "Custom" && !formData.customField.trim())
      newErrors.customField = "Please enter custom field details";
    if (!formData.photo) newErrors.photo = "Please upload a PDF document";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    alert("Form submitted successfully:\n" + JSON.stringify(formData, null, 2));
    openclick(false);
  };

  const RequiredLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <label style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {icon}
      <span>{text}</span>
      <span style={{ color: "red", fontSize: "15px", marginLeft: "-1px" }}>*</span>
    </label>
  );

  return ReactDOM.createPortal(
    <div className={styles.dialogOverlay}>
      <div ref={dialogRef} className={styles.dialogBox}>
        <h3 className={styles.dialogTitle}>📝 Upload Document</h3>
        <MdCancel
          onClick={handleCancel}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "red",
            border: "none",
            borderRadius: "50%",
            width: "23px",
            height: "23px",
            cursor: "pointer",
            zIndex: "999",
          }}
        />

        <div className={styles.dailogcnt}>
          <div className={styles.formControl}>
            <label>
              <RequiredLabel icon={<IoIosDocument  className={styles.iconcolor} />} text="Document Type" />
            </label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={onChangeField}
              className={styles.dropdown}
            >
              <option value="">Select Document Type</option>
              <option value="Cost Sheet">Cost Sheet</option>
              <option value="Custom">Custom</option>
            </select>
            {errors.documentType && <p className={styles.errorMsg}>{errors.documentType}</p>}
          </div>

          {formData.documentType === "Custom" && (
            <div className={styles.formControl}>
              <label>
                <RequiredLabel icon={<GrDocumentText  className={styles.iconcolor} />} text="Custom Field Details" />
              </label>
              <input
                type="text"
                name="customField"
                value={formData.customField}
                onChange={onChangeField}
                className={styles.inputField}
                placeholder="Enter custom field details"
              />
              {errors.customField && <p className={styles.errorMsg}>{errors.customField}</p>}
            </div>
          )}

          {/* Upload PDF */}
          <div className={styles.formControl}>
            <label>
              <RequiredLabel icon={<GrDocumentPdf  className={styles.iconcolor} />} text="Upload Document (PDF)" />
            </label>
            <div className={styles.uploadBox}>
              <input
                type="file"
                id="fileUpload"
                accept="application/pdf"
                className={styles.fileInput}
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setformData((prev) => ({ ...prev, photo: file }));
                }}
              />
              <label htmlFor="fileUpload" className={styles.uploadLabel}>
                <div className={styles.uploadIcon}>
                  <GrDocumentPdf  size={30} />
                </div>
                <p>{!formData.photo ? "Click to upload or drag & drop PDF file" : ""}</p>
                {formData.photo && (
                  <p style={{ marginTop: "8px", color: "#555", fontSize: "14px" }}>
                    Uploaded:{" "}
                    <a
                      href={URL.createObjectURL(formData.photo)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#007bff", textDecoration: "underline" }}
                    >
                      {formData.photo.name}
                    </a>
                  </p>
                )}
              </label>
              {errors.photo && <p className={styles.errorMsg}>{errors.photo}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.dialogButtons}>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.submitBtn} onClick={onSubmit}>
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UploadDocument;
