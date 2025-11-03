"use client";

import { useState, useRef, useEffect, useMemo } from "react";
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


const TaggingFormComponent = () => {
    const [startDate, setStartDate] = useState("");
    const [validTill, setValidTill] = useState("");
    const [iConfirm, setIConfirm] = useState(false);
    const [checked, setChecked] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
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
        if (!startDate) newErrors.startDate = "Please select a Tagged Date.";
        if (!validTill) newErrors.validTill = "Valid Till date cannot be empty.";
      


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const onSubmit = () => {

        if (!validateForm()) return;
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
    useEffect(() => {
        if (typeof document !== "undefined") {
            const theme = document.documentElement.classList.contains("light") ? "light" : "dark";
            setCurrentTheme(theme);

            // Optional: Listen for theme changes dynamically (if using a theme toggle)
            const observer = new MutationObserver(() => {
                const updatedTheme = document.documentElement.classList.contains("light") ? "light" : "dark";
                setCurrentTheme(updatedTheme);
            });

            observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

            return () => observer.disconnect();
        }
    }, []);
    const customSelectStyles = useMemo(() => ({
        control: (base: any) => ({
            ...base,
            backgroundColor: currentTheme === "dark" ? "#151414f5" : "transparent",
            borderColor: currentTheme === "dark" ? "#444444f5" : "#927fbff5",
            minHeight: "40px",
            borderWidth: "2px",
            color: currentTheme === "dark" ? "white" : "#201f1f",
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: currentTheme === "dark" ? "#151414f5" : "white",
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected
                ? currentTheme === "dark"
                    ? "#007bff"
                    : "#cce5ff"
                : state.isFocused
                    ? currentTheme === "dark"
                        ? "#e6f0ff"
                        : "#f0f0f0"
                    : currentTheme === "dark"
                        ? "#fff"
                        : "#fff",
            color: state.isSelected
                ? currentTheme === "dark"
                    ? "white"
                    : "#201f1f"
                : "black",
        }),
        multiValue: (base: any) => ({
            ...base,
            backgroundColor: currentTheme === "dark" ? "#007bff" : "#cce5ff",
            color: currentTheme === "dark" ? "white" : "#201f1f",
        }),
        multiValueLabel: (base: any) => ({
            ...base,
            color: currentTheme === "dark" ? "white" : "#201f1f",
        }),
        multiValueRemove: (base: any) => ({
            ...base,
            color: currentTheme === "dark" ? "white" : "#201f1f",
            ":hover": {
                backgroundColor: "red",
                color: "white",
            },
        }),
    }), [currentTheme]);
    const RequiredLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
        <label style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            {icon}
            <span>{text}</span>
            <span style={{ color: "red", fontSize: "15px", marginLeft: "-1px" }}>*</span>
        </label>
    );
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
                                <RequiredLabel icon={<FaStar className={styles.iconcolor} />} text=" Lead Type" />
                            </label>
                            <select
                                value={formData.leadType}
                                name="leadType"
                                onChange={onChangeField}
                            >     <option value="">Select Lead Type</option>
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
                                <RequiredLabel icon={<IoPersonOutline className={styles.iconcolor} />} text="Client First Name" />
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
                                <RequiredLabel icon={<IoPersonOutline className={styles.iconcolor} />} text="Client Last Name" />

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
                                <RequiredLabel icon={<MdOutlineEmail className={styles.iconcolor} />} text="Email" />
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
                                <RequiredLabel icon={<MdOutlinePhoneInTalk className={styles.iconcolor} />} text="Phone Number" />
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
                                <RequiredLabel icon={<IoIosCalendar className={styles.iconcolor} />} text="Tagged Date" />
                            </label>
                            <input
                                ref={tagdateRef}
                                value={startDate}
                                onChange={onChangeStartDate}
                                type="date"
                            />
                             {errors.startDate && <p className={styles.errorMsg}>{errors.startDate}</p>}
                        </div>
                        <div
                            className={styles.formControl}
                            onClick={() => validTillRef.current?.showPicker()}
                        >
                            <label>
                                <IoMdCalendar className={styles.iconcolor} /> Valid Till
                            </label>
                            <input ref={validTillRef} type="date" value={validTill} disabled />
                                {errors.validTill && <p className={styles.errorMsg}>{errors.validTill}</p>}

                        </div>
                    </div>

                    {/* Projects + Requirements */}
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<BsBuildingFill className={styles.iconcolor} />} text="Projects" />
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
                                styles={customSelectStyles}
                            />
                            {errors.projects && <p className={styles.errorMsg}>{errors.projects}</p>}
                        </div>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<BsBuildingFill className={styles.iconcolor} />} text="Requirements" />

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
                                styles={customSelectStyles}
                            />
                            {errors.requirements && <p className={styles.errorMsg}>{errors.requirements}</p>}

                        </div>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<FaStar className={styles.iconcolor} />} text="Property Type" />

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
                            {errors.propertyType && <p className={styles.errorMsg}>{errors.propertyType}</p>}

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
                                <RequiredLabel icon={<IoPersonOutline className={styles.iconcolor} />} text="Channel Partner" />

                            </label>
                            <Select
                                options={channelPartnerOptions}
                                value={formData.channelPartner}
                                onChange={(val) => setFormData((prev) => ({ ...prev, channelPartner: val }))}
                                isClearable
                                styles={customSelectStyles}
                            />
                            {errors.channelPartner && <p className={styles.errorMsg}>{errors.channelPartner}</p>}

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
                    {errors.checked && <p className={styles.errorMsg}>{errors.checked}</p>}

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

export default TaggingFormComponent;
