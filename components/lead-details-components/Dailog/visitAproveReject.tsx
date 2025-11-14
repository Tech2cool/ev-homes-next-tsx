"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css";
import { IoLocation } from "react-icons/io5";
import ReactDOM from "react-dom";
import { MdCancel } from "react-icons/md";
import { Note16Filled } from "@fluentui/react-icons";

interface VisitAprovedRejectedProps {
    openclick: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormState {
    remark: string;
}

const VisitAprovedRejected: React.FC<VisitAprovedRejectedProps> = ({ openclick }) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState<FormState>({ remark: "" });

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



    const onChangeField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const RequiredLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({
        icon,
        text,
    }) => (
        <label style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            {icon}
            <span>{text}</span>
            <span style={{ color: "red", fontSize: "15px", marginLeft: "-1px" }}>
                *
            </span>
        </label>
    );

    return ReactDOM.createPortal(
        <div className={styles.dialogOverlay}>
            <div ref={dialogRef} className={styles.dialogBox}>
                <h3 className={styles.dialogTitle}><span style={{ color: "rgba(23, 204, 38, 1)" }}>Approve</span> or <span style={{ color: "rgba(207, 47, 47, 1)" }}>Reject</span></h3>

                <MdCancel
                    onClick={() => openclick(false)}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        color: "red",
                        width: "23px",
                        height: "23px",
                        cursor: "pointer",
                        zIndex: "999",
                    }}
                />

                <div className={styles.dailogcnt}>
                    <div className={styles.formControl}>
                        <RequiredLabel
                            icon={<Note16Filled className={styles.iconcolor} />}
                            text="Remark"
                        />
                        <textarea
                            rows={3}
                            placeholder="Enter Remark"
                            value={formData.remark}
                            name="remark"
                            onChange={onChangeField}
                        />
                        {errors.remark && (
                            <p className={styles.errorMsg}>{errors.remark}</p>
                        )}
                    </div>

                    <div className={styles.visitbtn}>
                        <button style={{ background: "rgba(207, 47, 47, 1)", color: "white", border: "none", width: "120px", padding: "0.3rem 0.4rem", borderRadius: "10px" }}>
                            Reject
                        </button>
                        <button style={{ background: "rgba(23, 204, 38, 1)", color: "white", border: "none", width: "120px", padding: "0.3rem 0.4rem", borderRadius: "10px" }} >
                            Approve
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default VisitAprovedRejected;
