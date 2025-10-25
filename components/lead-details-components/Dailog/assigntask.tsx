"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css";
import { IoLocation } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import ReactDOM from "react-dom";
import { BiTask } from "react-icons/bi";
import Select, { components } from "react-select";
import { CgNotes } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";

interface AssignTaskProps {
    openclick: React.Dispatch<React.SetStateAction<boolean>>;
}
interface OptionType {
    value: string;
    label: string;
}
interface FormState {
    subject: string;
    assignTo: OptionType[];
    remark: string;
    deadline?: string;
}

const AssignTask: React.FC<AssignTaskProps> = ({ openclick }) => {
    const currentTheme = document.documentElement.classList.contains("light") ? "light" : "dark";
    const dialogRef = useRef<HTMLDivElement>(null);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState<FormState>({
        subject: "",
        remark: "",
        deadline: "",
        assignTo: [],

    });
    const AssignName = [
        { value: "snehal", label: "snehal (Sr.Manager)", status: "Present" },
        { value: "kishor", label: "kishor (Sr.Manager)", status: "Absent" },
    ];

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
            subject: "",
            assignTo: [],
            remark: "",
            deadline: "",
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

        if (!formData.subject) newErrors.subject = "Please select Call Status";
        if (formData.assignTo.length === 0) newErrors.assignTo = "Please select Employee";
        if (!formData.remark.trim()) newErrors.remark = "Please enter remark";
        if (!formData.deadline)
            newErrors.deadline = "Please select Deadline";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        alert("Form submitted successfully:\n" + JSON.stringify(formData, null, 2));
        openclick(false);
    };
    const customSelectStyles = (theme: "dark" | "light") => ({
        control: (base: any) => ({
            ...base,
            backgroundColor: theme === "dark" ? "#151414f5" : "transparent",
            borderColor: theme === "dark" ? "#444444f5" : "#927fbff5",
            minHeight: "40px",
            borderWidth: "2px",
            color: theme === "dark" ? "white" : "#201f1f",
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: theme === "dark" ? "#151414f5" : "white",
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected
                ? theme === "dark"
                    ? "#007bff"
                    : "#cce5ff"
                : state.isFocused
                    ? theme === "dark"
                        ? "#e6f0ff"
                        : "#f0f0f0"
                    : theme === "dark"
                        ? "#fff"
                        : "#fff",
            color: state.isSelected
                ? theme === "dark"
                    ? "white"
                    : "#201f1f"
                : "black",
        }),
        multiValue: (base: any) => ({
            ...base,
            backgroundColor: theme === "dark" ? "#007bff" : "#cce5ff",
            color: theme === "dark" ? "white" : "#201f1f",
        }),
        multiValueLabel: (base: any) => ({
            ...base,
            color: theme === "dark" ? "white" : "#201f1f",
        }),
        multiValueRemove: (base: any) => ({
            ...base,
            color: theme === "dark" ? "white" : "#201f1f",
            ":hover": {
                backgroundColor: "red",
                color: "white",
            },
        }),
    });
    const CustomOption = (props: any) => (
        <components.Option {...props}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{props.data.label}</span>
                <span
                    style={{
                        color: props.data.status === "Present" ? "green" : "red",
                        fontWeight: 500,
                    }}
                >
                    {props.data.status}
                </span>
            </div>
        </components.Option>
    );
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
                <h3 className={styles.dialogTitle}>📝 Assign Task</h3>
                <div className={styles.dailogcnt}>
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<FaStar className={styles.iconcolor} />} text="Subject" />
                        </label>
                        <select
                            value={formData.subject}
                            name="subject"
                            onChange={onChangeField}
                        >
                            <option value="">Select Subject</option>
                            <option value="connected">Live Lead</option>
                            <option value="disconnected">Transfer Lead</option>

                        </select>
                        {errors.subject && <p className={styles.errorMsg}>{errors.subject}</p>}
                    </div>
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<BiTask className={styles.iconcolor} />} text="Remarks" />
                        </label>
                        <textarea
                            rows={2}
                            placeholder="remark..."
                            name="remark"
                            value={formData.remark}
                            onChange={onChangeField}
                        />
                        {errors.remark && <p className={styles.errorMsg}>{errors.remark}</p>}
                    </div>
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<CgNotes className={styles.iconcolor} />} text="Assign To" />
                        </label>
                        <Select
                            isMulti
                            options={AssignName}
                            value={formData.assignTo}
                            onChange={(selected) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    assignTo: selected as OptionType[],
                                }))
                            }
                            styles={customSelectStyles(currentTheme)}
                            components={{ Option: CustomOption }}
                        />
                        {errors.assignTo && <p className={styles.errorMsg}>{errors.assignTo}</p>}

                    </div>

                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<FaCalendarAlt className={styles.iconcolor} />} text="Deadline" />
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            value={(formData as any).deadline || ""}
                            onChange={onChangeField}
                        />
                        {errors.deadline && <p className={styles.errorMsg}>{errors.deadline}</p>}
                    </div>
                    {/* Buttons */}
                    <div className={styles.dialogButtons}>
                        <button className={styles.cancelBtn} onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className={styles.submitBtn} onClick={onSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default AssignTask;
