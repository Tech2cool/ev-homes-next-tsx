"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css"
import { IoLocation, IoLocationSharp, IoPersonOutline, IoReceipt } from "react-icons/io5";

import { FaArrowUpFromGroundWater, FaBuilding, FaCheck, FaDoorClosed, FaFileContract, FaFileInvoice, FaFileInvoiceDollar, FaFileSignature, FaHashtag, FaIdCard, FaPlus, FaStamp, FaStar, FaUser } from "react-icons/fa6";

import ReactDOM from "react-dom";
import { FaBalanceScale, FaCalendarAlt, FaParking, FaRegFileAlt } from "react-icons/fa";
import { CiSquareAlert } from "react-icons/ci";
import { MdCancel, MdLocalParking, MdOutlineCurrencyRupee, MdOutlineEmail, MdOutlineFileUpload, MdOutlineNumbers } from "react-icons/md";
import { GiModernCity } from "react-icons/gi";
import { BiSolidBookContent } from "react-icons/bi";
import { LuBuilding2 } from "react-icons/lu";
import { TbHexagonNumber1Filled } from "react-icons/tb";

interface AddBookingProps {
    openclick: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Applicant {
    prefix: string;
    firstName: string;
    lastName: string;
    email: string;
    aadhaarUploaded: boolean;
    panUploaded: boolean;
    otherUploaded: boolean;
    apliaddress: string;
}
interface Payment {
    id: number;
    paymentType: string;
    paymentMode: string;
    date: string;
    tdsAmount: string;
    receiptNo: string;
    transactionNo: string;
}

interface FormState {
    bookingDate: string;
    bookingstatus: string;
    project: string;
    blug: string;
    floor: string;
    unit: string;
    Flatno: string;
    carpet: string;
    Cost: string;
    notes: string;
    parkingno: string;
    prfloor: string;
    photo: File | null;
    remark: string,
    applicants: Applicant[];
    address: string;
    pincode: string;
    city: string;
    assignto: string;
    manager: string;
    backphoto: File | null;
    frontphoto: File | null;
}

const AddBooking: React.FC<AddBookingProps> = ({ openclick }) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [currentStep, setCurrentStep] = useState(0);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [parkingList, setParkingList] = useState<{ prfloor: string; parkingno: string }[]>([]);
    const [confirmChecked, setConfirmChecked] = useState(false);

    const addParking = () => {
        setParkingList([...parkingList, { prfloor: "", parkingno: "" }]);
    };

    const removeParking = (index: number) => {
        const updated = [...parkingList];
        updated.splice(index, 1);
        setParkingList(updated);
    };

    const updateParkingField = (index: number, field: "prfloor" | "parkingno", value: string) => {
        const updated = [...parkingList];
        updated[index][field] = value;
        setParkingList(updated);
    };

    const handleAddPayment = () => {
        const newPayment: Payment = {
            id: Date.now(),
            paymentType: "",
            paymentMode: "",
            date: "",
            tdsAmount: "",
            receiptNo: "",
            transactionNo: ""
        };
        setPayments((prev) => [...prev, newPayment]);
    };


    const handleRemovePayment = (id: number) => {
        setPayments((prev) => prev.filter((payment) => payment.id !== id));
    };

    const [formData, setformData] = useState<FormState>({
        bookingDate: "",
        bookingstatus: "",
        project: "",
        blug: "",
        floor: "",
        unit: "",
        Flatno: "",
        carpet: "",
        Cost: "",
        notes: "",
        photo: null,
        remark: "",
        prfloor: "",
        parkingno: "",
        address: "",
        applicants: [],
        pincode: "",
        city: "",
        assignto: "",
        manager: "",
        backphoto: null,
        frontphoto: null,
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
            bookingDate: "",
            bookingstatus: "",
            project: "",
            blug: "",
            floor: "",
            unit: "",
            Flatno: "",
            carpet: "",
            Cost: "",
            address: "",
            notes: "",
            photo: null,
            remark: "",
            prfloor: "",
            parkingno: "",
            applicants: [],
            pincode: "",
            city: "",
            assignto: "",
            manager: "",
            backphoto: null,
            frontphoto: null,
        })
        openclick(false);
    }
    const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setformData((prev) => ({ ...prev, [name]: value }));
    };
    const validateStep = (stepIndex: number) => {
        const newErrors: any = {};

        if (stepIndex === 0) {
            if (!formData.bookingDate) newErrors.bookingDate = "Booking date is required";
            if (!formData.bookingstatus) newErrors.bookingstatus = "Booking status is required";
            if (!formData.project) newErrors.project = "Project selection is required";
            if (!formData.blug) newErrors.blug = "Blug selection is required";
            if (!formData.floor) newErrors.floor = "Floor selection is required";
            if (!formData.unit) newErrors.unit = "Unit selection is required";

            if (!formData.Flatno || !formData.Flatno.trim()) newErrors.Flatno = "Flat number is required";
            if (!formData.carpet || !formData.carpet.trim()) newErrors.carpet = "Carpet area is required";
            if (!formData.Cost || !formData.Cost.trim()) newErrors.Cost = "Flat cost is required";

            parkingList.forEach((p, index) => {
                if (!p.prfloor) newErrors[`parkingList-${index}-prfloor`] = "Select Parking Floor";
                if (!p.parkingno) newErrors[`parkingList-${index}-parkingno`] = "Select Parking Number";
            });
        }
        if (stepIndex === 1) {
            if (!formData.address.trim()) newErrors.address = "Address is required";
            if (!formData.city.trim()) newErrors.city = "City is required";
            if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";

            if (formData.applicants.length === 0) {
                newErrors.applicants = "At least one applicant is required";
            } else {
                formData.applicants.forEach((applicant, index) => {
                    if (!applicant.prefix?.trim())
                        newErrors[`applicant-${index}-prefix`] = `required`;
                    if (!applicant.firstName?.trim())
                        newErrors[`applicant-${index}-firstName`] = `First name is required `;
                    if (!applicant.lastName?.trim())
                        newErrors[`applicant-${index}-lastName`] = `Last name is required `;
                    if (!applicant.email?.trim())
                        newErrors[`applicant-${index}-email`] = `Email is required `;
                    if (!applicant.apliaddress?.trim())
                        newErrors[`applicant-${index}-apliaddress`] = `apliaddress is required `;

                });
            }
        }
        if (stepIndex === 2) {
            if (!formData.manager.trim()) newErrors.manager = " Closing manager is required";
            if (!formData.assignto.trim()) newErrors.assignto = "assign to is required";
        }
        if (stepIndex === 3) {
            if (!formData.frontphoto) newErrors.frontphoto = "front Photo is required";
            if (!formData.backphoto) newErrors.backphoto = "Back Photo to is required";
        }
        if (stepIndex === 4) {
            if (payments.length === 0) {
                newErrors.payments = "Please add at least one payment";
            } else {
                payments.forEach((payment, index) => {
                    if (!payment.paymentType.trim()) newErrors[`payment-${index}-type`] = "Select payment type";
                    if (!payment.paymentMode.trim()) newErrors[`payment-${index}-mode`] = "Select payment mode";
                    if (!payment.date.trim()) newErrors[`payment-${index}-date`] = "Select payment date";
                    if (!payment.tdsAmount.trim()) newErrors[`payment-${index}-tds`] = "Enter TDS amount";
                    if (!payment.receiptNo.trim()) newErrors[`payment-${index}-receipt`] = "Enter receipt number";
                    if (!payment.transactionNo.trim()) newErrors[`payment-${index}-txn`] = "Enter transaction number";
                });
            }
            if (!confirmChecked) newErrors["confirmChecked"] = "Please confirm that all information is correct.";

        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = () => {
        const newErrors: { [key: string]: string } = {};

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
    const handleApplicantsCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const count = parseInt(e.target.value);
        if (!count) return setformData(prev => ({ ...prev, applicants: [] }));

        const newApplicants: Applicant[] = Array(count)
            .fill(null)
            .map((_, i) => formData.applicants[i] || { firstName: "", lastName: "", });

        setformData(prev => ({ ...prev, applicants: newApplicants }));
    };
    const handlePaymentChange = (id: number, field: keyof Payment, value: string) => {
        setPayments((prev) =>
            prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
        );
    };


    const steps = [
        "Booking Overview",
        "Applicants",
        "Team Overview",
        "Pre-registration",
        "Payment",
    ];
    const stepFields = [
        {
            title: "Booking Overview",
            fields: (
                <>

                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<FaCalendarAlt className={styles.iconcolor} />} text="Booking Date" />
                        </label>
                        <input
                            type="date"
                            name="bookingDate"
                            value={(formData as any).bookingDate || ""}
                            onChange={onChangeField}
                        />
                        {errors.bookingDate && <p className={styles.errorMsg}>{errors.bookingDate}</p>}
                    </div>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<FaStar className={styles.iconcolor} />} text="Booking Status" />
                            </label>
                            <select
                                value={formData.bookingstatus}
                                name="bookingstatus"
                                onChange={onChangeField}
                            >
                                <option value="">Select Status Type</option>
                                <option value="Confirm">Confirm booking</option>
                                <option value="Eoi">Eoi recieved</option>
                            </select>
                            {errors.bookingstatus && <p className={styles.errorMsg}>{errors.bookingstatus}</p>}

                        </div>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<FaBuilding className={styles.iconcolor} />} text="Project" />
                            </label>
                            <select
                                value={formData.project}
                                name="project"
                                onChange={onChangeField}
                            >
                                <option value="">Select project Type</option>
                                <option value="residential">10 Marina bay</option>
                                <option value="commercial">9 square</option>
                            </select>
                            {errors.project && <p className={styles.errorMsg}>{errors.project}</p>}

                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<LuBuilding2 className={styles.iconcolor} />} text="Blug" />
                            </label>
                            <select
                                value={formData.blug}
                                name="blug"
                                onChange={onChangeField}
                            >
                                <option value="">Select Blug</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                            {errors.blug && <p className={styles.errorMsg}>{errors.blug}</p>}

                        </div>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<FaArrowUpFromGroundWater className={styles.iconcolor} />} text="Floor" />
                            </label>
                            <select
                                value={formData.floor}
                                name="floor"
                                onChange={onChangeField}
                            >
                                <option value="">Select floor </option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                            </select>
                            {errors.floor && <p className={styles.errorMsg}>{errors.floor}</p>}


                        </div>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<TbHexagonNumber1Filled className={styles.iconcolor} />} text="Unit" />
                            </label>
                            <select
                                value={formData.unit}
                                name="unit"
                                onChange={onChangeField}
                            >
                                <option value="">Select Unit </option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                            </select>
                            {errors.unit && <p className={styles.errorMsg}>{errors.unit}</p>}

                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.formControl}>
                            <label>

                                <RequiredLabel icon={<FaDoorClosed className={styles.iconcolor} />} text="Flat No" />
                            </label>
                            <input
                                type="text"

                                name="Flatno"
                                placeholder="Enter Flat no...."
                                value={formData.Flatno}
                                onChange={onChangeField}
                            />
                            {errors.Flatno && <p className={styles.errorMsg}>{errors.Flatno}</p>}
                        </div>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel icon={<CiSquareAlert className={styles.iconcolor} />} text="Carpet Area (sq.ft)" />
                            </label>
                            <input
                                type="text"

                                name="carpet"
                                placeholder=" Enter Carpet Area..."
                                value={formData.carpet}
                                onChange={onChangeField}
                            />
                            {errors.carpet && <p className={styles.errorMsg}>{errors.carpet}</p>}

                        </div>

                    </div>
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<MdOutlineCurrencyRupee className={styles.iconcolor} />} text="Flat Cost" />
                        </label>
                        <input
                            type="text"

                            name="Cost"
                            placeholder=" Enter Flat Cost..."
                            value={formData.Cost}
                            onChange={onChangeField}
                        />
                        {errors.Cost && <p className={styles.errorMsg}>{errors.Cost}</p>}
                    </div>
                    <div className={styles.formControl}>
                        <div style={{ display: "flex", gap: "15px", alignItems: "center", paddingTop: "12px" }}>
                            <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <FaParking className={styles.iconcolor} /> No. Parking: <span style={{ color: "red" }}>{parkingList.length}</span>
                            </label>
                            <button
                                style={{
                                    backgroundColor: "#0072ff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "23px",
                                    height: "23px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                }}
                                onClick={addParking}
                            >
                                <FaPlus />
                            </button>
                        </div>

                        {parkingList.map((p, index) => (
                            <div className={styles.card} key={index} style={{ marginTop: "10px", position: "relative" }}>
                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<MdLocalParking className={styles.iconcolor} />} text="Parking Floor" />
                                    </label>
                                    <select
                                        value={p.prfloor}
                                        onChange={(e) => updateParkingField(index, "prfloor", e.target.value)}
                                    >
                                        <option value="">Select Floor</option>
                                        <option value="Ground">Ground</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                    {errors[`parkingList-${index}-prfloor`] && <p className={styles.errorMsg}>{errors[`parkingList-${index}-prfloor`]}</p>}
                                </div>

                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<MdOutlineNumbers className={styles.iconcolor} />} text="Parking Number" />
                                    </label>
                                    <select
                                        value={p.parkingno}
                                        onChange={(e) => updateParkingField(index, "parkingno", e.target.value)}
                                    >
                                        <option value="">Select Number</option>
                                        <option value="P1">P1</option>
                                        <option value="P2">P2</option>
                                        <option value="P3">P3</option>
                                    </select>
                                    {errors[`parkingList-${index}-parkingno`] && <p className={styles.errorMsg}>{errors[`parkingList-${index}-parkingno`]}</p>}
                                </div>

                                <MdCancel style={{
                                    position: "absolute",
                                    top: "-2px",
                                    right: "5px",
                                    color: "red",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "23px",
                                    height: "23px",
                                    cursor: "pointer",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                    onClick={() => removeParking(index)} />
                            </div>
                        ))}
                    </div>


                </>
            ),
        },
        {
            title: "Applicants",
            fields: (
                <>
                    <div className={styles.formControl}>
                        <label>

                            <RequiredLabel icon={<IoLocationSharp className={styles.iconcolor} />} text="Address" />
                        </label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Enter Address...."
                            value={formData.address}
                            onChange={onChangeField}
                        />
                        {errors.address && <p className={styles.errorMsg}>{errors.address}</p>}
                    </div>
                    <div className={styles.card}>

                        <div className={styles.formControl}>
                            <label>

                                <RequiredLabel icon={<GiModernCity className={styles.iconcolor} />} text="City" />
                            </label>
                            <input
                                type="text"
                                value={formData.city}
                                name="city"
                                placeholder="Enter city name...."

                                onChange={onChangeField}
                            />
                            {errors.city && <p className={styles.errorMsg}>{errors.city}</p>}
                        </div>
                        <div className={styles.formControl}>
                            <label>

                                <RequiredLabel icon={<FaHashtag className={styles.iconcolor} />} text="Pincode" />
                            </label>
                            <input
                                type="text"
                                value={formData.pincode}
                                name="pincode"
                                placeholder="Enter pincode...."

                                onChange={onChangeField}
                            />
                            {errors.pincode && <p className={styles.errorMsg}>{errors.pincode}</p>}
                        </div>

                    </div>
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<FaStar className={styles.iconcolor} />} text="No of Applicants" />
                        </label>
                        <select
                            value={formData.applicants.length}
                            onChange={handleApplicantsCountChange}
                        >
                            <option value="">Select Applicants</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>


                    {formData.applicants.map((applicant, index) => (
                        <div key={index}>
                            <h4 style={{ color: "#476cff" }}>Applicant {index + 1}</h4>

                            <div className={styles.card}>
                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<IoPersonOutline className={styles.iconcolor} />} text="First Name" />
                                    </label>

                                    <div style={{ display: "flex", gap: "10px" }}>
                                        {/* Title / Prefix */}
                                        <div className={styles.formControl}>
                                            <select
                                                name="prefix"
                                                value={applicant.prefix}
                                                onChange={(e) => {
                                                    const updated = [...formData.applicants];
                                                    updated[index].prefix = e.target.value;
                                                    setformData((prev) => ({ ...prev, applicants: updated }));
                                                }}
                                            >
                                                <option value="">Title</option>
                                                <option value="Mr.">Mr.</option>
                                                <option value="Ms.">Ms.</option>
                                                <option value="Miss">Miss</option>
                                                <option value="Dr.">Dr.</option>
                                            </select>
                                            {errors[`applicant-${index}-prefix`] && (
                                                <p className={styles.errorMsg}>{errors[`applicant-${index}-prefix`]}</p>
                                            )}
                                        </div>

                                        {/* First Name */}
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={applicant.firstName}
                                                placeholder="First Name"
                                                style={{ flex: 1 }}
                                                onChange={(e) => {
                                                    const updated = [...formData.applicants];
                                                    updated[index].firstName = e.target.value;
                                                    setformData((prev) => ({ ...prev, applicants: updated }));
                                                }}
                                            />
                                            {errors[`applicant-${index}-firstName`] && (
                                                <p className={styles.errorMsg}>{errors[`applicant-${index}-firstName`]}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<IoPersonOutline className={styles.iconcolor} />} text="Last Name" />
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={applicant.lastName}
                                        placeholder="Last Name"
                                        onChange={(e) => {
                                            const updated = [...formData.applicants];
                                            updated[index].lastName = e.target.value;
                                            setformData((prev) => ({ ...prev, applicants: updated }));
                                        }}
                                    />
                                    {errors[`applicant-${index}-lastName`] && (
                                        <p className={styles.errorMsg}>{errors[`applicant-${index}-lastName`]}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email + Address */}
                            <div className={styles.card}>
                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<MdOutlineEmail className={styles.iconcolor} />} text="Email" />
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={applicant.email}
                                        placeholder="Enter email address"
                                        onChange={(e) => {
                                            const updated = [...formData.applicants];
                                            updated[index].email = e.target.value;
                                            setformData((prev) => ({ ...prev, applicants: updated }));
                                        }}
                                    />
                                    {errors[`applicant-${index}-email`] && (
                                        <p className={styles.errorMsg}>{errors[`applicant-${index}-email`]}</p>
                                    )}
                                </div>

                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<IoLocationSharp className={styles.iconcolor} />} text="Address" />
                                    </label>
                                    <input
                                        type="text"
                                        name="apliaddress"
                                        value={applicant.apliaddress || ""}
                                        placeholder="Enter address"
                                        onChange={(e) => {
                                            const updated = [...formData.applicants];
                                            updated[index].apliaddress = e.target.value;
                                            setformData((prev) => ({ ...prev, applicants: updated }));
                                        }}
                                    />
                                    {errors[`applicant-${index}-apliaddress`] && (
                                        <p className={styles.errorMsg}>{errors[`applicant-${index}-apliaddress`]}</p>
                                    )}
                                </div>
                            </div>

                            {/* Document Uploads */}
                            <div className={styles.card} style={{ marginTop: "15px" }}>
                                {/* Aadhaar Upload */}
                                <div className={styles.formControl}>
                                    <label
                                        htmlFor={`aadhaar-${index}`}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Aadhaar Card
                                        <span
                                            style={{
                                                backgroundColor: "#476cff",
                                                color: "white",
                                                borderRadius: "50%",
                                                width: "22px",
                                                height: "22px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {applicant.aadhaarUploaded ? <FaCheck size={14} /> : "+"}
                                        </span>
                                    </label>
                                    <input
                                        id={`aadhaar-${index}`}
                                        type="file"
                                        name="aadhaar"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        style={{ display: "none" }}
                                        onChange={(e) => {
                                            const updated = [...formData.applicants];
                                            updated[index].aadhaarUploaded = !!e.target.files?.length;
                                            setformData((prev) => ({ ...prev, applicants: updated }));
                                        }}
                                    />
                                    {errors[`applicant-${index}-aadhaar`] && (
                                        <p className={styles.errorMsg}>{errors[`applicant-${index}-aadhaar`]}</p>
                                    )}
                                </div>

                                {/* PAN Upload */}
                                <div className={styles.formControl}>
                                    <label
                                        htmlFor={`pan-${index}`}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        PAN Card
                                        <span
                                            style={{
                                                backgroundColor: "#476cff",
                                                color: "white",
                                                borderRadius: "50%",
                                                width: "22px",
                                                height: "22px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {applicant.panUploaded ? <FaCheck size={14} /> : "+"}
                                        </span>
                                    </label>
                                    <input
                                        id={`pan-${index}`}
                                        type="file"
                                        name="pan"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        style={{ display: "none" }}
                                        onChange={(e) => {
                                            const updated = [...formData.applicants];
                                            updated[index].panUploaded = !!e.target.files?.length;
                                            setformData((prev) => ({ ...prev, applicants: updated }));
                                        }}
                                    />
                                    {errors[`applicant-${index}-pan`] && (
                                        <p className={styles.errorMsg}>{errors[`applicant-${index}-pan`]}</p>
                                    )}
                                </div>

                                {/* Other Document Upload */}
                                <div className={styles.formControl}>
                                    <label
                                        htmlFor={`other-${index}`}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Other Document
                                        <span
                                            style={{
                                                backgroundColor: "#476cff",
                                                color: "white",
                                                borderRadius: "50%",
                                                width: "22px",
                                                height: "22px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {applicant.otherUploaded ? <FaCheck size={14} /> : "+"}
                                        </span>
                                    </label>
                                    <input
                                        id={`other-${index}`}
                                        type="file"
                                        name="otherDocument"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        style={{ display: "none" }}
                                        onChange={(e) => {
                                            const updated = [...formData.applicants];
                                            updated[index].otherUploaded = !!e.target.files?.length;
                                            setformData((prev) => ({ ...prev, applicants: updated }));
                                        }}
                                    />
                                    {errors[`applicant-${index}-other`] && (
                                        <p className={styles.errorMsg}>{errors[`applicant-${index}-other`]}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}





                </>
            ),
        },
        {
            title: "Team Overview",
            fields: (
                <>
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<FaUser className={styles.iconcolor} />} text="Closing Manager" />
                        </label>
                        <select
                            value={formData.manager}
                            name="manager"
                            onChange={onChangeField}
                        >
                            <option value="">Select Closing Manager</option>
                            <option value="Deepak">Deepak</option>
                            <option value="mane">mane</option>
                        </select>
                        {errors.manager && <p className={styles.errorMsg}>{errors.manager}</p>}

                    </div>
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<FaUser className={styles.iconcolor} />} text="Assign To" />
                        </label>
                        <select
                            value={formData.assignto}
                            name="assignto"
                            onChange={onChangeField}
                        >
                            <option value="">Select Assign To</option>
                            <option value="mona">mona</option>
                            <option value="snehal">snehal</option>
                        </select>
                        {errors.assignto && <p className={styles.errorMsg}>{errors.assignto}</p>}

                    </div>

                </>
            ),
        },
        {
            title: "Pre-registration",
            fields:
                (
                    <>
                        <div className={styles.formControl}>
                            <label>
                                <RequiredLabel
                                    icon={<MdOutlineFileUpload className={styles.iconcolor} />}
                                    text="Upload Booking Form"
                                />
                            </label>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.formControl}>
                                <label>
                                    <RequiredLabel
                                        icon={<MdOutlineFileUpload className={styles.iconcolor} />}
                                        text="Upload Frontside"
                                    />
                                </label>
                                <input type="file"
                                    name="frontphoto"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        setformData((prev) => ({ ...prev, frontphoto: file }));
                                    }}
                                    placeholder="Upload Frontside..." />
                                {errors.frontphoto && <p className={styles.errorMsg}>{errors.frontphoto}</p>}
                            </div>

                            <div className={styles.formControl}>
                                <label>
                                    <RequiredLabel
                                        icon={<MdOutlineFileUpload className={styles.iconcolor} />}
                                        text="Upload Backside"
                                    />
                                </label>
                                <input type="file" name="backphoto"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        setformData((prev) => ({ ...prev, backphoto: file }));
                                    }}
                                    placeholder="Upload Backside..." />
                                {errors.backphoto && <p className={styles.errorMsg}>{errors.backphoto}</p>}
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.formControl}>
                                <label>
                                    <IoReceipt className={styles.iconcolor} /> 10% Received
                                </label>

                                <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="tenPercentReceived" value="yes" /> Yes
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="tenPercentReceived" value="no" /> No
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="tenPercentReceived" value="partial" /> Partial
                                    </label>
                                </div>

                                <input type="text" placeholder="Remark" className={styles.remarkInput} />
                            </div>

                            <div className={styles.formControl}>
                                <label>
                                    <FaStamp className={styles.iconcolor} /> Stamp Duty Received
                                </label>

                                <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="StampDutyReceived" value="yes" /> Yes
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="StampDutyReceived" value="no" /> No
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="StampDutyReceived" value="partial" /> Partial
                                        <select className={styles.percentDropdown}>
                                            <option value="">%</option>
                                            <option value="5">5%</option>
                                            <option value="6">6%</option>
                                        </select>
                                    </label>
                                </div>

                                <input type="text" placeholder="Remark" className={styles.remarkInput} />
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.formControl}>
                                <label>
                                    <FaFileInvoiceDollar className={styles.iconcolor} /> TDS Received
                                </label>

                                <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="tdsReceived" value="yes" /> Yes
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="tdsReceived" value="no" /> No
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="tdsReceived" value="partial" /> Partial
                                    </label>
                                </div>

                                <input type="text" placeholder="Remark" className={styles.remarkInput} />
                            </div>

                            <div className={styles.formControl}>
                                <label>
                                    <FaFileInvoice className={styles.iconcolor} /> GST Received
                                </label>

                                <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="gstReceived" value="yes" /> Yes
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="gstReceived" value="no" /> No
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="gstReceived" value="partial" /> Partial
                                        <select className={styles.percentDropdown}>
                                            <option value="">%</option>
                                            <option value="5">5%</option>
                                            <option value="6">6%</option>
                                        </select>
                                    </label>
                                </div>

                                <input type="text" placeholder="Remark" className={styles.remarkInput} />
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.formControl}>
                                <label>
                                    <FaFileSignature className={styles.iconcolor} /> NOC Received
                                </label>

                                <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="nocReceived" value="yes" /> Yes
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="nocReceived" value="no" /> No
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formControl}>
                                <label>
                                    <FaIdCard className={styles.iconcolor} /> KYC Received
                                </label>

                                <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="kycReceived" value="yes" /> Yes
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="kycReceived" value="no" /> No
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formControl}>
                                <label>
                                    <FaBalanceScale className={styles.iconcolor} /> Legal Charges
                                </label>

                                <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="legalReceived" value="yes" /> Yes
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="legalReceived" value="no" /> No
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.formControl}>
                                <label>
                                    <BiSolidBookContent className={styles.iconcolor} /> Registration Done
                                </label>

                                <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="registdone" value="yes" /> Yes
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="registdone" value="no" /> No
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formControl}>
                                <label>
                                    <FaRegFileAlt className={styles.iconcolor} /> Agreement Prepared
                                </label>

                                <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="Preagrement" value="yes" /> Yes
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="Preagrement" value="no" /> No
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formControl}>
                                <label>
                                    <FaFileContract className={styles.iconcolor} /> Agreement Handover
                                </label>

                                <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="hanagreement" value="yes" /> Yes
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input type="radio" name="hanagreement" value="no" /> No
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>

                ),
        },
        {
            title: "Payment",
            fields: (
                <>
                    <div className={styles.formControl}>
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <p>Received payment towards Booking</p>
                            <button
                                onClick={handleAddPayment}
                                style={{
                                    backgroundColor: "#0072ff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "23px",
                                    height: "23px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <FaPlus />
                            </button>
                        </div>
                    </div>


                    {payments.map((payment, index) => (
                        <div key={payment.id}>
                            <div className={styles.formControl} style={{ position: "relative", marginTop: "10px" }}>
                                <p style={{ color: "#0072ff" }}>
                                    ({index + 1}) Payment - online - null
                                </p>
                                <MdCancel
                                    onClick={() => handleRemovePayment(payment.id)}
                                    style={{
                                        position: "absolute",
                                        top: "-2px",
                                        right: "5px",
                                        color: "red",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "23px",
                                        height: "23px",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>

                            {/* CARD 1 — Payment Type + Mode */}
                            <div className={styles.card}>
                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<FaUser className={styles.iconcolor} />} text="Payment Type" />
                                    </label>
                                    <select
                                        name="paymentType"
                                        value={payment.paymentType}
                                        onChange={(e) => handlePaymentChange(payment.id, "paymentType", e.target.value)}
                                    >
                                        <option value="">Select Payment Type</option>
                                        <option value="Booking">Booking</option>
                                        <option value="GST">GST</option>
                                        <option value="TDS">TDS</option>
                                    </select>
                                    {errors[`payment-${index}-type`] && (
                                        <p className={styles.errorMsg}>{errors[`payment-${index}-type`]}</p>
                                    )}
                                </div>

                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<FaUser className={styles.iconcolor} />} text="Payment Mode" />
                                    </label>
                                    <select
                                        name="paymentMode"
                                        value={payment.paymentMode}
                                        onChange={(e) => handlePaymentChange(payment.id, "paymentMode", e.target.value)}
                                    >
                                        <option value="">Select Payment Mode</option>
                                        <option value="Online">Online</option>
                                        <option value="Cheque">Cheque</option>
                                    </select>
                                    {errors[`payment-${index}-mode`] && (
                                        <p className={styles.errorMsg}>{errors[`payment-${index}-mode`]}</p>
                                    )}
                                </div>
                            </div>

                            {/* CARD 2 — Date + TDS Amount */}
                            <div className={styles.card}>
                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<FaCalendarAlt className={styles.iconcolor} />} text="Date" />
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={payment.date}
                                        onChange={(e) => handlePaymentChange(payment.id, "date", e.target.value)}
                                    />
                                    {errors[`payment-${index}-date`] && (
                                        <p className={styles.errorMsg}>{errors[`payment-${index}-date`]}</p>
                                    )}
                                </div>

                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<CiSquareAlert className={styles.iconcolor} />} text="Received TDS Amount" />
                                    </label>
                                    <input
                                        type="text"
                                        name="tdsAmount"
                                        value={payment.tdsAmount}
                                        onChange={(e) => handlePaymentChange(payment.id, "tdsAmount", e.target.value)}
                                        placeholder="Enter TDS Amount..."
                                    />
                                    {errors[`payment-${index}-tds`] && (
                                        <p className={styles.errorMsg}>{errors[`payment-${index}-tds`]}</p>
                                    )}
                                </div>
                            </div>

                            {/* CARD 3 — Receipt No + Transaction No */}
                            <div className={styles.card}>
                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<CiSquareAlert className={styles.iconcolor} />} text="Receipt No" />
                                    </label>
                                    <input
                                        type="text"
                                        name="receiptNo"
                                        value={payment.receiptNo}
                                        onChange={(e) => handlePaymentChange(payment.id, "receiptNo", e.target.value)}
                                        placeholder="Enter Receipt No..."
                                    />
                                    {errors[`payment-${index}-receipt`] && (
                                        <p className={styles.errorMsg}>{errors[`payment-${index}-receipt`]}</p>
                                    )}
                                </div>

                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<CiSquareAlert className={styles.iconcolor} />} text="Transaction / Cheque No" />
                                    </label>
                                    <input
                                        type="text"
                                        name="transactionNo"
                                        value={payment.transactionNo}
                                        onChange={(e) => handlePaymentChange(payment.id, "transactionNo", e.target.value)}
                                        placeholder="Enter Transaction / Cheque No..."
                                    />
                                    {errors[`payment-${index}-txn`] && (
                                        <p className={styles.errorMsg}>{errors[`payment-${index}-txn`]}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}



                    <div className={styles.formControl}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <input
                                type="checkbox"
                                checked={confirmChecked}
                                onChange={(e) => setConfirmChecked(e.target.checked)}
                                style={{ width: "16px", height: "16px" }}
                            />
                            <p style={{ margin: 0 }}>I hereby confirm that all the booking information filled is correct</p>
                        </label>
                        {errors.confirmChecked && <p className={styles.errorMsg}>{errors.confirmChecked}</p>}
                    </div>


                </>
            ),
        },
    ];

    return ReactDOM.createPortal(

        <div className={styles.dialogOverlay}>
            <div ref={dialogRef} className={styles.dialogBox}>
                <h3 className={styles.dialogTitle}>📝 Add Booking</h3>
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

                <div className={styles.progressBarContainer}>

                    <div className={styles.progressLine}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                        ></div>
                    </div>

                    <div className={styles.steps}>
                        {steps.map((step, index) => (
                            <div key={index} className={styles.step}>
                                <div
                                    className={`${styles.circle} ${index <= currentStep ? styles.active : ""}`}
                                >
                                    {index + 1}
                                </div>
                                <div className={styles.label}>{step}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <p className={styles.varning}>Please fill every details carefully, it cannot be change afterwards.</p>

                <div className={styles.dailogcnt}>
                    {stepFields[currentStep].fields}


                    <div className={styles.dialogButtons} >
                        {currentStep > 0 && (
                            <button
                                className={styles.cancelBtn}
                                onClick={() => setCurrentStep(currentStep - 1)}
                            >
                                Previous
                            </button>
                        )}
                        <button
                            className={styles.submitBtn}
                            onClick={() => {
                                const isValid = validateStep(currentStep);
                                if (isValid) {
                                    if (currentStep < steps.length - 1) {
                                        setCurrentStep(currentStep + 1);
                                    } else {
                                        onSubmit();
                                    }
                                } else {
                                    console.log("Validation failed — fix errors before next step");
                                }
                            }}
                        >
                            {currentStep === steps.length - 1 ? "Submit" : "Next"}
                        </button>
                    </div>
                </div>



            </div>
        </div>,
        document.body
    );
};

export default AddBooking;
