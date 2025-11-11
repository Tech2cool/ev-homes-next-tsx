"use client";

import { useState } from "react";
import styles from "@/components/dashboard-components/data-analyzer-dashboard/taggingform.module.css";
import { FaBuilding, FaStar, FaCalendarAlt, FaUser } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { AiFillPicture } from "react-icons/ai";
import { FaArrowUpFromGroundWater } from "react-icons/fa6";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { Phone16Filled } from "@fluentui/react-icons";
import { MdLocalPhone } from "react-icons/md";
import { User } from "lucide-react";

interface FormState {
    firstName: string;
    lastName: string;
    phone: string;
    channelPartner: string;
    project: string;
    floor: string;
    flatNumber: string;
    floorRise: string;
    carpetArea: string;
    sellableCarpet: string;
    totalParking: string;
    parkingPrice: string;
    allInclusiveValue: string;
    developmentPrice: string;
    registrationCharges: string;
    commission: string;
    letterDate: string;
    bookingForm: File | null;
}

const Brokerage = () => {
    const [formData, setFormData] = useState<FormState>({
        firstName: "",
        lastName: "",
        phone: "",
        channelPartner: "",
        project: "",
        floor: "",
        flatNumber: "",
        floorRise: "",
        carpetArea: "",
        sellableCarpet: "",
        totalParking: "",
        parkingPrice: "",
        allInclusiveValue: "",
        developmentPrice: "",
        registrationCharges: "",
        commission: "",
        letterDate: "",
        bookingForm: null,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const onChangeField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, bookingForm: file }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.firstName) newErrors.firstName = "Enter First Name";
        if (!formData.lastName) newErrors.lastName = "Enter Last Name";
        if (!formData.phone) newErrors.phone = "Enter Phone Number";
        if (!formData.channelPartner) newErrors.channelPartner = "Select Channel Partner";
        if (!formData.project) newErrors.project = "Select Project";
        if (!formData.floor) newErrors.floor = "Select Floor";
        if (!formData.flatNumber) newErrors.flatNumber = "Enter Flat Number";
        if (!formData.carpetArea) newErrors.carpetArea = "Enter Carpet Area";
        if (!formData.sellableCarpet) newErrors.sellableCarpet = "Enter Sellable Carpet Area";
        if (!formData.allInclusiveValue) newErrors.allInclusiveValue = "Enter All Inclusive Value";
        if (!formData.developmentPrice) newErrors.developmentPrice = "Enter Development Price";
        if (!formData.registrationCharges) newErrors.registrationCharges = "Enter Registration Charges";
        if (!formData.commission) newErrors.commission = "Enter Commission";
        if (!formData.letterDate) newErrors.letterDate = "Select Letter Date";
        if (!formData.bookingForm) newErrors.bookingForm = "Upload Booking Form";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = () => {
        if (!validateForm()) return;
        alert("Form submitted successfully:\n" + JSON.stringify(formData, null, 2));
    };

    const handleCancel = () => {
        setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            channelPartner: "",
            project: "",
            floor: "",
            flatNumber: "",
            floorRise: "",
            carpetArea: "",
            sellableCarpet: "",
            totalParking: "",
            parkingPrice: "",
            allInclusiveValue: "",
            developmentPrice: "",
            registrationCharges: "",
            commission: "",
            letterDate: "",
            bookingForm: null,
        });
        setErrors({});
    };

    const RequiredLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
        <label style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            {icon}
            <span>{text}</span>
            <span style={{ color: "red", fontSize: "15px", marginLeft: "-1px" }}>*</span>
        </label>
    );

    return (
        <div className={styles.container}>
            <div className={styles.costcontainer}>
                <h2 className={styles.headline}>🔢 Brokerage Calculator</h2>

                <h3 className={styles.cpheadline}>Customer Details</h3>
                <div className={styles.infocard}>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label><IoPersonOutline className={styles.iconcolor} />First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={onChangeField} />
                            {errors.firstName && <p className={styles.errorMsg}>{errors.firstName}</p>}
                        </div>
                        <div className={styles.formControl}>

                            <label><IoPersonOutline className={styles.iconcolor} />Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={onChangeField} />
                            {errors.lastName && <p className={styles.errorMsg}>{errors.lastName}</p>}
                        </div>
                        <div className={styles.formControl}>
                            <label><MdLocalPhone className={styles.iconcolor} />Phone Number</label>

                            <input type="text" name="phone" value={formData.phone} onChange={onChangeField} />
                            {errors.phone && <p className={styles.errorMsg}>{errors.phone}</p>}
                        </div>
                    </div>
                </div>

                {/* Channel Partner */}
                <h3 className={styles.cpheadline}>Channel Partner</h3>
                <div className={styles.infocard}>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label><FaUser className={styles.iconcolor} />Select Channel Partner</label>
                            <select name="channelPartner" value={formData.channelPartner} onChange={onChangeField}>
                                <option value="">Select Partner</option>
                                <option value="John">John</option>
                                <option value="Sarah">Sarah</option>
                                <option value="Alex">Alex</option>
                            </select>
                            {errors.channelPartner && <p className={styles.errorMsg}>{errors.channelPartner}</p>}
                        </div>
                    </div>
                </div>

                {/* Project Details */}
                <h3 className={styles.cpheadline}>Project Details</h3>
                <div className={styles.infocard}>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label><FaBuilding className={styles.iconcolor} />Select Project</label>
                            <select name="project" value={formData.project} onChange={onChangeField}>
                                <option value="">Select Project</option>
                                <option value="marina">10 Marina Bay</option>
                                <option value="malibu">23 Malibu West</option>
                                <option value="square">9 Square</option>
                            </select>
                            {errors.project && <p className={styles.errorMsg}>{errors.project}</p>}
                        </div>

                        <div className={styles.formControl}>
                                                        <label><FaArrowUpFromGroundWater className={styles.iconcolor} />Floor</label>

                            <select name="floor" value={formData.floor} onChange={onChangeField}>
                                <option value="">Select Floor</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            {errors.floor && <p className={styles.errorMsg}>{errors.floor}</p>}
                        </div>
                        <div className={styles.formControl}>
                            <label><FaArrowUpFromGroundWater className={styles.iconcolor} />Flat no</label>

                            <select name="flatno" value={formData.floor} onChange={onChangeField}>
                                <option value="">Select Floor</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            {errors.floor && <p className={styles.errorMsg}>{errors.floor}</p>}
                        </div>


                    </div>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label><TbHexagonNumber1Filled className={styles.iconcolor} />Flat Number</label>
                            <input type="text" name="flatNumber" value={formData.flatNumber} onChange={onChangeField} />
                            {errors.flatNumber && <p className={styles.errorMsg}>{errors.flatNumber}</p>}
                        </div>

                        <div className={styles.formControl}>
                            <label><BiRupee className={styles.iconcolor} />Floor Rise</label>
                            <input type="text" name="floorRise" value={formData.floorRise} onChange={onChangeField} />
                        </div>

                        <div className={styles.formControl}>
                            <label><BiRupee className={styles.iconcolor} />Sellable Carpet Area</label>
                            <input type="text" name="sellableCarpet" value={formData.sellableCarpet} onChange={onChangeField} placeholder="Carpet Area x 1.7" />
                        </div>
                    </div>
                </div>

                {/* Property Specification */}
                <h3 className={styles.cpheadline}>Property Specification</h3>
                <div className={styles.infocard}>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>Carpet Area</label>
                            <input type="text" name="carpetArea" value={formData.carpetArea} onChange={onChangeField} />
                        </div>
                        <div className={styles.formControl}>
                            <label>Sellable Carpet Area</label>
                            <input type="text" name="sellableCarpet" value={formData.sellableCarpet} onChange={onChangeField} />
                        </div>
                       
                    </div>
                    <div className={styles.card}>
                         <div className={styles.formControl}>
                            <label>Total Parking</label>
                            <input type="text" name="totalParking" value={formData.totalParking} onChange={onChangeField} />
                        </div>
                        <div className={styles.formControl}>
                            <label>Parking Price</label>
                            <input type="text" name="parkingPrice" value={formData.parkingPrice} onChange={onChangeField} />
                        </div>
                    </div>
                </div>

                {/* Financial Details */}
                <h3 className={styles.cpheadline}>Financial Details</h3>
                <div className={styles.infocard}>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>All Inclusive Value</label>
                            <input type="text" name="allInclusiveValue" value={formData.allInclusiveValue} onChange={onChangeField} />
                        </div>
                        <div className={styles.formControl}>
                            <label>Development Price</label>
                            <input type="text" name="developmentPrice" value={formData.developmentPrice} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className={styles.card}>


                        <div className={styles.formControl}>
                            <label>Floor Rise</label>
                            <input type="text" name="floorRise" value={formData.floorRise} onChange={onChangeField} />
                        </div>
                        <div className={styles.formControl}>
                            <label>Registration Charges</label>
                            <input type="text" name="registrationCharges" value={formData.registrationCharges} onChange={onChangeField} />
                        </div>
                        <div className={styles.formControl}>
                            <label>Commission</label>
                            <input type="text" name="commission" value={formData.commission} onChange={onChangeField} />
                        </div>
                    </div>
                </div>

                {/* Letter Date and Booking Form */}
                <div className={styles.infocard}>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label><RequiredLabel icon={<FaCalendarAlt />} text="Letter Date" /></label>
                            <input type="date" name="letterDate" value={formData.letterDate} onChange={onChangeField} />
                            {errors.letterDate && <p className={styles.errorMsg}>{errors.letterDate}</p>}
                        </div>
                        <div className={styles.formControl}>
                            <label><RequiredLabel icon={<AiFillPicture />} text="Upload Booking Form" /></label>
                            <input type="file" accept="application/pdf" onChange={handleFileChange} />
                            {formData.bookingForm && <p>Uploaded: {formData.bookingForm.name}</p>}
                            {errors.bookingForm && <p className={styles.errorMsg}>{errors.bookingForm}</p>}
                        </div>
                    </div>
                </div>

                <div className={styles.buttoncontainer}>
                    <button className={styles.cancelbtn} onClick={handleCancel}>Reset Form</button>
                    <button className={styles.submitbtn} onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Brokerage;
