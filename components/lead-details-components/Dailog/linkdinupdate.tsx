"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css"
import { IoLocation } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";
import { PiBagFill } from "react-icons/pi";
import { AiFillPicture } from "react-icons/ai";
import ReactDOM from "react-dom";
import { MdCancel } from "react-icons/md";
import axios from "axios";

interface FileResp {
    token: string;
    filename: string;
    downloadUrl: string;
}

interface LinkdinUpdateProps {
    openclick: React.Dispatch<React.SetStateAction<boolean>>;
    lead?: Lead | null;
    onSave: (payload: any) => void;
}

interface FormState {
    occupation: string;
    link: string;
    uploadedLinkedinUrl: string | File | null;
    additionLinRremark: string;
}

const LinkdinUpdate: React.FC<LinkdinUpdateProps> = ({ openclick, lead, onSave }) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadedFileData, setUploadedFileData] = useState<FileResp | null>(null);

    const [formData, setformData] = useState<FormState>({
        occupation: "",
        link: "",
        uploadedLinkedinUrl: "",
        additionLinRremark: "",
    });
    useEffect(() => {
        if (lead) {
            setformData({
                occupation: lead.occupation || "",
                link: lead.linkedIn || "",
                uploadedLinkedinUrl: lead.uploadedLinkedIn ?? "",
                additionLinRremark: lead.additionLinRemark ?? "",
            });
        }
    }, [lead, openclick]);

     const handleFileUpload = async (file: File): Promise<string | null> => {
        if (!file) return null;

        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "linkedin-profiles");

        try {
            let url = "https://api.evhomes.tech/upload";
            url += `?path=linkedin-profiles`;

            const response = await axios.post<FileResp>(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-platform": "web",
                },
                onUploadProgress: (progressEvent: any) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentCompleted);
                    }
                },
            });

            setUploadedFileData(response.data);
            return response.data.downloadUrl;
        } catch (error) {
            console.error("Upload error:", error);
            return null;
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        
        if (file) {
            // For immediate preview
            setformData((prev) => ({ ...prev, uploadedLinkedinUrl: file }));
            
            // Upload the file and get the URL
            const downloadUrl = await handleFileUpload(file);
            if (downloadUrl) {
                // Update form data with the download URL instead of the File object
                setformData((prev) => ({ ...prev, uploadedLinkedinUrl: downloadUrl }));
            } else {
                // Handle upload failure
                setErrors(prev => ({ ...prev, uploadedLinkedinUrl: "Failed to upload file. Please try again." }));
                setformData((prev) => ({ ...prev, uploadedLinkedinUrl: "" }));
            }
        } else {
            setformData((prev) => ({ ...prev, uploadedLinkedinUrl: "" }));
        }
    };

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
        setformData({
            occupation: "",
            link: "",
            uploadedLinkedinUrl: "",
            additionLinRremark: "",
        })
        openclick(false);
    }
    const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setformData((prev) => ({ ...prev, [name]: value }));
    };
 const onSubmit = async () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.occupation.trim()) {
            newErrors.occupation = "Please enter occupation";
        }

        if (!formData.link.trim()) {
            newErrors.link = "Please enter profile link";
        }

        if (!formData.uploadedLinkedinUrl) {
            newErrors.uploadedLinkedinUrl = "Please upload profile";
        }

        if (!formData.additionLinRremark.trim()) {
            newErrors.remark = "Please enter Remark";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        // Ensure we have the download URL if a file was uploaded
        let finalUploadedUrl = formData.uploadedLinkedinUrl;
        
        // If it's still a File object (upload might be in progress), wait for upload to complete
        if (formData.uploadedLinkedinUrl instanceof File) {
            if (isUploading) {
                setErrors(prev => ({ ...prev, uploadedLinkedinUrl: "File upload in progress. Please wait." }));
                return;
            }
            // If upload failed or hasn't started, try to upload now
            const downloadUrl = await handleFileUpload(formData.uploadedLinkedinUrl);
            if (downloadUrl) {
                finalUploadedUrl = downloadUrl;
            } else {
                setErrors(prev => ({ ...prev, uploadedLinkedinUrl: "File upload failed. Please try again." }));
                return;
            }
        }

        const payload = {
            occupation: formData.occupation,
            linkedIn: formData.link,
            uploadedLinkedIn: finalUploadedUrl,
            additionLinRemark: formData.additionLinRremark,
        };

        onSave(payload);
        alert("Form submitted successfully!");
        openclick(false);
    };
    const RequiredLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
        <label style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            {icon}
            <span>{text}</span>
            <span style={{ color: "red", fontSize: "15px", marginLeft: "-1px" }}>*</span>
        </label>
    );

      const getPreviewUrl = (): string => {
        if (typeof formData.uploadedLinkedinUrl === "string") {
            return formData.uploadedLinkedinUrl;
        } else if (formData.uploadedLinkedinUrl instanceof File) {
            return URL.createObjectURL(formData.uploadedLinkedinUrl);
        }
        return "";
    };

    return ReactDOM.createPortal(
        <div className={styles.dialogOverlay}>
            <div ref={dialogRef} className={styles.dialogBox}>
                <h3 className={styles.dialogTitle}>📝 Work Information</h3>
                <MdCancel
                    onClick={() => openclick(false)}
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

                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<PiBagFill className={styles.iconcolor} />} text="Occupation" />
                            </label>
                            <input
                                type="text"
                                name="occupation"
                                placeholder="Enter occupation...."
                                value={formData.occupation}
                                onChange={onChangeField}
                            />
                            {errors.occupation && <p className={styles.errorMsg}>{errors.occupation}</p>}
                        </div>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<BsLinkedin className={styles.iconcolor} />} text="LinkedIn Profile" />
                            </label>
                            <input
                                type="text"
                                name="link"
                                placeholder=" Enter Link...."
                                value={formData.link}
                                onChange={onChangeField}
                            />
                            {errors.link && <p className={styles.errorMsg}>{errors.link}</p>}
                        </div>
                    </div>

                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel
                                icon={<AiFillPicture className={styles.iconcolor} />}
                                text="Upload LinkedIn Profile"
                            />
                        </label>

                        <div className={styles.uploadBox}>
                            <input
                                type="file"
                                id="fileUpload"
                                accept="image/*"
                                className={styles.fileInput}
                                onChange={handleFileChange}
                                disabled={isUploading}
                            />

                            <label htmlFor="fileUpload" className={styles.uploadLabel}>
                                {!formData.uploadedLinkedinUrl ? (
                                    <>
                                        <div className={styles.uploadIcon}>
                                            <AiFillPicture size={30} />
                                        </div>
                                        <p>
                                            {isUploading 
                                                ? `Uploading... ${uploadProgress}%` 
                                                : "Click to upload or drag & drop"
                                            }
                                        </p>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            marginTop: "10px",
                                            textAlign: "center",
                                            width: "100%",
                                            height: "170px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            overflow: "hidden",
                                            borderRadius: "8px",
                                            position: "relative",
                                        }}
                                    >
                                        <img
                                            src={getPreviewUrl()}
                                            alt="Preview"
                                            style={{
                                                width: "auto",
                                                height: "100%",
                                                borderRadius: "8px",
                                                objectFit: "cover",
                                            }}
                                        />
                                        {isUploading && (
                                            <div style={{
                                                position: "absolute",
                                                top: "0",
                                                left: "0",
                                                right: "0",
                                                bottom: "0",
                                                backgroundColor: "rgba(0,0,0,0.5)",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "white",
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                            }}>
                                                Uploading... {uploadProgress}%
                                            </div>
                                        )}
                                    </div>
                                )}
                            </label>
                        </div>

                        {errors.uploadedLinkedinUrl && <p className={styles.errorMsg}>{errors.uploadedLinkedinUrl}</p>}
                    </div>

                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<IoLocation className={styles.iconcolor} />} text="Remark" />
                        </label>
                        <textarea
                            rows={2}
                            placeholder="Enter remark"
                            value={formData.additionLinRremark}
                            name="additionLinRremark"
                            onChange={onChangeField}
                        />
                        {errors.remark && <p className={styles.errorMsg}>{errors.remark}</p>}
                    </div>

                    <div className={styles.dialogButtons}>
                        <button
                            className={styles.cancelBtn}
                            onClick={handleCancel}
                            disabled={isUploading}
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.submitBtn}
                            onClick={onSubmit}
                            disabled={isUploading}
                        >
                            {isUploading ? `Uploading... ${uploadProgress}%` : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default LinkdinUpdate;