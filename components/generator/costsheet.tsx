"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import styles from "@/components/dashboard-components/data-analyzer-dashboard/taggingform.module.css";
import { FaBuilding, FaStar } from "react-icons/fa";
import Switch from "@mui/material/Switch";

import { IoPersonOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import { FaArrowUpFromGroundWater } from "react-icons/fa6";
import { TbHexagonNumber1Filled } from "react-icons/tb";

interface FormState {
  projecttype: string;
  propertyType: string;
  blug: string;
  floor: string;
  unit: string;

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
      <div className={styles.maincontainer}>
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
