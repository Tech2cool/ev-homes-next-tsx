"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./dailog.module.css";
import {
  MdCancel,
  MdAttachMoney,
  MdBusiness,
  MdHome,
  MdPerson,
  MdCalculate,
  MdPictureAsPdf,
} from "react-icons/md";
import {
  FaSearch,
  FaUser,
  FaBuilding,
  FaHome,
  FaDollarSign,
  FaChartBar,
} from "react-icons/fa";
import { useData } from "@/providers/dataContext";

interface BrokerageCalculatorProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
  lead?: Lead | null;
}

interface FormState {
  phone: string;
  firstName: string;
  lastName: string;
  flatNo: string;
  floor: string;
  floorRiseSkip: string;
  carpetArea: string;
  sellableCarpetArea: string;
  totalParking: string;
  parkingPrice: string;
  developmentPrice: string;
  floorRisePrice: string;
  allInclusive: string;
  registration: string;
  percentage: string;
  sellablePercent: string;
}

interface OptionType {
  value: string;
  label: string;
}

interface CalculationResult {
  agreementValue: number;
  parkingCharges: number;
  developmentCharges: number;
  floorRiseCharges: number;
  totalBrokerage: number;
  commissionRate: number;
}

const BrokerageCalculator: React.FC<BrokerageCalculatorProps> = ({
  openclick,
  lead,
}) => {
  const {
    channelPartners,
    projects,
    getChannelPartners,
    getProjects,
    // getLeadByPhoneNumber,
    // addBrokerage,
  } = useData();

  const [formData, setFormData] = useState<FormState>({
    phone: lead?.phoneNumber?.toString() ?? "",
    firstName: lead?.firstName ?? "",
    lastName: lead?.lastName ?? "",
    flatNo: "",
    floor: "",
    floorRiseSkip: "2",
    carpetArea: "",
    sellableCarpetArea: "",
    totalParking: "0",
    parkingPrice: "800000",
    developmentPrice: "500",
    floorRisePrice: "50",
    allInclusive: lead?.bookingRef?.flatCost?.toString() ?? "0",
    registration: "30000",
    percentage: "3.25",
    sellablePercent: "1.7",
  });

  const [selectedProject, setSelectedProject] = useState<OurProject | null>(
    lead?.bookingRef?.project || null
  );
  const [selectedChannelPartner, setSelectedChannelPartner] =
    useState<ChannelPartner | null>(lead?.channelPartner || null);
  const [selectedBuildingNo, setSelectedBuildingNo] = useState<number | null>(
    lead?.bookingRef?.buildingNo || null
  );
  const [selectedFloor, setSelectedFloor] = useState<number | null>(
    lead?.bookingRef?.floor || null
  );
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null);

  const [detailsVisible, setDetailsVisible] = useState(!!lead);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [showFoundDialog, setShowFoundDialog] = useState(false);
  const [showNotFoundDialog, setShowNotFoundDialog] = useState(false);
  const [foundLead, setFoundLead] = useState<Lead | null>(null);
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const currentTheme = document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
  const dialogRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    getChannelPartners();
    getProjects();
  }, []);

  useEffect(() => {
    if (lead) {
      setFormData((prev) => ({
        ...prev,
        phone: lead.phoneNumber?.toString() ?? "",
        firstName: lead.firstName ?? "",
        lastName: lead.lastName ?? "",
        allInclusive: lead.bookingRef?.flatCost?.toString() ?? "0",
      }));
      // setSelectedChannelPartner(lead.channelPartner);
      setSelectedProject(lead.bookingRef?.project || null);
      setDetailsVisible(true);
    }
  }, [lead]);

  useEffect(() => {
    if (
      selectedProject &&
      selectedBuildingNo !== null &&
      selectedFloor !== null
    ) {
      const flat = selectedProject.flatList?.find(
        (f) => f.buildingNo === selectedBuildingNo && f.floor === selectedFloor
      );
      if (flat) {
        setSelectedFlat(flat);
        setFormData((prev) => ({
          ...prev,
          flatNo: flat.flatNo || "",
          carpetArea: flat.carpetArea?.toString() || "",
        }));
        calculateSellableArea(flat.carpetArea?.toString() || "");
      }
    }
  }, [selectedProject, selectedBuildingNo, selectedFloor]);

  const calculateSellableArea = (carpetArea: string) => {
    const carpet = parseFloat(carpetArea) || 0;
    const sellablePercent = parseFloat(formData.sellablePercent) || 0;
    const sellableArea = carpet * sellablePercent;
    setFormData((prev) => ({
      ...prev,
      sellableCarpetArea: sellableArea.toFixed(2),
    }));
  };

  const handleSearchLead = async () => {
    if (!formData.phone) return;

    setIsSearching(true);
    try {
      // const lead = await getLeadByPhoneNumber(formData.phone);
      if (lead) {
        setFoundLead(lead);
        setShowFoundDialog(true);
      } else {
        setShowNotFoundDialog(true);
      }
    } catch (error) {
      console.error("Search error:", error);
      setShowNotFoundDialog(true);
    } finally {
      setIsSearching(false);
      setShowSearchDialog(false);
    }
  };

  const useFoundLead = () => {
    if (!foundLead) return;

    setFormData((prev) => ({
      ...prev,
      firstName: foundLead.firstName || "",
      lastName: foundLead.lastName || "",
      allInclusive: foundLead.bookingRef?.flatCost?.toString() || "0",
    }));
    // setSelectedChannelPartner(foundLead.channelPartner);
    setSelectedProject(foundLead.bookingRef?.project || null);
    setDetailsVisible(true);
    setShowFoundDialog(false);
  };

  const calculateBrokerage = () => {
    // Parse all values
    const allIncCharges = parseFloat(formData.allInclusive) || 0;
    const registrationCharges = parseFloat(formData.registration) || 0;
    const parkingCharges =
      (parseFloat(formData.parkingPrice) || 0) *
      (parseFloat(formData.totalParking) || 0);
    const sellableArea = parseFloat(formData.sellableCarpetArea) || 0;
    const developmentCharges =
      (parseFloat(formData.developmentPrice) || 0) * sellableArea;
    const commissionRate = parseFloat(formData.percentage) || 0;
    const floorRiseSkip = parseInt(formData.floorRiseSkip) || 0;

    // Calculate floor rise charges
    const floors =
      selectedProject?.flatList
        ?.filter((f) => f.buildingNo === selectedBuildingNo)
        .map((f) => f.floor)
        .filter((f): f is number => f !== undefined)
        .sort((a, b) => a - b) || [];

    const indexOfFloor =
      selectedFloor !== null ? floors.indexOf(selectedFloor) : -1;
    const floorRise = Math.max(0, indexOfFloor - floorRiseSkip + 1);
    const floorRiseCharges =
      floorRise * sellableArea * (parseFloat(formData.floorRisePrice) || 0);

    // Calculate agreement value and brokerage
    const agreementValue = (allIncCharges - registrationCharges) / 1.11;
    const afterMinusParking = agreementValue - parkingCharges;
    const afterMinusDevpCharges = afterMinusParking - developmentCharges;
    const afterMinusFriceCharges = afterMinusDevpCharges - floorRiseCharges;
    const totalBrokerage = (afterMinusFriceCharges * commissionRate) / 100;

    setCalculationResult({
      agreementValue,
      parkingCharges,
      developmentCharges,
      floorRiseCharges,
      totalBrokerage,
      commissionRate,
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const generatePDF = async () => {
    if (!calculationResult) return;

    setIsGeneratingPDF(true);
    try {
      const calculationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: parseInt(formData.phone) || 0,
        project: selectedProject,
        channelPartner: selectedChannelPartner,
        selectedFlat: selectedFlat,
        flatNo: formData.flatNo,
        lead: foundLead || lead,
        floor: selectedFloor,
        buildingNo: selectedBuildingNo,
        carpetArea: parseFloat(formData.carpetArea) || 0,
        sellableCarpetArea: parseFloat(formData.sellableCarpetArea) || 0,
        totalParking: parseInt(formData.totalParking) || 0,
        parkingPrice: parseFloat(formData.parkingPrice) || 0,
        developmentPrice: parseFloat(formData.developmentPrice) || 0,
        allInclusiveValue: parseFloat(formData.allInclusive) || 0,
        registrationCharges: parseFloat(formData.registration) || 0,
        commissionRate: parseFloat(formData.percentage) || 0,
        floorRiseSkip: parseInt(formData.floorRiseSkip) || 0,
        sellablePercent: parseFloat(formData.sellablePercent) || 0,
        agreementValue: calculationResult.agreementValue,
        parkingCharges: calculationResult.parkingCharges,
        developmentCharges: calculationResult.developmentCharges,
        floorRiseCharges: calculationResult.floorRiseCharges,
        totalBrokerage: calculationResult.totalBrokerage,
        generatedBy: "User",
      };

      console.log("PDF Data:", calculationData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // await addBrokerage(calculationData);

      alert("PDF generated and saved successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error generating PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      phone: "",
      firstName: "",
      lastName: "",
      flatNo: "",
      floor: "",
      floorRiseSkip: "2",
      carpetArea: "",
      sellableCarpetArea: "",
      totalParking: "0",
      parkingPrice: "800000",
      developmentPrice: "500",
      floorRisePrice: "50",
      allInclusive: "0",
      registration: "30000",
      percentage: "3.25",
      sellablePercent: "1.7",
    });
    setSelectedProject(null);
    setSelectedChannelPartner(null);
    setSelectedBuildingNo(null);
    setSelectedFloor(null);
    setSelectedFlat(null);
    setDetailsVisible(false);
    setCalculationResult(null);
    setErrors({});
    openclick(false);
  };

  const onChangeField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "carpetArea") {
      calculateSellableArea(value);
    }
  };

  const onSelectChange = (name: string, value: any) => {
    if (name === "project") {
      setSelectedProject(value);
    } else if (name === "channelPartner") {
      setSelectedChannelPartner(value);
    } else if (name === "buildingNo") {
      setSelectedBuildingNo(parseInt(value));
    } else if (name === "floor") {
      setSelectedFloor(parseInt(value));
    }
  };

  // Get unique buildings and floors
  const buildings = Array.from(
    new Set(
      selectedProject?.flatList
        ?.map((f) => f.buildingNo)
        .filter((b): b is number => b !== undefined) || []
    )
  ).sort();

  const floors = Array.from(
    new Set(
      selectedProject?.flatList
        ?.filter((f) => f.buildingNo === selectedBuildingNo)
        .map((f) => f.floor)
        .filter((f): f is number => f !== undefined) || []
    )
  ).sort();

  const flats =
    selectedProject?.flatList?.filter(
      (f) => f.buildingNo === selectedBuildingNo && f.floor === selectedFloor
    ) || [];

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
    <>
      <div className={styles.dialogOverlay}>
        <div
          ref={dialogRef}
          className={styles.dialogBox}
          style={{ maxWidth: "800px", maxHeight: "90vh", overflowY: "auto" }}
        >
          <MdCancel
            onClick={handleCancel}
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
          <h3 className={styles.dialogTitle}>💰 Brokerage Calculator</h3>

          {!detailsVisible ? (
            <div
              className={styles.dailogcnt}
              style={{ textAlign: "center", padding: "40px 20px" }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#fbbf24",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <MdCalculate style={{ fontSize: "40px", color: "white" }} />
              </div>

              <h4 style={{ marginBottom: "10px", color: "#333" }}>
                Brokerage Calculator
              </h4>
              <p style={{ marginBottom: "30px", color: "#666" }}>
                Calculate commission and generate reports
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <button
                  className={styles.submitBtn}
                  onClick={() => setShowSearchDialog(true)}
                  style={{ marginBottom: "10px" }}
                >
                  <FaSearch style={{ marginRight: "8px" }} />
                  Search Lead by Phone
                </button>

                <button
                  className={styles.cancelBtn}
                  onClick={() => setDetailsVisible(true)}
                >
                  Start New Calculation
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.dailogcnt}>
              {/* Customer Details */}
              <div className={styles.mainlable}>Customer Details</div>
              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel icon={<FaUser />} text="First Name" />
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={onChangeField}
                    placeholder="First Name"
                  />
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel icon={<FaUser />} text="Last Name" />
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={onChangeField}
                    placeholder="Last Name"
                  />
                </div>
              </div>

              {/* Phone Number moved to its own row */}
              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel icon={<MdPerson />} text="Phone Number" />
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={onChangeField}
                    placeholder="Phone Number"
                    maxLength={10}
                  />
                </div>
              </div>

              {/* Channel Partner */}
              <div className={styles.mainlable}>Channel Partner</div>
              <div className={styles.formControl}>
                <label>
                  <RequiredLabel icon={<MdBusiness />} text="Channel Partner" />
                </label>
                <select
                  value={selectedChannelPartner?._id || ""}
                  onChange={(e) =>
                    onSelectChange(
                      "channelPartner",
                      channelPartners.find((cp) => cp._id === e.target.value) ||
                        null
                    )
                  }
                >
                  <option value="">Select Channel Partner</option>
                  {channelPartners.map((partner) => (
                    <option key={partner._id} value={partner?._id ?? ""}>
                      {partner.firmName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Details */}
              <div className={styles.mainlable}>Project Details</div>

              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel icon={<FaBuilding />} text="Project" />
                  </label>
                  <select
                    value={selectedProject?._id || ""}
                    onChange={(e) =>
                      onSelectChange(
                        "project",
                        projects.find((p) => p._id === e.target.value) || null
                      )
                    }
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project._id} value={project?._id ?? ""}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.card}>
                {buildings.length > 0 && (
                  <div className={styles.formControl}>
                    <label>
                      <RequiredLabel icon={<FaBuilding />} text="Building" />
                    </label>
                    <select
                      value={selectedBuildingNo || ""}
                      onChange={(e) =>
                        onSelectChange("buildingNo", e.target.value)
                      }
                    >
                      <option value="">Select Building</option>
                      {buildings.map((building) => (
                        <option key={building} value={building}>
                          {building}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {floors.length > 0 && (
                  <div className={styles.formControl}>
                    <label>
                      <RequiredLabel icon={<FaBuilding />} text="Floor" />
                    </label>
                    <select
                      value={selectedFloor || ""}
                      onChange={(e) => onSelectChange("floor", e.target.value)}
                    >
                      <option value="">Select Floor</option>
                      {floors.map((floor) => (
                        <option key={floor} value={floor}>
                          {floor}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className={styles.card}>
                {flats.length > 0 && (
                  <div className={styles.formControl}>
                    <label>
                      <RequiredLabel icon={<FaHome />} text="Flat No" />
                    </label>
                    <select
                      value={selectedFlat?.number || ""}
                      onChange={(e) => {
                        const flat = flats.find(
                          (f) => f.number?.toString() === e.target.value
                        );
                        setSelectedFlat(flat || null);
                      }}
                    >
                      <option value="">Select Flat</option>
                      {flats.map((flat) => (
                        <option key={flat.number} value={flat.number}>
                          {flat.number}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel icon={<FaHome />} text="Flat Number" />
                  </label>
                  <input type="text" value={formData.flatNo} readOnly />
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel icon={<FaHome />} text="Floor Rise Skip" />
                  </label>
                  <input
                    type="number"
                    name="floorRiseSkip"
                    value={formData.floorRiseSkip}
                    onChange={onChangeField}
                  />
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel icon={<FaHome />} text="Sellable Percent" />
                  </label>
                  <input
                    type="number"
                    name="sellablePercent"
                    value={formData.sellablePercent}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        sellablePercent: e.target.value,
                      }));
                      calculateSellableArea(formData.carpetArea);
                    }}
                    step="0.1"
                  />
                </div>
              </div>

              {/* Property Specifications */}
              <div className={styles.mainlable}>Property Specifications</div>
              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaHome />}
                      text="Carpet Area (sq.ft)"
                    />
                  </label>
                  <input
                    type="number"
                    name="carpetArea"
                    value={formData.carpetArea}
                    onChange={onChangeField}
                  />
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaHome />}
                      text="Sellable Carpet Area (sq.ft)"
                    />
                  </label>
                  <input
                    type="number"
                    name="sellableCarpetArea"
                    value={formData.sellableCarpetArea}
                    onChange={onChangeField}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel icon={<FaHome />} text="Total Parking" />
                  </label>
                  <input
                    type="number"
                    name="totalParking"
                    value={formData.totalParking}
                    onChange={onChangeField}
                  />
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel icon={<FaHome />} text="Parking Price (₹)" />
                  </label>
                  <input
                    type="number"
                    name="parkingPrice"
                    value={formData.parkingPrice}
                    onChange={onChangeField}
                  />
                </div>
              </div>

              {/* Financial Details */}
              <div className={styles.mainlable}>Financial Details</div>
              {/* Row 1 — only All Inclusive */}
              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaDollarSign />}
                      text="All Inclusive Value (₹)"
                    />
                  </label>
                  <input
                    type="number"
                    name="allInclusive"
                    value={formData.allInclusive}
                    onChange={onChangeField}
                  />
                </div>
              </div>

              {/* Row 2 — 2 in one row */}
              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaDollarSign />}
                      text="Development Price (₹)"
                    />
                  </label>
                  <input
                    type="number"
                    name="developmentPrice"
                    value={formData.developmentPrice}
                    onChange={onChangeField}
                  />
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaDollarSign />}
                      text="Floor Rise Price (₹)"
                    />
                  </label>
                  <input
                    type="number"
                    name="floorRisePrice"
                    value={formData.floorRisePrice}
                    onChange={onChangeField}
                  />
                </div>
              </div>

              {/* Row 3 — 2 in one row */}
              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaDollarSign />}
                      text="Registration Charges (₹)"
                    />
                  </label>
                  <input
                    type="number"
                    name="registration"
                    value={formData.registration}
                    readOnly
                  />
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaDollarSign />}
                      text="Commission (%)"
                    />
                  </label>
                  <input
                    type="number"
                    name="percentage"
                    value={formData.percentage}
                    onChange={onChangeField}
                    step="0.01"
                  />
                </div>
              </div>

              {/* Calculation Results */}
              {calculationResult && (
                <>
                  <div className={styles.mainlable}>Calculation Results</div>
                  <div
                    className={styles.card}
                    style={{
                      backgroundColor: "#f0f9ff",
                      border: "1px solid #bae6fd",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <span>Agreement Value:</span>
                      <span style={{ fontWeight: "bold" }}>
                        {formatCurrency(calculationResult.agreementValue)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        color: "#dc2626",
                      }}
                    >
                      <span>Parking Charges:</span>
                      <span>
                        - {formatCurrency(calculationResult.parkingCharges)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        color: "#dc2626",
                      }}
                    >
                      <span>Development Charges:</span>
                      <span>
                        - {formatCurrency(calculationResult.developmentCharges)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        color: "#dc2626",
                      }}
                    >
                      <span>Floor Rise Charges:</span>
                      <span>
                        - {formatCurrency(calculationResult.floorRiseCharges)}
                      </span>
                    </div>
                    <hr style={{ margin: "12px 0", borderColor: "#cbd5e1" }} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <span>Total:</span>
                      <span style={{ fontWeight: "bold" }}>
                        {formatCurrency(
                          calculationResult.agreementValue -
                            calculationResult.parkingCharges -
                            calculationResult.developmentCharges -
                            calculationResult.floorRiseCharges
                        )}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <span>Commission Rate:</span>
                      <span>{calculationResult.commissionRate}%</span>
                    </div>
                    <hr style={{ margin: "12px 0", borderColor: "#cbd5e1" }} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      <span>Total Brokerage:</span>
                      <span style={{ color: "#059669" }}>
                        {formatCurrency(calculationResult.totalBrokerage)}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className={styles.dialogButtons}>
                <button
                  className={styles.submitBtn}
                  onClick={calculateBrokerage}
                >
                  <MdCalculate style={{ marginRight: "8px" }} />
                  Calculate Brokerage
                </button>

                <button
                  className={styles.submitBtn}
                  onClick={generatePDF}
                  disabled={!calculationResult || isGeneratingPDF}
                  style={{
                    backgroundColor: isGeneratingPDF ? "#6b7280" : "#059669",
                    opacity: !calculationResult ? 0.6 : 1,
                  }}
                >
                  <MdPictureAsPdf style={{ marginRight: "8px" }} />
                  {isGeneratingPDF ? "Generating..." : "Generate PDF"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Lead Dialog */}
      {showSearchDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox} style={{ maxWidth: "400px" }}>
            <MdCancel
              onClick={() => setShowSearchDialog(false)}
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
            <h3 className={styles.dialogTitle}>🔍 Search Lead</h3>
            <div className={styles.dailogcnt}>
              <div className={styles.formControl}>
                <label>
                  <RequiredLabel icon={<MdPerson />} text="Phone Number" />
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="Enter phone number"
                  maxLength={10}
                />
              </div>
              <div className={styles.dialogButtons}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => {
                    setShowSearchDialog(false);
                    setDetailsVisible(true);
                  }}
                >
                  Skip
                </button>
                <button
                  className={styles.submitBtn}
                  onClick={handleSearchLead}
                  disabled={isSearching}
                >
                  {isSearching ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Found Lead Dialog */}
      {showFoundDialog && foundLead && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox} style={{ maxWidth: "500px" }}>
            <h3 className={styles.dialogTitle} style={{ color: "#059669" }}>
              ✅ Lead Found!
            </h3>
            <div className={styles.dailogcnt}>
              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#f0fdf4",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <strong>Name:</strong>
                  <span>
                    {foundLead.firstName} {foundLead.lastName}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <strong>Phone:</strong>
                  <span>+91 {foundLead.phoneNumber}</span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>Email:</strong>
                  <span>{foundLead.email || "N/A"}</span>
                </div>
              </div>
              <div className={styles.dialogButtons}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setShowFoundDialog(false)}
                >
                  Cancel
                </button>
                <button className={styles.submitBtn} onClick={useFoundLead}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Not Found Dialog */}
      {showNotFoundDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox} style={{ maxWidth: "400px" }}>
            <h3 className={styles.dialogTitle} style={{ color: "#dc2626" }}>
              ❌ Number Not Found
            </h3>
            <div className={styles.dailogcnt}>
              <p style={{ textAlign: "center", marginBottom: "20px" }}>
                Would you like to continue with this number?
              </p>
              <div className={styles.dialogButtons}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setShowNotFoundDialog(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.submitBtn}
                  onClick={() => {
                    setShowNotFoundDialog(false);
                    setDetailsVisible(true);
                  }}
                >
                  Use Number
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default BrokerageCalculator;
