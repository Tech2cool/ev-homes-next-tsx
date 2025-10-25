"use client";

import { useState, useRef } from "react";
import styles from "./taggingform.module.css";
import { FaStar } from "react-icons/fa";
import Switch from "@mui/material/Switch";

import {
    MdLocalPhone,
    MdOutlineEmail,
    MdOutlinePhoneInTalk,
} from "react-icons/md";
import { IoIosCalendar, IoMdCalendar } from "react-icons/io";
import { IoLocation, IoPersonOutline } from "react-icons/io5";
import { BsBuildingFill } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import Select, { MultiValue } from "react-select";
import moment from "moment-timezone";
import Image from "next/image";
type ProjectOption = { value: string; label: string };
interface FormState {
    leadType: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    altPhoneNumber: string;
    email: string;
    address: string;
    remark: string;
    projects: ProjectOption[];
    requirements: { value: string; label: string }[];
    channelPartner: { value: string; label: string } | null;
    propertyType: string;
}


const TaggingForm = () => {
    const [startDate, setStartDate] = useState("");
    const [validTill, setValidTill] = useState("");
    const [iConfirm, setIConfirm] = useState(false);
    const [checked, setChecked] = useState(false);
    const currentTheme = document.documentElement.classList.contains("light") ? "light" : "dark";

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    const [formData, setFormData] = useState<FormState>({
        leadType: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        altPhoneNumber: "",
        email: "",
        address: "",
        remark: "",
        projects: [],
        requirements: [],
        channelPartner: null,
        propertyType: "",
    });

    const tagdateRef = useRef<HTMLInputElement>(null);
    const validTillRef = useRef<HTMLInputElement>(null);

    const projectOptions = [
        { value: "p1", label: "Project 1" },
        { value: "p2", label: "Project 2" },
    ];
    const requirementOptions = [
        { value: "2BHK", label: "2BHK" },
        { value: "3BHK", label: "3BHK" },
    ];
    const channelPartnerOptions = [
        { value: "cp1", label: "Partner A" },
        { value: "cp2", label: "Partner B" },
    ];

    const validatePhoneNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, "");
        return cleaned.slice(0, 10);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const cleanedValue = validatePhoneNumber(value);
        setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
    };

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStartDate(value);

        const today = moment().tz("Asia/Kolkata");
        const stDate = moment.tz(value, "YYYY-MM-DD", "Asia/Kolkata").set({
            hour: today.hour(),
            minute: today.minute(),
            second: today.second(),
        });
        const validTillDate = moment(stDate).add(59, "days");
        setValidTill(validTillDate.format("YYYY-MM-DD"));
    };

   const onSubmit = () => {
    if (!formData.leadType) {
        alert("Please select Lead Type");
        return;
    }

    if (!formData.firstName.trim()) {
        alert("Please enter First Name");
        return;
    }

    if (!formData.lastName.trim()) {
        alert("Please enter Last Name");
        return;
    }

    if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
        alert("Please enter a valid 10-digit Phone Number");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        alert("Please enter a valid Email");
        return;
    }

    if (!formData.projects || formData.projects.length === 0) {
        alert("Please select at least one Project");
        return;
    }
    if (!formData.requirements || formData.requirements.length === 0) {
        alert("Please select at least one Requirement");
        return;
    }

    if (!formData.propertyType) {
        alert("Please select Property Type");
        return;
    }

    if (!checked) {
        alert("Please confirm the details first");
        return;
    }
     if (!formData.channelPartner) {
        alert("Please select channel Partner");
        return;
    }

    // If all validations pass
    alert("Form submitted successfully: \n" + JSON.stringify(formData, null, 2));
};


    const handleCancel = () => {
        setFormData({
            leadType: "cp",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            altPhoneNumber: "",
            email: "",
            address: "",
            remark: "",
            projects: [],
            requirements: [],
            channelPartner: null,
            propertyType: "",
        });
        setIConfirm(false);
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

    return (
        <div className={styles.container}>
            <div className={styles.maincontainer}>
                <div className={styles.headline}>Client Tagging Form</div>
                <div className={styles.mainlable}>Client Details</div>
                <div className={styles.infocard}>
                    {/* Lead Type */}
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>
                                <FaStar className={styles.iconcolor} /> Lead Type
                            </label>
                            <select
                                value={formData.leadType}
                                name="leadType"
                                onChange={onChangeField}
                            >
                                <option value="cp">CP</option>
                                <option value="walk-in">Walk-in</option>
                                <option value="internal-lead">Internal-lead</option>
                            </select>
                        </div>
                    </div>


                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>
                                <IoPersonOutline className={styles.iconcolor} /> Client First Name
                            </label>
                            <input
                                type="text"
                                value={formData.firstName}
                                name="firstName"
                                onChange={onChangeField}
                            />
                        </div>
                        <div className={styles.formControl}>
                            <label>
                                < IoPersonOutline className={styles.iconcolor} /> Client Last Name
                            </label>
                            <input
                                type="text"
                                value={formData.lastName}
                                name="lastName"
                                onChange={onChangeField}
                            />
                        </div>
                        <div className={styles.formControl}>
                            <label>
                                <MdOutlineEmail className={styles.iconcolor} /> Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                name="email"
                                onChange={onChangeField}
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>
                                <MdOutlinePhoneInTalk className={styles.iconcolor} /> Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handlePhoneChange}
                                placeholder="Enter 10-digit phone"
                                maxLength={10}
                            />
                        </div>
                        <div className={styles.formControl}>
                            <label>
                                <MdLocalPhone className={styles.iconcolor} /> Alternate Phone
                            </label>
                            <input
                                type="tel"
                                name="altPhoneNumber"
                                value={formData.altPhoneNumber}
                                onChange={handlePhoneChange}
                                placeholder="Enter 10-digit phone"
                                maxLength={10}
                            />
                        </div>
                    </div>

                    {/* Dates */}
                    <div className={`${styles.card} ${styles.datecard}`}>
                        <div
                            className={styles.formControl}
                            onClick={() => tagdateRef.current?.showPicker()}
                        >
                            <label>
                                <IoIosCalendar className={styles.iconcolor} /> Tagged Date
                            </label>
                            <input
                                ref={tagdateRef}
                                value={startDate}
                                onChange={onChangeStartDate}
                                type="date"
                            />
                        </div>
                        <div
                            className={styles.formControl}
                            onClick={() => validTillRef.current?.showPicker()}
                        >
                            <label>
                                <IoMdCalendar className={styles.iconcolor} /> Valid Till
                            </label>
                            <input ref={validTillRef} type="date" value={validTill} disabled />
                        </div>
                    </div>

                    {/* Projects + Requirements */}
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>
                                <BsBuildingFill className={styles.iconcolor} /> Projects
                            </label>
                            <Select
                                isMulti
                                options={projectOptions}
                                value={formData.projects}
                                onChange={(selected: MultiValue<{ value: string; label: string }>) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        projects: [...selected],
                                    }));
                                }}
                                styles={customSelectStyles(currentTheme)}
                            />
                        </div>
                        <div className={styles.formControl}>
                            <label>
                                <BsBuildingFill className={styles.iconcolor} /> Requirements
                            </label>
                            <Select
                                isMulti
                                options={requirementOptions}
                                value={formData.requirements}

                                onChange={(selected: MultiValue<{ value: string; label: string }>) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        requirements: [...selected], // spread into a mutable array
                                    }));
                                }}
                                styles={customSelectStyles(currentTheme)}
                            />

                        </div>
                        <div className={styles.formControl}>
                            <label>
                                <FaStar className={styles.iconcolor} /> Property Type
                            </label>
                            <select
                                value={formData.propertyType}
                                name="propertyType"
                                onChange={onChangeField}
                            >
                                <option value="">Select Property Type</option>
                                <option value="residential">Residential</option>
                                <option value="commercial">Commercial</option>
                            </select>
                        </div>
                    </div>

                    {/* Address + Remark */}
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>
                                <IoLocation className={styles.iconcolor} /> Address
                            </label>
                            <textarea
                                rows={3}
                                value={formData.address}
                                name="address"
                                onChange={onChangeField}
                            />
                        </div>
                        <div className={styles.formControl}>
                            <label>
                                <LuNotebookPen className={styles.iconcolor} /> Remarks
                            </label>
                            <textarea
                                rows={3}
                                value={formData.remark}
                                name="remark"
                                onChange={onChangeField}
                            />
                        </div>
                    </div>
                </div>

                {/* Channel Partner */}
                <div className={styles.cpheadline}>Channel Partner</div>
                <div>

                </div >
                <div className={styles.channel}>
                    <div className={styles.card} >
                        <div className={styles.formControl}>
                            <label>
                                <IoPersonOutline className={styles.iconcolor} /> Channel Partner
                            </label>
                            <Select
                                options={channelPartnerOptions}
                                value={formData.channelPartner}
                                onChange={(val) => setFormData((prev) => ({ ...prev, channelPartner: val }))}
                                isClearable
                                styles={customSelectStyles(currentTheme)}
                            />
                        </div>
                    </div>
                </div>


                {/* Confirm */}
                <div className={styles.confirm}>
                    <p> Confirm Details</p>

                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                    />
                    <span>{checked ? "YES" : "NO"}</span>
                </div>

                {/* Buttons */}
                <div className={styles.buttoncontainer}>
                    <button className={styles.cancelbtn} onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className={styles.submitbtn} onClick={onSubmit}>
                        Submit
                    </button>
                </div>
            </div>


        </div>
    );
};

export default TaggingForm;
