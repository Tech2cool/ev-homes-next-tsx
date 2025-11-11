"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./dailog.module.css";
import { IoLocation, IoPersonOutline } from "react-icons/io5";
import { FaLocationDot, FaStar, FaUsers, FaUserTie } from "react-icons/fa6";
import { AiFillPicture } from "react-icons/ai";
import { MdCancel, MdHomeWork, MdLocalPhone, MdNotListedLocation, MdOutlineEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import { BsBuildingFill } from "react-icons/bs";
import Select, { components } from "react-select";
import { LocateIcon } from "lucide-react";
import { IoMdTime } from "react-icons/io";
import { SiOpensourcehardware } from "react-icons/si";
import { CgNotes } from "react-icons/cg";
import { useData } from "@/providers/dataContext";


interface SiteVisitProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OptionType {
  value: string;
  label: string;
}

interface FormState {
  visitType: string;
  location: string;
  dateTime: string;
  photo?: File | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  altPhoneNumber: string;
  email: string;
  residence: string;
  project: OptionType[];
  requirement: OptionType[];
  teammember: OptionType[];
  propertyType: string;
  Source: string;
  cp: string;
  closing: string;
  feedback: string;
  prefix: string;
}

const SiteVisit: React.FC<SiteVisitProps> = ({ openclick }) => {
  const currentTheme = document.documentElement.classList.contains("light") ? "light" : "dark";

  const dialogRef = useRef<HTMLDivElement>(null);


  const {getDataEntryEmployees, dataEntryUsers}=useData();
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<FormState>({
    visitType: "",
    location: "",
    dateTime: "",
    photo: null,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    altPhoneNumber: "",
    email: "",
    residence: "",
    project: [],
    requirement: [],
    teammember: [],
    propertyType: "",
    Source: "",
    cp: "",
    closing: "",
    feedback: "",
    prefix: "",
  });




  useEffect(()=>{
// getDataEntryEmployees();
  }),[];
  // Dropdown Options
  const userOptions = [
    { value: "deepak", label: "Deepak Karki" },
    { value: "ranjna", label: "Ranjna Gupta" },
  ];

  const projectOptions = [
    { value: "p1", label: "EV 23 Malibu West" },
    { value: "p2", label: "EV 10 Marina Bay" },
  ];

  const requirementOptions = [
    { value: "2BHK", label: "2BHK" },
    { value: "3BHK", label: "3BHK" },
  ];
  const themmember = [
    { value: "snehal", label: "snehal (Sr.Manager)", status: "Present" },
    { value: "kishor", label: "kishor (Sr.Manager)", status: "Absent" },
  ];
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
  // Close dialog on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        openclick(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openclick]);

  // Handle field change
  const onChangeField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as any;
    if (files) {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle phone validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const digitsOnly = value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
  };

  const handleCancel = () => {
    setSelectedUser("");
    setFormData({
      visitType: "",
      location: "",
      dateTime: "",
      photo: null,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      altPhoneNumber: "",
      email: "",
      residence: "",
      project: [],
      requirement: [],
      propertyType: "",
      Source: "",
      cp: "",
      closing: "",
      teammember: [],
      feedback: "",
      prefix: "",
    });
    setErrors({});
    openclick(false);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!selectedUser) newErrors.selectedUser = "Please select a user.";
    if (!formData.visitType) newErrors.visitType = "Please select visit type.";
    if (!formData.location) newErrors.location = "Please select location.";
    if (!formData.dateTime) newErrors.dateTime = "Please select date & time.";
    if (!formData.firstName.trim()) newErrors.firstName = "Enter first name.";
    if (!formData.lastName.trim()) newErrors.lastName = "Enter last name.";
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 10)
      newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (formData.project.length === 0) newErrors.project = "Select at least one project.";
    if (formData.requirement.length === 0)
      newErrors.requirement = "Select at least one requirement.";
    if (!formData.propertyType)
      newErrors.propertyType = "Please select property type.";
    if (!formData.residence.trim()) newErrors.residence = "Enter residence details.";
    if (!formData.Source) newErrors.Source = "Please select Source type.";
    if (!formData.closing) newErrors.closing = "Please select Closing Manager.";
    if (formData.Source === "CP" && !formData.cp)
      newErrors.cp = "Please select Channel Partner.";
    if (!formData.prefix) newErrors.prefix = "select title";
    if (formData.teammember.length === 0) newErrors.teammember = "Please select at least one team member.";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (!validateForm()) return;

    alert(
      "✅ Form submitted successfully:\n" +
      JSON.stringify(
        {
          user: userOptions.find((u) => u.value === selectedUser)?.label,
          ...formData,
          photo: formData.photo ? formData.photo.name : "No file uploaded",
        },
        null,
        2
      )
    );
    openclick(false);
  };

  const customSelectStyles = (theme: "dark" | "light") => ({
    control: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#151414f5" : "transparent",
      borderColor: theme === "dark" ? "#444444f5" : "#927fbff5",
      minHeight: "40px",
      borderWidth: "2px",
      color: theme === "dark" ? "white" : "#201f1f",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#151414f5" : "white",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? theme === "dark"
          ? "#007bff"
          : "#cce5ff"
        : state.isFocused
          ? theme === "dark"
            ? "#e6f0ff"
            : "#f0f0f0"
          : theme === "dark"
            ? "#fff"
            : "#fff",
      color: state.isSelected
        ? theme === "dark"
          ? "white"
          : "#201f1f"
        : "black",
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#007bff" : "#cce5ff",
      color: theme === "dark" ? "white" : "#201f1f",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: theme === "dark" ? "white" : "#201f1f",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: theme === "dark" ? "white" : "#201f1f",
      ":hover": {
        backgroundColor: "red",
        color: "white",
      },
    }),
  });
  const RequiredLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <label style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {icon}
      <span>{text}</span>
      <span style={{ color: "red", fontSize: "15px", marginLeft: "-1px" }}>*</span>
    </label>
  );
  return ReactDOM.createPortal(
    <div className={styles.dialogOverlay}>
      <div ref={dialogRef} className={styles.dialogBox}>
        <h3 className={styles.dialogTitle}>📝 Site Visit Form</h3>
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
        {!selectedUser ? (
          <div className={styles.formControl}>

            <label>
              <RequiredLabel icon={<IoPersonOutline className={styles.iconcolor} />} text="Select User" />
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select User</option>
              {userOptions.map((user) => (
                <option key={user.value} value={user.value}>
                  {user.label}
                </option>
              ))}
            </select>
            {errors.selectedUser && (
              <p className={styles.errorMsg}>{errors.selectedUser}</p>
            )}
          </div>
        ) : (
          <div className={styles.selectedUserName}>
            <p>
              👤 <strong>{userOptions.find((u) => u.value === selectedUser)?.label}</strong>
            </p>
          </div>
        )}

        {selectedUser && (
          <div className={styles.dailogcnt}>
            <div className={styles.mainlable}>Visit Information</div>

            <div className={styles.formControl}>
              <label>
                <RequiredLabel icon={<FaStar className={styles.iconcolor} />} text="Visit Type" />
              </label>

              <select
                value={formData.visitType}
                name="visitType"
                onChange={onChangeField}
              >
                <option value="">Select Visit Type</option>
                <option value="site-visit">Site Visit</option>
                <option value="virtual-meeting">Virtual Meeting</option>
              </select>
              {errors.visitType && (
                <p className={styles.errorMsg}>{errors.visitType}</p>
              )}
            </div>

            <div className={styles.card}>
              <div className={styles.formControl}>

                <label>
                  <RequiredLabel icon={<FaLocationDot className={styles.iconcolor} />} text="Location" />
                </label>
                <select
                  value={formData.location}
                  name="location"
                  onChange={onChangeField}
                >
                  <option value="">Select Location</option>
                  <option value="marina-bay">EV 10 Marina Bay</option>
                  <option value="square-9">EV 9 Square</option>
                </select>
                {errors.location && (
                  <p className={styles.errorMsg}>{errors.location}</p>
                )}
              </div>

              <div className={styles.formControl}>
                <label>
                  <RequiredLabel icon={<IoMdTime className={styles.iconcolor} />} text="Date & Time" />
                </label>

                <input
                  type="datetime-local"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={onChangeField}
                />
                {errors.dateTime && (
                  <p className={styles.errorMsg}>{errors.dateTime}</p>
                )}
              </div>
            </div>

            {formData.visitType === "virtual-meeting" && (
              <div className={styles.formControl}>
                <label>
                  <AiFillPicture className={styles.iconcolor} /> Virtual Meeting Image
                </label>
                <div className={styles.uploadBox}>
                  <input
                    type="file"
                    id="fileUpload"
                    accept="image/*"
                    className={styles.fileInput}
                    onChange={onChangeField}
                  />
                  <label htmlFor="fileUpload" className={styles.uploadLabel}>
                    <div className={styles.uploadIcon}>
                      <AiFillPicture size={30} />
                    </div>
                    <p>Click to upload or drag & drop</p>
                  </label>
                </div>
              </div>
            )}

            <div className={styles.mainlable}>Client Details</div>

            <div className={styles.card}>
              <div className={styles.formControl}>
                <label>
                  <RequiredLabel icon={<IoPersonOutline className={styles.iconcolor} />} text="First Name" />
                </label>

                <div style={{ display: "flex", gap: "10px" }}>
                  <div className={styles.formControl} >
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
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <input
                      type="text"
                      value={formData.firstName}
                      name="firstName"
                      onChange={onChangeField}
                      placeholder="First Name"
                      style={{ flex: 1 }}
                    />
                    {errors.firstName && <p className={styles.errorMsg}>{errors.firstName}</p>}
                  </div>

                </div>

              </div>

              <div className={styles.formControl}>
                <label>
                  <RequiredLabel icon={<IoPersonOutline className={styles.iconcolor} />} text="Last Name" />
                </label>

                <input
                  type="text"
                  value={formData.lastName}
                  name="lastName"
                  onChange={onChangeField}
                  placeholder="Last Name"
                />
                {errors.lastName && <p className={styles.errorMsg}>{errors.lastName}</p>}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.formControl}>
                <label>
                  <RequiredLabel icon={<MdOutlinePhoneInTalk className={styles.iconcolor} />} text="Phone Number" />
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter 10-digit phone"
                  maxLength={10}
                />
                {errors.phoneNumber && <p className={styles.errorMsg}>{errors.phoneNumber}</p>}
              </div>
              <div className={styles.formControl}>
                <label>
                  <MdLocalPhone className={styles.iconcolor} /> Alternate Phone
                </label>
                <input
                  type="tel"
                  name="altPhoneNumber"
                  value={formData.altPhoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter 10-digit phone"
                  maxLength={10}
                />
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.formControl}>
                <label>
                  <RequiredLabel icon={<MdOutlineEmail className={styles.iconcolor} />} text="Email" />
                </label>

                <input
                  type="email"
                  value={formData.email}
                  name="email"
                  onChange={onChangeField}
                  placeholder="Enter email address"
                />
                {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
              </div>
              <div className={styles.formControl}>

                <label>
                  <RequiredLabel icon={<MdNotListedLocation className={styles.iconcolor} />} text="Residence" />
                </label>
                <input
                  type="text"
                  value={formData.residence}
                  name="residence"
                  onChange={onChangeField}
                />
                {errors.residence && <p className={styles.errorMsg}>{errors.residence}</p>}
              </div>

            </div>

            {/* Project Details */}
            <div className={styles.mainlable}>Project Details</div>
            <div className={styles.card}>
              <div className={styles.formControl}>
                <label>
                  <RequiredLabel icon={<BsBuildingFill className={styles.iconcolor} />} text="Projects" />
                </label>

                <Select
                  isMulti
                  options={projectOptions}
                  value={formData.project}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      project: selected as OptionType[],
                    }))
                  }
                  styles={customSelectStyles(currentTheme)}
                />
                {errors.project && <p className={styles.errorMsg}>{errors.project}</p>}
              </div>

              <div className={styles.formControl}>
                <label>
                  <RequiredLabel icon={<BsBuildingFill className={styles.iconcolor} />} text="Requirements" />
                </label>

                <Select
                  isMulti
                  options={requirementOptions}
                  value={formData.requirement}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      requirement: selected as OptionType[],
                    }))
                  }
                  styles={customSelectStyles(currentTheme)}
                />
                {errors.requirement && <p className={styles.errorMsg}>{errors.requirement}</p>}
              </div>
            </div>

            <div className={styles.formControl}>
              <label>
                <RequiredLabel icon={<MdHomeWork className={styles.iconcolor} />} text="Property Type" />
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
            <div className={styles.mainlable}>Managment Information</div>
            <div className={styles.card}>
              <div className={styles.formControl}>

                <label>
                  <RequiredLabel icon={<SiOpensourcehardware className={styles.iconcolor} />} text="Source" />
                </label>
                <select
                  value={formData.Source}
                  name="Source"
                  onChange={onChangeField}
                >
                  <option value="">Select Source Type</option>
                  <option value="Walk">Walk-in</option>
                  <option value="CP">CP</option>
                  <option value="internal">Internal-Lead</option>
                </select>
                {errors.Source && <p className={styles.errorMsg}>{errors.Source}</p>}
              </div>
              <div className={styles.formControl}>
                <label>

                  <RequiredLabel icon={<FaUserTie className={styles.iconcolor} />} text=" Closing Manager" />
                </label>
                <select
                  value={formData.closing}
                  name="closing"
                  onChange={onChangeField}
                >
                  <option value="">Select Closing Manager</option>
                  <option value="mahesh">Deepak (closing Manager)</option>
                  <option value="rahul">Jusprit Arora (closing Manager)</option>
                  <option value="raj">Ranjana (closing Manager)</option>
                </select>
                {errors.closing && <p className={styles.errorMsg}>{errors.closing}</p>}
              </div>


            </div>

            {formData.Source === "CP" && (
              <div className={styles.formControl}>
                <label>
                  <RequiredLabel icon={<FaUserTie className={styles.iconcolor} />} text="Channel Pertner" />
                </label>
                <select
                  value={formData.cp}
                  name="cp"
                  onChange={onChangeField}
                >
                  <option value="">Select cp </option>
                  <option value="mahesh">mahesh (mahesh farm)</option>
                  <option value="rahul">rahul (rahul farm)</option>
                  <option value="raj">raj (raj farm)</option>
                </select>
                {errors.cp && <p className={styles.errorMsg}>{errors.cp}</p>}
              </div>
            )}

            <div className={styles.formControl}>
              <label>
                <RequiredLabel icon={<CgNotes className={styles.iconcolor} />} text="Team member" />
              </label>
              <Select
                isMulti
                options={themmember}
                value={formData.teammember}
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    teammember: selected as OptionType[],
                  }))
                }
                styles={customSelectStyles(currentTheme)}
                components={{ Option: CustomOption }}
              />
              {errors.teammember && <p className={styles.errorMsg}>{errors.teammember}</p>}
            </div>
            <div className={styles.formControl}>
              <label>
                <IoLocation className={styles.iconcolor} /> Feedback
              </label>
              <textarea
                rows={2}
                placeholder="Feedback for EV Homes"
                name="feedback"

                value={formData.feedback}
                onChange={onChangeField}
              />

            </div>


            <div className={styles.dialogButtons}>
              <button className={styles.cancelBtn} onClick={handleCancel}>
                Cancel
              </button>
              <button className={styles.submitBtn} onClick={onSubmit}>
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default SiteVisit;
