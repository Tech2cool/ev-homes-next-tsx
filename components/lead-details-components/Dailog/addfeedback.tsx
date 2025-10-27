"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css"
import { IoLocation, IoPersonOutline } from "react-icons/io5";
import { BsBuildingFill, BsLinkedin } from "react-icons/bs";
import Select, { MultiValue } from "react-select";
import { FaStar } from "react-icons/fa6";
import { PiBagFill } from "react-icons/pi";
import { AiFillPicture } from "react-icons/ai";
import ReactDOM from "react-dom";
import { MdCancel } from "react-icons/md";

interface AddFeedBaackProps {
    openclick: React.Dispatch<React.SetStateAction<boolean>>;
}
interface OptionType {
    value: string;
    label: string;
}
interface FormState {
    firstName: string;
    lastName: string;
    project: OptionType[];
    requirement: OptionType[];
    propertyType: string;
    notes: string;
    occupation: string;
    link: string;
    photo: File | null;
    remark: string,
}

const AddFeedBaack: React.FC<AddFeedBaackProps> = ({ openclick }) => {
    const currentTheme = document.documentElement.classList.contains("light") ? "light" : "dark";
    const dialogRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setformData] = useState<FormState>({
        firstName: "",
        lastName: "",
        project: [],
        requirement: [],
        propertyType: "",
        notes: "",
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
    const projectOptions = [
        { value: "p1", label: "EV 23 Malibu West" },
        { value: "p2", label: "EV 10 Mrina Bay" },
    ];
    const requirementOptions = [
        { value: "2BHK", label: "2BHK" },
        { value: "3BHK", label: "3BHK" },
    ];
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
    const handleCancel = () => {
        setformData({
            firstName: "",
            lastName: "",
            project: [],
            requirement: [],
            propertyType: "",
            notes: "",
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

        if (!formData.firstName.trim()) {
            newErrors.firstName = "Please enter First Name";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Please enter Last Name";
        }

        if (!formData.project || formData.project.length === 0) {
            newErrors.project = "Please select at least one Project";
        }

        if (!formData.requirement || formData.requirement.length === 0) {
            newErrors.requirement = "Please select at least one Requirement";
        }

        if (!formData.propertyType) {
            newErrors.propertyType = "Please select Property Type";
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
                <h3 className={styles.dialogTitle}>📝 Edit Lead Details</h3>
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
                    <div className={styles.mainlable}>Client Details</div>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<IoPersonOutline className={styles.iconcolor} />} text="Client First Name" />
                            </label>
                            <input
                                type="text"
                                value={formData.firstName}
                                name="firstName"
                                placeholder="first name...."
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
                                placeholder=" last name...."
                                onChange={onChangeField}
                            />
                            {errors.lastName && <p className={styles.errorMsg}>{errors.lastName}</p>}
                        </div>

                    </div>
                    <div className={styles.mainlable}>Project Deatis</div>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<BsBuildingFill className={styles.iconcolor} />} text="Projects" />
                            </label>
                            <Select
                                isMulti
                                options={projectOptions}
                                value={formData.project}
                                onChange={(selected) => {
                                    setformData((prev) => ({
                                        ...prev,
                                        project: [...selected],
                                    }));
                                }}
                                styles={customSelectStyles(currentTheme)}
                            />
                            {errors.project && <p className={styles.errorMsg}>{errors.project}</p>}
                        </div>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<BsBuildingFill className={styles.iconcolor} />} text="Requirements" />
                            </label>
                            <Select
                                isMulti
                                options={requirementOptions}
                                styles={customSelectStyles(currentTheme)}
                                value={formData.requirement}
                                onChange={(selected) => {
                                    setformData((prev) => ({
                                        ...prev,
                                        requirement: [...selected],
                                    }));
                                }}
                            />
                            {errors.requirement && <p className={styles.errorMsg}>{errors.requirement}</p>}
                        </div>

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
                    <div className={styles.formControl}>
                        <label>
                            <IoLocation className={styles.iconcolor} /> Additional Notes
                        </label>
                        <textarea
                            rows={2}
                            placeholder="Enter notes"
                            name="notes"
                            value={formData.notes}
                            onChange={onChangeField}
                        />


                    </div>
                    <div className={styles.mainlable}>Work Information</div>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>
                                <PiBagFill className={styles.iconcolor} /> Occupation
                            </label>
                            <input
                                type="text"

                                name="occupation"
                                placeholder="Enter occupation...."
                                value={formData.occupation}
                                onChange={onChangeField}
                            />
                        </div>
                        <div className={styles.formControl}>
                            <label>
                                < BsLinkedin className={styles.iconcolor} /> LinkedIn Profile
                            </label>
                            <input
                                type="text"

                                name="link"
                                placeholder=" Enter Link...."
                                value={formData.link}
                                onChange={onChangeField}
                            />
                        </div>

                    </div>

                    <div className={styles.formControl}>
                        <label>
                            <AiFillPicture className={styles.iconcolor} /> Upload Photo
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

export default AddFeedBaack;
