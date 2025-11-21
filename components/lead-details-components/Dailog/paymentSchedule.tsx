"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css";
import {
  IoLocation,
  IoHome,
  IoCall,
  IoBusiness,
  IoCalculator,
} from "react-icons/io5";
import { BsCurrencyRupee, BsPersonFill } from "react-icons/bs";
import { PiBagFill } from "react-icons/pi";
import { AiFillPicture, AiFillFilePdf } from "react-icons/ai";
import ReactDOM from "react-dom";
import { MdCancel } from "react-icons/md";
import { customRound, getNumberWithSuffix } from "@/app/helper";
import { useData } from "@/providers/dataContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface PaymentScheduleProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
  postSaleLead?: PostSaleLead | null;
  project?: OurProject;
  flatNo?: string;
  allInclusive?: number;
  leads?: Lead | null;
}

interface NameField {
  prefix: string;
  name: string;
}

interface FormData {
  selectedProject: OurProject | null;
  propertyType: "Flat" | "Shop";
  flatNo: string;
  phone: string;
  allInclusiveAmount: string;
  carpetArea: string;
  selectedStampDuty: string;
  whichBuildingNo: number | null;
  whichFloor: number | null;
  selectedFlatNo: number | null;
  selectedShopNumber: string | null;
}

const PaymentSchedule: React.FC<PaymentScheduleProps> = ({
  openclick,
  postSaleLead,
  project,
  flatNo,
  allInclusive,
  leads,
}) => {
  const { getProjects, projects, getSlabByProject, slabsbyproject } = useData();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    selectedProject: null,
    propertyType: "Flat",
    flatNo: "",
    phone: "",
    allInclusiveAmount: "",
    carpetArea: "",
    selectedStampDuty: "6",
    whichBuildingNo: null,
    whichFloor: null,
    selectedFlatNo: null,
    selectedShopNumber: null,
  });

  const [names, setNames] = useState<NameField[]>([{ prefix: "", name: "" }]);

  const prefixList = ["mr.", "mrs.", "miss"];
  const shopNumbers = Array.from({ length: 20 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  useEffect(() => {
    getProjects();
    if (project?._id) {
      getSlabByProject(project._id);
    }

    if (postSaleLead) {
      setFormData((prev) => ({
        ...prev,
        selectedProject: postSaleLead.project || null,
        flatNo: postSaleLead.unitNo || "",
        phone: postSaleLead.phoneNumber?.toString() || "",
        carpetArea: postSaleLead.carpetArea?.toString() || "",
        allInclusiveAmount: allInclusive?.toString() || "",
        selectedStampDuty:
          postSaleLead.preRegistrationCheckList?.stampDuty?.percent?.toString() ||
          "6",
      }));

      if (postSaleLead.applicants && postSaleLead.applicants.length > 0) {
        const applicantNames = postSaleLead.applicants.map((app) => ({
          prefix: app.prefix || "",
          name: `${app.firstName || ""} ${app.lastName || ""}`.trim(),
        }));
        setNames(applicantNames);
      } else {
        setNames([
          {
            prefix: "",
            name: `${postSaleLead.firstName || ""} ${postSaleLead.lastName || ""
              }`.trim(),
          },
        ]);
      }
    } else if (leads) {
      setFormData((prev) => ({
        ...prev,
        phone: leads?.phoneNumber?.toString() || "",
      }));

      setNames([
        {
          prefix: "",
          name: `${leads.firstName || ""} ${leads.lastName || ""}`.trim(),
        },
      ]);
    }

    // if (project) {
    //   setFormData((prev) => ({ ...prev, selectedProject: project }));
    //   getSlabByProject(project._id!);
    // }

    if (flatNo) {
      setFormData((prev) => ({ ...prev, flatNo }));
    }

    if (allInclusive) {
      setFormData((prev) => ({
        ...prev,
        allInclusiveAmount: allInclusive.toString(),
      }));
    }
  }, [postSaleLead, project, flatNo, allInclusive, openclick, leads]);

  // Fixed: Properly fetch slabs when project changes
  useEffect(() => {
    if (formData.selectedProject?._id) {
      getSlabByProject(formData.selectedProject._id);
    }
  }, []);

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
    setFormData({
      selectedProject: null,
      propertyType: "Flat",
      flatNo: "",
      phone: "",
      allInclusiveAmount: "",
      carpetArea: "",
      selectedStampDuty: "5",
      whichBuildingNo: null,
      whichFloor: null,
      selectedFlatNo: null,
      selectedShopNumber: null,
    });
    setNames([{ prefix: "", name: "" }]);
    openclick(false);
  };

  const onChangeField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (projectId: string) => {
    const project = projects.find((p) => p._id === projectId) || null;
    setFormData((prev) => ({
      ...prev,
      selectedProject: project,
      whichBuildingNo: null,
      whichFloor: null,
      selectedFlatNo: null,
      flatNo: "",
    }));

    if (project) {
      getSlabByProject(project._id!);
    }
  };

  const addName = () => {
    setNames((prev) => [...prev, { prefix: "", name: "" }]);
  };

  const removeName = (index: number) => {
    if (names.length > 1) {
      setNames((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateName = (index: number, field: keyof NameField, value: string) => {
    setNames((prev) =>
      prev.map((name, i) => (i === index ? { ...name, [field]: value } : name))
    );
  };

  // Fixed: Proper calculation function
  const calculateValues = () => {
    const allInclusiveNum = parseFloat(formData.allInclusiveAmount) || 0;
    const stampDutyPercentage = parseFloat(formData.selectedStampDuty) || 5;
    const gstPercentage = 5;
    const registrationCharges = 30000;

    // Calculate agreement value
    const agreementValue =
      (allInclusiveNum - registrationCharges) /
      (1 + (stampDutyPercentage + gstPercentage) / 100);

    const stampDutyValue = customRound(
      agreementValue * (stampDutyPercentage / 100)
    );
    const gstValue = customRound(agreementValue * (gstPercentage / 100));

    const total1 = customRound(stampDutyValue + registrationCharges);
    const total2 = customRound(allInclusiveNum - total1);

    return {
      allInclusiveNum,
      agreementValue,
      stampDutyValue,
      gstValue,
      registrationCharges,
      total1,
      total2,
    };
  };

  const handleViewSchedule = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.selectedProject)
      newErrors.project = "Please select a project";
    if (!formData.allInclusiveAmount)
      newErrors.allInclusiveAmount = "Please enter all inclusive amount";
    if (names.some((n) => !n.name.trim()))
      newErrors.names = "Please fill all name fields";
    if (names.some((n) => !n.prefix.trim()))
      newErrors.prefixes = "Please select prefix for all names";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const { total2, allInclusiveNum } = calculateValues();
    showScheduleModal(total2, allInclusiveNum);
  };

  // Fixed: Proper schedule modal with actual slab data
  const showScheduleModal = (total2: number, allInclusiveNum: number) => {
    if (!slabsbyproject || slabsbyproject.slabs.length === 0) {
      alert("No payment schedule slabs found for this project");
      return;
    }

    console.log(slabsbyproject.slabs);

    const scheduleContent = slabsbyproject.slabs.map((slab) => {
      const slabPercentage = slab.percent || 0;
      const slabAmount = total2 * (slabPercentage / 100);

      return {
        name: slab.name || "Unknown Stage",
        percentage: slabPercentage,
        amount: slabAmount,
      };
    });

    const modal = document.createElement("div");
    modal.className = styles.modalOverlay;
    modal.innerHTML = `
      <div class="${styles.modalContent}">
        <div class="${styles.modalHeader}">
          <h3>Payment Schedule Preview</h3>
          <button onclick="this.closest('.${styles.modalOverlay
      }').remove()" class="${styles.closeButton}">×</button>
        </div>
        <div class="${styles.scheduleModal}">
          <div class="${styles.scheduleList}">
            ${scheduleContent
        .map(
          (item: any) => `
              <div class="${styles.scheduleItem}">
                <div class="${styles.scheduleHeader}">
                  <strong>${item.name}</strong>
                  <span>${item.percentage}%</span>
                </div>
                <div class="${styles.scheduleDetails}">
                  <div>Amount: ₹${item.amount.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}</div>
                </div>
              </div>
            `
        )
        .join("")}
          </div>
          <div class="${styles.scheduleTotal}">
            <strong>Total Payment: ₹${total2.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}</strong>
          </div>
        </div>
        <div class="${styles.modalFooter}">
          <button onclick="this.closest('.${styles.modalOverlay
      }').remove()" class="${styles.okButton}">OK</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  // Fixed: PDF generation with proper data
  const handleGeneratePDF = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.selectedProject)
      newErrors.project = "Please select a project";
    if (!formData.allInclusiveAmount)
      newErrors.allInclusiveAmount = "Please enter all inclusive amount";
    if (!formData.flatNo) newErrors.flatNo = "Please enter flat/shop number";
    if (names.some((n) => !n.name.trim()))
      newErrors.names = "Please fill all name fields";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (!slabsbyproject || slabsbyproject.slabs.length === 0) {
      alert(
        "No payment schedule data available. Please check project configuration."
      );
      return;
    }

    const values = calculateValues();

    generatePDF({
      project: formData.selectedProject,
      flatNo: formData.flatNo,
      allInc: values.allInclusiveNum,
      names: names.map((n) => n.name),
      prefixes: names.map((n) => n.prefix),
      selectedStampDuty: formData.selectedStampDuty,
      propertyType: formData.propertyType,
      slabs: slabsbyproject.slabs, // Pass the actual slab data
      phone: formData.phone,
      carpetArea: formData.carpetArea,
      calculations: {
        agreementValue: values.agreementValue,
        stampDuty: values.stampDutyValue,
        gst: values.gstValue,
        registrationCharges: values.registrationCharges,
        total1: values.total1,
        total2: values.total2,
      },
    });
  };

  // Get filtered data based on selections
  const buildings =
    formData.selectedProject?.flatList
      ?.map((flat) => flat.buildingNo)
      .filter((b): b is number => b !== undefined)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort() || [];

  const floors =
    formData.selectedProject?.flatList
      ?.filter((flat) => flat.buildingNo === formData.whichBuildingNo)
      .map((flat) => flat.floor)
      .filter((f): f is number => f !== undefined)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort() || [];

  const flats =
    formData.selectedProject?.flatList
      ?.filter(
        (flat) =>
          flat.floor === formData.whichFloor &&
          flat.buildingNo === formData.whichBuildingNo
      )
      .map((flat) => flat.number)
      .filter((n): n is number => n !== undefined)
      .sort() || [];

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

  return ReactDOM.createPortal(
    <div className={styles.dialogOverlay}>
      <div
        ref={dialogRef}
        className={styles.dialogBox}
        style={{ maxWidth: "600px", maxHeight: "90vh" }}
      >
        <h3 className={styles.dialogTitle}>💰 Payment Schedule</h3>
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
        <div className={styles.dailogcnt} style={{ padding: "20px" }}>
          {/* Project Selection */}
          <div className={styles.formControl}>
            <label>
              <RequiredLabel
                icon={<IoBusiness className={styles.iconcolor} />}
                text="Select Project"
              />
            </label>
            <select
              value={formData.selectedProject?._id || ""}
              onChange={(e) => handleProjectChange(e.target.value)}
              className={styles.selectInput}
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project?._id || ""} value={project?._id || ""}>
                  {project?.name || "Unknown Project"}
                </option>
              ))}
            </select>
            {errors.project && (
              <p className={styles.errorMsg}>{errors.project}</p>
            )}
          </div>

          {/* Property Type */}
          <div className={styles.formControl}>
            <label>
              <RequiredLabel
                icon={<IoHome className={styles.iconcolor} />}
                text="Property Type"
              />
            </label>
            <select
              value={formData.propertyType}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  propertyType: e.target.value as "Flat" | "Shop",
                  whichBuildingNo: null,
                  whichFloor: null,
                  selectedFlatNo: null,
                  selectedShopNumber: null,
                  flatNo: "",
                }))
              }
              className={styles.selectInput}
            >
              <option value="Flat">Flat</option>
              <option value="Shop">Shop</option>
            </select>
          </div>

          {formData.propertyType === "Flat" && (
            <>
              {/* Building, Floor, Unit Selection */}
              <div
                className={styles.card}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px",
                }}
              >
                {buildings.length > 0 && (
                  <div className={styles.formControl}>
                    <label>Building No</label>
                    <select
                      value={formData.whichBuildingNo || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          whichBuildingNo: e.target.value
                            ? parseInt(e.target.value)
                            : null,
                          whichFloor: null,
                          selectedFlatNo: null,
                          flatNo: "",
                        }))
                      }
                      className={styles.selectInput}
                    >
                      <option value="">Select Building</option>
                      {buildings.map((building) => (
                        <option key={building} value={building}>
                          {getNumberWithSuffix(building)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className={styles.formControl}>
                  <label>Floor</label>
                  <select
                    value={formData.whichFloor || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        whichFloor: e.target.value
                          ? parseInt(e.target.value)
                          : null,
                        selectedFlatNo: null,
                        flatNo: "",
                      }))
                    }
                    className={styles.selectInput}
                  >
                    <option value="">Select Floor</option>
                    {floors.map((floor) => (
                      <option key={floor} value={floor}>
                        {getNumberWithSuffix(floor)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formControl}>
                  <label>Unit No</label>
                  <select
                    value={formData.selectedFlatNo || ""}
                    onChange={(e) => {
                      const value = e.target.value
                        ? parseInt(e.target.value)
                        : null;
                      setFormData((prev) => ({
                        ...prev,
                        selectedFlatNo: value,
                      }));

                      const flat = formData.selectedProject?.flatList?.find(
                        (f) =>
                          f.floor === formData.whichFloor &&
                          f.buildingNo === formData.whichBuildingNo &&
                          f.number === value
                      );
                      if (flat) {
                        setFormData((prev) => ({
                          ...prev,
                          flatNo: flat.flatNo || "",
                          allInclusiveAmount:
                            flat.allInclusiveValue?.toString() ||
                            prev.allInclusiveAmount,
                          carpetArea:
                            flat.carpetArea?.toString() || prev.carpetArea,
                        }));
                      }
                    }}
                    className={styles.selectInput}
                  >
                    <option value="">Select Unit</option>
                    {flats.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Flat Number */}
              <div className={styles.formControl}>
                <label>
                  <RequiredLabel
                    icon={<IoHome className={styles.iconcolor} />}
                    text="Flat Number"
                  />
                </label>
                <input
                  type="text"
                  name="flatNo"
                  placeholder="Enter flat number...."
                  value={formData.flatNo}
                  onChange={onChangeField}
                  className={styles.textInput}
                />
                {errors.flatNo && (
                  <p className={styles.errorMsg}>{errors.flatNo}</p>
                )}
              </div>
            </>
          )}

          {formData.propertyType === "Shop" && (
            <div className={styles.formControl}>
              <label>Shop Number</label>
              <select
                value={formData.selectedShopNumber || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    selectedShopNumber: e.target.value,
                    flatNo: e.target.value,
                  }))
                }
                className={styles.selectInput}
              >
                <option value="">Select Shop</option>
                {shopNumbers.map((number) => (
                  <option key={number} value={number}>
                    Shop {number}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Stamp Duty */}
          <div className={styles.formControl}>
            <label>
              <RequiredLabel
                icon={<IoCalculator className={styles.iconcolor} />}
                text="Stamp Duty (%)"
              />
            </label>
            <select
              name="selectedStampDuty"
              value={formData.selectedStampDuty}
              onChange={onChangeField}
              className={styles.selectInput}
            >
              {["5", "6", "7", "8"].map((value) => (
                <option key={value} value={value}>
                  {value}%
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div className={styles.formControl}>
            <label>
              <IoCall className={styles.iconcolor} /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number...."
              value={formData.phone}
              onChange={onChangeField}
              className={styles.textInput}
            />
          </div>

          {/* Names */}
          <div className={styles.formControl}>
            <label>
              <RequiredLabel
                icon={<BsPersonFill className={styles.iconcolor} />}
                text="Client Names"
              />
            </label>
            {names.map((name, index) => (
              <div key={index} className={styles.nameRow}>
                <select
                  value={name.prefix}
                  onChange={(e) => updateName(index, "prefix", e.target.value)}
                  className={styles.selectInput}
                  style={{ flex: 1 }}
                >
                  <option value="">Prefix</option>
                  {prefixList.map((prefix) => (
                    <option key={prefix} value={prefix}>
                      {prefix}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name.name}
                  onChange={(e) => updateName(index, "name", e.target.value)}
                  className={styles.textInput}
                  style={{ flex: 2 }}
                />
                {names.length > 1 && (
                  <button
                    onClick={() => removeName(index)}
                    className={styles.removeButton}
                    type="button"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {(errors.names || errors.prefixes) && (
              <p className={styles.errorMsg}>
                Please fill all name fields and select prefixes
              </p>
            )}
            <button
              onClick={addName}
              className={styles.addButton}
              type="button"
            >
              + Add Name
            </button>
          </div>

          {/* Carpet Area */}
          <div className={styles.formControl}>
            <label>
              <IoHome className={styles.iconcolor} /> Carpet Area (sq. ft.)
            </label>
            <input
              type="number"
              name="carpetArea"
              placeholder="Enter carpet area...."
              value={formData.carpetArea}
              onChange={onChangeField}
              className={styles.textInput}
            />
          </div>

          {/* All Inclusive Amount */}
          <div className={styles.formControl}>
            <label>
              <RequiredLabel
                icon={<BsCurrencyRupee className={styles.iconcolor} />}
                text="All Inclusive Amount"
              />
            </label>
            <input
              type="number"
              name="allInclusiveAmount"
              placeholder="Enter amount...."
              value={formData.allInclusiveAmount}
              onChange={onChangeField}
              className={styles.textInput}
            />
            {errors.allInclusiveAmount && (
              <p className={styles.errorMsg}>{errors.allInclusiveAmount}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className={styles.dialogButtons}>
            <button
              className={styles.cancelBtn}
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className={styles.viewBtn}
              onClick={handleViewSchedule}
              disabled={isLoading}
            >
              <IoCalculator style={{ marginRight: "5px" }} />
              View Schedule
            </button>
            <button
              className={styles.submitBtn}
              onClick={handleGeneratePDF}
              disabled={isLoading}
            >
              <AiFillFilePdf style={{ marginRight: "5px" }} />
              Generate PDF
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading...</p>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

// Fixed: Proper PDF generation function
export const generatePDF = async ({
  project,
  flatNo,
  allInc,
  names,
  prefixes,
  selectedStampDuty,
  propertyType,
  slabs,
  calculations,
}: any) => {
  const formatter = new Intl.NumberFormat("en-IN");

  const allInclusiveAmount = parseFloat(allInc);
  const stampDutyPercentage = parseFloat(selectedStampDuty);
  const gstPercentage = 5.0;
  const registrationCharges = 30000;

  // Use provided calculations or calculate fresh
  const agreementValue =
    calculations?.agreementValue ||
    (allInclusiveAmount - registrationCharges) /
    (1 + (stampDutyPercentage + gstPercentage) / 100);

  const stampDutyValue =
    calculations?.stampDuty ||
    Math.round(agreementValue * (stampDutyPercentage / 100));

  const gstValue =
    calculations?.gst || Math.round(agreementValue * (gstPercentage / 100));

  const total1 =
    calculations?.total1 || Math.round(stampDutyValue + registrationCharges);

  const total2 =
    calculations?.total2 || Math.round(allInclusiveAmount - total1);

  // Generate payment schedule using actual slab data
  const paymentSchedule = generatePaymentSchedule(
    total2,
    allInclusiveAmount,
    total1,
    formatter,
    slabs
  );

  const doc = new jsPDF();

  // TITLE
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setLineWidth(0.7);
  doc.text("Payment Schedule", 22, 12);


  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`${project?.name || "N/A"}`, 22, 16);


  const label = propertyType === "Flat" ? "Flat No: " : "Shop No: ";
  const value = flatNo || "N/A";

  doc.setFont("helvetica", "bold");
  doc.text(label, 22, 20);

  doc.setFont("helvetica", "normal");
  doc.text(value, 22 + doc.getTextWidth(label), 20);


  let y = 24;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  names.forEach((name: string, i: number) => {
    const prefix = prefixes?.[i] || "";
    const fullName = `${prefix} ${name}`.trim();
    doc.text(`${fullName}`, 22, y);
    y += 4;
  });
  // All Inclusive Amount
  const formattedAmount = Number(allInclusiveAmount).toLocaleString("en-IN");

  doc.setFont("helvetica", "bold");
  doc.text(`All Inclusive Amount: ${formattedAmount}`, 22, y + 0);


  // TABLE
  autoTable(doc, {
    head: [["No.", "Stage", "%", "Amount"]],
    body: paymentSchedule,
    startY: y + 2,
     margin: { left: 22 },
    columnStyles: {
      0: { cellWidth: 15 }, // No.
      1: { cellWidth: 90 }, // Stage
      2: { cellWidth: 20 }, // %
      3: { cellWidth: 40 }, // Amount
    },
    styles: {
      fontSize: 6,
      cellPadding: 1,
      lineColor: [54, 52, 52],
      
    },

    headStyles: {
      fillColor: [255, 255, 255],
      textColor: 0,
      lineColor: [54, 52, 52],
      lineWidth: 0.1,
      fontStyle: "bold",
      halign: "left",
    },
    bodyStyles: {
      halign: "left",
      textColor: 0,
    },

    theme: "grid",
  });

  // Download
  doc.save("payment_schedule.pdf");
};

// Fixed: Proper payment schedule generation
function generatePaymentSchedule(
  total2: number,
  allInclusiveAmount: number,
  total1: number,
  formatter: Intl.NumberFormat,
  slabs: any[]
) {
  if (!slabs || slabs.length === 0) {
    return [["", "No schedule data available", "", ""]];
  }

  const schedule: string[][] = [];
  let cumulativeAmount = 0;

  // Sort slabs by index to ensure proper order
  const sortedSlabs = [...slabs].sort(
    (a, b) => (a.index || 0) - (b.index || 0)
  );

  sortedSlabs.forEach((slab) => {
    const slabPercentage = slab?.percent || 0;
    const slabAmount = total2 * (slabPercentage / 100);
    cumulativeAmount += slabAmount;

    schedule.push([
      (slab.index || "").toString(),
      slab.name || "Unknown Stage",
      `${slabPercentage}%`,
      formatter.format(Math.round(slabAmount)),
    ]);
  });

  // TOTAL OF SLABS
  const totalPayment = Math.round(total2);
  schedule.push(["", "TOTAL", "100%", formatter.format(totalPayment)]);

  // Before Registration (Stamp Duty & Registration Charges)
  schedule.push([
    "",
    "Before Registration (Stamp Duty & Registration Charges)",
    "",
    formatter.format(Math.round(total1)),
  ]);

  // GRAND TOTAL
  schedule.push(["", "GRAND TOTAL", "", formatter.format(allInclusiveAmount)]);

  return schedule;
}

export default PaymentSchedule;
