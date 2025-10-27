"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css"
import { IoLocation } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";
import { PiBagFill } from "react-icons/pi";
import { AiFillPicture } from "react-icons/ai";
import ReactDOM from "react-dom";
import { MdCancel } from "react-icons/md";

interface LinkdinUpdateProps {
    openclick: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormState {
    occupation: string;
    link: string;
    photo: File | null;
    remark: string,
}

const LinkdinUpdate: React.FC<LinkdinUpdateProps> = ({ openclick }) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setformData] = useState<FormState>({

        occupation: "",
        link: "",
        photo: null,
        remark: "",
    })
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
            photo: null,
            remark: "",
        })
        openclick(false);
    }
    const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setformData((prev) => ({ ...prev, [name]: value }));
    };
    const onSubmit = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.occupation.trim()) {
            newErrors.occupation = "Please enter occupation";
        }

        if (!formData.link.trim()) {
            newErrors.link = "Please enter profile link";
        }

        if (!formData.photo) {
            newErrors.photo = "Please upload profile";
        }

        if (!formData.remark.trim()) {
            newErrors.remark = "Please enter Remark";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        alert("Form submitted successfully: \n" + JSON.stringify(formData, null, 2));
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
                            <RequiredLabel icon={<AiFillPicture className={styles.iconcolor} />} text="Upload Photo" />
                        </label>
                        <div className={styles.uploadBox}>
                            <input
                                type="file"
                                id="fileUpload"
                                accept="image/*"
                                className={styles.fileInput}
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setformData((prev) => ({ ...prev, photo: file }));
                                }}
                            />

                            <label htmlFor="fileUpload" className={styles.uploadLabel}>
                                <div className={styles.uploadIcon}>
                                    <AiFillPicture size={30} />
                                </div>
                                <p>{(!formData.photo ? "Click to upload or drag & drop" : "")}</p>
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

                        </div>
                        {errors.photo && <p className={styles.errorMsg}>{errors.photo}</p>}
                    </div>
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<IoLocation className={styles.iconcolor} />} text="Remark" />
                        </label>
                        <textarea
                            rows={2}
                            placeholder="Enter remark"
                            value={formData.remark}
                            name="remark"
                            onChange={onChangeField}
                        />
                        {errors.remark && <p className={styles.errorMsg}>{errors.remark}</p>}
                    </div>


                    <div className={styles.dialogButtons}>
                        <button
                            className={styles.cancelBtn}
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.submitBtn}
                            onClick={onSubmit}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>



            </div>
        </div>,
        document.body
    );
};

export default LinkdinUpdate;
