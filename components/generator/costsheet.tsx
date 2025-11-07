"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import styles from "@/components/dashboard-components/data-analyzer-dashboard/taggingform.module.css";
import cardstyles from "@/components/lead-details-components/Dailog/bookingdailog.module.css"

import { FaBuilding, FaCalendarAlt, FaStar } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import { FaArrowUpFromGroundWater } from "react-icons/fa6";
import { TbHexagonNumber1Filled } from "react-icons/tb";
import { AiFillPicture } from "react-icons/ai";

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
  letterdate: string;
  bookingForm: File | null;
}

const CostSheet = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
    bookingForm: null,
  });

  const onChangeField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, bookingForm: file }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.projecttype) newErrors.projecttype = "Please select Project.";
    if (!formData.propertyType) newErrors.propertyType = "Please select property type.";
    if (!formData.blug) newErrors.blug = "Blug selection is required";
    if (!formData.floor) newErrors.floor = "Floor selection is required";
    if (!formData.unit) newErrors.unit = "Unit selection is required";
    if (!formData.prefix) newErrors.prefix = "Select title";
    if (!formData.firstName.trim()) newErrors.firstName = "Please enter First Name";
    if (!formData.stampper) newErrors.stampper = "Enter Stamp Duty Percentage";
    if (!formData.reference) newErrors.reference = "Please enter Reference number";
    if (!formData.aInclusiveamount) newErrors.aInclusiveamount = "Enter All Inclusive Amount";
    if (!formData.letterdate) newErrors.letterdate = "Please select Letter Date";
    if (!formData.bookingForm) newErrors.bookingForm = "Please upload booking form";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (!validateForm()) return;
    alert("Form submitted successfully:\n" + JSON.stringify(formData, null, 2));
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
      bookingForm: null,
    });
    setErrors({});
  };

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
          <div className={styles.card} >
            <div className={styles.formControl}>
              <label>
                <RequiredLabel icon={<FaCalendarAlt className={styles.iconcolor} />} text="Letter Date" />
              </label>
              <input
                type="date"
                name="letterdate"
                value={formData.letterdate}
                onChange={onChangeField}
                className={styles.inputField}
              />
              {errors.letterdate && <p className={styles.errorMsg}>{errors.letterdate}</p>}
            </div>

            <div className={styles.formControl}>
              <label>
                <RequiredLabel icon={<AiFillPicture className={styles.iconcolor} />} text="Upload Booking Form" />
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className={styles.inputField}
              />
              {formData.bookingForm && (
                <p style={{ marginTop: "5px", fontSize: "14px", color: "#555" }}>
                  Uploaded: {formData.bookingForm.name}
                </p>
              )}
              {errors.bookingForm && <p className={styles.errorMsg}>{errors.bookingForm}</p>}
            </div>
          </div>
        </div>
        <div className={styles.cpheadline}>Cost Sheet</div>
        <div className={styles.infocard}>
          <div className={cardstyles.infoCard}>
            <h4 className={cardstyles.cardTitle}>💰 Cost Sheet Summary</h4>
            <p className={cardstyles.cardSubtitle}>
              Details of payments made toward the cost sheet including agreement, GST, and stamp duty.
            </p>

            <div className={cardstyles.infoRow}>
              <span className={cardstyles.infoLabel}>Agreement Value</span>
              <span className={cardstyles.infoValue}>₹ 80,00,000</span>

            </div>
            <div className={cardstyles.infoRow}>
              <span className={cardstyles.infoLabel}>Registration Amount</span>
              <span className={cardstyles.infoValue}>₹ 5,00,000</span>
            </div>
            <div className={cardstyles.infoRow}>
              <span className={cardstyles.infoLabel}>Gst Amount</span>
              <span className={cardstyles.infoValue}>₹ 30,000</span>
            </div>
            <div className={cardstyles.infoRow}>
              <span className={cardstyles.infoLabel}>Stamp Duty Amount</span>
              <span className={cardstyles.infoValue}>₹ 1,45,236</span>
            </div>
            <div className={cardstyles.infoRow}>
              <span className={cardstyles.infoLabel}>Stamp Duty Rounded</span>
              <span className={cardstyles.infoValue}>₹ 1,45,236</span>
            </div>
          </div>
        </div>

        <div className={styles.buttoncontainer} style={{marginTop:"30px"}}>
          <button className={styles.cancelbtn} onClick={handleCancel}>
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
