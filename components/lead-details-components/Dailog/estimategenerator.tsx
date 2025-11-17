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
// import pdfMake from "pdfmake/build/pdfmake";
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

interface EstimategeneratorProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
  lead?: Lead | null;
}

// Types
interface OptionType {
  value: string | number;
  label: string | number;
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

interface Project {
  _id: string;
  name: string;
  logo?: string;
  flatList?: Array<{
    id?: string;
    flatNo: string;
    floor: number;
    number: number;
    buildingNo?: number;
    carpetArea?: string;
    configuration?: string;
    allInclusiveValue?: string;
    ssArea?: string;
    balconyArea?: string;
    reraArea?: string;
  }>;
}

interface Coupon {
  _id: string;
  codeName: string;
  codeValue: number;
  disPercentage: number;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

interface TeamLeader {
  _id: string;
  firstName: string;
  lastName: string;
}

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

const currentTheme = document.documentElement.classList.contains("light")
  ? "light"
  : "dark";

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
    fontSize: "14px", // ✅ smaller font
    boxShadow: state.isFocused ? "0 0 0 1px #007bff" : "none",
    "&:hover": {
      borderColor: "#007bff",
    },
  }),
  menu: (base: any) => ({
    ...base,
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

const Estimategenerator: React.FC<EstimategeneratorProps> = ({
  lead,
  openclick,
}) => {
  const {
    projects,
    getProjects,
    slabsbyproject,
    getSlabByProject,
    // getLeadByPhoneNumber,
    // addBrokerage,
  } = useData();
  const router = useRouter();
  const [gstPercentage] = useState<number>(5);

  const [customerName, setCustomerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<OurProject | null>(
    lead?.bookingRef?.project || null
  );
  const [selectedslabsbyproject, setSelectedSlabByProject] =
    useState<Slab | null>(null);
  const [selectedBuildingNo, setSelectedBuildingNo] = useState<number | null>(
    lead?.bookingRef?.buildingNo || null
  );
  const [selectedSlab, setSelectedSlab] = useState<Slab | null>();
  const [selectedNumber, setSelectedNumber] = useState<Flat | null>(null);
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null);
  const [selectedStampDuty, setSelectedStampDuty] = useState(6);

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

  const stampDutyOptions = [
    { value: 5, label: "5%" },
    { value: 6, label: "6%" },
  ];

  const { user } = useUser() as { user: User };

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

  useEffect(() => {
    console.log("Selected Project:", selectedProject);
    console.log("Selected Building:", selectedBuildingNo);
    console.log("Selected Floor:", selectedFloor);
    console.log("Selected Flat:", selectedFlat);
    console.log("Buildings available:", buildings);
    console.log("Floors available:", floors);
    console.log("Flats available:", flats);
  }, [
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
            value: String(valueKey), // Ensure value is string for consistent comparison
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
    const selectedOption = React.useMemo(() => {
      const stringValue = String(value);
      return formattedOptions.find((opt) => opt.value === stringValue) || null;
    }, [formattedOptions, value]);

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
            key={value} // Add key to force re-render when value changes
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
    allInclusiveValue: flatDetails.allInclusiveValue,
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
    let allInc = parseFloat(flatDetails.allInclusiveValue) || 0;

    console.log(allInc);
    if (!allInc || !selectedSlab) return;

    console.log(selectedSlab.percent);
    let stamp = selectedStampDuty || 6;
    let st = stamp;
    console.log(stamp);
    let agreementValue = (allInc - 30000) / ((st + gstPercentage) / 100 + 1);

    let gstAmount = agreementValue * (gstPercentage / 100);

    let stampDutyAmount = agreementValue * (st / 100);

    let couponDiscount = 0;
    let totalPaybleDiscount = 0;

    if (selectedCoupon) {
      console.log("okay ");

      const discountAmount = selectedCoupon.codeValue ?? 0;
      const discountPercentage = selectedCoupon.disPercentage ?? 0;

      console.log(`discountPercentage ${discountPercentage}`);
      console.log(selectedCoupon.disPercentage);

      if (discountAmount > 0) {
        couponDiscount = discountAmount;
      } else if (discountPercentage > 0) {
        couponDiscount = agreementValue * (discountPercentage / 100);
      }

      const discountedAgreementValue = agreementValue - couponDiscount;
      const discountedGst = discountedAgreementValue * (gstPercentage / 100);
      const discountedStampDuty = discountedAgreementValue * (st / 100);
      totalPaybleDiscount =
        discountedAgreementValue + discountedGst + discountedStampDuty;
      setCalculatedValues((v) => ({
        ...v,
        discountedAgreementValue,
        discountedGst,
        discountedStampDuty,
        totalPaybleDiscount,
      }));
      agreementValue = discountedAgreementValue;
      gstAmount = discountedGst;
      stampDutyAmount = discountedStampDuty;
    }

    let totalSlabPercentage = 0;
    for (const slab of slabOptions) {
      if (slab.index! < selectedSlab.index!) {
        console.log(slab.percent);
        totalSlabPercentage += slab.percent ?? 0;
      }
    }
    console.log(totalSlabPercentage);
    totalSlabPercentage += selectedSlab.percent ?? 0;

    const bookingAmount = agreementValue * (totalSlabPercentage / 100);
    const gstOnBooking = bookingAmount * (gstPercentage / 100);
    const stampDutyPlusRegistration = agreementValue * (st / 100) + 30000;
    const totalPayable =
      bookingAmount + gstOnBooking + stampDutyPlusRegistration;

    setCalculatedValues((v) => ({
      ...v,
      allInclusiveValue: allInc,
      AgreementValue: agreementValue,
      GstAmount: gstAmount,
      StampDutyAmount: stampDutyAmount,
      RegistrationAmount: 30000,
      BookingAmount: bookingAmount,
      StampDutyPlusRegistration: stampDutyPlusRegistration,
      GSTPayble: gstOnBooking,
      TotalPayable: totalPayable,
      TotalPreviousPercentage: totalSlabPercentage,
      CouponDiscount: couponDiscount,
    }));
  }, [selectedSlab, selectedStampDuty, slabOptions, selectedCoupon]);

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
                    value={`${lead?.firstName ?? ""} ${
                      lead?.lastName ?? ""
                    }`.trim()}
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
                    value={lead?.phoneNumber ?? "NA"}
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
                    value={lead?.address ?? "NA"}
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
                options={flatsForSelection.map((flat: any) => ({
                  value: flat._id ?? flat.id ?? flat.number?.toString(),
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
                    value={selectedFlat?.carpetArea?.toString()}
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
                     value={selectedFlat?.configuration?.toString()}
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
                value={selectedFlat?.allInclusiveValue?.toString()}
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
                onChange={(ele: OptionType | null) => {
                  setSelectedStampDuty;
                }}
                placeholder="Select Stamp Duty"
              />
            </div>

            <div className={`${styles.section} ${styles.sectionStacked}`}>
              <div className={styles.innerSection}>
                <div className={styles.sectionHeader}>Estimated Values</div>
                <div className={styles.estimatedDetails}>
                  <div className={styles.estimatedRow}>
                    <span>Agreement Value</span>
                    <span>{calculatedValues.AgreementValue.toFixed(2)}</span>
                  </div>
                  <div className={styles.estimatedRow}>
                    <span>GST Amount</span>
                    <span>{calculatedValues.GstAmount.toFixed(2)}</span>
                  </div>
                  <div className={styles.estimatedRow}>
                    <span>Stamp Duty Amount</span>
                    <span>{calculatedValues.StampDutyAmount.toFixed(2)}</span>
                  </div>
                  <div className={styles.estimatedRow}>
                    <span>Registration Amount</span>
                    <span>
                      {calculatedValues.RegistrationAmount.toFixed(2)}
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
                    <span>{calculatedValues?.BookingAmount.toFixed(2)}</span>
                  </div>
                  <div className={styles.estimatedRow}>
                    <span>GST Amount</span>
                    <span>{calculatedValues?.GSTPayble.toFixed(2)}</span>
                  </div>
                  <div className={styles.estimatedRow}>
                    <span>Stamp Duty Amount</span>
                    <span>
                      {calculatedValues?.StampDutyPlusRegistration.toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.estimatedRow}>
                    <span>Total Payable</span>
                    <span>{calculatedValues?.TotalPayable.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={async () => {
              //   const ourProjects = projects.find(
              //     (ele) => ele?._id == selectedProjects?.value
              //   );
              //   const flat = ourProjects?.flatList?.find(
              //     (ele) =>
              //       ele?.floor == selectedFloor?.value &&
              //       ele?.buildingNo == selectedBuilding?.value &&
              //       ele?.number == selectedNumber?.value
              //   );
              //   const slab = slabOptions.find(
              //     (ele) => ele.value == selectedSlab?.value
              //   );
              //   console.log(slab);
              //   let currentCount = 0;
              //   if (currentLead?.teamLeader?._id && fetchEstimatCount) {
              //     const countResult = await fetchEstimatCount(
              //       currentLead.teamLeader?._id
              //     );
              //     currentCount = countResult?.data?.count ?? 0;
              //   }
              //   const estId = getEstId(
              //     currentLead?.teamLeader,
              //     (currentCount ?? 0) + 1
              //   );
              //   const estimateData = {
              //     estID: estId,
              //     lead: currentLead?._id,
              //     teamLeader: currentLead?.teamLeader?._id,
              //     project: ourProjects?._id,
              //     slab: slab?.value,
              //     flatNo: flat?.flatNo,
              //     floor: flat?.floor,
              //     number: flat?.number,
              //     carpetArea: flat?.carpetArea,
              //     buildingNo: flat?.buildingNo,
              //     ssArea: flat?.ssArea,
              //     balconyArea: flat?.balconyArea,
              //     reraArea: flat?.reraArea,
              //     configuration: flat?.configuration,
              //     couponId: selectedCoupon?.value ?? null,
              //     allInclusiveValue: calculatedValues?.allInclusiveValue,
              //     agreementValue: calculatedValues?.AgreementValue,
              //     gstAmount: calculatedValues?.GstAmount,
              //     stampDutyAmount: calculatedValues?.StampDutyAmount,
              //     totalPayableValue: calculatedValues?.TotalPayable,
              //     payableBookingValue: calculatedValues?.BookingAmount,
              //     generatedBy: user?._id,
              //   };
              //   const result = await addEstimate(estimateData);
              //   if (result.success) {
              //     generatePdf(
              //       currentLead,
              //       ourProjects as Project,
              //       flat,
              //       selectedCoupon,
              //       calculatedValues,
              //       slab as OptionType,
              //       user,
              //       currentEstCount,
              //       fetchEstimatCount
              //     );
              //   }
            }}
            className={styles.pdfbutton}
          >
            <Download className={styles.pdficon} />
            <p> Generate PDF</p>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const generatePdf = async (
  lead: Lead,
  project: Project,
  flat: any,
  selectedCoupon: OptionType | null,
  calculatedValues: CalculatedValues,
  slab: OptionType,
  user: User,
  currentEstCount: { count: number },
  fetchEstimatCount: (
    teamLeaderId: string
  ) => Promise<{ success: boolean; data?: { count: number } }>
) => {
  const logo1 = await getBase64ImageFromUrl(
    "https://cdn.evhomes.tech/6c43b153-2ddf-474c-803d-c6fef9ac319a-estimator.png"
  );
  const logo2 = await getBase64ImageFromUrl(project?.logo || logo1);

  const formatValue = (val: number | string | undefined): string => {
    if (val === undefined || val === null) return "0.00";
    const num = Number(val);
    return num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const copyCount = (currentEstCount?.count ?? 0) + 1;
  const estId = getEstId(lead?.teamLeader, copyCount);

  // Encode like Flutter's Uri.encodeComponent
  const encodedEstId = encodeURIComponent(estId);

  const qrPayload = {
    scheme: "evhomes",
    host: "open",
    path: `/estimate-details/${encodedEstId}`,
    url: `https://evhomes.tech/estimate-details/${encodedEstId}`,
  };

  //   const qrDataUrl = await getBase64ImageFromUrl(
  //     await QRCode.toDataURL(JSON.stringify(qrPayload))
  //   );

  const docDefinition = {
    pageSize: "A4" as const,
    pageMargins: [30, 15, 30, 15],
    content: [
      {
        columns: [
          { image: logo1, width: 70, height: 30 },
          { text: "", width: "*" },
          { image: logo2, width: 50, height: 50 },
        ],
      },
      {
        text: "This is an Estimate",
        alignment: "center" as const,
        bold: true,
        fontSize: 12,
        margin: [0, 10, 0, 2],
      },
      {
        text: `Date: ${dateFormatWithTime(new Date().toISOString())}`,
        alignment: "center" as const,
        fontSize: 10,
      },
      {
        columns: [
          {
            stack: [
              { text: `EST ID: ${estId}`, bold: true, fontSize: 10 },
              {
                text: "From:\nEv Homes Constructions Pvt.LTD",
                bold: true,
                fontSize: 10,
              },
            ],
          },
          { image: null, width: 60 },
        ],
        margin: [0, 15, 0, 15],
      },
      {
        columns: [
          {
            width: "70%",
            stack: [
              { text: "Client Information", bold: true, fontSize: 12 },
              {
                text: `Client Name: ${lead?.firstName ?? ""} ${
                  lead?.lastName ?? ""
                }`,
                fontSize: 10,
              },
              { text: `Mobile No: ${lead?.phoneNumber ?? ""}`, fontSize: 10 },
              { text: `Address: ${lead?.address ?? ""}`, fontSize: 10 },
              {
                text: `Team: ${lead?.teamLeader?.firstName ?? ""} ${
                  lead?.teamLeader?.lastName ?? ""
                }`,
                fontSize: 10,
              },
              {
                text: `Attended By: ${user?.firstName ?? ""} ${
                  user?.lastName ?? ""
                }`,
                fontSize: 10,
              },
            ],
          },
          {
            width: "30%",
            stack: [
              { text: "Unit Details", bold: true, fontSize: 12 },
              { text: `Project: ${project?.name ?? ""}`, fontSize: 10 },
              {
                text: `Floor: ${flat?.floor ?? ""}  Unit No: ${
                  flat?.number ?? ""
                }`,
                fontSize: 10,
              },
              { text: `Flat No: ${flat?.flatNo ?? ""}`, fontSize: 10 },
              {
                text: `Configuration: ${flat?.configuration ?? ""}`,
                fontSize: 10,
              },
              {
                text: `Carpet Area: ${flat?.carpetArea ?? ""} sq.ft`,
                fontSize: 10,
              },
            ],
          },
        ],
      },
      {
        text: "Breakup Price:-",
        bold: true,
        fontSize: 12,
        margin: [0, 15, 0, 5],
      },
      {
        table: {
          widths: ["*", "*"],
          body: [
            [
              "Agreement Value",
              {
                alignment: "center" as const,
                text: formatValue(calculatedValues?.AgreementValue.toFixed(2)),
              },
            ],
            [
              "GST Amount (5%)",
              {
                alignment: "center" as const,
                text: formatValue(calculatedValues?.GstAmount.toFixed(2)),
              },
            ],
            [
              "Stamp Duty Amount",
              {
                alignment: "center" as const,
                text: formatValue(calculatedValues?.StampDutyAmount.toFixed(2)),
              },
            ],
            [
              "Registration",
              {
                alignment: "center" as const,
                text: formatValue(
                  calculatedValues?.RegistrationAmount.toFixed(2)
                ),
              },
            ],
            [
              "All Inclusive Value",
              {
                alignment: "center" as const,
                text: calculatedValues?.allInclusiveValue,
                color: "red",
              },
            ],
          ],
        },
        fontSize: 10,
      },
      {
        text: "",
        margin: [0, 15, 0, 5],
      },
      {
        table: {
          widths: ["*", "*"],
          body: [
            [
              "Maintenance Sinking Fund Value",
              { alignment: "center" as const, text: "1,00,000" },
            ],
            ["Legal Charges", { alignment: "center" as const, text: "45,000" }],
          ],
        },
        fontSize: 10,
      },
      ...(selectedCoupon
        ? [
            {
              text: "Special Discount Price:-",
              bold: true,
              fontSize: 12,
              margin: [0, 15, 0, 5],
            },
            {
              table: {
                widths: ["*", "*"],
                body: [
                  [
                    "Agreement Value",
                    {
                      alignment: "center" as const,
                      text: formatValue(calculatedValues?.AgreementValue),
                    },
                  ],
                  [
                    "GST Amount",
                    {
                      alignment: "center" as const,
                      text: formatValue(calculatedValues?.GstAmount),
                    },
                  ],
                  [
                    "Stamp Duty Amount",
                    {
                      alignment: "center" as const,
                      text: formatValue(calculatedValues?.StampDutyAmount),
                    },
                  ],
                  [
                    "Registration",
                    {
                      alignment: "center" as const,
                      text: formatValue(calculatedValues?.RegistrationAmount),
                    },
                  ],
                  [
                    "Coupon Discount",
                    {
                      alignment: "center" as const,
                      text: formatValue(calculatedValues?.CouponDiscount),
                    },
                  ],
                  [
                    "Total Payable After Discount",
                    {
                      alignment: "center" as const,
                      text: formatValue(calculatedValues?.TotalPayable),
                      color: "red",
                    },
                  ],
                ],
              },
              fontSize: 10,
            },
          ]
        : []),
      {
        text: `Payable Amount as per Slab ${slab?.label} `,
        bold: true,
        fontSize: 12,
        margin: [0, 15, 0, 5],
      },
      {
        table: {
          widths: ["*", "*"],
          body: [
            [
              "Booking Amount",
              {
                alignment: "center" as const,
                text: formatValue(calculatedValues?.BookingAmount),
              },
            ],
            [
              "GST Amount",
              {
                alignment: "center" as const,
                text: formatValue(calculatedValues?.GSTPayble),
              },
            ],
            [
              "Stamp Duty + Registration",
              {
                alignment: "center" as const,
                text: formatValue(calculatedValues?.StampDutyPlusRegistration),
              },
            ],
            [
              "Total Payable",
              {
                alignment: "center" as const,
                text: formatValue(calculatedValues?.TotalPayable),
                color: "red",
              },
            ],
          ],
        },
        fontSize: 10,
      },
      {
        text: "NOTE:",
        bold: true,
        color: "red",
        fontSize: 10,
        margin: [0, 10, 0, 2],
      },
      {
        text: "The Prices mentioned are limited to the day on which Estimate is Generated. This is purely an estimate and final area and pricing shall be at the discretion of the developer.",
        fontSize: 9,
        color: "red",
      },
      {
        text: `${user?.firstName ?? ""} ${
          user?.lastName ?? ""
        }\n This PDF Generated by `,
        alignment: "right" as const,
        fontSize: 9,
        margin: [0, 20, 0, 0],
      },
    ],
  };

  //   pdfMake
  //     .createPdf(docDefinition as any)
  //     .download(`estimator_${flat?.flatNo}_${Date.now()}.pdf`);
  // await fetchEstimatCount(lead?.teamLeader?._id);
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
  return month >= 4 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
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
