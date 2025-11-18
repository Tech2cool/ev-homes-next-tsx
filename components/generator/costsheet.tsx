"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import styles from "@/components/dashboard-components/data-analyzer-dashboard/taggingform.module.css";
import cardstyles from "@/components/lead-details-components/Dailog/bookingdailog.module.css";

import {
  FaBuilding,
  FaCalendarAlt,
  FaDoorClosed,
  FaStar,
} from "react-icons/fa";
import {
  BiLocationPlus,
  BiRupee,
  BiSolidCity,
  BiSolidLocationPlus,
  BiSolidLockOpenAlt,
} from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import { FaArrowUpFromGroundWater } from "react-icons/fa6";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { AiFillPicture } from "react-icons/ai";
import { useData } from "@/providers/dataContext";
import { customRound, getNumberWithSuffix } from "@/app/helper";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface FormState {
  project: string;
  propertyType: string;
  blg: number;
  floor: number;
  unit: number;
  prefix: string;
  Flatno: string;
  firstName: string;
  reference: string;
  stampDuty: string;
  allInclusiveamount: string;
  houseno: string;
  area: string;
  landmark: string;
  pincode: string;
  town: string;
  letterdate: string;
  bookingForm: File | null;
}

interface CostsheetProps {
  lead?: PostSaleLead | null;
  lead1?: Lead | null;
}

interface CalculatedValues {
  agreementValue: number;
  registrationAmount: number;
  gstAmount: number;
  stampDutyAmount: number;
  stampDutyRounded: number;
}

const CostSheet: React.FC<CostsheetProps> = ({ lead, lead1 }) => {
  const {
    projects,
    getProjects,
    // getLeadByPhoneNumber,
    // addBrokerage,
  } = useData();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [propertyType, setPropertyType] = useState<string>("Flat");
  // const [selectedProject, setSelectedProject] = useState<OurProject | null>(
  //   lead?.bookingRef?.project || null
  // );

  const setFieldValue = (name: string, value: string) => {
    onChangeField({
      target: { name, value } as any,
    } as React.ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const [formData, setFormData] = useState<FormState>({
    project: "",
    propertyType: "",
    blg: 0,
    floor: 0,
    unit: 0,
    Flatno: "",
    prefix: "",
    firstName: "",
    reference: "",
    stampDuty: "",
    allInclusiveamount: "",
    houseno: "",
    area: "",
    landmark: "",
    pincode: "",
    town: "",
    letterdate: "",
    bookingForm: null,
  });

  const initialCalculatedValues: CalculatedValues = {
    agreementValue: 0,
    registrationAmount: 30000,
    gstAmount: 0,
    stampDutyAmount: 0,
    stampDutyRounded: 0,
  };

  useEffect(() => {
    if (formData.floor && formData.unit) {
      const floorNum = Number(formData.floor);
      const unitNum = Number(formData.unit);
      const flat = floorNum * 100 + unitNum;
      setFormData((prev: any) => ({
        ...prev,
        Flatno: flat.toString(),
      }));
    }
  }, [formData.floor, formData.unit, formData.allInclusiveamount]);

  const onChangeField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Handle propertyType separately if needed
    if (name === "propertyType") {
      setPropertyType(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, bookingForm: file }));
  };

  const stampDutyOptions = [
    { value: 5, label: "5%" },
    { value: 6, label: "6%" },
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.project) newErrors.projecttype = "Please select Project.";
    if (!formData.propertyType)
      newErrors.propertyType = "Please select property type.";
    if (!formData.blg) newErrors.blg = "Blg selection is required";
    if (!formData.floor) newErrors.floor = "Floor selection is required";
    if (!formData.unit) newErrors.unit = "Unit selection is required";
    if (!formData.prefix) newErrors.prefix = "Select title";
    if (!formData.firstName.trim())
      newErrors.firstName = "Please enter First Name";
    if (!formData.stampDuty) newErrors.stampper = "Enter Stamp Duty Percentage";
    if (!formData.reference)
      newErrors.reference = "Please enter Reference number";
    if (!formData.allInclusiveamount)
      newErrors.allInclusiveamount = "Enter All Inclusive Amount";
    if (!formData.letterdate)
      newErrors.letterdate = "Please select Letter Date";
    if (!formData.bookingForm)
      newErrors.bookingForm = "Please upload booking form";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setFormData({
      project: "",
      propertyType: "",
      blg: 0,
      floor: 0,
      unit: 0,
      Flatno: "",
      prefix: "",
      firstName: "",
      reference: "",
      stampDuty: "",
      allInclusiveamount: "",
      houseno: "",
      area: "",
      landmark: "",
      pincode: "",
      town: "",
      letterdate: "",
      bookingForm: null,
    });
    setErrors({});
  };

  function uniq(arr: any[]) {
    return arr.filter((v, i) => arr.indexOf(v) === i);
  }

  const projectOptions = projects.map((p: any) => ({
    value: p._id,
    label: p.name,
  }));

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
        setFieldValue(
          "allInclusiveamount",
          flat.allInclusiveValue?.toString() ?? ""
        );
      } else {
        const generatedFlatNo = formData.floor * 100 + Number(formData.unit);
        setFieldValue("Flatno", generatedFlatNo.toString());
      }
    }
  }, [
    formData.blg,
    formData.floor,
    formData.unit,
    formData.allInclusiveamount,
    selectedProject,
    hasBuildings,
  ]);

  useEffect(() => {
    const project = projects.find((p: any) => p._id === formData.project);

    let short = project?.shortCode || "EV-09";

    if (project) {
      setFormData((prev) => ({
        ...prev,
        reference: `EVHCPL/POSTSALES/${short}/25-26/L/000`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        reference: "EVHCPL/POSTSALES/EV-23/25-26/L/000",
      }));
    }
  }, [formData.project, projects]);

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

  const calculateValues = (): CalculatedValues => {
    const allInclusiveAmount = parseFloat(formData.allInclusiveamount) || 0;
    const stampRate = parseFloat(formData.stampDuty) || 0;
    const registrationAmount = 30000;
    const gstPercentage = 5.0;

    let agreementValue = 0;
    let factor = 0;
    let gstAmount = 0;
    let initialStampDuty = 0;

    if (allInclusiveAmount <= 0 || stampRate <= 0) {
      return initialCalculatedValues;
    }

    factor = 1 + (gstPercentage + stampRate) / 100;
    agreementValue = (allInclusiveAmount - registrationAmount) / factor;
    gstAmount = (agreementValue * gstPercentage) / 100;
    initialStampDuty = (agreementValue * stampRate) / 100;

    agreementValue = Math.round(agreementValue);
    gstAmount = Math.round(gstAmount);
    initialStampDuty = Math.round(initialStampDuty);

    const calculatedTotal =
      agreementValue + gstAmount + initialStampDuty + registrationAmount;
    let difference = allInclusiveAmount - calculatedTotal;
    difference = parseFloat(difference.toFixed(2));

    const adjustedStampDuty = initialStampDuty + difference;
    const simpleStampDuty = Math.round(adjustedStampDuty);

    return {
      agreementValue,
      registrationAmount,
      gstAmount,
      stampDutyAmount: simpleStampDuty,
      stampDutyRounded:
        simpleStampDuty % 10 === 0
          ? simpleStampDuty
          : Math.ceil(simpleStampDuty / 10) * 10,
    };
  };

  // Format currency for display (like ₹ 80,00,000)
  const formatCurrency = (amount: number): string => {
    return `₹ ${amount.toLocaleString("en-IN")}`;
  };

  // Your component usage with calculated values
  const calculatedValues = calculateValues();

  // Updated onSubmit function
  const onSubmit = () => {
    if (!validateForm()) return;

    // Prepare data for submission similar to your Flutter code
    const submissionData = {
      agreementValue: calculatedValues.agreementValue,
      stampDutyValue: calculatedValues.stampDutyAmount,
      gstValue: calculatedValues.gstAmount,
      roundedStampDutyValue: Math.round(calculatedValues.stampDutyRounded),
      roundedGstValue: Math.round(calculatedValues.gstAmount),
      roundedAdjustedStampDuty:
        calculatedValues.stampDutyRounded - calculatedValues.stampDutyAmount,
      totalValue: Math.round(parseFloat(formData.allInclusiveamount) || 0),
    };

    alert(
      "Form submitted successfully:\n" + JSON.stringify(submissionData, null, 2)
    );
  };

  const getGreeting = (prefixes: string[]): string => {
    if (!prefixes || prefixes.length === 0) return "Dear Sir/Madam,";

    const lowerPrefixes = prefixes.map((p) => p.toLowerCase());

    const hasMr = lowerPrefixes.includes("mr.");
    const hasMrs = lowerPrefixes.includes("mrs.");
    const hasMiss = lowerPrefixes.includes("miss");

    const totalClients = prefixes.length;

    if (totalClients === 1) {
      return lowerPrefixes[0] === "mr." ? "Dear Sir," : "Dear Madam,";
    }

    if (totalClients === 2) {
      if (hasMr && (hasMrs || hasMiss)) {
        return "Dear Sir/Madam,";
      } else if (hasMr) {
        return "Dear Sir,";
      } else {
        return "Dear Madam,";
      }
    }

    return "Dear Sir/Madam,";
  };

  const getFloorSuffix = (floor: number) => {
    if (!floor) return "";
    const lastDigit = floor % 10;
    const lastTwo = floor % 100;

    if (lastTwo >= 11 && lastTwo <= 13) return `${floor}th Floor`; // 11th, 12th, 13th

    switch (lastDigit) {
      case 1:
        return `${floor}st Floor`;
      case 2:
        return `${floor}nd Floor`;
      case 3:
        return `${floor}rd Floor`;
      default:
        return `${floor}th Floor`;
    }
  };

  const generatePdf = (): // formData: FormData,
  // calculatedValues: CalculatedValues,
  // project?: OurProject,
  // selectedPrefixes?: string[],
  // letterDate?: Date
  void => {
    try {
      if (!selectedProject) {
        throw new Error("No project selected");
      }

      // Create new PDF document
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Set initial y position
      let yPosition = 30;

      // Reference and Date
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");

      const reference = formData.reference || "N/A";
      const date =
        formData.letterdate || new Date().toISOString().split("T")[0];

      pdf.text(`Ref.: ${reference}`, 20, yPosition);
      pdf.text(`Date: ${date}`, pageWidth - 60, yPosition);

      yPosition += 10;

      // To Address
      pdf.setFont("helvetica", "bold");
      pdf.text("To,", 20, yPosition);
      yPosition += 5;

      pdf.setFont("helvetica", "normal");
      // Names
      const clientName = formData.firstName || "Client";
      const prefix = formData.prefix || "";
      pdf.text(`${prefix} ${clientName}`, 20, yPosition);
      yPosition += 6;

      // Address lines
      // if (formData.houseno) {
      //     pdf.text(formData.houseno, 20, yPosition);
      //     yPosition += 6;
      //   }
      //   if (formData.area) {
      //     pdf.text(formData.area, 20, yPosition);
      //     yPosition += 6;
      //   }
      //   if (formData.landmark) {
      //     pdf.text(formData.landmark, 20, yPosition);
      //     yPosition += 6;
      //   }

      // const cityPincode = [formData.town, formData.pincode].filter(Boolean).join(' - ');
      // if (cityPincode) {
      //   pdf.text(cityPincode, 20, yPosition);
      //   yPosition += 15;
      // }

      yPosition += 5;

      // Greeting and Subject
      const prefixes = ["mr.", "mrs."];

      pdf.text(getGreeting(prefixes), 20, yPosition);
      yPosition += 8;

      const propertyTypeText = (formData.propertyType || "Flat").toLowerCase();
      const floorText = formData.floor
        ? `${getNumberWithSuffix(
            parseInt(formData.floor.toString()) || 0
          )} Floor, `
        : "";
      const buildingText = formData.blg ? `Tower ${formData.blg}, ` : "";

      const floorLabel = getFloorSuffix(Number(formData.floor));
      const subject = `Subject: Cost Sheet For ${buildingText}${
        formData.propertyType || "Flat"
      } No. ${formData.Flatno}, ${
        formData.propertyType === "Flat" ? floorLabel : ""
      } ${floorLabel}, ${selectedProject?.name}`;

      pdf.text(subject, 20, yPosition);
      yPosition += 4;

      // Project description
      const description = `Please find below given cost details for the ${propertyTypeText} booked by you in our project, ${selectedProject.name},
${selectedProject.address}`;

      yPosition += 6;

      pdf.text(description, 20, yPosition);
      yPosition += 12;

      // Value of property
      const allInclusiveAmount = parseFloat(formData.allInclusiveamount) || 0;

      const pre = `Value of ${formData.propertyType || "Flat"} Rs. `;
      const amount = `${allInclusiveAmount}/-`;
      const suffix = " inclusive of all.";

      // Print prefix
      pdf.setFont("helvetica", "normal");
      pdf.text(pre, 20, yPosition);

      // Print amount in bold
      const prefixWidth = pdf.getTextWidth(pre);
      pdf.setFont("helvetica", "bold");
      pdf.text(amount, 20 + prefixWidth, yPosition);

      // Print suffix
      const amountWidth = pdf.getTextWidth(amount);
      pdf.setFont("helvetica", "normal");
      pdf.text(suffix, 20 + prefixWidth + amountWidth, yPosition);

      yPosition += 15;

      // Cost Table
      const costTableData = [
        ["Particulars", "Rs", "Amount", "Rounded"],
        [
          "Agreement Value",
          "Rs",
  Math.round(calculatedValues.agreementValue),
          "",
        ],
        [
          `Stamp duty @ %`,
          "Rs",
         Math.round(calculatedValues.stampDutyAmount),
          Math.round(calculatedValues.stampDutyRounded),
        ],
        [
          "Registration",
          "Rs",
          Math.round(calculatedValues.registrationAmount),
          "",
        ],
        [
          "GST @ 5% inclusive",
          "Rs",
         Math.round(calculatedValues.gstAmount),
          "",
        ],
        ["Total", "Rs", Math.round(allInclusiveAmount), ""],
        [
          "Adjusted for Stampduty",
          "Rs",
          "-",
         
            Math.round(
              calculatedValues.stampDutyRounded -
                calculatedValues.stampDutyAmount
            )
          
        ],
      ];

      autoTable(pdf, {
        startY: yPosition,
        head: [costTableData[0]],
        body: costTableData.slice(1),
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 2 },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontStyle: "bold",
        },
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: 15 },
          2: { cellWidth: 40, halign: "right" },
          3: { cellWidth: 40, halign: "right" },
        },
        margin: { left: 20, right: 20 },
      });

      yPosition = (pdf as any).lastAutoTable.finalY + 10;

      // Kindly make arrangements text
      pdf.text(
        "Kindly make arrangements for the payments as agreed by you.",
        20,
        yPosition
      );
      yPosition += 10;

      // Thanking you
      pdf.text("Thanking you,", 20, yPosition);
      yPosition += 6;
      pdf.text("Yours faithfully,", 20, yPosition);
      yPosition += 10;

      // Company name
      pdf.setFont("", "bold");
      pdf.text("For E V Homes Constructions Pvt. Ltd.", 20, yPosition);
      yPosition += 20;

      // Authorized signature
      pdf.text("Authorized Signature", 20, yPosition);

      // Payable Table on second page
      pdf.addPage();

      const bookingAmount = customRound(
        Math.round(calculatedValues.agreementValue) * 0.1
      );
      const gstAmountPayable = customRound(bookingAmount * 0.05);
      const tdsAmount = customRound(calculatedValues.agreementValue * 0.01);

      // const payableTableData = [
      //   [
      //     'Payable Now',
      //     'Amount',
      //     'Account Details'
      //   ],
      //   [
      //     'Booking amount 10%',
      //     formatCurrency(bookingAmount),
      //     `${project.businessAccount?.accountNo || 'NA'}\n${project.businessAccount?.ifsc || 'NA'}\n${project.businessAccount?.bankName || 'NA'}`
      //   ],
      //   [
      //     'GST amount (Payable)',
      //     formatCurrency(gstAmountPayable),
      //     `${project.govAccount?.accountNo || 'NA'}\n${project.govAccount?.ifsc || 'NA'}\n${project.govAccount?.bankName || 'NA'}`
      //   ],
      //   [
      //     'Stamp Duty + Registration amount (Full)',
      //     formatCurrency(calculatedValues.stampDutyRounded + calculatedValues.registrationAmount),
      //     `${project.govAccount?.accountNo || 'NA'}\n${project.govAccount?.ifsc || 'NA'}\n${project.govAccount?.bankName || 'NA'}`
      //   ],
      //   [
      //     'TDS @1%',
      //     formatCurrency(tdsAmount),
      //     `${project.govAccount?.accountNo || 'NA'}\n${project.govAccount?.ifsc || 'NA'}\n${project.govAccount?.bankName || 'NA'}`
      //   ],
      //   [
      //     'Total',
      //     formatCurrency(customRound(
      //       bookingAmount +
      //       gstAmountPayable +
      //       calculatedValues.stampDutyRounded +
      //       calculatedValues.registrationAmount +
      //       tdsAmount
      //     )),
      //     ''
      //   ]
      // ];

      // autoTable(pdf, {
      //   startY: 30,
      //   head: [payableTableData[0]],
      //   body: payableTableData.slice(1),
      //   theme: 'grid',
      //   styles: { fontSize: 10, cellPadding: 2 },
      //   headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
      //   columnStyles: {
      //     0: { cellWidth: 80 },
      //     1: { cellWidth: 40, halign: 'right' },
      //     2: { cellWidth: 60 }
      //   },
      //   margin: { left: 20, right: 20 }
      // });

      // Save the PDF
      const pdfName = `Cost Sheet - ${formData.propertyType || "Property"} ${
        formData.Flatno || "NA"
      }.pdf`;
      pdf.save(pdfName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        `Error generating PDF: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.costcontainer}>
        <div className={styles.headline}>Cost Sheet Generator</div>
        <div className={styles.mainlable}>Project Details</div>
        <div className={styles.infocard}>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<FaBuilding className={styles.iconcolor} />}
                  text=" Select Project"
                />
              </label>
              <select
                value={formData.project}
                name="project"
                onChange={onChangeField}
              >
                {" "}
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
        </div>

        <div className={styles.cpheadline}>Property Details</div>
        <div className={styles.infocard}>
          <div className={styles.card}>
            <div className={styles.formControl}>
              {hasBuildings && (
                <label>
                  <RequiredLabel
                    icon={<LuBuilding2 className={styles.iconcolor} />}
                    text="Blg"
                  />
                </label>
              )}
              {hasBuildings && (
                <select
                  value={formData.blg}
                  name="blg"
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
              {errors.blg && <p className={styles.errorMsg}>{errors.blg}</p>}
            </div>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={
                    <FaArrowUpFromGroundWater className={styles.iconcolor} />
                  }
                  text="Floor"
                />
              </label>
              <select
                value={formData.floor}
                name="floor"
                onChange={onChangeField}
              >
                <option value="">Select Floor</option>
                {floorOptions.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              {errors.floor && (
                <p className={styles.errorMsg}>{errors.floor}</p>
              )}
            </div>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<TbHexagonNumber1Filled className={styles.iconcolor} />}
                  text="Unit"
                />
              </label>
              <select
                value={formData.unit}
                name="unit"
                onChange={onChangeField}
              >
                <option value="">Select Unit</option>
                {unitOptions.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              {errors.unit && <p className={styles.errorMsg}>{errors.unit}</p>}
            </div>

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
          </div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<LuBuilding2 className={styles.iconcolor} />}
                  text="Frefix"
                />
              </label>
              <select
                name="prefix"
                value={formData.prefix}
                onChange={onChangeField}
              >
                <option value="">Title</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Miss">Miss</option>
                <option value="Dr.">Dr.</option>
              </select>
              {errors.prefix && (
                <p className={styles.errorMsg}>{errors.prefix}</p>
              )}
            </div>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<IoPersonOutline className={styles.iconcolor} />}
                  text="Client First Name"
                />
              </label>
              <input
                type="text"
                value={`${lead1?.firstName ?? ""} ${
                  lead1?.lastName ?? ""
                }`.trim()}
                name="firstName"
                placeholder="first name...."
                onChange={onChangeField}
              />
              {errors.firstName && (
                <p className={styles.errorMsg}>{errors.firstName}</p>
              )}
            </div>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<IoPersonOutline className={styles.iconcolor} />}
                  text="Reference No"
                />
              </label>

              <input
                type="text"
                value={formData.reference}
                name="reference"
                placeholder="Reference no...."
                onChange={onChangeField}
              />

              {errors.reference && (
                <p className={styles.errorMsg}>{errors.reference}</p>
              )}
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<FaStar className={styles.iconcolor} />}
                  text="Stamp Duty Percentage"
                />
              </label>

              <select
                value={formData.stampDuty}
                name="stampDuty"
                onChange={onChangeField}
              >
                <option value="">Select Percentage</option>

                {stampDutyOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {errors.stampDuty && (
                <p className={styles.errorMsg}>{errors.stampDuty}</p>
              )}
            </div>

            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<BiRupee className={styles.iconcolor} />}
                  text="All Inclusive Amount"
                />
              </label>
              <input
                type="number"
                value={formData.allInclusiveamount}
                name="allInclusiveamount"
                placeholder="Enter all inclusive amount...."
                onChange={onChangeField}
              />
              {errors.allInclusiveamount && (
                <p className={styles.errorMsg}>{errors.allInclusiveamount}</p>
              )}
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <p>
                GST Percentage : <span style={{ color: "#532ae8ff" }}>5%</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.cpheadline}>Address Details</div>
        <div className={styles.infocard}>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <BiLocationPlus className={styles.iconcolor} /> Address
              </label>
              <input
                type="text"
                value={formData.houseno}
                name="houseno"
                placeholder="Flat, House no., Building, Company, Apartment"
                onChange={onChangeField}
              />
            </div>
            <div className={styles.formControl}>
              <label>
                <BiLocationPlus className={styles.iconcolor} /> Area
              </label>
              <input
                type="text"
                value={formData.area}
                name="area"
                placeholder="Area, Street, Sector, Village"
                onChange={onChangeField}
              />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <BiLocationPlus className={styles.iconcolor} />
                Landmark
              </label>
              <input
                type="text"
                value={formData.landmark}
                name="landmark"
                placeholder="Enter Landmark..."
                onChange={onChangeField}
              />
            </div>
            <div className={styles.formControl}>
              <label>
                <BiSolidLockOpenAlt className={styles.iconcolor} /> pincode
              </label>
              <input
                type="number"
                value={formData.pincode}
                name="pincode"
                placeholder="Enter pincode..."
                onChange={onChangeField}
              />
            </div>
            <div className={styles.formControl}>
              <label>
                <BiSolidCity className={styles.iconcolor} /> Town/City
              </label>
              <input
                type="text"
                value={formData.town}
                name="town"
                placeholder="Enter Town/City..."
                onChange={onChangeField}
              />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<FaCalendarAlt className={styles.iconcolor} />}
                  text="Letter Date"
                />
              </label>
              <input
                type="date"
                name="letterdate"
                value={formData.letterdate}
                onChange={onChangeField}
                className={styles.inputField}
              />
              {errors.letterdate && (
                <p className={styles.errorMsg}>{errors.letterdate}</p>
              )}
            </div>

            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<AiFillPicture className={styles.iconcolor} />}
                  text="Upload Booking Form"
                />
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className={styles.inputField}
              />
              {formData.bookingForm && (
                <p
                  style={{ marginTop: "5px", fontSize: "14px", color: "#555" }}
                >
                  Uploaded: {formData.bookingForm.name}
                </p>
              )}
              {errors.bookingForm && (
                <p className={styles.errorMsg}>{errors.bookingForm}</p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.cpheadline}>Cost Sheet</div>
        <div className={styles.infocard}>
          <div className={cardstyles.infoCard}>
            <h4 className={cardstyles.cardTitle}>💰 Cost Sheet Summary</h4>
            <p className={cardstyles.cardSubtitle}>
              Details of payments made toward the cost sheet including
              agreement, GST, and stamp duty.
            </p>

            <div className={cardstyles.infoRow}>
              <span className={cardstyles.infoLabel}>Agreement Value</span>
              <span className={cardstyles.infoValue}>
                {" "}
                {formatCurrency(calculatedValues.agreementValue)}
              </span>
            </div>
            <div className={cardstyles.infoRow}>
              <span className={cardstyles.infoLabel}>Registration Amount</span>
              <span className={cardstyles.infoValue}>
                {" "}
                {formatCurrency(calculatedValues.registrationAmount)}
              </span>
            </div>
            <div className={cardstyles.infoRow}>
              <span className={cardstyles.infoLabel}>Gst Amount</span>
              <span className={cardstyles.infoValue}>
                {" "}
                {formatCurrency(calculatedValues.gstAmount)}
              </span>
            </div>
            <div className={cardstyles.infoRow}>
              <span className={cardstyles.infoLabel}>Stamp Duty Amount</span>
              <span className={cardstyles.infoValue}>
                {" "}
                {formatCurrency(calculatedValues.stampDutyAmount)}
              </span>
            </div>
            <div className={cardstyles.infoRow}>
              <span className={cardstyles.infoLabel}>Stamp Duty Rounded</span>
              <span className={cardstyles.infoValue}>
                {" "}
                {formatCurrency(calculatedValues.stampDutyRounded)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.buttoncontainer} style={{ marginTop: "30px" }}>
          <button className={styles.cancelbtn} onClick={generatePdf}>
            Generate Cost Sheet PDF
          </button>
          <button className={styles.submitbtn} onClick={onSubmit}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostSheet;
