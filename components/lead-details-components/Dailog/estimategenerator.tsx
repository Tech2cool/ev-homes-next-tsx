"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./estimategenerator.module.css";
import {
  FaUser,
  FaPhoneAlt,
  FaHome,
  FaChartArea,
  FaDollarSign,
  FaBuilding,
  FaTag,
} from "react-icons/fa";
import { FaBuildingFlag } from "react-icons/fa6";
import { IoLayers } from "react-icons/io5";
import { PiSealPercentFill } from "react-icons/pi";

// import CustomSelect from "../CustomSelect";
// import { useRouter } from "next/navigation";

// import pdfFonts from "pdfmake/build/vfs_fonts";
// import QRCode from "qrcode";
// import { useUser } from "@/context/UserContext";
// import {
//   dateFormatOnly,
//   dateFormatWithTime,
//   dateFormatWithTimeTo,
// } from "@/hooks/useDateFormat";
import { Download } from "lucide-react";
import { useData } from "@/providers/dataContext";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/userContext";
import Select, { components } from "react-select";
import { dateFormatWithTime } from "@/hooks/useDateFormat";
import ReactDOM from "react-dom";
import { MdCancel } from "react-icons/md";
import stylerun from "./dailog.module.css";
import jsPDF from "jspdf";
import { number } from "framer-motion";
import autoTable from "jspdf-autotable";

interface EstimategeneratorProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
  lead?: Lead | null;
  teamLeader?: EstimateGenerated | null;
}

// Types
interface OptionType {
  value: number;
  label: string;
  percent?: number;
  index?: number;
  codeValue?: number;
  disPercentage?: number;
}

interface CustomSelectProps {
  id: string;
  label: string;
  icon?: any;
  options: any[];
  value: string | number;
  onChange: (value: any) => void;
  placeholder?: string;
  disabled?: boolean;

  returnObject?: boolean;
}

interface FlatDetails {
  carpetArea: string;
  configuration: string;
  allInclusiveValue: string;
}

interface CalculatedValues {
  allInclusiveValue: string | number;
  AgreementValue: number;
  GstAmount: number;
  StampDutyAmount: number;
  RegistrationAmount: number;
  BookingAmount: number;
  StampDutyPlusRegistration: number;
  GSTPayble: number;
  TotalPayable: number;
  TotalPreviousPercentage: number;
  discountedAgreementValue: number;
  discountedGst: number;
  discountedStampDuty: number;
  totalPaybleDiscount: number;
  CouponDiscount: number;
}

const roundOff = (value: number): number => {
  return parseFloat(value.toFixed(0)); // Round to nearest whole number
};

// interface Lead {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   address: string;
//   teamLeader: TeamLeader;
// }

// interface DataContextType {
//   getProjects: () => Promise<{ success: boolean; data?: Project[] }>;
//   projects: Project[];
//   fetchEstimatCount: (
//     teamLeaderId: string
//   ) => Promise<{ success: boolean; data?: { count: number } }>;
//   loadingProject: boolean;
//   slabInfo: any;
//   getSlabByProject: (
//     projectId: string
//   ) => Promise<{ success: boolean; data?: { slabs: Slab[] } }>;
//   getCoupon: () => Promise<{ success: boolean; data?: Coupon[] }>;
//   coupons: Coupon[];
//   currentLead: Lead;
//   currentEstCount: { count: number };
//   addEstimate: (estimateData: any) => Promise<{ success: boolean }>;
// }

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CustomOption = (props: any) => (
  <components.Option {...props}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{props.data.label}</span>
      <span
        style={{
          color: props.data.status === "Present" ? "green" : "red",
          fontWeight: 500,
        }}
      >
        {props.data.status}
      </span>
    </div>
  </components.Option>
);

const Estimategenerator: React.FC<EstimategeneratorProps> = ({
  lead,
  teamLeader,
  openclick,
}) => {
  const {
    projects,
    getProjects,
    slabsbyproject,
    getSlabByProject,
    currentEstCount,
    fetchEstimatCount,
    uploadFile,
    addEstimateGenerated,
    // getLeadByPhoneNumber,
    // addBrokerage,
  } = useData();
  const router = useRouter();
  const [gstPercentage] = useState<number>(5);
  const currentTheme = document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
  const [customerName, setCustomerName] = useState<string>(
    lead ? `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() : ""
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    lead?.phoneNumber?.toString() ?? ""
  );
  const [address, setAddress] = useState<string>(lead?.address ?? "");
  const [selectedProject, setSelectedProject] = useState<OurProject | null>(
    lead?.bookingRef?.project || null
  );

  const [selectedBuildingNo, setSelectedBuildingNo] = useState<number | null>(
    lead?.bookingRef?.buildingNo || null
  );
  const [selectedSlab, setSelectedSlab] = useState<Slab | null>();
  const [selectedNumber, setSelectedNumber] = useState<Flat | null>(null);
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null);
  const [selectedStampDuty, setSelectedStampDuty] = useState<number>(6);

  const [projectOptions, setProjectOptions] = useState<OptionType[]>([]);
  const [slabOptions, setSlabOption] = useState<OptionType[]>([]);
  // const [floorOptions, setFloorOptions] = useState<OptionType[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(
    lead?.bookingRef?.floor || null
  );
  // const [buildingOptions, setBuildingOptions] = useState<OptionType[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<OurProject | null>(
    lead?.bookingRef?.project || null
  );
  const [numberOptions, setNumberOptions] = useState<OptionType[]>([]);

  const [couponOptions, setCouponOptions] = useState<OptionType[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<OptionType | null>(null);

  const [flatOptions, setFlatOptions] = useState<OptionType[]>([]);

  const [flatDetails, setFlatDetails] = useState<FlatDetails>({
    carpetArea: "",
    configuration: "",
    allInclusiveValue: "",
  });
  const customSelectStyles = (theme: "dark" | "light") => ({
    container: (base: any) => ({
      ...base,
      width: "100%",
    }),
    control: (base: any, state: any) => ({
      ...base,
      width: "100%",
      textAlign: "left",
      backgroundColor: theme === "dark" ? "#151414f5" : "white",
      borderColor: state.isFocused
        ? "#007bff"
        : theme === "dark"
        ? "#444444f5"
        : "#ccc",
      minHeight: "40px",
      borderWidth: "2px",
      color: theme === "dark" ? "white" : "#201f1f",
      fontSize: "14px", // ✅ smaller font
      boxShadow: state.isFocused ? "0 0 0 1px #007bff" : "none",
      "&:hover": {
        borderColor: "#007bff",
      },
    }),
    menu: (base: any) => ({
      ...base,
      textAlign: "left",
      backgroundColor: theme === "dark" ? "#151414f5" : "white",
      fontSize: "14px", // smaller font in dropdown
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
      fontSize: "14px", // smaller font
    }),
    singleValue: (base: any) => ({
      ...base,
      textAlign: "left",
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
      color: theme === "dark" ? "#aaa" : "#424040ff",
      fontSize: "14px",
    }),
  });
  useEffect(() => {
    if (lead) {
      setCustomerName(`${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim());
      setPhoneNumber(lead.phoneNumber?.toString() ?? "");
      setAddress(lead.address ?? "");
    }
  }, [lead]);

  const stampDutyOptions = [
    { value: 5, label: "5%" },
    { value: 6, label: "6%" },
  ];

  const {
    fetchSearchLeads,
    searchLeadInfo,
    leads,
    loadingLeads,
    fetchingMoreLeads,
    updateLeadDetails,
  } = useData();
  const { user } = useUser();

  const dialogRef = useRef<HTMLDivElement>(null);

  //  const floors =
  //   selectedProject?.flatList
  //     ?.filter((f) => f.buildingNo === selectedBuildingNo)
  //     .map((f) => f.floor)
  //     .filter((f): f is number => f !== undefined)
  //     .sort((a, b) => a - b) || [];

  // Close dialog when clicking outside

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

  useEffect(() => {
    getProjects();

    if (selectedProject?._id) {
      // getSlabByProject(selectedProject._id).then(() => {
      //   console.log(slabsbyproject?.slabs ?? []);
      // });
      getSlabByProject(selectedProject._id);
    }
  }, [selectedProject]);

  const slabsproj = slabsbyproject?.slabs ?? [];

  const flats = selectedProject?.flatList ?? [];

  // Check if project has building numbers
  const hasBuildings = flats.length > 0 && flats.some((f) => f.buildingNo);

  const buildingOptions = hasBuildings
    ? Array.from(
        new Set(
          flats
            .map((f) => f.buildingNo)
            .filter((b): b is number => b !== undefined && b !== null)
        )
      ).sort()
    : [];

  // ---------------------------
  // Floor Options - filtered based on selected building
  // ---------------------------
  const floorOptions = hasBuildings
    ? Array.from(
        new Set(
          flats
            .filter((f) => f.buildingNo === selectedBuildingNo)
            .map((f) => f.floor)
            .filter((f): f is number => f !== undefined && f !== null)
        )
      ).sort((a, b) => a - b)
    : Array.from(
        new Set(
          flats
            .map((f) => f.floor)
            .filter((f): f is number => f !== undefined && f !== null)
        )
      ).sort((a, b) => a - b);

  // ---------------------------
  // Unit/Flat Options - filtered based on selected building and floor
  // ---------------------------
  const unitOptions = hasBuildings
    ? flats.filter(
        (f) => f.buildingNo === selectedBuildingNo && f.floor === selectedFloor
      )
    : flats.filter((f) => f.floor === selectedFloor);

  // Now replace your existing buildings, floors, flats variables with these:
  const buildings = buildingOptions;
  const floors = floorOptions;
  const flatsForSelection = unitOptions;

  useEffect(() => {}, [
    selectedProject,
    selectedBuildingNo,
    selectedFloor,
    selectedFlat,
    buildings,
    floors,
    flats,
  ]);

  const onSelectChange = (name: string, value: any) => {
    if (name === "project") {
      setSelectedProject(value);
    } else if (name === "buildingNo") {
      setSelectedBuildingNo(parseInt(value));
    } else if (name === "floor") {
      setSelectedFloor(parseInt(value));
    }
  };

  // const autoPopulateFlatNumber = (
  //   floor: number,
  //   unitNumber: string | number
  // ) => {
  //   // Find the flat based on floor and unit number
  //   const matchingFlat = flats.find(
  //     (flat) =>
  //       flat.floor === floor &&
  //       (flat.number === flat.number?.toString() ||
  //         flat.number?.toString() === unitNumber.toString())
  //   );

  //   if (matchingFlat) {
  //     const flatOption: OptionType = {
  //       value: matchingFlat.id || matchingFlat.number?.toString() || "",
  //       label:
  //         matchingFlat.number ||
  //         matchingFlat.number?.toString() ||
  //         `Flat ${matchingFlat.id}`,
  //     };

  //     // setSelectedFlat(flat || null);

  //     // Also update flat details
  //     setFlatDetails({
  //       carpetArea: matchingFlat.carpetArea?.toString() || "",
  //       configuration: matchingFlat.configuration || "",
  //       allInclusiveValue: matchingFlat.allInclusiveValue?.toString() || "",
  //     });
  //   }
  // };

  const SlabSelect: React.FC<{
    id: string;
    label: string;
    icon?: any;
    slabs: Slab[];
    value: string;
    onChange: (slab: Slab | null) => void;
    placeholder?: string;
    disabled?: boolean;
  }> = ({
    id,
    label,
    icon: Icon,
    slabs,
    value,
    onChange,
    placeholder = "Select Slab",
    disabled = false,
  }) => {
    const slabOptions = slabs.map((slab) => ({
      value: slab.id || "",
      label: slab.name || `Slab ${slab.index}`,
      original: slab,
    }));

    const selectedOption =
      slabOptions.find((opt) => opt.value === value) || null;

    return (
      <div className={styles.formControl}>
        <label htmlFor={id}>{label}</label>
        <div className={styles.inputWrapper}>
          {Icon && <Icon className={styles.inputIcon} />}
          <Select
            id={id}
            options={slabOptions}
            value={selectedOption}
            onChange={(selected) => {
              onChange(selected?.original || null);
            }}
            placeholder={placeholder}
            classNamePrefix="react-select"
            closeMenuOnSelect
            isDisabled={disabled}
            isSearchable
            styles={customSelectStyles(currentTheme)}
            components={{ Option: CustomOption }}
          />
        </div>
      </div>
    );
  };

  const CustomSelect: React.FC<CustomSelectProps> = ({
    id,
    label,
    icon: Icon,
    options,
    value,
    onChange,
    placeholder = "Select...",
    disabled = false,
    returnObject = false,
  }) => {
    // Transform options for react-select
    const formattedOptions = React.useMemo(() => {
      return options
        .map((opt) => {
          // Handle different object structures
          const valueKey =
            opt._id !== undefined
              ? opt._id
              : opt.id !== undefined
              ? opt.id
              : opt.value;

          const labelKey =
            opt.name ||
            opt.label ||
            (opt.value !== undefined ? String(opt.value) : String(valueKey));

          return {
            value: String(valueKey ?? ""), // Ensure value is string for consistent comparison
            label: labelKey,
            original: opt,
          };
        })
        .filter(
          (opt) =>
            opt.value !== undefined && opt.value !== null && opt.value !== ""
        );
    }, [options]);

    // Find the currently selected option - use strict comparison
    const safeValue =
      value !== undefined && value !== null ? String(value) : "";

    // Find the currently selected option
    const selectedOption = React.useMemo(() => {
      return formattedOptions.find((opt) => opt.value === safeValue) || null;
    }, [formattedOptions, safeValue]);

    console.log(`CustomSelect ${label}:`, {
      options: formattedOptions,
      value,
      valueType: typeof value,
      selectedOption,
    });

    return (
      <div className={styles.formControl}>
        <label htmlFor={id}>{label}</label>
        <div className={styles.inputWrapper}>
          {Icon && <Icon className={styles.inputIcon} />}

          <Select
            key={safeValue} // Add key to force re-render when value changes
            id={id}
            options={formattedOptions}
            value={selectedOption}
            onChange={(selected) => {
              console.log(`Select ${label} changed:`, selected);
              if (returnObject) {
                onChange(selected?.original || null);
              } else {
                onChange(selected?.value || "");
              }
            }}
            placeholder={placeholder}
            classNamePrefix="react-select"
            closeMenuOnSelect
            isDisabled={disabled}
            isSearchable
            styles={customSelectStyles(currentTheme)}
            components={{ Option: CustomOption }}
          />
        </div>
      </div>
    );
  };

  //   useEffect(() => {
  //     fetchEstimatCount(currentLead.teamLeader._id);
  //   }, [currentLead.teamLeader._id]);

  //   useEffect(() => {
  //     const fetchProjects = async () => {
  //       const result = await getProjects();
  //       if (result.success) {
  //         const formatted = (projects ?? []).map((p) => ({
  //           value: p._id,
  //           label: p.name,
  //         }));
  //         setProjectOptions(formatted);
  //       }
  //     };
  //     fetchProjects();
  //     if (currentLead) {
  //       setCustomerName(
  //         `${currentLead?.firstName ?? ""} ${currentLead?.lastName ?? ""}`
  //       );
  //       setPhoneNumber(currentLead?.phoneNumber ?? "");
  //       setAddress(currentLead?.address ?? "");
  //     }
  //   }, []);

  //   useEffect(() => {
  //     const fetchCoupons = async () => {
  //       try {
  //         const result = await getCoupon();

  //         if (result.success && Array.isArray(result.data)) {
  //           const formatted = result.data.map((c) => ({
  //             value: c._id,
  //             label: c.disPercentage ? `${c.disPercentage}%` : c.codeName,
  //             codeValue: c.codeValue,
  //             disPercentage: c.disPercentage,
  //           }));

  //           setCouponOptions(formatted);
  //           console.log("Coupons formatted:", formatted);
  //         } else {
  //           setCouponOptions([]);
  //         }
  //       } catch (err) {
  //         console.error("Failed to fetch coupons", err);
  //         setCouponOptions([]);
  //       }
  //     };

  //     fetchCoupons();
  //   }, [selectedCoupon]);

  //   useEffect(() => {
  //     const fetchSlabs = async () => {
  //       if (!selectedProjects || !selectedProjects.value) return;

  //       try {
  //         const result = await getSlabByProject(selectedProjects.value as string);
  //         console.log("Slabs API result:", result);

  //         if (result.success && result.data?.slabs?.length) {
  //           const formatted = result.data.slabs.map((s: Slab, idx: number) => ({
  //             value: s.id,
  //             label: s.name,
  //             percent: s.percent,
  //             index: s.index ?? idx,
  //           }));
  //           setSlabOption(formatted);
  //         } else {
  //           setSlabOption([]);
  //           console.warn("No slabs available for this project.");
  //         }
  //       } catch (err) {
  //         console.error("Error fetching slabs:", err);
  //         setSlabOption([]);
  //       }
  //     };

  //     fetchSlabs();
  //   }, [selectedProjects, selectedSlab]);

  //floors
  //   useEffect(() => {
  //     if (!selectedProjects) return;

  //     const project = projects.find((p) => p._id === selectedProjects.value);
  //     if (!project?.flatList) return;

  //     const uniqueBuildings = [
  //       ...new Set(project.flatList.map((f) => f.buildingNo).filter(Boolean)),
  //     ].sort((a, b) => (a || 0) - (b || 0)) as number[];

  //     if (uniqueBuildings.length > 1) {
  //       setBuildingOptions(
  //         uniqueBuildings.map((b) => ({
  //           value: b,
  //           label: `Building ${b}`,
  //         }))
  //       );
  //       setSelectedBuilding(null);
  //       setFloorOptions([]);
  //     } else {
  //       setBuildingOptions([]);
  //       const buildingNo = uniqueBuildings[0] ?? null;

  //       const uniqueFloors = [
  //         ...new Set(
  //           (buildingNo
  //             ? project.flatList.filter((f) => f.buildingNo === buildingNo)
  //             : project.flatList
  //           ).map((f) => f.floor)
  //         ),
  //       ].sort((a, b) => a - b);

  //       setFloorOptions(
  //         uniqueFloors.map((f) => ({
  //           value: f,
  //           label: `Floor ${f}`,
  //         }))
  //       );
  //       setSelectedBuilding(
  //         buildingNo
  //           ? { value: buildingNo, label: `Building ${buildingNo}` }
  //           : null
  //       );
  //     }
  //   }, [selectedProjects]);

  //building
  //   useEffect(() => {
  //     if (!selectedProjects || !selectedBuilding) return;

  //     const project = projects.find((p) => p._id === selectedProjects.value);
  //     if (!project?.flatList) return;

  //     const buildingFlats = project.flatList.filter(
  //       (f) => f.buildingNo === selectedBuilding.value
  //     );

  //     const uniqueFloors = [...new Set(buildingFlats.map((f) => f.floor))].sort(
  //       (a, b) => a - b
  //     );

  //     setFloorOptions(
  //       uniqueFloors.map((f) => ({
  //         value: f,
  //         label: `Floor ${f}`,
  //       }))
  //     );
  //     setSelectedFloor(null);
  //   }, [selectedBuilding]);

  //unit no
  //   useEffect(() => {
  //     if (!selectedProjects || selectedFloor === null) return;

  //     const project = projects.find((p) => p._id === selectedProjects.value);
  //     if (!project?.flatList) return;

  //     let filteredFlats = project.flatList;

  //     if (selectedBuilding) {
  //       filteredFlats = filteredFlats.filter(
  //         (f) => f.buildingNo === selectedBuilding.value
  //       );
  //     }

  //     filteredFlats = filteredFlats.filter(
  //       (f) => f.floor === selectedFloor.value
  //     );

  //     const uniqueNumbers = [...new Set(filteredFlats.map((f) => f.number))].sort(
  //       (a, b) => a - b
  //     );

  //     setNumberOptions(
  //       uniqueNumbers.map((n) => ({
  //         value: n,
  //         label: `Unit ${n}`,
  //       }))
  //     );

  //     setSelectedNumber(null);
  //   }, [selectedProjects, selectedBuilding, selectedFloor]);

  //flat no
  //   useEffect(() => {
  //     if (!selectedProjects) return;

  //     const project = projects.find((p) => p._id === selectedProjects.value);
  //     if (!project?.flatList) return;

  //     let filteredFlats = project.flatList;

  //     if (selectedBuilding) {
  //       filteredFlats = filteredFlats.filter(
  //         (f) => f.buildingNo === selectedBuilding.value
  //       );
  //     }

  //     if (selectedFloor) {
  //       filteredFlats = filteredFlats.filter(
  //         (f) => f.floor === selectedFloor.value
  //       );
  //     }

  //     if (selectedNumber) {
  //       filteredFlats = filteredFlats.filter(
  //         (f) => f.number === selectedNumber.value
  //       );
  //     }

  //     const options = filteredFlats.map((f) => ({
  //       value: f.flatNo,
  //       label: `Flat ${f.flatNo}`,
  //     }));

  //     setFlatOptions(options);
  //     setSelectedFlat(null);
  //   }, [selectedProjects, selectedBuilding, selectedFloor, selectedNumber]);

  //flat details data
  //   useEffect(() => {
  //     if (!selectedFlat || !selectedProjects) {
  //       setFlatDetails({
  //         carpetArea: "",
  //         configuration: "",
  //         allInclusiveValue: "",
  //       });
  //       return;
  //     }

  //     const project = projects.find((p) => p._id === selectedProjects.value);
  //     if (!project?.flatList) return;

  //     const flat = project.flatList.find(
  //       (f) => f.flatNo === selectedFlat.value || f.id === selectedFlat.value
  //     );

  //     if (flat) {
  //       setFlatDetails({
  //         carpetArea: flat.carpetArea ?? "",
  //         configuration: flat.configuration ?? "",
  //         allInclusiveValue: flat.allInclusiveValue ?? "",
  //       });
  //     } else {
  //       setFlatDetails({
  //         carpetArea: "",
  //         configuration: "",
  //         allInclusiveValue: "",
  //       });
  //     }
  //   }, [selectedFlat, selectedProjects]);

  //calculate estimate values
  const [calculatedValues, setCalculatedValues] = useState<CalculatedValues>({
    allInclusiveValue: 0,
    AgreementValue: 0,
    GstAmount: 0,
    StampDutyAmount: 0,
    RegistrationAmount: 30000,
    BookingAmount: 0,
    StampDutyPlusRegistration: 0,
    GSTPayble: 0,
    TotalPayable: 0,
    TotalPreviousPercentage: 0,
    discountedAgreementValue: 0,
    discountedGst: 0,
    discountedStampDuty: 0,
    totalPaybleDiscount: 0,
    CouponDiscount: 0,
  });

  useEffect(() => {
    const allInc =
      parseFloat(selectedFlat?.allInclusiveValue?.toString() || "0") || 0;

    if (!allInc || allInc <= 0 || !selectedSlab) return;

    const stamp = selectedStampDuty || 6;

    // Calculate agreement value (same as Flutter)
    const agreementValue =
      (allInc - 30000) / ((stamp + gstPercentage) / 100 + 1);
    const gstAmount = agreementValue * (gstPercentage / 100);
    const stampDutyAmount = agreementValue * (stamp / 100);

    let couponDiscount = 0;
    let discountedAgreementValue = agreementValue;
    let discountedGstAmount = gstAmount;
    let discountedStampDutyAmount = stampDutyAmount;

    // Apply coupon discount (same logic as Flutter)
    if (selectedCoupon) {
      const discountAmount = selectedCoupon.codeValue ?? 0;
      const discountPercentage = selectedCoupon.disPercentage ?? 0;

      if (discountAmount > 0) {
        // Fixed amount discount
        couponDiscount = discountAmount;
        discountedAgreementValue = agreementValue - discountAmount;
        discountedGstAmount = discountedAgreementValue * (gstPercentage / 100);
        discountedStampDutyAmount = discountedAgreementValue * (stamp / 100);
      } else if (discountPercentage > 0) {
        // Percentage discount
        const discountFactor = (100 - discountPercentage) / 100;
        discountedAgreementValue = agreementValue * discountFactor;
        discountedGstAmount = discountedAgreementValue * (gstPercentage / 100);
        discountedStampDutyAmount = discountedAgreementValue * (stamp / 100);
        couponDiscount = agreementValue - discountedAgreementValue;
      }
    }

    // Calculate total slab percentage (same as Flutter)
    let totalSlabPercentage = 0;
    const slabs = slabsbyproject?.slabs ?? [];

    for (const slab of slabs) {
      if ((slab.index ?? -1) < (selectedSlab.index ?? -1)) {
        totalSlabPercentage += slab.percent ?? 0;
      }
    }
    totalSlabPercentage += selectedSlab.percent ?? 0;

    // Calculate booking amount and related values (same as Flutter)
    const bookingAmountValue =
      discountedAgreementValue * (totalSlabPercentage / 100);
    const gstOnBooking = bookingAmountValue * (gstPercentage / 100);
    const stampDutyPlusRegistration = discountedStampDutyAmount + 30000;
    const totalPayable =
      bookingAmountValue + gstOnBooking + stampDutyPlusRegistration;

    // Calculate total payable after discount
    const totalPaybleDiscount =
      discountedAgreementValue +
      discountedGstAmount +
      discountedStampDutyAmount +
      30000;

    setCalculatedValues({
      allInclusiveValue: allInc,
      AgreementValue: roundOff(agreementValue),
      GstAmount: roundOff(gstAmount),
      StampDutyAmount: roundOff(stampDutyAmount),
      RegistrationAmount: 30000,
      BookingAmount: roundOff(bookingAmountValue),
      StampDutyPlusRegistration: roundOff(stampDutyPlusRegistration),
      GSTPayble: roundOff(gstOnBooking),
      TotalPayable: roundOff(totalPayable),
      TotalPreviousPercentage: roundOff(totalSlabPercentage),
      discountedAgreementValue: roundOff(discountedAgreementValue),
      discountedGst: roundOff(discountedGstAmount),
      discountedStampDuty: roundOff(discountedStampDutyAmount),
      totalPaybleDiscount: roundOff(totalPaybleDiscount),
      CouponDiscount: roundOff(couponDiscount),
    });
  }, [
    selectedSlab,
    selectedStampDuty,
    selectedCoupon,
    selectedFlat,
    gstPercentage,
    slabsbyproject,
  ]);

  useEffect(() => {
    console.log(calculatedValues);
  }, [calculatedValues, selectedCoupon]);

  return ReactDOM.createPortal(
    <div className={stylerun.dialogOverlay}>
      <div
        ref={dialogRef}
        className={stylerun.dialogBox}
        style={{
          maxWidth: "90vw",
          width: "1200px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <h3 className={stylerun.dialogTitle}>Estimate Generator</h3>
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
        <div className={styles.container}>
          <div className={styles.sectionClient}>
            <div className={styles.sectionHeader}>Client Details</div>

            <div className={styles.detailsInfo}>
              <div className={styles.formControl}>
                <label htmlFor="customerName">Customer Name </label>
                <div className={styles.inputWrapper}>
                  <FaUser className={styles.inputIcon} />
                  <input
                    type="text"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Customer Name"
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formControl}>
                <label htmlFor="phoneNumber">Phone Number </label>
                <div className={styles.inputWrapper}>
                  <FaPhoneAlt className={styles.inputIcon} />
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formControl}>
                <label htmlFor="address">Address </label>
                <div className={styles.inputWrapper}>
                  <FaHome className={styles.inputIcon} />
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    className={styles.inputField}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.remainSection}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>Project Details</div>

              <CustomSelect
                id="projects"
                label="Projects"
                icon={FaBuildingFlag}
                options={projects}
                value={selectedProject?._id || ""}
                onChange={(project: OurProject | null) => {
                  console.log("Project selected:", project);
                  console.log("Project _id:", project?._id);
                  setSelectedProject(project);

                  if (project?._id) {
                    getSlabByProject(project._id);
                  }
                  setSelectedSlab(null);
                }}
                returnObject
              />
              <SlabSelect
                id="slab"
                label="Slab"
                icon={IoLayers}
                slabs={slabsbyproject?.slabs ?? []}
                value={selectedSlab?.id || ""}
                onChange={(slab: Slab | null) => setSelectedSlab(slab)}
                placeholder="Select Slab"
              />

              {buildingOptions.length > 0 && (
                <CustomSelect
                  id="building"
                  label="Building"
                  options={buildingOptions.map((building) => ({
                    value: building,
                    label: `Building ${building}`,
                    original: building,
                  }))}
                  value={selectedBuildingNo || ""}
                  onChange={(value: string) => {
                    const buildingNo = value ? parseInt(value) : null;
                    setSelectedBuildingNo(buildingNo);
                    // Reset dependent fields when building changes
                    setSelectedFloor(null);
                    setSelectedFlat(null);
                  }}
                  placeholder="Select building"
                />
              )}

              {/* Floor Selection */}
              {/* Floor Selection */}
              {floorOptions.length > 0 && (
                <CustomSelect
                  id="floors"
                  label="Floors"
                  options={floorOptions.map((floor) => ({
                    value: floor,
                    label: `Floor ${floor}`,
                  }))}
                  value={selectedFloor || ""}
                  onChange={(value: string | number) => {
                    const floor = value ? parseInt(value.toString()) : null;
                    setSelectedFloor(floor);
                    setSelectedNumber(null); // Reset the selected flat
                  }}
                  placeholder="Select floor"
                  disabled={!floorOptions.length}
                />
              )}

              {/* Unit/Flat Selection - Directly select Flat objects */}
              <CustomSelect
                id="number"
                label="Select Unit"
                options={flatsForSelection.map((flat: Flat) => ({
                  value: flat.id ?? flat.id ?? flat.number?.toString(),
                  label: flat.number?.toString() ?? flat.flatNo ?? "Unit",
                  original: flat,
                }))}
                value={
                  selectedFlat?.id?.toString() ??
                  selectedFlat?.id ??
                  selectedFlat?.number?.toString() ??
                  ""
                }
                onChange={(value) => {
                  const flat = flatsForSelection.find(
                    (f: any) =>
                      (f._id && f._id === value) ||
                      (f.id && f.id === value) ||
                      f.number?.toString() === value
                  );

                  setSelectedFlat(flat || null);

                  console.log("Unit flat selected:", flat);
                }}
                placeholder="Select unit"
                disabled={!flatsForSelection.length}
                returnObject={false}
              />

              {/* Display Flat Number (Read-only) */}
              {selectedFlat && (
                <div className={styles.formControl}>
                  <label htmlFor="flatNumber">Flat Number</label>
                  <div className={styles.inputWrapper}>
                    <FaBuilding className={styles.inputIcon} />
                    <input
                      type="text"
                      id="flatNumber"
                      value={
                        selectedFlat.flatNo ||
                        selectedFlat.number?.toString() ||
                        selectedFlat.id ||
                        "N/A"
                      }
                      readOnly
                      className={styles.inputField}
                      style={{
                        cursor: "not-allowed",
                      }}
                    />
                  </div>
                </div>
              )}

              <div className={styles.formControl}>
                <label htmlFor="carpetArea">Carpet Area </label>
                <div className={styles.inputWrapper}>
                  <FaChartArea className={styles.inputIcon} />
                  <input
                    readOnly
                    id="carpetArea"
                    value={selectedFlat?.carpetArea?.toString() || ""}
                    placeholder="Carpet Area"
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formControl}>
                <label htmlFor="configuration">Configuration</label>
                <div className={styles.inputWrapper}>
                  <FaChartArea className={styles.inputIcon} />
                  <input
                    readOnly
                    id="configuration"
                    value={selectedFlat?.configuration?.toString() || ""}
                    placeholder="Configuration"
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formControl}>
                <label htmlFor="allInclusiveValue">All Inclusive Value</label>
                <div className={styles.inputWrapper}>
                  <FaDollarSign className={styles.inputIcon} />
                  <input
                    readOnly
                    id="allInclusiveValue"
                    value={selectedFlat?.allInclusiveValue?.toString() || ""}
                    placeholder="Value"
                    className={styles.inputField}
                  />
                </div>
              </div>

              <CustomSelect
                id="stampDuty"
                label="Select Stamp Duty (%)"
                icon={PiSealPercentFill}
                options={stampDutyOptions}
                value={selectedStampDuty}
                onChange={(val) => setSelectedStampDuty(Number(val))}
                placeholder="Select Stamp Duty"
              />
            </div>

            <div className={`${styles.section} ${styles.sectionStacked}`}>
              <div className={styles.innerSection}>
                <div className={styles.sectionHeader}>Estimated Values</div>
                <div className={styles.estimatedDetails}>
                  <div className={styles.estimatedRow}>
                    <span>Agreement Value</span>
                    <span>
                      ₹{calculatedValues.AgreementValue.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className={styles.estimatedRow}>
                    <span>GST Amount</span>
                    <span>
                      ₹{calculatedValues.GstAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className={styles.estimatedRow}>
                    <span>Stamp Duty Amount</span>
                    <span>
                      ₹
                      {calculatedValues.StampDutyAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className={styles.estimatedRow}>
                    <span>Registration Amount</span>
                    <span>
                      ₹
                      {calculatedValues.RegistrationAmount.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.section} ${styles.sectionStacked}`}>
              <div className={styles.innerSection}>
                <div className={styles.sectionHeader}>
                  Payable Amount Details
                </div>
                <div className={styles.estimatedDetails}>
                  <div className={styles.estimatedRow}>
                    <span>Booking Amount</span>
                    <span>
                      ₹
                      {calculatedValues.BookingAmount?.toLocaleString(
                        "en-IN"
                      ) || "0.00"}
                    </span>
                  </div>
                  <div className={styles.estimatedRow}>
                    <span>GST Amount</span>
                    <span>
                      ₹
                      {calculatedValues.GSTPayble?.toLocaleString("en-IN") ||
                        "0.00"}
                    </span>
                  </div>
                  <div className={styles.estimatedRow}>
                    <span>Stamp Duty Amount</span>
                    <span>
                      <span>
                        ₹
                        {calculatedValues.StampDutyPlusRegistration?.toLocaleString(
                          "en-IN"
                        ) || "0.00"}
                      </span>
                    </span>
                  </div>
                  <div className={styles.estimatedRow}>
                    <span>Total Payable</span>
                    <span>
                      ₹
                      {calculatedValues.TotalPayable?.toLocaleString("en-IN") ||
                        "0.00"}
                    </span>
                  </div>
                  <div className={styles.estimatedRow}>
                    <span>Total Previous Percentage</span>
                    <span>{calculatedValues.TotalPreviousPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={async () => {
              try {
                // Validate required fields
                if (!selectedProject || !selectedSlab || !selectedFlat) {
                  alert(
                    "Please select Project, Slab, and Unit before submitting"
                  );
                  return;
                }

                if (!user?._id) {
                  alert("User not authenticated");
                  return;
                }

                // Get current estimate count
                let currentCount = 0;
                if (lead?.teamLeader?._id) {
                  const countResult = await fetchEstimatCount(
                    lead.teamLeader._id
                  );
                  // currentCount = countResult?.data?.count ?? 0;
                }

                // const backResponse = await uploadFile(formD);

                // Generate EST ID
                const estId = getEstId(lead?.teamLeader, currentCount + 1);

                // Prepare estimate data
                const estimateData = {
                  estID: estId,
                  estimateDate: new Date().toISOString(),
                  lead: lead?._id,
                  project: selectedProject?._id,
                  slab: selectedSlab?.id,
                  flatNo: selectedFlat?.flatNo,
                  floor: selectedFlat?.floor,
                  number: selectedFlat?.number,
                  carpetArea: selectedFlat?.carpetArea
                    ? Math.round(selectedFlat.carpetArea)
                    : null,
                  ssArea: selectedFlat?.ssArea
                    ? Math.round(selectedFlat.ssArea)
                    : null,
                  reraArea: selectedFlat?.reraArea
                    ? Math.round(selectedFlat.reraArea)
                    : null,
                  balconyArea: selectedFlat?.balconyArea
                    ? Math.round(selectedFlat.balconyArea)
                    : null,
                  configuration: selectedFlat?.configuration,
                  agreementValue: Math.round(calculatedValues.AgreementValue),
                  allInclusiveValue: selectedFlat?.allInclusiveValue
                    ? Math.round(selectedFlat.allInclusiveValue)
                    : null,
                  discountedAgreementValue: Math.round(
                    calculatedValues.discountedAgreementValue
                  ),
                  discountStampDuty: Math.round(
                    calculatedValues.discountedStampDuty
                  ),
                  discountedGstValue: Math.round(
                    calculatedValues.discountedGst
                  ),
                  discountedPayable: Math.round(
                    calculatedValues.totalPaybleDiscount
                  ),
                  payableBookingValue: Math.round(
                    calculatedValues.BookingAmount
                  ),
                  totalPayableValue: Math.round(calculatedValues.TotalPayable),
                  coupon: selectedCoupon
                    ? {
                        id: selectedCoupon.value,
                        name: selectedCoupon.label,
                        codeValue: selectedCoupon.codeValue,
                        disPercentage: selectedCoupon.disPercentage,
                      }
                    : null,
                  generatedBy: user._id,
                  teamLeader: lead?.teamLeader?._id,
                  document: "",
                  buildingNo: selectedBuildingNo,
                  stampDutyAmount: Math.round(calculatedValues.StampDutyAmount),
                  gstAmount: Math.round(calculatedValues.GstAmount),
                  stampDutyPercentage: selectedStampDuty,
                };

                console.log("Submitting estimate data:", estimateData);

                // Step 1: Add estimate to database

                try {
                  console.log("triggered 1");

                  const mayurpdf = await generatePdf(
                    lead,
                    teamLeader,
                    selectedProject,
                    selectedFlat,
                    {
                      ...calculatedValues,
                      allInclusiveValue: Number(
                        calculatedValues?.allInclusiveValue
                      ),
                      AgreementValue: Number(calculatedValues?.AgreementValue),
                      GstAmount: Number(calculatedValues?.GstAmount),
                      StampDutyAmount: Number(
                        calculatedValues?.StampDutyAmount
                      ),
                      TotalPayable: Number(calculatedValues?.TotalPayable),
                      BookingAmount: Number(calculatedValues?.BookingAmount),
                    },
                    selectedSlab,
                    user,
                    currentEstCount ?? 0,
                    fetchEstimatCount ?? "",
                    customerName,
                    phoneNumber,
                    address
                    // uploadFile,
                  );
                  // const backResponse = await uploadFile(mayurpdf);
                  // // console.log("testing 0", backResponse);
                  // estimateData.document = backResponse.file?.downloadUrl ?? "";
                } catch (err) {
                  console.error("PDF generation failed:", err);
                }

                // const result = await addEstimateGenerated(estimateData);

                // if (!result.success) {
                //   throw new Error(result.message || "Failed to save estimate");
                // }

                // openclick(false);
              } catch (error) {
                console.error("Unexpected error:", error);
              }
            }}
            className={styles.pdfbutton}
          >
            <Download className={styles.pdficon} />
            <p>Generate PDF</p>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const generatePdf = async (
  lead: Lead | null | undefined,
  teamLeader: EstimateGenerated | null | undefined,
  project: OurProject | null,
  flat: Flat | null,
  calculatedValues: CalculatedValues,
  slab: Slab | null,
  user: any,
  currentEstCount: any,
  fetchEstimatCount: any,
  customerName: string,
  phoneNumber: string,
  address: string
) => {
  const doc = new jsPDF();
  let y = 20;

  const lineGap = 5;
  const addSectionTitle = (title: string) => {
    // doc.setFillColor(230, 230, 250);
    // doc.rect(10, y - 5, 190, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(title, 14, y);
    y += 5;
  };

  const addField = (label: string, value: any) => {
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`${label}: ${value ?? "-"}`, 14, y);
    y += lineGap + 1;

    if (y > 275) {
      doc.addPage();
      y = 20;
    }
  };

  const formatValue = (val: number | string | undefined): string => {
    if (!val) return "0.00";
    const num = Number(val);
    return num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  let yPosition = 130;

  const logo1 = await getBase64ImageFromUrl(
    "https://cdn.evhomes.tech/6c43b153-2ddf-474c-803d-c6fef9ac319a-estimator.png"
  );

  const logo2 = await getBase64ImageFromUrl(project?.logo || logo1);

  doc.addImage(logo1, "PNG", 10, 10, 25, 12);
  doc.addImage(logo2, "PNG", 150, 5, 30, 20);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("This is an Estimate", 105, 35, { align: "center" });

  doc.setFontSize(11);
  doc.text(`Date: ${dateFormatWithTime(new Date().toISOString())}`, 105, 40, {
    align: "center",
  });

  y = 50;

  const estId = getEstId(lead?.teamLeader, (currentEstCount?.count ?? 0) + 1);

  doc.setFontSize(10);
  doc.text(`EST ID: ${estId}`, 14, y);
  y += lineGap;

  // Company From
  doc.setFontSize(10);
  doc.text(`From:\nEv Homes Constructions Pvt. LTD`, 14, y);
  y += 14;

  // -------- Section: Client Information --------
  let yLeft = y;
  let yRight = y;
  const xLeft = 14;
  const xRight = 110;

  // Section titles
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);

  doc.text("Client Information", xLeft, yLeft);
  doc.text("Unit Details", xRight, yRight);

  yLeft += 8;
  yRight += 8;

  // ---- Left Column Fields ----
  const addLeftField = (label: string, value: any) => {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${label}: ${value ?? "-"}`, xLeft, yLeft);
    yLeft += 5;
  };

  addLeftField("Client Name", customerName);
  addLeftField("Mobile", phoneNumber);
  addLeftField("Address", address ?? "NA");
  addLeftField(
    "Team Leader",
    `${teamLeader?.generatedBy?.reportingTo?.firstName ?? ""} ${
      teamLeader?.generatedBy?.reportingTo?.lastName ?? ""
    }`
  );
  addLeftField(
    "Attended By",
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`
  );

  // ---- Right Column Fields ----
  const addRightField = (label: string, value: any) => {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${label}: ${value ?? "-"}`, xRight, yRight);
    yRight += 5;
  };

  addRightField("Project", project?.name);
  addRightField("Floor", flat?.floor);
  addRightField("Unit No", flat?.number);
  addRightField("Flat No", flat?.flatNo);
  addRightField("Configuration", flat?.configuration);

  if (flat?.reraArea && flat.reraArea > 0)
    addRightField("Rera Area", `${flat.reraArea} sq.ft`);

  if (flat?.balconyArea && flat.balconyArea > 0)
    addRightField("Balcony Area", `${flat.balconyArea} sq.ft`);

  if (
    project?._id !== "project-ev23-malibu-west-koparkhairne-2024" &&
    flat?.ssArea &&
    flat.ssArea > 0
  )
    addRightField("SS Area", `${flat.ssArea} sq.ft`);

  addRightField("Usable Carpet Area", `${flat?.carpetArea} sq.ft`);

  // Update overall Y to the largest one
  y = Math.max(yLeft, yRight) + 10;

  // -------- Section: Breakup Price --------
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Breakup Price:", 14, yPosition);
  yPosition += 8;

  const breakupTableData = [
    ["Agreement Value", formatValue(calculatedValues.AgreementValue)],
    ["GST Amount (5%)", formatValue(calculatedValues.GSTPayble)],
    [
      "Stamp Duty Amount",
      formatValue(calculatedValues.StampDutyPlusRegistration),
    ],
    ["Registration", "30,000"],
    ["All Inclusive Value", formatValue(calculatedValues.allInclusiveValue)],
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: breakupTableData,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 0.5,
      lineWidth: 0.2,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { cellWidth: 90, halign: "left", fontStyle: "bold" },
      1: { cellWidth: 90, halign: "center" },
    },
    margin: { left: 14, right: 14 },
    didParseCell: function (data) {
      const rawRow = data.row.raw as unknown as string[];
      const rowText = rawRow?.[0] ?? "";

      if (rowText === "All Inclusive Value" && data.column.index === 1) {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.textColor = [244, 67, 54];
      }
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 4;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  yPosition += 8;

  const additionalChargesData = [
    ["Maintenance + Sinking Fund", "1,00,000.00"],
    ["Legal Charges", "45,000.00"],
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: additionalChargesData,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 0.5,
      lineWidth: 0.2,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { cellWidth: 90, halign: "left", fontStyle: "bold" },
      1: { cellWidth: 90, halign: "center" },
    },

    margin: { left: 14, right: 14 },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 10;

  // Payable Amount as per Slab Table
  const slabTitle = `Payable Amount as per ${slab?.name || ""} (${
    calculatedValues.TotalPreviousPercentage
  }%)`;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(slabTitle, 14, yPosition);
  yPosition += 8;

  const payableTableData = [
    ["Booking Amount", formatValue(calculatedValues.BookingAmount)],
    ["GST Amount", formatValue(calculatedValues.GSTPayble)],
    [
      "Stamp Duty + Registration",
      formatValue(calculatedValues.StampDutyPlusRegistration),
    ],
    ["Total Payable", formatValue(calculatedValues.TotalPayable)],
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: payableTableData,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 0.5,
      lineWidth: 0.2,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { cellWidth: 90, halign: "left", fontStyle: "bold" },
      1: { cellWidth: 90, halign: "center" },
    },

    margin: { left: 14, right: 14 },

    didParseCell: function (data) {
      const rawRow = data.row.raw as unknown as string[];
      const rowText = rawRow?.[0] ?? "";

      if (rowText === "Total Payable" && data.column.index === 1) {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.textColor = [244, 67, 54];
      }
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Move NOTE below the last table
  y = (doc as any).lastAutoTable.finalY + 10;

  // NOTE Title
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(244, 67, 54);
  doc.text("NOTE:", 14, y);
  y += 5;

  // NOTE Body
  const noteText =
    "The prices mentioned are limited to the day on which estimate is generated. This is purely an estimate and " +
    "final area and pricing shall be at the discretion of the Developer.";

  const splitNote = doc.splitTextToSize(noteText, 180);
  doc.text(splitNote, 14, y);
  y += splitNote.length * 5 + 5;

  // reset text color
  doc.setTextColor(0, 0, 0);

  // Align fully right using page width
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.text(
    `This PDF generated by \n ${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
    pageWidth - 30,
    285,
    { align: "center" }
  );

  doc.save(`estimator_${flat?.flatNo}_${Date.now()}.pdf`);

  await fetchEstimatCount(lead?.teamLeader?._id);

  const blob = doc.output("blob");

  const file = new File([blob], "mayurpdf.pdf", { type: "application/pdf" });
  return file;
};

export default Estimategenerator;

function getBase64ImageFromUrl(url: string): Promise<string> {
  return fetch(url)
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
}

function getFinancialYear(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const startYear = month >= 4 ? year : year - 1;
  const endYear = startYear + 1;

  const short = (y: number) => y.toString().slice(-2);

  return `${short(startYear)}-${short(endYear)}`;
}

function getEstId(
  teamLeader: Employee | undefined,
  copyCount: number = 1
): string {
  if (!teamLeader) return `NA/ESt/${getFinancialYear()}/01`;

  const firstName = (teamLeader.firstName || "").toLowerCase();

  let estId = "ESt";
  if (firstName === "deepak") estId = "DK/EST";
  else if (firstName === "jaspreet") estId = "JA/EST";
  else if (firstName === "vicky") estId = "VM/EST";
  else if (firstName === "ranjna") estId = "RG/EST";

  return `${estId}/${getFinancialYear()}/${copyCount}`;
}
