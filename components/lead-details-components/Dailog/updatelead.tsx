"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css"
import { IoLocation, IoPersonOutline } from "react-icons/io5";
import Switch from "@mui/material/Switch";

import ReactDOM from "react-dom";
import { MdCancel, MdLocalPhone, MdOutlineEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { IoIosCalendar, IoMdCalendar } from "react-icons/io";
import moment from "moment";
import { BsBuildingFill } from "react-icons/bs";
import Select, { MultiValue } from "react-select";
import { LuNotebookPen } from "react-icons/lu";

interface UpdateleadProps {
    openclick: React.Dispatch<React.SetStateAction<boolean>>;
}

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

const Updatelead: React.FC<UpdateleadProps> = ({ openclick }) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [startDate, setStartDate] = useState("");
    const [validTill, setValidTill] = useState("");
    const [checked, setChecked] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};


        if (!formData.leadType) newErrors.leadType = "Please select Lead Type.";
        if (!formData.firstName) newErrors.firstName = "Please enter First Name.";
        if (!formData.lastName) newErrors.lastName = "Please enter Last Name";
        if (!formData.firstName.trim()) newErrors.firstName = "Enter first name.";
        if (!formData.lastName.trim()) newErrors.lastName = "Enter last name.";
        if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 10)
            newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
        if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
            newErrors.email = "Enter a valid email.";
        if (formData.projects.length === 0) newErrors.projects = "Select at least one project.";
        if (formData.requirements.length === 0)
            newErrors.requirements = "Select at least one requirement.";
        if (!formData.propertyType)
            newErrors.propertyType = "Please select property type.";
        if (!checked) newErrors.checked = "Please confirm the details first";
        if (!formData.channelPartner) newErrors.channelPartner = "Please select channel Partner.";



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const onSubmit = () => {

        if (!validateForm()) return;
        // If all validations pass
        alert("Form submitted successfully: \n" + JSON.stringify(formData, null, 2));
        openclick(false);
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

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
                openclick(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [openclick]);
    return ReactDOM.createPortal(

        <div className={styles.dialogOverlay}>
            <div ref={dialogRef} className={styles.dialog}>

                <div className={styles.maincontainer}>
                    <div className={styles.dialogTitle}>Client Tagging Form</div>
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
                    <div className={styles.mainlable}>Client Details</div>
                    <div className={styles.infocard}>
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
                                {errors.leadType && <p className={styles.errorMsg}>{errors.leadType}</p>}
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
                                {errors.firstName && <p className={styles.errorMsg}>{errors.firstName}</p>}
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
                                {errors.lastName && <p className={styles.errorMsg}>{errors.lastName}</p>}
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
                                {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
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
                                {errors.phoneNumber && <p className={styles.errorMsg}>{errors.phoneNumber}</p>}
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
                                {errors.projects && <p className={styles.errorMsg}>{errors.projects}</p>}

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
                                {errors.channelPartner && <p className={styles.errorMsg}>{errors.channelPartner}</p>}
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
                    <div className={styles.mainlable}>Channel Partner</div>
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
                                {errors.channelPartner && <p className={styles.errorMsg}>{errors.channelPartner}</p>}

                            </div>
                        </div>
                    </div>


                    <div className={styles.confirm}>
                        <p> Confirm Details</p>

                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            color="primary"
                        />
                        <span>{checked ? "YES" : "NO"}</span>
                        {errors.checked && <p className={styles.errorMsg}>{errors.checked}</p>}
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

export default Updatelead;
