"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css"
import { IoLocation } from "react-icons/io5";
import Select, { components } from "react-select";

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
        const currentTheme = document.documentElement.classList.contains("light")
        ? "light"
        : "dark";
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
     const customSelectStyles = (theme: "dark" | "light") => ({
        control: (base: any, state: any) => ({
            ...base,
            backgroundColor: theme === "dark" ? "#151414f5" : "white",
            borderColor: state.isFocused
                ? "#007bff"
                : theme === "dark"
                    ? "#444444f5"
                    : "#ccc",
            minHeight: "40px",
            borderWidth: "2px",
            color: theme === "dark" ? "white" : "#201f1f",
            fontSize: "14px", // ✅ smaller font
            boxShadow: state.isFocused ? "0 0 0 1px #007bff" : "none",
            "&:hover": {
                borderColor: "#007bff",
            },
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: theme === "dark" ? "#151414f5" : "white",
            fontSize: "14px", // smaller font in dropdown
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected
                ? theme === "dark"
                    ? "#007bff"
                    : "#cce5ff"
                : state.isFocused
                    ? theme === "dark"
                        ? "#0056b3"
                        : "#e6f0ff"
                    : theme === "dark"
                        ? "#151414f5"
                        : "white",
            color: state.isSelected
                ? theme === "dark"
                    ? "white"
                    : "#201f1f"
                : theme === "dark"
                    ? "white"
                    : "#201f1f",
            fontSize: "14px", // smaller font
        }),
        singleValue: (base: any) => ({
            ...base,
            color: theme === "dark" ? "white" : "#201f1f",
            fontSize: "14px",
        }),
        multiValue: (base: any) => ({
            ...base,
            backgroundColor: theme === "dark" ? "#007bff" : "#cce5ff",
            fontSize: "14px",
        }),
        multiValueLabel: (base: any) => ({
            ...base,
            color: theme === "dark" ? "#e4e4e4ff" : "#201f1f",
            fontSize: "14px",
        }),
        multiValueRemove: (base: any) => ({
            ...base,
            color: theme === "dark" ? "#e4e4e4ff" : "#201f1f",
            fontSize: "14px",
            ":hover": {
                backgroundColor: "red",
                color: "#e4e4e4ff",
            },
        }),
        input: (base: any) => ({
            ...base,
            color: theme === "dark" ? "#e4e4e4ff" : "#201f1f",
            fontSize: "14px",
        }),
        placeholder: (base: any) => ({
            ...base,
            color: theme === "dark" ? "#aaa" : "#999",
            fontSize: "14px",
        }),
    });
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

                       <Select
                                options={[
                                    { value: "", label: "Select Channel Partner" },
                                    { value: "monali", label: "Monali Singh" },
                                    { value: "anil", label: "Anil Patil" },
                                ]}
                                value={
                                    formData.cpartner
                                        ? { value: formData.cpartner, label: formData.cpartner }
                                        : { value: "", label: "Select Channel Partner" }
                                }
                                onChange={(selectedOption) =>
                                    setformData((prev) => ({
                                        ...prev,
                                        cpartner: selectedOption?.value || "",
                                    }))
                                }
                                styles={customSelectStyles(currentTheme)}
                                placeholder="Select Channel Partner"
                                isClearable
                            />
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
