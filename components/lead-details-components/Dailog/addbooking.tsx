"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css";
import {
  IoLocation,
  IoLocationSharp,
  IoPersonOutline,
  IoReceipt,
} from "react-icons/io5";
import Select, { components } from "react-select";
import {
  FaArrowUpFromGroundWater,
  FaBuilding,
  FaCheck,
  FaDoorClosed,
  FaFileContract,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaFileSignature,
  FaHashtag,
  FaIdCard,
  FaPlus,
  FaStamp,
  FaStar,
  FaUser,
} from "react-icons/fa6";

import ReactDOM from "react-dom";
import {
  FaBalanceScale,
  FaCalendarAlt,
  FaParking,
  FaRegFileAlt,
} from "react-icons/fa";
import { CiSquareAlert } from "react-icons/ci";
import {
  MdCancel,
  MdLocalParking,
  MdLocalPhone,
  MdOutlineCurrencyRupee,
  MdOutlineEmail,
  MdOutlineFileUpload,
  MdOutlineNumbers,
} from "react-icons/md";
import { GiModernCity } from "react-icons/gi";
import { BiSolidBookContent } from "react-icons/bi";
import { LuBuilding2 } from "react-icons/lu";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { jsPDF } from "jspdf";
import { useData } from "@/providers/dataContext";

interface AddBookingProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
  lead?: Lead | null;
}

interface Applicant {
  prefix?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  countryCode?: string | null;
  phoneNumber?: string | null; // Changed to string to match input handling
  address?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  pincode?: string | null;
  email?: string | null;
  kyc?: Kyc | null;
  // File upload states for the form
  aadhaarUploaded?: boolean;
  aadhaarFile?: File | null;
  panUploaded?: boolean;
  panFile?: File | null;
  otherUploaded?: boolean;
  otherFile?: File | null;
}

interface Kyc {
  addhar?: KycDocument | null;
  pan?: KycDocument | null;
  other?: KycDocument | null;
}

interface KycDocument {
  verified: boolean;
  document?: string | null;
  remark?: string | null;
  type?: string | null;
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

interface OptionType {
  value: string;
  label: string;
}

interface FormState {
  bookingDate: string;
  bookingstatus: string;
  project: string;
  blg: number;
  floor: number;
  unit: number;
  Flatno: string;
  carpet: string;
  Cost: string;
  CostWords: string;
  notes: string;
  parkingno: string;
  prfloor: string;
  photo: File | null;
  remark: string;
  remarkLast: string;
  applicants: Applicant[];
  addressOne: string;
  addressTwo: string;
  pincode: string;
  city: string;
  assignto: OptionType[];
  manager: string;
  backphoto: File | null;
  frontphoto: File | null;
}

type ParkingItem = {
  prfloor: number | "";
  parkingno: string;
  [key: string]: number | string;
};

const AddBooking: React.FC<AddBookingProps> = ({ openclick, lead }) => {
  const { getProjects, projects, getClosingManagers, closingManagers } =
    useData();
  const currentTheme = document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
  const dialogRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [parkingList, setParkingList] = useState<ParkingItem[]>([]);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [regDone, setRegDone] = useState<string>("");
  const [regDate, setRegDate] = useState<string>("");
  const [handover, setHandover] = useState<string>("");
  const [handoverDate, setHandoverDate] = useState<string>("");
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);

  const setFieldValue = (name: string, value: string) => {
    onChangeField({
      target: { name, value } as any,
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // Default applicant template
  const defaultApplicant: Applicant = {
    prefix: "",
    firstName: "",
    lastName: "",
    countryCode: "+91",
    phoneNumber: "",
    address: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    email: "",
    kyc: {
      addhar: null,
      pan: null,
      other: null,
    },
    aadhaarUploaded: false,
    aadhaarFile: null,
    panUploaded: false,
    panFile: null,
    otherUploaded: false,
    otherFile: null,
  };

  const [formData, setformData] = useState<FormState>({
    bookingDate: new Date().toISOString().split("T")[0],
    bookingstatus: "",
    project: "",
    blg: 0,
    floor: 0,
    unit: 0,
    Flatno: "",
    carpet: "",
    Cost: "",
    CostWords: "",
    notes: "",
    photo: null,
    remark: "",
    prfloor: "",
    parkingno: "",
    addressOne: "",
    addressTwo: "",
    applicants: [],
    pincode: "",
    city: "",
    assignto: [],
    manager: "",
    backphoto: null,
    frontphoto: null,
    remarkLast: "",
  });

  useEffect(() => {
    if (lead) {
      // If lead is provided, pre-fill the first applicant with lead data
      const leadApplicant: Applicant = {
        prefix: lead.prefix || "",
        firstName: lead.firstName || "",
        lastName: lead.lastName || "",
        countryCode: lead.countryCode || "+91",
        phoneNumber: lead.phoneNumber?.toString() || "",
        email: lead.email || "",
        address: lead.address || "",
        addressLine1: lead.address || "",
        // addressLine2: lead.addressLine2 || "",
        // city: lead.city || "",
        // pincode: lead.pincode || "",
        // kyc: lead.kyc || { addhar: null, pan: null, other: null },
        aadhaarUploaded: false,
        aadhaarFile: null,
        panUploaded: false,
        panFile: null,
        otherUploaded: false,
        otherFile: null,
      };

      formData.addressOne = lead.address || "";
      formData.manager=lead.teamLeader?._id||"";
      setformData((prev) => ({
        ...prev,
        applicants: [leadApplicant],
      }));
    }
  }, [lead]);

  useEffect(() => {
    getProjects();
    getClosingManagers();
  }, []);

  const selectedProject = projects.find(
    (p: OurProject) => p._id === formData.project
  );

  const flats = selectedProject?.flatList ?? [];

  const hasBuildings = flats.length > 0 && flats.some((f) => f.buildingNo);

  const buildingOptions = hasBuildings
    ? uniq(flats.map((f) => f.buildingNo).filter(Boolean))
    : [];

  const floorOptions = hasBuildings
    ? uniq(
        flats
          .filter((f) => f.buildingNo == formData.blg)
          .map((f) => f.floor)
          .filter((v) => v !== undefined)
      ).sort((a, b) => a - b)
    : uniq(flats.map((f) => f.floor).filter((v) => v !== undefined)).sort(
        (a, b) => a - b
      );

  const unitOptions = hasBuildings
    ? flats
        .filter(
          (f) => f.buildingNo == formData.blg && f.floor == formData.floor
        )
        .map((f) => f.number)
    : flats.filter((f) => f.floor == formData.floor).map((f) => f.number);

  useEffect(() => {
    if (selectedProject && formData.floor && formData.unit) {
      const flat = selectedProject.flatList?.find(
        (f) =>
          (hasBuildings ? f.buildingNo == formData.blg : true) &&
          f.floor == formData.floor &&
          f.number == formData.unit
      );

      if (flat) {
        setFieldValue("Flatno", flat.flatNo?.toString() ?? "");
        setFieldValue("carpet", flat.carpetArea?.toString() ?? "");
        setFieldValue("Cost", flat.allInclusiveValue?.toString() ?? "");
      } else {
        const generatedFlatNo = formData.floor * 100 + Number(formData.unit);
        setFieldValue("Flatno", generatedFlatNo.toString());
      }
    }
  }, [
    formData.blg,
    formData.floor,
    formData.unit,
    selectedProject,
    hasBuildings,
  ]);

  const flat = flats.find(
    (f) =>
      (hasBuildings ? f.buildingNo == formData.blg : true) &&
      f.floor == formData.floor &&
      f.number == formData.unit
  );

  useEffect(() => {
    if (!selectedProject) return;
    setFieldValue("blg", "");
    setFieldValue("floor", "");
    setFieldValue("unit", "");
    setFieldValue("Flatno", "");
    setFieldValue("carpet", "");
    setFieldValue("Cost", "");
  }, [formData.project]);

  const parkingFloors = (
    selectedProject?.parkingList
      ?.map((p) => p.floor)
      .filter((f) => f !== null && f !== undefined) || []
  )
    .filter((item, index, arr) => arr.indexOf(item) === index)
    .sort((a, b) => Number(a) - Number(b));

  const getParkingNumbers = (floor: number) => {
    return (
      selectedProject?.parkingList
        ?.filter((p) => p.floor === floor)
        .map((p) => p.number?.toString()) || []
    );
  };

  const addParking = () => {
    setParkingList([...parkingList, { prfloor: "", parkingno: "" }]);
  };

  const removeParking = (i: number) => {
    const updated = [...parkingList];
    updated.splice(i, 1);
    setParkingList(updated);
  };

  const updateParkingField = (i: number, field: string, value: any) => {
    const updated = [...parkingList];
    updated[i][field] = value;
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
      transactionNo: "",
    };
    setPayments((prev) => [...prev, newPayment]);
  };

  const handleRemovePayment = (id: number) => {
    setPayments((prev) => prev.filter((payment) => payment.id !== id));
  };

  const projectOptions = projects.map((p: any) => ({
    value: p._id,
    label: p.name,
  }));

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
      bookingDate: new Date().toISOString().split("T")[0],
      bookingstatus: "",
      project: "",
      blg: 0,
      floor: 0,
      unit: 0,
      Flatno: "",
      carpet: "",
      Cost: "",
      addressOne: "",
      addressTwo: "",
      notes: "",
      photo: null,
      remark: "",
      prfloor: "",
      parkingno: "",
      applicants: [],
      pincode: "",
      city: "",
      assignto: [],
      manager: "",
      backphoto: null,
      frontphoto: null,
      CostWords: "",
      remarkLast: "",
    });
    openclick(false);
  };

  const onChangeField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (stepIndex: number) => {
    const newErrors: any = {};

    if (stepIndex === 0) {
      if (!formData.bookingDate)
        newErrors.bookingDate = "Booking date is required";
      if (!formData.bookingstatus)
        newErrors.bookingstatus = "Booking status is required";
      if (!formData.project)
        newErrors.project = "Project selection is required";
      if (hasBuildings && !formData.blg)
        newErrors.blg = "Building selection is required";
      if (!formData.floor) newErrors.floor = "Floor selection is required";
      if (!formData.unit) newErrors.unit = "Unit selection is required";

      if (!formData.Flatno || !formData.Flatno.trim())
        newErrors.Flatno = "Flat number is required";
      if (!formData.carpet || !formData.carpet.trim())
        newErrors.carpet = "Carpet area is required";
      if (!formData.Cost || !formData.Cost.trim())
        newErrors.Cost = "Flat cost is required";

      parkingList.forEach((p, index) => {
        if (!p.prfloor)
          newErrors[`parkingList-${index}-prfloor`] = "Select Parking Floor";
        // if (!p.parkingno)
        //   newErrors[`parkingList-${index}-parkingno`] = "Select Parking Number";
      });
    }

    if (stepIndex === 1) {
      if (!formData.addressOne.trim())
        newErrors.addressOne = "Address line 1 is required";
      if (!formData.addressTwo.trim())
        newErrors.addressTwo = "Address line 2 is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";

      if (formData.applicants.length === 0) {
        newErrors.applicants = "At least one applicant is required";
      } else {
        formData.applicants.forEach((applicant, index) => {
          if (!applicant.prefix?.trim())
            newErrors[`applicant-${index}-prefix`] = "Title is required";
          if (!applicant.firstName?.trim())
            newErrors[`applicant-${index}-firstName`] =
              "First name is required";
          if (!applicant.lastName?.trim())
            newErrors[`applicant-${index}-lastName`] = "Last name is required";
          if (!applicant.email?.trim())
            newErrors[`applicant-${index}-email`] = "Email is required";
          if (!applicant.phoneNumber?.trim())
            newErrors[`applicant-${index}-phoneNumber`] =
              "Phone number is required";
          if (!applicant.addressLine1?.trim())
            newErrors[`applicant-${index}-addressLine1`] =
              "Address Line 1 is required";
          if (!applicant.addressLine2?.trim())
            newErrors[`applicant-${index}-addressLine2`] =
              "Address Line 2 is required";
          if (!applicant.city?.trim())
            newErrors[`applicant-${index}-city`] = "City is required";
          if (!applicant.pincode?.trim())
            newErrors[`applicant-${index}-pincode`] = "Pincode is required";
        });
      }
    }

    if (stepIndex === 2) {
      if (!formData.manager.trim())
        newErrors.manager = "Closing manager is required";
      if (formData.assignto.length === 0)
        newErrors.assignto = "Select at least one assignee.";
    }

    if (stepIndex === 3) {
      if (!formData.frontphoto)
        newErrors.frontphoto = "Front photo is required";
      if (!formData.backphoto) newErrors.backphoto = "Back photo is required";
    }

    if (stepIndex === 4) {
      if (payments.length === 0) {
        newErrors.payments = "Please add at least one payment";
      } else {
        payments.forEach((payment, index) => {
          if (!payment.paymentType.trim())
            newErrors[`payment-${index}-type`] = "Select payment type";
          if (!payment.paymentMode.trim())
            newErrors[`payment-${index}-mode`] = "Select payment mode";
          if (!payment.date.trim())
            newErrors[`payment-${index}-date`] = "Select payment date";
          if (!payment.tdsAmount.trim())
            newErrors[`payment-${index}-tds`] = "Enter TDS amount";
          if (!payment.receiptNo.trim())
            newErrors[`payment-${index}-receipt`] = "Enter receipt number";
          if (!payment.transactionNo.trim())
            newErrors[`payment-${index}-txn`] = "Enter transaction number";
        });
      }
      if (!confirmChecked)
        newErrors["confirmChecked"] =
          "Please confirm that all information is correct.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    alert(
      "Form submitted successfully: \n" + JSON.stringify(formData, null, 2)
    );
    openclick(false);
  };

  const RequiredLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({
    icon,
    text,
  }) => (
    <label style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {icon}
      <span>{text}</span>
      <span style={{ color: "red", fontSize: "15px", marginLeft: "-1px" }}>
        *
      </span>
    </label>
  );

  const handleApplicantsCountChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const count = parseInt(e.target.value);

    if (!count || count < 1) {
      setformData((prev) => ({ ...prev, applicants: [] }));
      return;
    }

    const currentApplicants = [...formData.applicants];

    if (count > currentApplicants.length) {
      // Add new applicants
      const newApplicants = Array(count - currentApplicants.length)
        .fill(null)
        .map(() => ({ ...defaultApplicant }));

      setformData((prev) => ({
        ...prev,
        applicants: [...currentApplicants, ...newApplicants],
      }));
    } else {
      // Remove excess applicants
      setformData((prev) => ({
        ...prev,
        applicants: currentApplicants.slice(0, count),
      }));
    }
  };

  const handleApplicantChange = (
    index: number,
    field: keyof Applicant,
    value: string
  ) => {
    const updatedApplicants = [...formData.applicants];
    updatedApplicants[index] = {
      ...updatedApplicants[index],
      [field]: value,
    };
    setformData((prev) => ({ ...prev, applicants: updatedApplicants }));
  };

  const handlePaymentChange = (
    id: number,
    field: keyof Payment,
    value: string
  ) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  useEffect(() => {
    if (formData.floor && formData.unit) {
      const floorNum = Number(formData.floor);
      const unitNum = Number(formData.unit);
      const flat = floorNum * 100 + unitNum;
      setformData((prev: any) => ({
        ...prev,
        Flatno: flat.toString(),
      }));
    }
  }, [formData.floor, formData.unit]);

  const convertToIndianWords = (num: number) => {
    if (!num) return "";
    let crore = Math.floor(num / 10000000);
    num %= 10000000;
    let lakh = Math.floor(num / 100000);
    num %= 100000;
    let thousand = Math.floor(num / 1000);
    num %= 1000;
    let hundred = num;
    let result = "";
    if (crore) result += `${crore} Cr `;
    if (lakh) result += `${lakh} Lakh `;
    if (thousand) result += `${thousand} Thousand `;
    if (hundred) result += `${hundred}`;
    return result.trim();
  };

  const onChangeCost = (e: any) => {
    const { name, value } = e.target;
    const onlyNumbers = value.replace(/\D/g, "");
    setformData((prev: any) => ({
      ...prev,
      Cost: onlyNumbers,
      CostWords: convertToIndianWords(Number(onlyNumbers)),
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 20;
    const lineGap = 8;

    const addSectionTitle = (title: string) => {
      doc.setFillColor(230, 230, 250);
      doc.rect(10, y - 5, 190, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, 14, y + 2);
      y += 10;
    };

    const addField = (
      label: string,
      value: string | number | undefined | null
    ) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`${label}: ${value ?? "-"}`, 14, y);
      y += lineGap;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Add Booking Details", 105, 15, { align: "center" });
    doc.line(10, 17, 200, 17);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    // Booking Overview
    addSectionTitle("Booking Overview");
    addField("Booking Date", formData.bookingDate);
    addField("Booking Status", formData.bookingstatus);
    addField("Project", formData.project);
    addField("Building", formData.blg);
    addField("Floor", formData.floor);
    addField("Unit", formData.unit);
    addField("Flat No", formData.Flatno);
    addField("Carpet Area", formData.carpet);
    addField("Flat Cost", formData.Cost);

    // Parking
    addSectionTitle("Parking Details");
    parkingList.forEach((p, i) => {
      addField(
        `Parking ${i + 1}`,
        `Floor - ${p.prfloor}, Number - ${p.parkingno}`
      );
    });

    // Applicants
    addSectionTitle("Applicants");
    addField("Address Line 1", formData.addressOne);
    addField("Address Line 2", formData.addressTwo);
    addField("City", formData.city);
    addField("Pincode", formData.pincode);

    formData.applicants.forEach((a, i) => {
      doc.setFont("helvetica", "bold");
      doc.text(`Applicant ${i + 1}`, 14, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      addField("Prefix", a.prefix);
      addField("First Name", a.firstName);
      addField("Last Name", a.lastName);
      addField("Email", a.email);
      addField("Phone Number", a.phoneNumber);
      addField("Address Line 1", a.addressLine1);
      addField("Address Line 2", a.addressLine2);
      addField("City", a.city);
      addField("Pincode", a.pincode);
      addField("Aadhaar Uploaded", a.aadhaarUploaded ? "Yes" : "No");
      addField("PAN Uploaded", a.panUploaded ? "Yes" : "No");
      addField("Other Document Uploaded", a.otherUploaded ? "Yes" : "No");
    });

    // Team Overview
    addSectionTitle("Team Overview");
    addField("Closing Manager", formData.manager);
    addField(
      "Assign To",
      formData.assignto.map((opt) => opt.label).join(", ") || "-"
    );

    // Pre-registration
    addSectionTitle("Pre-registration");
    addField("Front Photo Uploaded", formData.frontphoto ? "Yes" : "No");
    addField("Back Photo Uploaded", formData.backphoto ? "Yes" : "No");

    // Payment
    addSectionTitle("Payment Details");
    payments.forEach((p, i) => {
      doc.setFont("helvetica", "bold");
      doc.text(`Payment ${i + 1}`, 14, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      addField("Payment Type", p.paymentType);
      addField("Payment Mode", p.paymentMode);
      addField("Date", p.date);
      addField("TDS Amount", p.tdsAmount);
      addField("Receipt No", p.receiptNo);
      addField("Transaction No", p.transactionNo);
    });

    // Confirmation
    addSectionTitle("Confirmation");
    addField("Confirmed", confirmChecked ? "Yes" : "No");

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Generated by Booking Management System", 105, 285, {
      align: "center",
    });

    doc.save("booking_details.pdf");
  };

  const steps = [
    "Booking Overview",
    "Applicants",
    "Team Overview",
    "Pre-registration",
    "Payment",
  ];

  const optionssing: OptionType[] = [
    { value: "mona", label: "Mona" },
    { value: "snehal", label: "Snehal" },
    { value: "rahul", label: "Rahul" },
    { value: "ankit", label: "Ankit" },
  ];

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
      fontSize: "14px",
      boxShadow: state.isFocused ? "0 0 0 1px #007bff" : "none",
      "&:hover": {
        borderColor: "#007bff",
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#151414f5" : "white",
      fontSize: "14px",
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
      fontSize: "14px",
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

  const stepFields = [
    {
      title: "Booking Overview",
      fields: (
        <>
          <div className={styles.formControl}>
            <label>
              <RequiredLabel
                icon={<FaCalendarAlt className={styles.iconcolor} />}
                text="Booking Date"
              />
            </label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={onChangeField}
            />
            {errors.bookingDate && (
              <p className={styles.errorMsg}>{errors.bookingDate}</p>
            )}
          </div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<FaStar className={styles.iconcolor} />}
                  text="Booking Status"
                />
              </label>
              <select
                value={formData.bookingstatus}
                name="bookingstatus"
                onChange={onChangeField}
              >
                <option value="">Select Status Type</option>
                <option value="confirm-booking">Confirm booking</option>
                <option value="eoi-recieved">Eoi recieved</option>
              </select>
              {errors.bookingstatus && (
                <p className={styles.errorMsg}>{errors.bookingstatus}</p>
              )}
            </div>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<FaBuilding className={styles.iconcolor} />}
                  text="Project"
                />
              </label>
              <select
                value={formData.project}
                name="project"
                onChange={onChangeField}
              >
                <option value="">Select Project</option>
                {projectOptions.map((project) => (
                  <option key={project.value} value={project.value}>
                    {project.label}
                  </option>
                ))}
              </select>
              {errors.project && (
                <p className={styles.errorMsg}>{errors.project}</p>
              )}
            </div>
          </div>

          <div className={styles.formControl}>
            <div className={styles.card}>
              {hasBuildings && (
                <select
                  name="blg"
                  value={formData.blg}
                  onChange={onChangeField}
                >
                  <option value="">Select Building</option>
                  {buildingOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              )}

              <select
                name="floor"
                value={formData.floor}
                onChange={onChangeField}
                disabled={hasBuildings ? !formData.blg : false}
              >
                <option value="">Select Floor</option>
                {floorOptions.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>

              <select
                name="unit"
                value={formData.unit}
                onChange={onChangeField}
                disabled={!formData.floor}
              >
                <option value="">Select Unit</option>
                {unitOptions.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<FaDoorClosed className={styles.iconcolor} />}
                  text="Flat No"
                />
              </label>
              <input
                type="text"
                name="Flatno"
                placeholder="Enter Flat no...."
                value={formData.Flatno}
                onChange={onChangeField}
                readOnly
              />
              {errors.Flatno && (
                <p className={styles.errorMsg}>{errors.Flatno}</p>
              )}
            </div>
            {formData.floor && formData.unit && flat?.occupied && (
              <span style={{ color: "red", marginLeft: "3px" }}>
                Flat is Already Booked
              </span>
            )}
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<CiSquareAlert className={styles.iconcolor} />}
                  text="Carpet Area (sq.ft)"
                />
              </label>
              <input
                type="text"
                name="carpet"
                placeholder=" Enter Carpet Area..."
                value={formData.carpet}
                onChange={onChangeField}
              />
              {errors.carpet && (
                <p className={styles.errorMsg}>{errors.carpet}</p>
              )}
            </div>
          </div>

          <div className={styles.formControl}>
            <label>
              <RequiredLabel
                icon={<MdOutlineCurrencyRupee className={styles.iconcolor} />}
                text="Flat Cost"
              />
            </label>
            <input
              type="text"
              name="Cost"
              placeholder="Enter Flat Cost..."
              value={formData.Cost}
              onChange={onChangeCost}
            />
            {formData.CostWords && (
              <p className={styles.costvalue}>{formData.CostWords}</p>
            )}
            {errors.Cost && <p className={styles.errorMsg}>{errors.Cost}</p>}
          </div>

          <div className={styles.formControl}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <FaParking className={styles.iconcolor} /> No. Parking:{" "}
                <span style={{ color: "red", fontWeight: "600" }}>
                  {parkingList.length}
                </span>
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

            {parkingList.length === 0 && (
              <p style={{ textAlign: "center", marginTop: "10px" }}>
                No Parking Selected
              </p>
            )}

            {parkingList.map((p, index) => {
              const parkingNumbers = getParkingNumbers(Number(p.prfloor));
              return (
                <div
                  className={styles.card}
                  key={index}
                  style={{ marginTop: "10px", position: "relative" }}
                >
                  <div className={styles.formControl}>
                    <label>
                      <RequiredLabel
                        icon={<MdLocalParking className={styles.iconcolor} />}
                        text="Parking Floor"
                      />
                    </label>
                    <select
                      value={p.prfloor}
                      onChange={(e) =>
                        updateParkingField(index, "prfloor", e.target.value)
                      }
                    >
                      <option value="">Select Floor</option>
                      {parkingFloors.map((floor) => (
                        <option key={floor} value={floor}>
                          {floor}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formControl}>
                    <label>
                      <RequiredLabel
                        icon={<MdOutlineNumbers className={styles.iconcolor} />}
                        text="Parking Number"
                      />
                    </label>
                    <select
                      value={p.parkingno}
                      onChange={(e) =>
                        updateParkingField(index, "parkingno", e.target.value)
                      }
                      disabled={!p.prfloor}
                    >
                      <option value="">Select Number</option>
                      {parkingNumbers.map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  <MdCancel
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "5px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => removeParking(index)}
                  />
                </div>
              );
            })}
          </div>
        </>
      ),
    },
    {
      title: "Applicants",
      fields: (
        <>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<IoLocationSharp className={styles.iconcolor} />}
                  text="Address Line 1"
                />
              </label>
              <input
                type="text"
                name="addressOne"
                placeholder="Enter Address...."
                value={formData.addressOne}
                onChange={onChangeField}
              />
              {errors.addressOne && (
                <p className={styles.errorMsg}>{errors.addressOne}</p>
              )}
            </div>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<IoLocationSharp className={styles.iconcolor} />}
                  text="Address Line 2"
                />
              </label>
              <input
                type="text"
                name="addressTwo"
                placeholder="Enter Address...."
                value={formData.addressTwo}
                onChange={onChangeField}
              />
              {errors.addressTwo && (
                <p className={styles.errorMsg}>{errors.addressTwo}</p>
              )}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<GiModernCity className={styles.iconcolor} />}
                  text="City"
                />
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
                <RequiredLabel
                  icon={<FaHashtag className={styles.iconcolor} />}
                  text="Pincode"
                />
              </label>
              <input
                type="number"
                value={formData.pincode}
                name="pincode"
                placeholder="Enter pincode...."
                onChange={onChangeField}
              />
              {errors.pincode && (
                <p className={styles.errorMsg}>{errors.pincode}</p>
              )}
            </div>
          </div>

          <div className={styles.formControl}>
            <label>
              <RequiredLabel
                icon={<FaStar className={styles.iconcolor} />}
                text="No of Applicants"
              />
            </label>
            <select
              value={formData.applicants.length}
              onChange={handleApplicantsCountChange}
            >
              <option value="">Select Applicants</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          {formData.applicants.map((applicant, index) => (
            <div key={index}>
              <h4 style={{ color: "#476cff" }}>Applicant {index + 1}</h4>

              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<IoPersonOutline className={styles.iconcolor} />}
                      text="First Name"
                    />
                  </label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div className={styles.formControl}>
                      <select
                        value={applicant.prefix || ""}
                        onChange={(e) =>
                          handleApplicantChange(index, "prefix", e.target.value)
                        }
                      >
                        <option value="">Title</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Miss">Miss</option>
                        <option value="Dr.">Dr.</option>
                      </select>
                      {errors[`applicant-${index}-prefix`] && (
                        <p className={styles.errorMsg}>
                          {errors[`applicant-${index}-prefix`]}
                        </p>
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        type="text"
                        value={applicant.firstName || ""}
                        placeholder="First Name"
                        style={{ flex: 1 }}
                        onChange={(e) =>
                          handleApplicantChange(
                            index,
                            "firstName",
                            e.target.value
                          )
                        }
                      />
                      {errors[`applicant-${index}-firstName`] && (
                        <p className={styles.errorMsg}>
                          {errors[`applicant-${index}-firstName`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<IoPersonOutline className={styles.iconcolor} />}
                      text="Last Name"
                    />
                  </label>
                  <input
                    type="text"
                    value={applicant.lastName || ""}
                    placeholder="Last Name"
                    onChange={(e) =>
                      handleApplicantChange(index, "lastName", e.target.value)
                    }
                  />
                  {errors[`applicant-${index}-lastName`] && (
                    <p className={styles.errorMsg}>
                      {errors[`applicant-${index}-lastName`]}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<MdOutlineEmail className={styles.iconcolor} />}
                      text="Email"
                    />
                  </label>
                  <input
                    type="email"
                    value={applicant.email || ""}
                    placeholder="Enter email address"
                    onChange={(e) =>
                      handleApplicantChange(index, "email", e.target.value)
                    }
                  />
                  {errors[`applicant-${index}-email`] && (
                    <p className={styles.errorMsg}>
                      {errors[`applicant-${index}-email`]}
                    </p>
                  )}
                </div>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<MdLocalPhone className={styles.iconcolor} />}
                      text="Phone Number"
                    />
                  </label>
                  <input
                    type="number"
                    value={applicant.phoneNumber || ""}
                    placeholder="Enter Phone number"
                    onChange={(e) =>
                      handleApplicantChange(
                        index,
                        "phoneNumber",
                        e.target.value
                      )
                    }
                  />
                  {errors[`applicant-${index}-phoneNumber`] && (
                    <p className={styles.errorMsg}>
                      {errors[`applicant-${index}-phoneNumber`]}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<IoLocationSharp className={styles.iconcolor} />}
                      text="Address Line 1"
                    />
                  </label>
                  <input
                    type="text"
                    value={applicant.addressLine1 || ""}
                    placeholder="Enter address Line 1"
                    onChange={(e) =>
                      handleApplicantChange(
                        index,
                        "addressLine1",
                        e.target.value
                      )
                    }
                  />
                  {errors[`applicant-${index}-addressLine1`] && (
                    <p className={styles.errorMsg}>
                      {errors[`applicant-${index}-addressLine1`]}
                    </p>
                  )}
                </div>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<IoLocationSharp className={styles.iconcolor} />}
                      text="Address Line 2"
                    />
                  </label>
                  <input
                    type="text"
                    value={applicant.addressLine2 || ""}
                    placeholder="Enter address Line 2"
                    onChange={(e) =>
                      handleApplicantChange(
                        index,
                        "addressLine2",
                        e.target.value
                      )
                    }
                  />
                  {errors[`applicant-${index}-addressLine2`] && (
                    <p className={styles.errorMsg}>
                      {errors[`applicant-${index}-addressLine2`]}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<GiModernCity className={styles.iconcolor} />}
                      text="City"
                    />
                  </label>
                  <input
                    type="text"
                    value={applicant.city || ""}
                    placeholder="Enter City Name"
                    onChange={(e) =>
                      handleApplicantChange(index, "city", e.target.value)
                    }
                  />
                  {errors[`applicant-${index}-city`] && (
                    <p className={styles.errorMsg}>
                      {errors[`applicant-${index}-city`]}
                    </p>
                  )}
                </div>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaHashtag className={styles.iconcolor} />}
                      text="Pincode"
                    />
                  </label>
                  <input
                    type="number"
                    value={applicant.pincode || ""}
                    placeholder="Enter Pincode"
                    onChange={(e) =>
                      handleApplicantChange(index, "pincode", e.target.value)
                    }
                  />
                  {errors[`applicant-${index}-pincode`] && (
                    <p className={styles.errorMsg}>
                      {errors[`applicant-${index}-pincode`]}
                    </p>
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
                        backgroundColor: applicant.aadhaarUploaded
                          ? "green"
                          : "#476cff",
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
                    {applicant.aadhaarUploaded && (
                      <MdCancel
                        style={{
                          color: "red",
                          border: "none",
                          borderRadius: "50%",
                          width: "23px",
                          height: "23px",
                          cursor: "pointer",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => {
                          const updated = [...formData.applicants];
                          updated[index].aadhaarUploaded = false;
                          updated[index].aadhaarFile = null;
                          setformData((prev) => ({
                            ...prev,
                            applicants: updated,
                          }));
                        }}
                      />
                    )}
                  </label>
                  <input
                    id={`aadhaar-${index}`}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      const updated = [...formData.applicants];
                      updated[index].aadhaarUploaded = !!file;
                      updated[index].aadhaarFile = file;
                      setformData((prev) => ({ ...prev, applicants: updated }));
                    }}
                  />
                  {applicant.aadhaarUploaded && applicant.aadhaarFile && (
                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          URL.createObjectURL(applicant.aadhaarFile!),
                          "_blank"
                        )
                      }
                      className={styles.upladfile}
                    >
                      View Aadhaar
                    </button>
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
                    }}
                  >
                    PAN Card
                    <span
                      style={{
                        backgroundColor: applicant.panUploaded
                          ? "green"
                          : "#476cff",
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
                    {applicant.panUploaded && (
                      <MdCancel
                        style={{
                          color: "red",
                          border: "none",
                          borderRadius: "50%",
                          width: "23px",
                          height: "23px",
                          cursor: "pointer",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => {
                          const updated = [...formData.applicants];
                          updated[index].panUploaded = false;
                          updated[index].panFile = null;
                          setformData((prev) => ({
                            ...prev,
                            applicants: updated,
                          }));
                        }}
                      />
                    )}
                  </label>
                  <input
                    id={`pan-${index}`}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      const updated = [...formData.applicants];
                      updated[index].panUploaded = !!file;
                      updated[index].panFile = file;
                      setformData((prev) => ({ ...prev, applicants: updated }));
                    }}
                  />
                  {applicant.panUploaded && applicant.panFile && (
                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          URL.createObjectURL(applicant.panFile!),
                          "_blank"
                        )
                      }
                      className={styles.upladfile}
                    >
                      View PAN
                    </button>
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
                    }}
                  >
                    Other Document
                    <span
                      style={{
                        backgroundColor: applicant.otherUploaded
                          ? "green"
                          : "#476cff",
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
                    {applicant.otherUploaded && (
                      <MdCancel
                        style={{
                          color: "red",
                          border: "none",
                          borderRadius: "50%",
                          width: "23px",
                          height: "23px",
                          cursor: "pointer",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => {
                          const updated = [...formData.applicants];
                          updated[index].otherUploaded = false;
                          updated[index].otherFile = null;
                          setformData((prev) => ({
                            ...prev,
                            applicants: updated,
                          }));
                        }}
                      />
                    )}
                  </label>
                  <input
                    id={`other-${index}`}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      const updated = [...formData.applicants];
                      updated[index].otherUploaded = !!file;
                      updated[index].otherFile = file;
                      setformData((prev) => ({ ...prev, applicants: updated }));
                    }}
                  />
                  {applicant.otherUploaded && applicant.otherFile && (
                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          URL.createObjectURL(applicant.otherFile!),
                          "_blank"
                        )
                      }
                      className={styles.upladfile}
                    >
                      View Document
                    </button>
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
              <RequiredLabel
                icon={<FaUser className={styles.iconcolor} />}
                text="Closing Manager"
              />
            </label>
            <select
              value={formData.manager}
              name="manager"
              onChange={onChangeField}
            >
              <option value="">Select Closing Manager</option>

              {closingManagers.map((m) => (
                <option key={m._id} value={m._id ?? ""}>
                  {m?.firstName ?? ""} {m?.lastName ?? ""}
                </option>
              ))}
            </select>

            {errors.manager && (
              <p className={styles.errorMsg}>{errors.manager}</p>
            )}
          </div>
          <div className={styles.formControl}>
            <label>
              <RequiredLabel
                icon={<FaUser className={styles.iconcolor} />}
                text="Assign To"
              />
            </label>
            <Select
              isMulti
              value={formData.assignto}
              onChange={(selected) =>
                setformData((prev) => ({
                  ...prev,
                  assignto: selected as OptionType[],
                }))
              }
              options={optionssing}
              placeholder="Select Assign To"
              styles={customSelectStyles(currentTheme)}
            />

            {errors.assignto && (
              <p className={styles.errorMsg}>{errors.assignto}</p>
            )}
          </div>
        </>
      ),
    },
    {
      title: "Pre-registration",
      fields: (
        <>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <MdOutlineFileUpload className={styles.iconcolor} />
                Upload Booking Form Frontside
                {frontUploaded && formData.frontphoto && (
                  <MdCancel
                    style={{
                      color: "red",
                      border: "none",
                      borderRadius: "50%",
                      width: "17px",
                      height: "17px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setformData((prev) => ({ ...prev, frontphoto: null }));
                      setFrontUploaded(false); // Enable input again
                    }}
                  />
                )}
              </label>

              {!frontUploaded && (
                <input
                  type="file"
                  name="frontphoto"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (!file) return;
                    setformData((prev) => ({ ...prev, frontphoto: file }));
                    setFrontUploaded(true); // Disable input
                  }}
                />
              )}

              {/* Show file name */}
              {formData.frontphoto && <p>{formData.frontphoto.name}</p>}

              {formData.frontphoto && (
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      URL.createObjectURL(formData.frontphoto!),
                      "_blank"
                    )
                  }
                  className={styles.upladfile}
                >
                  View Frontside
                </button>
              )}
            </div>
          </div>

          {/* Backside */}
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <MdOutlineFileUpload className={styles.iconcolor} />
                Upload Booking Form Backside
                {backUploaded && formData.backphoto && (
                  <MdCancel
                    style={{
                      color: "red",
                      border: "none",
                      borderRadius: "50%",
                      width: "17px",
                      height: "17px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setformData((prev) => ({ ...prev, backphoto: null }));
                      setBackUploaded(false); // Enable input again
                    }}
                  />
                )}
              </label>

              {!backUploaded && (
                <input
                  type="file"
                  name="backphoto"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (!file) return;
                    setformData((prev) => ({ ...prev, backphoto: file }));
                    setBackUploaded(true); // Disable input
                  }}
                />
              )}

              {/* Show file name */}
              {formData.backphoto && <p>{formData.backphoto.name}</p>}

              {formData.backphoto && (
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      URL.createObjectURL(formData.backphoto!),
                      "_blank"
                    )
                  }
                  className={styles.upladfile}
                >
                  View Backside
                </button>
              )}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <IoReceipt className={styles.iconcolor} /> 10% Received
              </label>

              <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                <label className={styles.radioLabel}>
                  <input type="radio" name="tenPercentReceived" value="yes" />{" "}
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="tenPercentReceived" value="no" /> No
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="tenPercentReceived"
                    value="partial"
                  />{" "}
                  Partial
                </label>
              </div>

              <input
                type="text"
                placeholder="Remark"
                className={styles.remarkInput}
              />
            </div>

            <div className={styles.formControl}>
              <label>
                <FaStamp className={styles.iconcolor} /> Stamp Duty Received
              </label>

              <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                <label className={styles.radioLabel}>
                  <input type="radio" name="StampDutyReceived" value="yes" />{" "}
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="StampDutyReceived" value="no" /> No
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="StampDutyReceived"
                    value="partial"
                  />{" "}
                  Partial
                  <select className={styles.percentDropdown}>
                    <option value="">%</option>
                    <option value="5">5%</option>
                    <option value="6">6%</option>
                  </select>
                </label>
              </div>

              <input
                type="text"
                placeholder="Remark"
                className={styles.remarkInput}
              />
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <FaFileInvoiceDollar className={styles.iconcolor} /> TDS
                Received
              </label>

              <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                <label className={styles.radioLabel}>
                  <input type="radio" name="tdsReceived" value="yes" /> Yes
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="tdsReceived" value="no" /> No
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="tdsReceived" value="partial" />{" "}
                  Partial
                </label>
              </div>

              <input
                type="text"
                placeholder="Remark"
                className={styles.remarkInput}
              />
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
                  <input type="radio" name="gstReceived" value="partial" />{" "}
                  Partial
                  <select className={styles.percentDropdown}>
                    <option value="">%</option>
                    <option value="5">5%</option>
                    <option value="6">6%</option>
                  </select>
                </label>
              </div>

              <input
                type="text"
                placeholder="Remark"
                className={styles.remarkInput}
              />
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
                <BiSolidBookContent className={styles.iconcolor} /> Registration
                Done
              </label>

              <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="registdone"
                    value="yes"
                    checked={regDone === "yes"}
                    onChange={(e) => setRegDone(e.target.value)}
                  />{" "}
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="registdone"
                    value="no"
                    checked={regDone === "no"}
                    onChange={(e) => setRegDone(e.target.value)}
                  />{" "}
                  No
                </label>
              </div>

              {regDone === "yes" && (
                <div className={styles.formControl}>
                  <label>Registration Date</label>
                  <input
                    type="date"
                    value={regDate}
                    onChange={(e) => setRegDate(e.target.value)}
                    className={styles.dateInput}
                  />
                </div>
              )}
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
                <FaFileContract className={styles.iconcolor} /> Agreement
                Handover
              </label>

              <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="hanagreement"
                    value="yes"
                    checked={handover === "yes"}
                    onChange={(e) => setHandover(e.target.value)}
                  />{" "}
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="hanagreement"
                    value="no"
                    checked={handover === "no"}
                    onChange={(e) => setHandover(e.target.value)}
                  />{" "}
                  No
                </label>
              </div>

              {handover === "yes" && (
                <div className={styles.formControl}>
                  <label>Handover Date</label>
                  <input
                    type="date"
                    value={handoverDate}
                    onChange={(e) => setHandoverDate(e.target.value)}
                    className={styles.dateInput}
                  />
                </div>
              )}
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
              <div
                className={styles.formControl}
                style={{ position: "relative", marginTop: "10px" }}
              >
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
                    <RequiredLabel
                      icon={<FaUser className={styles.iconcolor} />}
                      text="Payment Type"
                    />
                  </label>
                  <select
                    name="paymentType"
                    value={payment.paymentType}
                    onChange={(e) =>
                      handlePaymentChange(
                        payment.id,
                        "paymentType",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Payment Type</option>
                    <option value="Booking">Booking</option>
                    <option value="GST">GST</option>
                    <option value="TDS">TDS</option>
                  </select>
                  {errors[`payment-${index}-type`] && (
                    <p className={styles.errorMsg}>
                      {errors[`payment-${index}-type`]}
                    </p>
                  )}
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaUser className={styles.iconcolor} />}
                      text="Payment Mode"
                    />
                  </label>
                  <select
                    name="paymentMode"
                    value={payment.paymentMode}
                    onChange={(e) =>
                      handlePaymentChange(
                        payment.id,
                        "paymentMode",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="Online">Online</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                  {errors[`payment-${index}-mode`] && (
                    <p className={styles.errorMsg}>
                      {errors[`payment-${index}-mode`]}
                    </p>
                  )}
                </div>
              </div>

              {/* CARD 2 — Date + TDS Amount */}
              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaCalendarAlt className={styles.iconcolor} />}
                      text="Date"
                    />
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={payment.date}
                    onChange={(e) =>
                      handlePaymentChange(payment.id, "date", e.target.value)
                    }
                  />
                  {errors[`payment-${index}-date`] && (
                    <p className={styles.errorMsg}>
                      {errors[`payment-${index}-date`]}
                    </p>
                  )}
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<CiSquareAlert className={styles.iconcolor} />}
                      text="Received TDS Amount"
                    />
                  </label>
                  <input
                    type="text"
                    name="tdsAmount"
                    value={payment.tdsAmount}
                    onChange={(e) =>
                      handlePaymentChange(
                        payment.id,
                        "tdsAmount",
                        e.target.value
                      )
                    }
                    placeholder="Enter TDS Amount..."
                  />
                  {errors[`payment-${index}-tds`] && (
                    <p className={styles.errorMsg}>
                      {errors[`payment-${index}-tds`]}
                    </p>
                  )}
                </div>
              </div>

              {/* CARD 3 — Receipt No + Transaction No */}
              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<CiSquareAlert className={styles.iconcolor} />}
                      text="Receipt No"
                    />
                  </label>
                  <input
                    type="text"
                    name="receiptNo"
                    value={payment.receiptNo}
                    onChange={(e) =>
                      handlePaymentChange(
                        payment.id,
                        "receiptNo",
                        e.target.value
                      )
                    }
                    placeholder="Enter Receipt No..."
                  />
                  {errors[`payment-${index}-receipt`] && (
                    <p className={styles.errorMsg}>
                      {errors[`payment-${index}-receipt`]}
                    </p>
                  )}
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<CiSquareAlert className={styles.iconcolor} />}
                      text="Transaction / Cheque No"
                    />
                  </label>
                  <input
                    type="text"
                    name="transactionNo"
                    value={payment.transactionNo}
                    onChange={(e) =>
                      handlePaymentChange(
                        payment.id,
                        "transactionNo",
                        e.target.value
                      )
                    }
                    placeholder="Enter Transaction / Cheque No..."
                  />
                  {errors[`payment-${index}-txn`] && (
                    <p className={styles.errorMsg}>
                      {errors[`payment-${index}-txn`]}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.formControl}>
                <label>
                  <IoLocation className={styles.iconcolor} />
                  Remark
                </label>
                <textarea
                  rows={2}
                  placeholder="Reason for Cancellation"
                  value={formData.remarkLast}
                  name="remarkLast"
                  onChange={onChangeField}
                />
                {errors.remarkLast && (
                  <p className={styles.errorMsg}>{errors.remarkLast}</p>
                )}
              </div>
            </div>
          ))}

          <div className={styles.formControl}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input
                type="checkbox"
                checked={confirmChecked}
                onChange={(e) => setConfirmChecked(e.target.checked)}
                style={{ width: "16px", height: "16px" }}
              />
              <p style={{ margin: 0 }}>
                I hereby confirm that all the booking information filled is
                correct
              </p>
            </label>
            {errors.confirmChecked && (
              <p className={styles.errorMsg}>{errors.confirmChecked}</p>
            )}
          </div>
          <button className={styles.pdfcnt} onClick={generatePDF}>
            pdf genrate
          </button>
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
                  className={`${styles.circle} ${
                    index <= currentStep ? styles.active : ""
                  }`}
                >
                  {index + 1}
                </div>
                <div className={styles.label}>{step}</div>
              </div>
            ))}
          </div>
        </div>
        <p className={styles.varning}>
          Please fill every details carefully, it cannot be change afterwards.
        </p>

        <div className={styles.dailogcnt}>
          {stepFields[currentStep].fields}

          <div className={styles.dialogButtons}>
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
                try {
                  if (flat?.occupied == true) return;
                  const isValid = validateStep(currentStep);
                  if (isValid) {
                    if (currentStep < steps.length - 1) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      onSubmit();
                    }
                  }
                } catch (e) {
                  console.log(e);
                  console.log(
                    "Validation failed — fix errors before next step"
                  );
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

function uniq(arr: any[]) {
  return arr.filter((v, i) => arr.indexOf(v) === i);
}
