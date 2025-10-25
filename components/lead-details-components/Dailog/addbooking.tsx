"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css"
import { IoLocation, IoLocationSharp, IoPersonOutline } from "react-icons/io5";
import { BsBuildingFill, BsLinkedin } from "react-icons/bs";
import Select, { MultiValue } from "react-select";
import { FaCheck, FaDoorClosed, FaHashtag, FaPlus, FaStar, FaUser, FaWpforms } from "react-icons/fa6";
import { PiBagFill } from "react-icons/pi";
import { AiFillPicture } from "react-icons/ai";
import ReactDOM from "react-dom";
import { FaCalendarAlt, FaParking } from "react-icons/fa";
import { CiSquareAlert } from "react-icons/ci";
import { MdCancel, MdLocalParking, MdNotListedLocation, MdOutlineCurrencyRupee, MdOutlineEmail, MdOutlineFileUpload, MdOutlineNumbers } from "react-icons/md";
import { GiCancel, GiModernCity } from "react-icons/gi";
import { User } from "lucide-react";

interface AddBookingProps {
    openclick: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Applicant {
    firstName: string;
    lastName: string;
    address: string;
}

interface FormState {
    bookingDate?: string;

    project: string;
    blug: string;
    floor: string;
    unit: string;
    bookingstatus: string;
    notes: string;
    Flatno: string;
    carpet: string;
    parkingno: string;
    prfloor: string;
    Cost: string;
    photo: File | null;
    remark: string,
    applicants: Applicant[];
}

const AddBooking: React.FC<AddBookingProps> = ({ openclick }) => {
    const currentTheme = document.documentElement.classList.contains("light") ? "light" : "dark";
    const dialogRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [currentStep, setCurrentStep] = useState(0);
    const [aadhaarUploaded, setAadhaarUploaded] = useState(false);
    const [panUploaded, setPanUploaded] = useState(false);
    const [otherUploaded, setOtherUploaded] = useState(false);

    // In your component state
    const [parkingList, setParkingList] = useState<{ prfloor: string; parkingno: string }[]>([]);

    // Add a new parking entry
    const addParking = () => {
        setParkingList([...parkingList, { prfloor: "", parkingno: "" }]);
    };

    // Remove a parking entry by index
    const removeParking = (index: number) => {
        const updated = [...parkingList];
        updated.splice(index, 1);
        setParkingList(updated);
    };

    // Update a parking field value
    const updateParkingField = (index: number, field: "prfloor" | "parkingno", value: string) => {
        const updated = [...parkingList];
        updated[index][field] = value;
        setParkingList(updated);
    };


    const [formData, setformData] = useState<FormState>({
        project: "",
        blug: "",
        floor: "",
        unit: "",
        bookingstatus: "",
        notes: "",
        Flatno: "",
        carpet: "",
        Cost: "",
        photo: null,
        remark: "",
        prfloor: "",
        parkingno: "",
        applicants: [],
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
            project: "",
            blug: "",
            floor: "",
            unit: "",
            bookingstatus: "",
            notes: "",
            Flatno: "",
            carpet: "",
            Cost: "",
            photo: null,
            remark: "",
            prfloor: "",
            parkingno: "",
            applicants: [],

        })
        openclick(false);
    }
    const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setformData((prev) => ({ ...prev, [name]: value }));
    };
    const onSubmit = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.bookingDate)
            newErrors.bookingDate = "Please select date";


        if (!formData.project) {
            newErrors.project = "Please select Project";
        }
        if (!formData.blug) {
            newErrors.blug = "Please select Blug";
        }
        if (!formData.carpet) {
            newErrors.carpet = "Please Enter Carpet Area";
        }
        if (!formData.Cost) {
            newErrors.Cost = "Please Enter Flat Cost";
        }
        if (!formData.Flatno) {
            newErrors.Flatno = "Please Enter Flat no";
        }
        if (!formData.floor) {
            newErrors.floor = "Please select Floor";
        }
        if (!formData.floor) {
            newErrors.floor = "Please select Floor";
        }
        if (!formData.bookingstatus) {
            newErrors.bookingstatus = "Please select Property Type";
        }
        parkingList.forEach((p, index) => {
            if (!p.prfloor) newErrors[`parkingList-${index}-prfloor`] = "Select Parking Floor";
            if (!p.parkingno) newErrors[`parkingList-${index}-parkingno`] = "Select Parking Number";
        });
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
    const handleApplicantsCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const count = parseInt(e.target.value);
        if (!count) return setformData(prev => ({ ...prev, applicants: [] }));

        const newApplicants: Applicant[] = Array(count)
            .fill(null)
            .map((_, i) => formData.applicants[i] || { firstName: "", lastName: "", address: "" });

        setformData(prev => ({ ...prev, applicants: newApplicants }));
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
                                <RequiredLabel icon={<FaStar className={styles.iconcolor} />} text="Project" />
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
                                <RequiredLabel icon={<FaStar className={styles.iconcolor} />} text="Blug" />
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
                                <RequiredLabel icon={<FaStar className={styles.iconcolor} />} text="Floor" />
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
                                <RequiredLabel icon={<FaStar className={styles.iconcolor} />} text="Unit" />
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

                            name="Address"
                            placeholder="Enter Address...."
                            value={formData.Flatno}
                            onChange={onChangeField}
                        />
                        {errors.Flatno && <p className={styles.errorMsg}>{errors.Flatno}</p>}
                    </div>
                    <div className={styles.card}>

                        <div className={styles.formControl}>
                            <label>

                                <RequiredLabel icon={<GiModernCity className={styles.iconcolor} />} text="City" />
                            </label>
                            <input
                                type="text"

                                name="city"
                                placeholder="Enter city name...."
                                value={formData.Flatno}
                                onChange={onChangeField}
                            />
                            {errors.Flatno && <p className={styles.errorMsg}>{errors.Flatno}</p>}
                        </div>
                        <div className={styles.formControl}>
                            <label>

                                <RequiredLabel icon={<FaHashtag className={styles.iconcolor} />} text="Pincode" />
                            </label>
                            <input
                                type="text"

                                name="pincode"
                                placeholder="Enter pincode...."
                                value={formData.Flatno}
                                onChange={onChangeField}
                            />
                            {errors.Flatno && <p className={styles.errorMsg}>{errors.Flatno}</p>}
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

                    {/* Dynamic Applicant Forms */}
                    {formData.applicants.map((applicant, index) => (
                        <div key={index} >
                            <h4 style={{ color: "#476cff" }}>Applicant {index + 1}</h4>
                            <div className={styles.card}>
                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<IoPersonOutline className={styles.iconcolor} />} text="First Name" />
                                    </label>

                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <div className={styles.formControl} >
                                            <select
                                                name="prefix"



                                            >
                                                <option value="">Title</option>
                                                <option value="Mr.">Mr.</option>
                                                <option value="Ms.">Ms.</option>
                                                <option value="Miss">Miss</option>
                                                <option value="Dr.">Dr.</option>
                                            </select>
                                            {errors.prefix && <p className={styles.errorMsg}>{errors.prefix}</p>}
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <input
                                                type="text"

                                                name="firstName"

                                                placeholder="First Name"
                                                style={{ flex: 1 }}
                                            />
                                            {errors.firstName && <p className={styles.errorMsg}>{errors.firstName}</p>}
                                        </div>

                                    </div>

                                </div>

                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<IoPersonOutline className={styles.iconcolor} />} text="Last Name" />
                                    </label>

                                    <input
                                        type="text"

                                        name="lastName"
                                        placeholder="Last Name"
                                    />
                                    {errors.lastName && <p className={styles.errorMsg}>{errors.lastName}</p>}
                                </div>
                            </div>


                            <div className={styles.card}>
                                <div className={styles.formControl}>
                                    <label>
                                        <RequiredLabel icon={<MdOutlineEmail className={styles.iconcolor} />} text="Email" />
                                    </label>

                                    <input
                                        type="email"

                                        name="email"
                                        placeholder="Enter email address"
                                    />
                                </div>
                                <div className={styles.formControl}>

                                    <label>
                                        <RequiredLabel icon={<IoLocationSharp className={styles.iconcolor} />} text="Address" />
                                    </label>
                                    <input
                                        type="text"

                                        name="address"
                                        placeholder="Enter address"
                                    />
                                </div>

                            </div>
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
                                            {aadhaarUploaded ? <FaCheck size={14} /> : "+"}
                                        </span>
                                    </label>
                                    <input
                                        id={`aadhaar-${index}`}
                                        type="file"
                                        name="aadhaar"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        style={{ display: "none" }}
                                        onChange={(e) => setAadhaarUploaded(!!e.target.files?.length)}
                                    />
                                    {errors.aadhaar && <p className={styles.errorMsg}>{errors.aadhaar}</p>}
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
                                            {panUploaded ? <FaCheck size={14} /> : "+"}
                                        </span>
                                    </label>
                                    <input
                                        id={`pan-${index}`}
                                        type="file"
                                        name="pan"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        style={{ display: "none" }}
                                        onChange={(e) => setPanUploaded(!!e.target.files?.length)}
                                    />
                                    {errors.pan && <p className={styles.errorMsg}>{errors.pan}</p>}
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
                                            {otherUploaded ? <FaCheck size={14} /> : "+"}
                                        </span>
                                    </label>
                                    <input
                                        id={`other-${index}`}
                                        type="file"
                                        name="otherDocument"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        style={{ display: "none" }}
                                        onChange={(e) => setOtherUploaded(!!e.target.files?.length)}
                                    />
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
                            value={formData.bookingstatus}
                            name="Manager"
                            onChange={onChangeField}
                        >
                            <option value="">Select Closing Manager</option>
                            <option value="Deepak">Deepak</option>
                            <option value="mane">mane</option>
                        </select>
                        {errors.bookingstatus && <p className={styles.errorMsg}>{errors.bookingstatus}</p>}

                    </div>
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<FaUser className={styles.iconcolor} />} text="Assign To" />
                        </label>
                        <select
                            value={formData.bookingstatus}
                            name="Assign"
                            onChange={onChangeField}
                        >
                            <option value="">Select Assign To</option>
                            <option value="mona">mona</option>
                            <option value="snehal">snehal</option>
                        </select>
                        {errors.bookingstatus && <p className={styles.errorMsg}>{errors.bookingstatus}</p>}

                    </div>

                </>
            ),
        },
        {
            title: "Pre-registration",
            fields:
                (
                    <>
                    <p style={{fontSize:"14px"}}> upload Booking Form</p>
                      <div className={styles.formControl}>
                                <label>
                                    <RequiredLabel icon={<MdOutlineFileUpload className={styles.iconcolor} />} text="Upload Frontsid" />
                                </label>
                               

                            </div>
                        <div className={styles.card}>
                            <div className={styles.formControl}>
                                <label>
                                    <RequiredLabel icon={<MdOutlineFileUpload className={styles.iconcolor} />} text="Upload Frontsid" />
                                </label>
                                <input
                                    type="file"

                                    name="Cost"
                                    placeholder=" Enter Upload Frontsid..."
                                   
                                />
                              

                            </div>
                              <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<MdOutlineFileUpload className={styles.iconcolor} />} text="Upload Backsid" />
                        </label>
                        <input
                            type="file"

                            name="Cost"
                            placeholder=" Enter Upload Backsid..."
                            
                        />
                    </div>
                        </div>

                    </>
                ),
        },
        {
            title: "Payment",
            fields: <p>Payment Fields here...</p>,
        },
    ];

    return ReactDOM.createPortal(

        <div className={styles.dialogOverlay}>
            <div ref={dialogRef} className={styles.dialogBox}>
                <h3 className={styles.dialogTitle}>📝 Add Booking</h3>
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
                                if (currentStep < steps.length - 1) {
                                    setCurrentStep(currentStep + 1);
                                } else {
                                    onSubmit();
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
