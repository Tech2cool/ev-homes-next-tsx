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
import { exec } from "apexcharts";
import { useUser } from "@/providers/userContext";

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
  prfloor: number;
  parkingno: string;
  [key: string]: number | string;
};

const AddBooking: React.FC<AddBookingProps> = ({ openclick, lead }) => {
  const {
    getProjects,
    projects,
    getClosingManagers,
    closingManagers,
    postSalesExecutives,
    getPostSalesExecutives,
    addPostSaleLead,
    uploadFile,
    addPayment,
  } = useData();
  const { user } = useUser();
  const currentTheme = document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
  const dialogRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
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
      formData.manager = lead.teamLeader?._id || "";
      setformData((prev) => ({
        ...prev,
        applicants: [leadApplicant],
      }));
    }
  }, [lead]);

  useEffect(() => {
    getProjects();
    getClosingManagers();
    getPostSalesExecutives();
  }, []);

  const [preRegistrationChecklist, setPreRegistrationChecklist] = useState({
    tenPercentRecieved: { recieved: "no", remark: "" },
    stampDuty: { recieved: "no", percent: 0, remark: "" },
    gst: { recieved: "no", percent: 0, remark: "" },
    noc: { recieved: "no" },
    tds: { recieved: "no", remark: "" },
    legalCharges: { recieved: "no" },
    kyc: { recieved: "no" },
    agreement: {
      prepared: false,
      handOver: { status: "no" },
      document: {},
    },
  });

  const updateChecklistField = (section: string, field: string, value: any) => {
    setPreRegistrationChecklist((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };
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

  const optionssing = postSalesExecutives.map((exec) => ({
    value: exec?._id ?? "",
    label: `${exec?.firstName ?? ""} ${exec?.lastName ?? ""}`,
  }));

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
    setParkingList([...parkingList, { prfloor: 0, parkingno: "" }]);
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
    console.log("problem is here");
    const newPayment: Payment = {
      _id: "",
      paymentType: "",
      paymentMode: "",
      date: null,
      tds: 0,
      receiptNo: "",
      transactionId: "",
    };
    setPayments((prev) => [...prev, newPayment]);
  };

  const handleRemovePayment = (id: string) => {
    setPayments((prev) => prev.filter((payment) => payment._id !== id));
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

    const isCommercial = selectedProject?.propertyType === "commercial";

    if (stepIndex === 0) {
      // Always required for BOTH commercial + residential
      if (!formData.bookingDate)
        newErrors.bookingDate = "Booking date is required";
      if (!formData.bookingstatus)
        newErrors.bookingstatus = "Booking status is required";
      if (!formData.project)
        newErrors.project = "Project selection is required";

      // Common fields to keep for commercial
      if (!formData.floor) newErrors.floor = "Floor selection is required";
      if (!formData.unit) newErrors.unit = "Unit selection is required";

      // If commercial → STOP here (skip building, flat no, cost, carpet, parking)
      if (!isCommercial) {
        if (hasBuildings && !formData.blg)
          newErrors.blg = "Building selection is required";

        if (!formData.Flatno || !formData.Flatno.trim())
          newErrors.Flatno = "Flat number is required";
        if (!formData.carpet || !formData.carpet.trim())
          newErrors.carpet = "Carpet area is required";
        if (!formData.Cost || !formData.Cost.trim())
          newErrors.Cost = "Flat cost is required";

        parkingList.forEach((p, index) => {
          if (!p.prfloor)
            newErrors[`parkingList-${index}-prfloor`] = "Select Parking Floor";
        });
      }
    }

    if (stepIndex === 1 && !isCommercial) {
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
      if (!formData.manager?.trim())
        newErrors.manager = "Closing manager is required";
      if (formData.assignto.length === 0)
        newErrors.assignto = "Select at least one assignee.";
    }

    if (stepIndex === 3 && !isCommercial) {
      if (!formData.frontphoto)
        newErrors.frontphoto = "Front photo is required";
      if (!formData.backphoto) newErrors.backphoto = "Back photo is required";
    }

    // STEP 4 (payments) – this is COMMON for both
    if (stepIndex === 4) {
      if (!confirmChecked)
        newErrors.confirmChecked =
          "Please confirm that all information is correct.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    console.log("padd 1");
    if (!confirmChecked) {
      alert(
        "Please confirm that all details are correct and select the checkbox."
      );
      return;
    }

    if (!formData.frontphoto || !formData.backphoto) {
      alert("Please upload both front and back photos of the booking form.");
      return;
    }

    try {
      setIsLoading(true);

      // Upload documents
      let uploadedBookingFormFront: string | undefined;
      let uploadedBookingFormBack: string | undefined;
      let uploadedBookingPdf: string | undefined;

      // Upload booking form front
      if (formData.frontphoto) {
        const frontResponse = await uploadFile(formData.frontphoto);
        uploadedBookingFormFront = frontResponse?.file?.downloadUrl;
      }

      // Upload booking form back
      if (formData.backphoto) {
        const backResponse = await uploadFile(formData.backphoto);
        uploadedBookingFormBack = backResponse?.file?.downloadUrl;
      }

      // Upload PDF if generated
      // You'll need to generate the PDF as a file first
      const blob = await generatePDF();
      console.log("okay");
      console.log(blob);
      const pdfResponse = await uploadFile(blob);
      uploadedBookingPdf = pdfResponse?.file?.downloadUrl;


      console.log(uploadedBookingPdf);
      // Upload applicant documents and create applicants array
      const applicantsWithKyc = await Promise.all(
        formData.applicants.map(async (applicant, index) => {
          let uploadedAdhar = "";
          let uploadedPan = "";
          let uploadedOther = "";

          try {
            if (applicant.aadhaarFile) {
              const aadharResponse = await uploadFile(applicant.aadhaarFile);
              uploadedAdhar = aadharResponse?.file?.downloadUrl || "";
            }

            if (applicant.panFile) {
              const panResponse = await uploadFile(applicant.panFile);
              uploadedPan = panResponse?.file?.downloadUrl || "";
            }

            if (applicant.otherFile) {
              const otherResponse = await uploadFile(applicant.otherFile);
              uploadedOther = otherResponse?.file?.downloadUrl || "";
            }
          } catch (error) {
            console.error(
              `Error uploading documents for applicant ${index + 1}:`,
              error
            );
          }

          return {
            prefix: applicant.prefix || "",
            firstName: applicant.firstName || "",
            lastName: applicant.lastName || "",
            email: applicant.email || "",
            address: applicant.addressLine1 || "",
            addressLine1: applicant.addressLine1 || "",
            addressLine2: applicant.addressLine2 || "",
            city: applicant.city || "",
            pincode: applicant.pincode || "",
            phoneNumber: parseInt(applicant.phoneNumber || "0"),
            kyc: {
              addhar: { document: uploadedAdhar, type: "aadhar" },
              pan: { document: uploadedPan, type: "pan" },
              other: { document: uploadedOther, type: "other" },
            },
          };
        })
      );

      // Create parking array
      const parkings = parkingList.map((parking) => {
        const foundParking = selectedProject?.parkingList?.find(
          (p: Parking) =>
            p.floor === parking.prfloo &&
            p.number?.toString() === parking.parkingno
        );

        return {
          floor: parking.prfloor,
          floorName: foundParking?.floorName,
          parkingNo: foundParking?.number?.toString(),
          occupied: true,
          occupiedBy: foundParking?.occupiedBy,
        };
      });

      // Prepare the lead data
      const leadData: PostSaleLead = {
        // Flat details
        project: projects.find((e) => e._id === formData.project),
        buildingNo: formData.blg || undefined,
        floor: formData.floor,
        number: formData.unit,
        unitNo: formData.Flatno,
        parking: parkings,

        // Applicant details
        firstName: formData.applicants[0]?.firstName || "",
        lastName: formData.applicants[0]?.lastName || "",
        phoneNumber: parseInt(formData.applicants[0]?.phoneNumber || "0"),
        email: formData.applicants[0]?.email || "",
        applicants: applicantsWithKyc,

        // Primary address
        address: formData.addressOne,
        pincode: formData.pincode,
        city: formData.city,
        addressLine1: formData.addressOne,
        addressLine2: formData.addressTwo,

        // Team
        closingManager: closingManagers.find((e) => e._id === formData.manager),
        postSaleAssignTo: formData.assignto
          .map((opt) =>
            postSalesExecutives.find((exec) => exec._id === opt.value)
          )
          .filter((exec): exec is Employee => Boolean(exec)),
        // Booking
        registrationDone: regDone === "yes",
        flatCost: parseFloat(formData.Cost) || 0,
        carpetArea: parseFloat(formData.carpet) || 0,
        date: formData.bookingDate ? new Date(formData.bookingDate) : null,

        bookingFormFront: uploadedBookingFormFront,
        bookingFormBack: uploadedBookingFormBack,
        bookingPdf: uploadedBookingPdf,
        status: formData.bookingstatus,
        bookingStatus: { type: formData.bookingstatus },
        // Pre-registration checklist
        preRegistrationCheckList: {
          tenPercentRecieved: {
            remark: preRegistrationChecklist.tenPercentRecieved.remark,
            recieved: preRegistrationChecklist.tenPercentRecieved.recieved,
          },
          stampDuty: {
            remark: preRegistrationChecklist.stampDuty.remark,
            recieved: preRegistrationChecklist.stampDuty.recieved,
            percent: preRegistrationChecklist.stampDuty.percent,
          },
          gst: {
            remark: preRegistrationChecklist.gst.remark,
            recieved: preRegistrationChecklist.gst.recieved,
            percent: preRegistrationChecklist.gst.percent,
          },
          noc: {
            recieved: preRegistrationChecklist.noc.recieved,
          },
          tds: {
            remark: preRegistrationChecklist.tds.remark,
            recieved: preRegistrationChecklist.tds.recieved,
          },
          legalCharges: {
            recieved: preRegistrationChecklist.legalCharges.recieved,
          },
          kyc: {
            recieved: preRegistrationChecklist.kyc.recieved,
          },
          agreement: {
            handOver: {
              status: handover,
            },
            document: {},
            prepared: preRegistrationChecklist.agreement.prepared,
          },
    
        },
        // Other fields
        // pricingRemark: formData.remarkLast,
      };

      // Add the lead
      const response = await addPostSaleLead(leadData);
      // console.log("Lead created successfully:", leadData);

      // Add payments separately
      if (payments.length > 0) {
        await Promise.all(
          payments.map(async (payment) => {
            const paymentData: Payment = {
              // booking:,
              bookingAmt: payment.bookingAmt,
              cgst: payment.cgst,
              tds: payment.tds,
              date: payment.date ? new Date(payment.date) : undefined,
              transactionId: payment?.transactionId,
              paymentMode: payment.paymentMode,
              paymentType: payment.paymentType,
              receiptNo: payment.receiptNo,

              projects: projects.find((e) => e._id === formData.project),
              flatNo: formData.Flatno,
              remark: formData.remarkLast,
            };

            addPayment(paymentData);
          })
        );
      }

      alert("Booking created successfully!");
      openclick(false);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
    id: string,
    field: keyof Payment,
    value: string
  ) => {
    setPayments((prev) =>
      prev.map((p) => (p._id === id ? { ...p, [field]: value } : p))
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

  const onChangeCost = (e: any) => {
    const { name, value } = e.target;
    const onlyNumbers = value.replace(/\D/g, "");
    setformData((prev: any) => ({
      ...prev,
      Cost: onlyNumbers,
      CostWords: convertToIndianWords(Number(onlyNumbers)),
    }));
  };
  const toDataUrl = (url: string) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          })
      );

  const generatePDF = async () => {
    const background = await toDataUrl(
      "https://cdn.evhomes.tech/86c72869-0942-4180-bd97-10f75d4d4d00-IMG-20250416-WA0011.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6Ijg2YzcyODY5LTA5NDItNDE4MC1iZDk3LTEwZjc1ZDRkNGQwMC1JTUctMjAyNTA0MTYtV0EwMDExLmpwZyIsImlhdCI6MTc0NDgwNzk0OX0.LDwQQAhVD2z58KRWyuC4aOOEOhullO0h_pqHiVGflH8"
    );
    const logo = await toDataUrl(
      "https://cdn.evhomes.tech/6c43b153-2ddf-474c-803d-c6fef9ac319a-estimator.png?token=..."
    );
    const evHomesLogo = await toDataUrl(
      "https://cdn.evhomes.tech/6c43b153-2ddf-474c-803d-c6fef9ac319a-estimator.png"
    );
    let projectLogo: string | null = null;
    if (selectedProject?.logo) {
      try {
        projectLogo = await toDataUrl(selectedProject.logo);
      } catch (e) {
        console.log("Error loading project logo", e);
      }
    }
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.addImage(background, "JPEG", 0, 0, pageWidth, pageHeight);
    doc.addImage(logo, "PNG", 10, 10, 30, 15);

    const addPDFHeader = () => {
      const logoHeight = 20;
      const logoWidth = 32;
      const evWidth = 30;
      const evHeight = 15;

      if (evHomesLogo) {
        doc.addImage(evHomesLogo, "PNG", 10, 10, evWidth, evHeight);
      }

      if (projectLogo) {
        doc.addImage(projectLogo, "PNG", pageWidth - logoWidth - 10, 10, logoWidth, logoHeight);
      }
    };
    const lineGap = 8;
    const addBackground = () => {
      doc.addImage(background, "JPEG", 0, 0, pageWidth, pageHeight);
      addPDFHeader();

    };
    addBackground();
    let y = 20;
    // Load Project Logo (dynamic)





    const addBookingHeader = (unit: string | number, flatNo: string | number) => {
      const headerText = `UNIT: ${flatNo}`;
      const headerWidth = doc.getTextWidth(headerText) + 10;
      const x = (pageWidth - headerWidth) / 2;
      const headerHeight = 10;
      const borderRadius = 1;

      doc.setDrawColor(37, 48, 61);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, y, headerWidth, headerHeight, borderRadius, borderRadius, "FD")

      // Add text
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(37, 48, 61);
      doc.text(headerText, pageWidth / 2, y + 7, { align: "center" });

      y += headerHeight + 10;
    };



    const checkPageOverflow = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - 20) {
        if (y > 250) {
          doc.addPage();
          addBackground();
          y = 40;
        }
      }
    };

    const drawCard = (
      title: string,
      bodyHeight: number,
      drawBody: (startY: number) => void
    ) => {
      const cardX = 10;
      const cardWidth = 190;
      const headerHeight = 10;
      const borderRadius = 2;

      doc.setDrawColor(15, 32, 54);
      const cardHeight = headerHeight + bodyHeight;
      checkPageOverflow(cardHeight);
      const cardY = y;
      // CARD BASE
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(cardX, cardY, cardWidth, cardHeight, borderRadius, borderRadius, "FD");

      // HEADER WITH TOP-ONLY ROUNDED CORNERS
      doc.setFillColor(77, 237, 173);
      doc.roundedRect(cardX, cardY, cardWidth, headerHeight + 1, borderRadius, borderRadius, "F");

      // Flatten header bottom
      doc.rect(cardX, cardY + headerHeight, cardWidth, 1, "F");

      // HEADER TEXT
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(title, cardX + 5, cardY + 8);

      // BODY START Y POSITION
      const startY = cardY + headerHeight + 8;

      // Execute the dynamic body function
      drawBody(startY);

      // Update global Y
      y = cardY + cardHeight + 3;
    };

    const addPropertyCard = (data: any) => {

      drawCard("PROPERTY DETAILS", 33, (lineY) => {
          const formattedAmount = Number(data.Cost).toLocaleString("en-IN");

        const firstLine = [
          { label: "Project", value: selectedProject?.name },
          { label: "Flat Cost", value: formattedAmount },
        ];

        firstLine.forEach((item, i) => {
          const colX = 10 + 5 + i * 90;
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.text(item.label, colX, lineY);
          doc.setFont("helvetica", "normal");
          doc.text(String(item.value ?? "-"), colX, lineY + 5);
        });

        lineY += 15;

        const secondLine = [
          { label: "Building No.", value: data.blg ?? "NA" },
          { label: "Floor", value: data.floor },
          { label: "Unit", value: data.unit },
        ];

        secondLine.forEach((item, i) => {
          const colX = 10 + 5 + i * 60;
          doc.setFont("helvetica", "bold");
          doc.text(item.label, colX, lineY);
          doc.setFont("helvetica", "normal");
          doc.text(String(item.value ?? "-"), colX, lineY + 5);
        });
      });
    };


    const addCustomerCard = (data: any) => {
      const applicant = data.applicants?.[0];

      const rows = [
        [
          { label: "First Name", value: applicant?.firstName ?? "-" },
          { label: "Last Name", value: applicant?.lastName ?? "-" },
        ],
        [
          { label: "Requirement Type", value: "Na" },
          { label: "Email", value: applicant?.email ?? "-" },
        ],
        [
          { label: "Contact Number", value: applicant?.phoneNumber ?? "-" },
          { label: "Address", value: applicant?.addressLine1 ?? "-" },
        ],
        [
          { label: "City", value: applicant?.city ?? "-" },
          { label: "Pincode", value: applicant?.pincode ?? "-" },
        ],
      ];


      drawCard("CUSTOMER DETAILS", 40, (lineY) => {
        const colWidth = (190 - 10) / 2;

        rows.forEach((row) => {
          row.forEach((item, i) => {
            const colX = 10 + 5 + i * colWidth;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text(item.label + " :", colX, lineY);

            doc.setFont("helvetica", "normal");
            doc.text(String(item.value ?? "-"), colX + 40, lineY);
          });
          lineY += 8;
        });
      });
    };

    const addBookingCard = (data: any) => {
      const rows = [
        [{ label: "Booking Date", value: data.bookingDate }],
        [{ label: "Booking Status", value: data.bookingstatus }],
        [{ label: "Registration Done", value: regDone === "yes" ? "Yes" : "No", }],
      ];

      drawCard("BOOKING STATUS", 30, (lineY) => {
        const colWidth = (190 - 10) / 2;

        rows.forEach((row) => {
          row.forEach((item, i) => {
            const colX = 10 + 5 + i * colWidth;

            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text(item.label + " :", colX, lineY);

            doc.setFont("helvetica", "normal");
            doc.text(String(item.value ?? "-"), colX + 40, lineY);
          });
          lineY += 8;
        });
      });
    };

    const addteamInfoCard = (data: any) => {
      const closingTeam = lead?.revisitRef?.closingTeam || [];
      const teamCount = closingTeam.length;

      const memberNames = closingTeam
        .slice(0, 3)
        .map(member => `${member.firstName ?? ''} ${member.lastName ?? ''}`.trim())
        .filter(name => name)
        .join(', ');
      const rows = [
        [{
          label: "Closing Manager",
          value: (() => {
            const manager = closingManagers.find((e) => e._id === data.manager);
            return manager
              ? `${manager.firstName ?? ""} ${manager.lastName ?? ""}`.trim()
              : "-";
          })()
        }],
        [
          {
            label: `Closing Team(${teamCount})`,
            value: memberNames || "-"
          }
        ],
        [{
          label: "Assigned to",
          value: Array.isArray(data.assignto)
            ? data.assignto.map((item: OptionType) => item.label || item.value).join(", ")
            : data.assignto ?? "-"
        }],

      ];

      drawCard("TEAM INFORMATION", 30, (lineY) => {
        const colWidth = (190 - 10) / 2;

        rows.forEach((row) => {
          row.forEach((item, i) => {
            const colX = 10 + 5 + i * colWidth;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text(item.label + " :", colX, lineY);

            doc.setFont("helvetica", "normal");
            doc.text(String(item.value ?? "-"), colX + 40, lineY);
          });
          lineY += 8;
        });
      });
    };

    const addapplicantInfoCard = (data: any) => {
      const count = data.applicants?.length || 1;
      const bodyHeight = count * 8 + 10;

      drawCard("APPLICANTS", bodyHeight, (lineY) => {
        if (!data.applicants || data.applicants.length === 0) {
          doc.text("•  No applicants", 17, lineY);

          return;
        }

        data.applicants.forEach((app: any) => {
          doc.setFontSize(10);
          const fullName =
            `${app.firstName || ""} ${app.lastName || ""}`.trim() || "-";
          doc.text(`•  ${fullName}`, 17, lineY);
          lineY += 8;
        });
      });
    };
    const addPreRejisCard = (data: any) => {
      // Count number of checklist items to calculate body height
      const items = [
        data?.tenPercentRecieved,
        data?.stampDuty,
        data?.tds,
        data?.gst,
        data?.noc,
        data?.kyc,
        data?.legalCharges,
        data?.agreement?.handOver,
      ];

      const bodyHeight = (items.length || 1) * 12 + 10;

      drawCard("PRE-REGISTRATION CHECKLIST", bodyHeight, (lineY: number) => {
        const drawItem = (label: string, status: any, remark?: string, percentage?: any) => {
          const statusText = status ? String(status) : "";
          const statusLower = statusText.toLowerCase();

          const statusColor: [number, number, number] =
            statusLower === "yes" || statusLower === "true"
              ? [0, 100, 0]    // green
              : [26, 54, 93];  // blue

          // Label
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(26, 54, 93);
          doc.text(label, 15, lineY);

          // Percentage
          if (percentage != null) {
            doc.setFont("helvetica", "italic");
            doc.setFontSize(9);
            doc.setTextColor(102, 102, 102);
            doc.text(`(${percentage}%)`, 75, lineY);
          }

          // Status
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(...statusColor);
          doc.text(statusText, 115, lineY);

          // Remark
          if (remark) {
            doc.setFont("helvetica", "italic");
            doc.setFontSize(9);
            doc.setTextColor(102, 102, 102);
            doc.text(`(${remark})`, 145, lineY);
          }

          return lineY + 12;
        };

        // Draw each checklist item
        lineY = drawItem("10% Received", data.tenPercentRecieved?.recieved ?? "no", data.tenPercentRecieved?.remark ?? "");
        doc.setDrawColor(238, 238, 238); doc.setLineWidth(0.5);
        doc.line(15, lineY - 6, 195, lineY - 6);

        lineY = drawItem("Stamp Duty Received", data.stampDuty?.recieved ?? "no", data.stampDuty?.remark ?? "grgr", data.stampDuty?.percent ?? "0");
        doc.line(15, lineY - 6, 195, lineY - 6);

        lineY = drawItem("TDS Received", data.tds?.recieved, data.tds?.remark, data.tds?.percent);
        doc.line(15, lineY - 6, 195, lineY - 6);

        lineY = drawItem("GST Received", data.gst?.recieved, data.gst?.remark, data.gst?.percent);
        doc.line(15, lineY - 6, 195, lineY - 6);

        lineY = drawItem("NOC Received", data.noc?.recieved, data.noc?.remark);
        doc.line(15, lineY - 6, 195, lineY - 6);

        lineY = drawItem("KYC Received", data.kyc?.recieved, data.kyc?.remark);
        doc.line(15, lineY - 6, 195, lineY - 6);

        lineY = drawItem("Legal Charges Received", data.legalCharges?.recieved, data.legalCharges?.remark);
        doc.line(15, lineY - 6, 195, lineY - 6);

        lineY = drawItem("Agreement HandOver", handover);
        console.log("Selected handover state:", handover);
      });
    };
    const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);

      });
    };

    const addFormInfoCard = async (data: FormState) => {
      const images: { title: string; src: string }[] = [];

      if (data.frontphoto) {
        const frontBase64 = await fileToBase64(data.frontphoto);
        images.push({ title: "FRONT VIEW", src: frontBase64 });
      }

      if (data.backphoto) {
        const backBase64 = await fileToBase64(data.backphoto);
        images.push({ title: "BACK VIEW", src: backBase64 });
      }

      const bodyHeight = 80;

      drawCard("BOOKING FORM", bodyHeight, (lineY: number) => {
        const colWidth = 85;
        let xPos = 15;

        const padding = 15;

        images.forEach((img) => {

          doc.setDrawColor(26, 54, 93);
          doc.setLineWidth(0.3);
          doc.roundedRect(xPos, lineY, colWidth, 70, 2, 2, "S");
          const headerHeight = 10;
          const radius = 2;
          doc.setFillColor(230, 238, 248);
          doc.roundedRect(xPos, lineY, colWidth, headerHeight, radius, radius, "F");

          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(26, 54, 93);
          doc.text(img.title, xPos + colWidth / 2, lineY + 7, { align: "center" });

          doc.addImage(img.src, "JPEG", xPos + padding, lineY + 12, colWidth - padding * 2, 55);

          xPos += colWidth + 10;
        });

      });
    };
    addBookingHeader(formData.unit, formData.Flatno);

    addPropertyCard(formData);
    addCustomerCard(formData);
    addBookingCard(formData);
    addteamInfoCard(formData);
    addapplicantInfoCard(formData);
    addPreRejisCard(preRegistrationChecklist);
    await addFormInfoCard(formData);
    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(41, 40, 40);

    const footerText1 = "This PDF is generated by";
    const footerText2 = `${user?.firstName || ''} ${user?.lastName || ''} `;

    doc.text(footerText1, pageWidth - 10, pageHeight - 40, { align: "right" });
    doc.text(footerText2, pageWidth - 10, pageHeight - 35, { align: "right" });


    doc.save(`booking_details_${Date.now()}.pdf`);


  const blob = doc.output("blob");
  const file = new File([blob], "booking_details.pdf", { type: "application/pdf" });
  return file;
  };

  const steps = [
    "Booking Overview",
    "Applicants",
    "Team Overview",
    "Pre-registration",
    "Payment",
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
                      value={p?.prfloor ?? 0}
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
          {/* Upload Booking Form Frontside */}
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
                      setFrontUploaded(false);
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
                    setFrontUploaded(true);
                  }}
                />
              )}

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

          {/* Upload Booking Form Backside */}
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
                      setBackUploaded(false);
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
                    setBackUploaded(true);
                  }}
                />
              )}

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

          {/* 10% Received & Stamp Duty */}
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <IoReceipt className={styles.iconcolor} /> 10% Received
              </label>

              <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="tenPercentReceived"
                    value="yes"
                    checked={
                      preRegistrationChecklist.tenPercentRecieved.recieved ===
                      "yes"
                    }
                    onChange={(e) =>
                      updateChecklistField(
                        "tenPercentRecieved",
                        "recieved",
                        e.target.value
                      )
                    }
                  />{" "}
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="tenPercentReceived"
                    value="no"
                    checked={
                      preRegistrationChecklist.tenPercentRecieved.recieved ===
                      "no"
                    }
                    onChange={(e) =>
                      updateChecklistField(
                        "tenPercentRecieved",
                        "recieved",
                        e.target.value
                      )
                    }
                  />{" "}
                  No
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="tenPercentReceived"
                    value="partial"
                    checked={
                      preRegistrationChecklist.tenPercentRecieved.recieved ===
                      "partial"
                    }
                    onChange={(e) =>
                      updateChecklistField(
                        "tenPercentRecieved",
                        "recieved",
                        e.target.value
                      )
                    }
                  />{" "}
                  Partial
                </label>
              </div>

              <input
                type="text"
                placeholder="Remark"
                className={styles.remarkInput}
                value={preRegistrationChecklist.tenPercentRecieved.remark}
                onChange={(e) =>
                  updateChecklistField(
                    "tenPercentRecieved",
                    "remark",
                    e.target.value
                  )
                }
              />
            </div>

            <div className={styles.formControl}>
              <label>
                <FaStamp className={styles.iconcolor} /> Stamp Duty Received
              </label>

              <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="StampDutyReceived"
                    value="yes"
                    checked={
                      preRegistrationChecklist.stampDuty.recieved === "yes"
                    }
                    onChange={(e) =>
                      updateChecklistField(
                        "stampDuty",
                        "recieved",
                        e.target.value
                      )
                    }
                  />{" "}
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="StampDutyReceived"
                    value="no"
                    checked={
                      preRegistrationChecklist.stampDuty.recieved === "no"
                    }
                    onChange={(e) =>
                      updateChecklistField(
                        "stampDuty",
                        "recieved",
                        e.target.value
                      )
                    }
                  />{" "}
                  No
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="StampDutyReceived"
                    value="partial"
                    checked={
                      preRegistrationChecklist.stampDuty.recieved === "partial"
                    }
                    onChange={(e) =>
                      updateChecklistField(
                        "stampDuty",
                        "recieved",
                        e.target.value
                      )
                    }
                  />{" "}
                  Partial
                  <select
                    className={styles.percentDropdown}
                    value={preRegistrationChecklist.stampDuty.percent}
                    onChange={(e) =>
                      updateChecklistField(
                        "stampDuty",
                        "percent",
                        e.target.value
                      )
                    }
                  >
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
                value={preRegistrationChecklist.stampDuty.remark}
                onChange={(e) =>
                  updateChecklistField("stampDuty", "remark", e.target.value)
                }
              />
            </div>
          </div>

          {/* TDS Received & GST Received */}
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <FaFileInvoiceDollar className={styles.iconcolor} /> TDS
                Received
              </label>

              <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="tdsReceived"
                    value="yes"
                    checked={preRegistrationChecklist.tds.recieved === "yes"}
                    onChange={(e) =>
                      updateChecklistField("tds", "recieved", e.target.value)
                    }
                  />{" "}
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="tdsReceived"
                    value="no"
                    checked={preRegistrationChecklist.tds.recieved === "no"}
                    onChange={(e) =>
                      updateChecklistField("tds", "recieved", e.target.value)
                    }
                  />{" "}
                  No
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="tdsReceived"
                    value="partial"
                    checked={
                      preRegistrationChecklist.tds.recieved === "partial"
                    }
                    onChange={(e) =>
                      updateChecklistField("tds", "recieved", e.target.value)
                    }
                  />{" "}
                  Partial
                </label>
              </div>

              <input
                type="text"
                placeholder="Remark"
                className={styles.remarkInput}
                value={preRegistrationChecklist.tds.remark}
                onChange={(e) =>
                  updateChecklistField("tds", "remark", e.target.value)
                }
              />
            </div>

            <div className={styles.formControl}>
              <label>
                <FaFileInvoice className={styles.iconcolor} /> GST Received
              </label>

              <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gstReceived"
                    value="yes"
                    checked={preRegistrationChecklist.gst.recieved === "yes"}
                    onChange={(e) =>
                      updateChecklistField("gst", "recieved", e.target.value)
                    }
                  />{" "}
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gstReceived"
                    value="no"
                    checked={preRegistrationChecklist.gst.recieved === "no"}
                    onChange={(e) =>
                      updateChecklistField("gst", "recieved", e.target.value)
                    }
                  />{" "}
                  No
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gstReceived"
                    value="partial"
                    checked={
                      preRegistrationChecklist.gst.recieved === "partial"
                    }
                    onChange={(e) =>
                      updateChecklistField("gst", "recieved", e.target.value)
                    }
                  />{" "}
                  Partial
                  <select
                    className={styles.percentDropdown}
                    value={preRegistrationChecklist.gst.percent}
                    onChange={(e) =>
                      updateChecklistField("gst", "percent", e.target.value)
                    }
                  >
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
                value={preRegistrationChecklist.gst.remark}
                onChange={(e) =>
                  updateChecklistField("gst", "remark", e.target.value)
                }
              />
            </div>
          </div>

          {/* NOC Received, KYC Received & Legal Charges */}
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <FaFileSignature className={styles.iconcolor} /> NOC Received
              </label>

              <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="nocReceived"
                    value="yes"
                    checked={preRegistrationChecklist.noc.recieved === "yes"}
                    onChange={(e) =>
                      updateChecklistField("noc", "recieved", e.target.value)
                    }
                  />{" "}
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="nocReceived"
                    value="no"
                    checked={preRegistrationChecklist.noc.recieved === "no"}
                    onChange={(e) =>
                      updateChecklistField("noc", "recieved", e.target.value)
                    }
                  />{" "}
                  No
                </label>
              </div>
            </div>

            <div className={styles.formControl}>
              <label>
                <FaIdCard className={styles.iconcolor} /> KYC Received
              </label>

              <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="kycReceived"
                    value="yes"
                    checked={preRegistrationChecklist.kyc.recieved === "yes"}
                    onChange={(e) =>
                      updateChecklistField("kyc", "recieved", e.target.value)
                    }
                  />{" "}
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="kycReceived"
                    value="no"
                    checked={preRegistrationChecklist.kyc.recieved === "no"}
                    onChange={(e) =>
                      updateChecklistField("kyc", "recieved", e.target.value)
                    }
                  />{" "}
                  No
                </label>
              </div>
            </div>

            <div className={styles.formControl}>
              <label>
                <FaBalanceScale className={styles.iconcolor} /> Legal Charges
              </label>

              <div className={`${styles.checkboxGroup} ${styles.formSpacing}`}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="legalReceived"
                    value="yes"
                    checked={
                      preRegistrationChecklist.legalCharges.recieved === "yes"
                    }
                    onChange={(e) =>
                      updateChecklistField(
                        "legalCharges",
                        "recieved",
                        e.target.value
                      )
                    }
                  />{" "}
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="legalReceived"
                    value="no"
                    checked={
                      preRegistrationChecklist.legalCharges.recieved === "no"
                    }
                    onChange={(e) =>
                      updateChecklistField(
                        "legalCharges",
                        "recieved",
                        e.target.value
                      )
                    }
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Registration Done, Agreement Prepared & Agreement Handover */}
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
                  <input
                    type="radio"
                    name="Preagrement"
                    value="yes"
                    checked={
                      preRegistrationChecklist.agreement.prepared === true
                    }
                    onChange={(e) =>
                      updateChecklistField(
                        "agreement",
                        "prepared",
                        e.target.value === "yes"
                      )
                    }
                  />{" "}
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="Preagrement"
                    value="no"
                    checked={
                      preRegistrationChecklist.agreement.prepared === false
                    }
                    onChange={(e) =>
                      updateChecklistField(
                        "agreement",
                        "prepared",
                        e.target.value === "yes"
                      )
                    }
                  />{" "}
                  No
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

          {/* Additional Remarks Section */}
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <IoLocation className={styles.iconcolor} />
                Additional Remarks
              </label>
              <textarea
                rows={3}
                placeholder="Any additional remarks or notes..."
                value={formData.remarkLast}
                name="remarkLast"
                onChange={onChangeField}
                className={styles.remarkTextarea}
              />
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
                  onClick={() => handleRemovePayment(payment?._id ?? "")}
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
                        payment._id ?? "",
                        "paymentType",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Payment Type</option>
                    <option value="booking">Booking</option>
                    <option value="gst">GST</option>
                    <option value="tds">TDS</option>
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
                        payment?._id ?? "",
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
                    value={
                      payment?.date
                        ? new Date(payment.date).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      handlePaymentChange(
                        payment?._id ?? "",
                        "date",
                        e.target.value
                      )
                    }
                  />
                  {errors[`payment-${index}-date`] && (
                    <p className={styles.errorMsg}>
                      {errors[`payment-${index}-date`]}
                    </p>
                  )}
                </div>

                <div className={styles.formControl}>
                  {(() => {
                    const { label, field } = getPaymentFieldConfig(
                      payment?.paymentType ?? ""
                    );

                    return (
                      <div className={styles.formControl}>
                        <label>
                          <RequiredLabel
                            icon={
                              <CiSquareAlert className={styles.iconcolor} />
                            }
                            text={label}
                          />
                        </label>

                        <input
                          type="number"
                          name={field}
                          value={payment[field] ?? ""}
                          onChange={(e) =>
                            handlePaymentChange(
                              payment?._id ?? "",
                              field,
                              e.target.value
                            )
                          }
                          placeholder={`Enter ${label}...`}
                        />

                        {errors[`payment-${index}-${field}`] && (
                          <p className={styles.errorMsg}>
                            {errors[`payment-${index}-${field}`]}
                          </p>
                        )}
                      </div>
                    );
                  })()}
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
                        payment?._id ?? "",
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
                    name="transactionId"
                    value={payment?.transactionId}
                    onChange={(e) =>
                      handlePaymentChange(
                        payment?._id ?? "",
                        "transactionId",
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
                  className={`${styles.circle} ${index <= currentStep ? styles.active : ""
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

                  // console.log(validateStep);
                  const isValid = validateStep(currentStep);
                  // if (isValid) {
                    if (currentStep < steps.length - 1) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      onSubmit();
                    }
                  // }
                } catch (e) {
                  console.log(e);
                  console.log(
                    "Validation failed — fix errors before next step"
                  );
                }
              }}
            >
              {isLoading
                ? "Creating..."
                : currentStep === steps.length - 1
                  ? "Submit"
                  : "Next"}
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

const convertToIndianWords = (num: number) => {
  if (!num) return "";

  let remaining = num;

  const crore = Math.floor(remaining / 10000000);
  remaining %= 10000000;

  const lakh = Math.floor(remaining / 100000);
  remaining %= 100000;

  const thousand = Math.floor(remaining / 1000);
  remaining %= 1000;

  const hundred = remaining;

  let result = "";

  if (crore) result += `${crore} Cr `;
  if (lakh) result += `${lakh} Lakh `;
  if (thousand) result += `${thousand} Thousand `;
  if (hundred) result += `${hundred}`;

  return result.trim();
};

type PaymentAmountField = "bookingAmt" | "cgst" | "tds";

const getPaymentFieldConfig = (
  type: string
): { label: string; field: PaymentAmountField } => {
  switch (type) {
    case "Booking":
      return { label: "Received Net Amount", field: "bookingAmt" };
    case "GST":
      return { label: "Received GST Amount", field: "cgst" };
    case "TDS":
      return { label: "Received TDS Amount", field: "tds" };
    default:
      return { label: "Received Amount", field: "tds" };
  }
};
