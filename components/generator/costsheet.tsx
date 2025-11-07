"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import styles from "@/components/dashboard-components/data-analyzer-dashboard/taggingform.module.css";
import cardstyles from "@/components/lead-details-components/Dailog/dailog.module.css"
import { FaBuilding, FaCalendarAlt, FaStar } from "react-icons/fa";
import Switch from "@mui/material/Switch";

import { IoPersonOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import { FaArrowUpFromGroundWater } from "react-icons/fa6";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { BiRupee } from "react-icons/bi";

interface FormState {
  projecttype: string;
  propertyType: string;
  blug: string;
  floor: string;
  unit: string;
  prefix: string;
  firstName: string;
  reference: string;
  stampper: string;
  aInclusiveamount: string;
  houseno: string;
  area: string;
  landmark: string;
  pincode: string;
  town: string;
  letterdate?: string;

}


const CostSheet = () => {

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const [formData, setFormData] = useState<FormState>({
    projecttype: "",
    propertyType: "",
    blug: "",
    floor: "",
    unit: "",
    prefix: "",
    firstName: "",
    reference: "",
    stampper: "",
    aInclusiveamount: "",
    houseno: "",
    area: "",
    landmark: "",
    pincode: "",
    town: "",
    letterdate: "",

  });

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.projecttype) newErrors.projecttype = "Please select Project.";
    if (!formData.propertyType) newErrors.propertyType = "Please select property type.";
    if (!formData.blug) newErrors.blug = "Blug selection is required";
    if (!formData.floor) newErrors.floor = "Floor selection is required";
    if (!formData.unit) newErrors.unit = "Unit selection is required";
    if (!formData.prefix) newErrors.prefix = "select title";
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Please enter First Name";
    }
    if (!formData.stampper) {
      newErrors.stampper = "Enter Stamp Duty Percentage";
    }
    if (!formData.reference) newErrors.reference = "Please enter Reference number"
    if (!formData.aInclusiveamount) {
      newErrors.aInclusiveamount = "Enter All Inclusive Amount";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const onSubmit = () => {

    if (!validateForm()) return;
    alert("Form submitted successfully: \n" + JSON.stringify(formData, null, 2));

  };


  const handleCancel = () => {
    setFormData({
      projecttype: "",
      propertyType: "",
      blug: "",
      floor: "",
      unit: "",
      prefix: "",
      firstName: "",
      reference: "",
      stampper: "",
      aInclusiveamount: "",
      houseno: "",
      area: "",
      landmark: "",
      pincode: "",
      town: "",
      letterdate: "",

    });

  };
  useEffect(() => {
    if (typeof document !== "undefined") {
      const theme = document.documentElement.classList.contains("light") ? "light" : "dark";
      setCurrentTheme(theme);

      const observer = new MutationObserver(() => {
        const updatedTheme = document.documentElement.classList.contains("light") ? "light" : "dark";
        setCurrentTheme(updatedTheme);
      });

      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      return () => observer.disconnect();
    }
  }, []);
  const customSelectStyles = useMemo(() => ({
    control: (base: any) => ({
      ...base,
      backgroundColor: currentTheme === "dark" ? "#151414f5" : "transparent",
      borderColor: currentTheme === "dark" ? "#444444f5" : "#927fbff5",
      minHeight: "40px",
      borderWidth: "2px",
      color: currentTheme === "dark" ? "white" : "#201f1f",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: currentTheme === "dark" ? "#151414f5" : "white",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? currentTheme === "dark"
          ? "#007bff"
          : "#cce5ff"
        : state.isFocused
          ? currentTheme === "dark"
            ? "#e6f0ff"
            : "#f0f0f0"
          : currentTheme === "dark"
            ? "#fff"
            : "#fff",
      color: state.isSelected
        ? currentTheme === "dark"
          ? "white"
          : "#201f1f"
        : "black",
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: currentTheme === "dark" ? "#007bff" : "#cce5ff",
      color: currentTheme === "dark" ? "white" : "#201f1f",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: currentTheme === "dark" ? "white" : "#201f1f",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: currentTheme === "dark" ? "white" : "#201f1f",
      ":hover": {
        backgroundColor: "red",
        color: "white",
      },
    }),
  }), [currentTheme]);
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
        <div className={styles.headline}>Cost Sheet Generator</div>
        <div className={styles.mainlable}>Project Details</div>
        <div className={styles.infocard}>

          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel icon={<FaBuilding className={styles.iconcolor} />} text=" Select Project" />
              </label>
              <select
                value={formData.projecttype}
                name="projecttype"
                onChange={onChangeField}
              >     <option value="">Select Project Type</option>
                <option value="marina">10 Marina Bay</option>
                <option value="malibu">23 malibu west</option>
                <option value="square">9 Square</option>
              </select>
              {errors.projecttype && <p className={styles.errorMsg}>{errors.projecttype}</p>}

            </div>
          </div>
        </div>


        <div className={styles.cpheadline}>Property Details</div>
        <div className={styles.infocard}>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel icon={<FaStar className={styles.iconcolor} />} text="Property Type" />

              </label>
              <select
                value={formData.propertyType}
                name="propertyType"
                onChange={onChangeField}
              >
                <option value="">Select Property Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
              {errors.propertyType && <p className={styles.errorMsg}>{errors.propertyType}</p>}

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
            <div className={styles.formControl} >
              <label>
                <RequiredLabel icon={<LuBuilding2 className={styles.iconcolor} />} text="Frefix" />
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
              {errors.prefix && <p className={styles.errorMsg}>{errors.prefix}</p>}
            </div>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel icon={<IoPersonOutline className={styles.iconcolor} />} text="Client First Name" />
              </label>
              <input
                type="text"
                value={formData.firstName}
                name="firstName"
                placeholder="first name...."
                onChange={onChangeField}
              />
              {errors.firstName && <p className={styles.errorMsg}>{errors.firstName}</p>}
            </div>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel icon={<IoPersonOutline className={styles.iconcolor} />} text="Reference No" />
              </label>
              <input
                type="text"
                value={formData.reference}
                name="reference"
                placeholder="Reference no...."
                onChange={onChangeField}
              />
              {errors.reference && <p className={styles.errorMsg}>{errors.reference}</p>}
            </div>

          </div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel icon={<FaStar className={styles.iconcolor} />} text="Stamp Duty Percentage" />

              </label>
              <select
                value={formData.stampper}
                name="stampper"
                onChange={onChangeField}
              >
                <option value="">select Percentage</option>
                <option value="5">5%</option>
                <option value="6">6</option>
              </select>
              {errors.stampper && <p className={styles.errorMsg}>{errors.stampper}</p>}

            </div>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel icon={<BiRupee className={styles.iconcolor} />} text="All Inclusive Amount" />
              </label>
              <input
                type="number"
                value={formData.aInclusiveamount}
                name="aInclusiveamount"
                placeholder="Enter all inclusive amount...."
                onChange={onChangeField}
              />
              {errors.aInclusiveamount && <p className={styles.errorMsg}>{errors.aInclusiveamount}</p>}
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <p>GST Percentage : <span style={{ color: "#532ae8ff" }}>5%</span></p>
            </div>
          </div>

        </div>
        <div className={styles.cpheadline}>Address Details</div>
        <div className={styles.infocard}>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <BiRupee className={styles.iconcolor} /> House Number
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
                <BiRupee className={styles.iconcolor} /> Area
              </label>
              <input
                type="number"
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
                <BiRupee className={styles.iconcolor} />Landmark
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
                <BiRupee className={styles.iconcolor} /> pincode
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
                <BiRupee className={styles.iconcolor} /> Town/City
              </label>
              <input
                type="number"
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
                <FaCalendarAlt className={styles.iconcolor} />Letter Date
              </label>
              <input
                type="date"
                name="letterdate"
                value={(formData as any).letterdate || ""}
                onChange={onChangeField}
              />
            </div>
            <div></div>
          </div>
          <div className={cardstyles.infoSection}>
            <div className={cardstyles.infoCard}>
              <h4 className={cardstyles.cardTitle}>Client Details</h4>
              <div className={cardstyles.infoRow}>
                <span className={cardstyles.infoLabel}>Client Name:</span>
                <span className={cardstyles.infoValue}>Rahul Sharma</span>
              </div>
              <div className={cardstyles.infoRow}>
                <span className={cardstyles.infoLabel}>Phone Number:</span>
                <span className={cardstyles.infoValue}>+91 9876543210</span>
              </div>
              <div className={cardstyles.infoRow}>
                <span className={cardstyles.infoLabel}>Channel Partner:</span>
                <span className={cardstyles.infoValue}>Elite Realty</span>
              </div>
              <div className={cardstyles.infoRow}>
                <span className={cardstyles.infoLabel}>Site Visit Date:</span>
                <span className={cardstyles.infoValue}>12 Oct 2025</span>
              </div>

            </div>

            <div className={cardstyles.infoCard}>
              <h4 className={cardstyles.cardTitle}>Team Leader Details</h4>
              <div className={cardstyles.infoRow}>
                <span className={cardstyles.infoLabel}>Name:</span>
                <span className={cardstyles.infoValue}>Snehal Mehta</span>
              </div>
              <div className={cardstyles.infoRow}>
                <span className={cardstyles.infoLabel}>Gmail:</span>
                <span className={cardstyles.infoValue}>snehal@evgroup.co.in</span>
              </div>

            </div>
          </div>
        </div>




        <div className={styles.buttoncontainer}>
          <button className={styles.cancelbtn} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.submitbtn} onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>


    </div>
  );
};

export default CostSheet;
