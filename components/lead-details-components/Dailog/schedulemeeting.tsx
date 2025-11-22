"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css"
import { IoLocation } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";
import { PiBagFill } from "react-icons/pi";
import { AiFillPicture } from "react-icons/ai";
import ReactDOM from "react-dom";
import { IoMdTime } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import DateTimePicker from "@/components/dateTimePicker";

interface ScheduleMeetingProps {
    openclick: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormState {
    dateTime: string;
    status: string;
    feedback: string,
}

const ScheduleMeeting: React.FC<ScheduleMeetingProps> = ({ openclick }) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setformData] = useState<FormState>({
        dateTime: "",
        feedback: "",
        status: "",
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
            dateTime: "",
            status: "",
            feedback: "",
        })
        openclick(false);
    }
    const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setformData((prev) => ({ ...prev, [name]: value }));
    };
    const onSubmit = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.dateTime) newErrors.dateTime = "Please select date & time.";
        if (!formData.status) newErrors.status = "Please select Booking Status.";

        if (!formData.feedback.trim()) {
            newErrors.feedback = "Please enter feedback";
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
                <h3 className={styles.dialogTitle}>📝 Shedule Meeting</h3>
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
                <div className={styles.infoSection}>
                    <div className={styles.infoCard}>
                        <h4 className={styles.cardTitle}>Client Details</h4>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Client Name:</span>
                            <span className={styles.infoValue}>Rahul Sharma</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Phone Number:</span>
                            <span className={styles.infoValue}>+91 9876543210</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Channel Partner:</span>
                            <span className={styles.infoValue}>Elite Realty</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Site Visit Date:</span>
                            <span className={styles.infoValue}>12 Oct 2025</span>
                        </div>

                    </div>

                    <div className={styles.infoCard}>
                        <h4 className={styles.cardTitle}>Team Leader Details</h4>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Name:</span>
                            <span className={styles.infoValue}>Snehal Mehta</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Gmail:</span>
                            <span className={styles.infoValue}>snehal@evgroup.co.in</span>
                        </div>

                    </div>
                </div>

                <div className={styles.dailogcnt}>

                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<IoMdTime className={styles.iconcolor} />} text="Appointment Date" />
                            </label>

                            {/* <input
                                type="datetime-local"
                                name="dateTime"
                                value={formData.dateTime}
                                onChange={onChangeField}
                                placeholder="Select Date and Time"
                            /> */}
                            <DateTimePicker
                                name="dateTime"
                                value={formData.dateTime}
                                onChange={onChangeField}
                            />
                            {errors.dateTime && (
                                <p className={styles.errorMsg}>{errors.dateTime}</p>
                            )}
                        </div>
                        <div className={styles.formControl}>

                            <label>
                                <RequiredLabel icon={<FaLocationDot className={styles.iconcolor} />} text="Client Booking Status" />
                            </label>
                            <select
                                value={formData.status}
                                name="status"
                                onChange={onChangeField}
                            >
                                <option value="">Select Status</option>
                                <option value="booked">Already Booked</option>
                                <option value="notbooked">Not Booked</option>
                                <option value="token">Give Holding Token</option>
                            </select>
                            {errors.status && (
                                <p className={styles.errorMsg}>{errors.status}</p>
                            )}
                        </div>


                    </div>


                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<IoLocation className={styles.iconcolor} />} text="Client Current Feedback" />
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Enter client feedback here..."
                            value={formData.feedback}
                            name="feedback"
                            onChange={onChangeField}
                        />
                        {errors.feedback && <p className={styles.errorMsg}>{errors.feedback}</p>}
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
                            Submit
                        </button>
                    </div>
                </div>



            </div>
        </div>,
        document.body
    );
};

export default ScheduleMeeting;
