"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css"
import { IoLocation } from "react-icons/io5";

import ReactDOM from "react-dom";
import { MdCancel } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import { IoIosCalendar, IoMdCalendar } from "react-icons/io";
import moment from "moment";

interface AddChannelPartnerProps {
    openclick: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormState {

    remark: string,
    cpartner: string,
    startDate: string;
    validTill: string;
}

const AddChannelPartner: React.FC<AddChannelPartnerProps> = ({ openclick }) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const tagdateRef = useRef<HTMLInputElement>(null);
    const [startDate, setStartDate] = useState<string>("");
    const [validTill, setValidTill] = useState<string>("");
    const validTillRef = useRef<HTMLInputElement>(null);
    const [formData, setformData] = useState<FormState>({
        remark: "",
        cpartner: "",
        startDate: "",
        validTill: "",
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

    useEffect(() => {
        const startDate = moment().tz("Asia/Kolkata");
        const validTill = moment(startDate).add(59, "days");
        setStartDate(startDate.format("YYYY-MM-DD"));
        setValidTill(validTill.format("YYYY-MM-DD"));
        setformData((prev) => ({
            ...prev,
            startDate: startDate.toISOString(),
            validTill: validTill.toISOString(),
        }));
    }, []);
    const handleCancel = () => {
        setformData({

            remark: "",
            cpartner: "",
            startDate: "",
            validTill: "",
        })
        openclick(false);
    }
    const onChangeStartDate = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setStartDate(value);
            const today = moment().tz("Asia/Kolkata");
            const stDate = moment.tz(value, "YYYY-MM-DD", "Asia/Kolkata").set({
                hour: today.hour(),
                minute: today.minute(),
                second: today.second(),
            });

            console.log(value);
            console.log(today);
            console.log(stDate);

            const validTillDate = moment(stDate).add(59, "days");
            setValidTill(validTillDate.format("YYYY-MM-DD"));
            setformData((prev) => ({
                ...prev,
                startDate: stDate.toISOString(),
                validTill: validTillDate.toISOString(),
            }));

            console.log(validTillDate);
        },
        []
    );
    const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setformData((prev) => ({ ...prev, [name]: value }));
    };
    const onSubmit = () => {
        const newErrors: { [key: string]: string } = {};



        if (!formData.remark.trim()) {
            newErrors.remark = "Please enter Remark";
        }
        if (!formData.cpartner) newErrors.cpartner = "Please select Channel Partner.";
        if (!formData.startDate) newErrors.startDate = "Please enter start Date.";


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
                <h3 className={styles.dialogTitle}>Add CP to Queue</h3>
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


                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<FaUserTie className={styles.iconcolor} />} text="Channel Partner" />
                        </label>

                        <select
                            value={formData.cpartner}
                            name="cpartner"
                            onChange={onChangeField}
                        >
                            <option value="">Select Channel Partner</option>
                            <option value="monali">monali sing</option>
                            <option value="anil">anil patil</option>
                        </select>
                        {errors.cpartner && (
                            <p className={styles.errorMsg}>{errors.cpartner}</p>
                        )}
                    </div>
                    <div className={styles.card}>
                        <div
                            className={styles.formControl}
                        >
                            <label htmlFor="taggeddate">
                                <RequiredLabel icon={<IoIosCalendar className={styles.iconcolor} />} text="Start Date" />
                            </label>
                            <input
                                ref={tagdateRef}
                                id="taggeddate"
                                value={startDate}
                                onChange={onChangeStartDate}
                                type="date"
                            />
                            {errors.startDate && (
                                <p className={styles.errorMsg}>{errors.startDate}</p>
                            )}
                        </div>

                        <div
                            className={styles.formControl}
                        >
                            <label htmlFor="validtill">
                                <RequiredLabel icon={<IoMdCalendar className={styles.iconcolor} />} text="End Date" />
                            </label>
                            <input
                                type="date"
                                ref={validTillRef}
                                id="validtill"
                                value={validTill}
                                disabled
                            />
                        </div>
                    </div>
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<IoLocation className={styles.iconcolor} />} text="Remark" />
                        </label>
                        <textarea
                            rows={2}
                            placeholder="Enter Remark..."
                            value={formData.remark}
                            name="remark"
                            onChange={onChangeField}
                        />
                        {errors.remark && <p className={styles.errorMsg}>{errors.remark}</p>}
                    </div>
                    <div className={styles.formControl}>
                        <p>This lead is added as <span style={{ color: "rgba(235, 78, 78, 1)" }}>Rejected</span> </p>
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

export default AddChannelPartner;
