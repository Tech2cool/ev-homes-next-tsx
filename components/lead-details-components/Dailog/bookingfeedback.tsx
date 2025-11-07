"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./dailog.module.css";
import { MdCancel, MdFeedback } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import { FaMicrophoneAlt } from "react-icons/fa";

interface BookingFeedbackProps {
    openclick: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormState {
    callRegarding: string;
    callStatus: string;
    feedback: string;
    photo?: File | null;
    recording?: File | null;
}

const BookingFeedback: React.FC<BookingFeedbackProps> = ({ openclick }) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState<FormState>({
        callRegarding: "",
        callStatus: "",
        feedback: "",
        photo: null,
        recording: null,
    });

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
                openclick(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [openclick]);

    const handleCancel = () => {
        setFormData({
            callRegarding: "",
            callStatus: "",
            feedback: "",
            photo: null,
            recording: null,
        });
        setErrors({});
        openclick(false);
    };

    const onChangeField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.callRegarding) newErrors.callRegarding = "Please select Call Regarding";
        if (!formData.callStatus) newErrors.callStatus = "Please select Call Status";
        if (!formData.feedback.trim()) newErrors.feedback = "Please enter feedback";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        alert("Feedback submitted successfully:\n" + JSON.stringify(formData, null, 2));
        openclick(false);
    };

    const RequiredLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
        <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {icon}
            <span>{text}</span>
            <span style={{ color: "red" }}>*</span>
        </label>
    );

    return ReactDOM.createPortal(
        <div className={styles.dialogOverlay}>
            <div ref={dialogRef} className={styles.dialogBox}>
                <h3 className={styles.dialogTitle}>📝 Submit Feedback</h3>
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
                    }}
                />

                <div className={styles.dailogcnt}>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <RequiredLabel icon={<FaRegListAlt className={styles.iconcolor} />} text="Call Regarding" />
                            <select name="callRegarding" value={formData.callRegarding} onChange={onChangeField}>
                                <option value="">Select Call Regarding</option>
                                <option value="followup">Followup</option>
                                <option value="demand">Demand</option>
                                <option value="payment">Payment</option>
                                <option value="meeting">Meeting</option>
                            </select>
                            {errors.callRegarding && <p className={styles.errorMsg}>{errors.callRegarding}</p>}
                        </div>

                        <div className={styles.formControl}>
                            <RequiredLabel icon={<IoMdCall className={styles.iconcolor} />} text="Call Status" />
                            <select name="callStatus" value={formData.callStatus} onChange={onChangeField}>
                                <option value="">Select Call Status</option>
                                <option value="done">Call Done</option>
                                <option value="notReceived">Call Not Received</option>
                                <option value="cancelled">Call Cancelled</option>
                                <option value="busy">Call Busy</option>
                                <option value="notReachable">Not Reachable</option>
                            </select>
                            {errors.callStatus && <p className={styles.errorMsg}>{errors.callStatus}</p>}
                        </div>
                    </div>


                    <div className={styles.formControl}>
                        <RequiredLabel icon={<MdFeedback className={styles.iconcolor} />} text="Feedback" />
                        <textarea
                            name="feedback"
                            rows={3}
                            placeholder="Enter your feedback..."
                            value={formData.feedback}
                            onChange={onChangeField}
                        />
                        {errors.feedback && <p className={styles.errorMsg}>{errors.feedback}</p>}
                    </div>

                    <div className={styles.formControl}>
                        <RequiredLabel icon={<AiFillPicture className={styles.iconcolor} />} text="Attachment (Photo)" />
                        <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "8px" }}>
                            Add photo related to this feedback
                        </p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData((prev) => ({ ...prev, photo: e.target.files?.[0] || null }))}
                        />
                    </div>

                    <div className={styles.formControl}>
                        <RequiredLabel icon={<FaMicrophoneAlt className={styles.iconcolor} />} text="Attachment (Recording)" />
                        <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "8px" }}>
                            Add audio recordings (mp3, wav, awp)
                        </p>
                        <input
                            type="file"
                            accept=".mp3, .wav, .awp"
                            onChange={(e) => setFormData((prev) => ({ ...prev, recording: e.target.files?.[0] || null }))}
                        />
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

export default BookingFeedback;
