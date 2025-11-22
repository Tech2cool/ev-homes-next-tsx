"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./dailog.module.css";
import { IoLocation, IoPersonOutline } from "react-icons/io5";
import { FaLocationDot, FaStar, FaUsers, FaUserTie } from "react-icons/fa6";
import { AiFillPicture } from "react-icons/ai";
import {
  MdCancel,
  MdHomeWork,
  MdLocalPhone,
  MdNotListedLocation,
  MdOutlineEmail,
  MdOutlinePhoneInTalk,
} from "react-icons/md";
import { BsBuildingFill } from "react-icons/bs";
import Select, { components } from "react-select";
import { LocateIcon } from "lucide-react";
import { IoMdTime } from "react-icons/io";
import { SiOpensourcehardware } from "react-icons/si";
import { CgNotes } from "react-icons/cg";
import { useData } from "@/providers/dataContext";
import { FcApproval } from "react-icons/fc";

interface SiteVisitProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
  visit?: Lead | null;
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

const SiteVisit: React.FC<SiteVisitProps> = ({ openclick, visit }) => {
  const currentTheme = document.documentElement.classList.contains("light")
    ? "light"
    : "dark";

  const dialogRef = useRef<HTMLDivElement>(null);

  const {
    getDataEntryEmployees,
    dataEntryUsers,
    getProjects,
    projects,
    getRequirements,
    requirements,
    getClosingManagers,
    closingManagers,
    getChannelPartners,
    channelPartners,
    fetchReportingToEmployees,
    reportingToEmps,
    sendOtpSiteVisit,
    addSiteVisitV2,
    uploadFile,
  } = useData();
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOTPSuccess, setShowOTPSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [formData, setFormData] = useState<FormState>({
    visitType: "",
    location: "",
    dateTime: "",
    photo: null,
    firstName: visit?.firstName ?? "",
    lastName: visit?.lastName ?? "",
    phoneNumber: visit?.phoneNumber?.toString() ?? "",
    altPhoneNumber: visit?.altPhoneNumber?.toString() ?? "",
    email: visit?.email ?? "",
    residence: visit?.address ?? "",
    project:
      visit?.project?.map((p: OurProject) => ({
        value: p?._id ?? "",
        label: p?.name ?? "",
      })) || [],
    requirement:
      visit?.requirement?.map((r: any) => ({
        value: r._id || r.value || r,
        label: r.requirementName?.toUpperCase() || r.label || r.toUpperCase(),
      })) || [],

    // teammember: [],
    propertyType: "",
    Source: visit?.leadType ?? "",
    cp: visit?.channelPartner?.firmName ?? "",
    closing: visit?.teamLeader?._id ?? "",

    teammember:
      visit?.taskRef?.assignTo?._id && visit?.taskRef?.assignTo?.firstName
        ? [
            {
              value: visit.taskRef.assignTo._id,
              label: `${visit.taskRef.assignTo.firstName} ${
                visit.taskRef.assignTo.lastName ?? ""
              }`,
            },
          ]
        : [],

    feedback: "",
    prefix: "",
  });

  const tagginOver = visit?.validTill
    ? new Date(visit.validTill) < new Date()
    : false;

  useEffect(() => {
    getDataEntryEmployees();
    getProjects();
    getRequirements();
    getClosingManagers();
    getChannelPartners();
  }, []);

  useEffect(() => {
    fetchReportingToEmployees(formData.closing, "sales");
  }, []);
  // Dropdown Options
  // const userOptions=dataEntryUsers?.firstName;
  const requirementOptions =
    requirements.map((r: string) => ({
      value: r,
      label: r.toUpperCase(),
    })) ?? [];

  const projectOptions = projects.map((p: OurProject) => ({
    value: p?._id ?? "",
    label: p?.name ?? "",
  }));

  const teamMemberOptions = reportingToEmps.map((emp) => ({
    value: emp?._id ?? "  ",
    label: `${emp.firstName} ${emp.lastName}`,
  }));

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

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (formData.visitType === "virtual-meeting") {
      await handleVerifiedOrSkipOtp(true);
    } else {
      if (visit?.leadType?.toLowerCase() === "cp" && tagginOver) {
        setShowConfirm(true);
      } else {
        await generateOtp();
      }
    }
  };

  const handleConfirmSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setShowConfirm(false);
    await generateOtp(); // Generate OTP after confirmation
  };

  const generateOtp = async (resent = false) => {
    try {
      setIsLoading(true);
      const payload = {
        project: formData.project?.map((p: OptionType) => p.value),
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email || null,
        closingManager: formData.closing,
      };
      console.log(payload);

      const res = await sendOtpSiteVisit(payload);
      setShowOTP(true);
      console.log(res);
    } catch (error) {
      alert("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifiedOrSkipOtp = async (verified = false) => {
    try {
      setIsLoading(true);

      let virtualMeetingDoc = null;

      // Upload virtual meeting image (IF EXISTS)
      if (formData.visitType === "virtual-meeting" && formData.photo) {
        const uploadResult = await uploadFile(formData.photo);

        if (uploadResult.success && uploadResult.file) {
          // this is the uploaded file data
          virtualMeetingDoc = uploadResult.file.downloadUrl;
        } else {
          alert(
            "Failed to upload virtual meeting image: " + uploadResult.message
          );
          return;
        }
      }

      const visitMap = {
        visitType: formData.visitType,
        projects: formData.project?.map((p: OptionType) => p.value),
        choiceApt: formData.requirement?.map((r: OptionType) => r.value),
        firstName: formData.firstName,
        lastName: formData.lastName,
        closingManager: formData.closing,
        closingTeam: formData.teammember?.map((t: OptionType) => t.value),
        callBy: visit?.taskRef?.assignTo,
        date: formData.dateTime,
        phoneNumber: formData.phoneNumber ? Number(formData.phoneNumber) : null,
        altPhoneNumber: formData.altPhoneNumber
          ? Number(formData.altPhoneNumber)
          : null,
        email: formData.email?.trim() || null,
        residence: formData.residence,
        dataEntryBy: selectedUser,
        namePrefix: formData.prefix,
        countryCode: "+91",
        verified,
        source: formData.Source,
        feedback: formData.feedback || "",
        channelPartner: formData.cp || null,
        gender:
          formData.prefix?.toLowerCase() === "mr"
            ? "male"
            : formData.prefix
            ? "female"
            : null,
        location: formData.location,
        lead: visit, // optional
        propertyType: formData.propertyType || null,
        virtualMeetingDoc: virtualMeetingDoc, // Add the uploaded file here
      };

      const res = await addSiteVisitV2(visitMap);

      if (res) {
        alert("✅ Site visit added successfully!");
        openclick(false); // Close the dialog on success
      } else {
        alert("Error adding site visit");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add site visit");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setOtpError("Enter valid 6-digit OTP");
      return;
    }
    setShowOTP(false);
    await handleVerifiedOrSkipOtp(true);
  };

  const handleSubmitClick = () => {
    if (!validateForm()) return;

    // Show confirmation only for CP leads with expired tagging
    if (visit?.leadType?.toLowerCase() === "cp" && tagginOver) {
      setShowConfirm(true);
    } else {
      // For all other cases, go directly to OTP
      setShowOTP(true);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (showOTP || showConfirm || showOTPSuccess) return;
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        openclick(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openclick, showOTP, showConfirm, showOTPSuccess]);

  // Handle field change
  const onChangeField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files } = e.target as any;
    if (files) {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "closing" && value) {
      fetchReportingToEmployees(value, "sales");
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
    if (!formData.email.trim()) newErrors.email = "Enter a valid email.";
    if (formData.project.length === 0)
      newErrors.project = "Select at least one project.";
    if (formData.requirement.length === 0)
      newErrors.requirement = "Select at least one requirement.";
    if (!formData.propertyType)
      newErrors.propertyType = "Please select property type.";
    if (!formData.residence.trim())
      newErrors.residence = "Enter residence details.";
    if (!formData.Source) newErrors.Source = "Please select Source type.";
    if (!formData.closing) newErrors.closing = "Please select Closing Manager.";
    if (formData.Source === "cp" && !formData.cp)
      newErrors.cp = "Please select Channel Partner.";
    if (!formData.prefix) newErrors.prefix = "select title";
    if (formData.teammember.length === 0)
      newErrors.teammember = "Please select at least one team member.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleVerifyOTP = () => {
  //   if (otp.trim().length !== 6) {
  //     setOtpError("Enter a valid 6-digit OTP");
  //     return;
  //   }
  //   setShowOTP(false);
  //   setShowOTPSuccess(true);
  // };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
  };
  
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
  function maskPhoneNumber(phone: string) {
    if (!phone) return "";
    const last4 = phone.slice(-4);
    const masked = "*".repeat(phone.length - 4) + last4;
    return masked;
  }

  return ReactDOM.createPortal(
    <>
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
                <RequiredLabel
                  icon={<IoPersonOutline className={styles.iconcolor} />}
                  text="Select User"
                />
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Select User</option>
                {dataEntryUsers?.map((user) => (
                  <option key={user?._id} value={user?._id ?? ""}>
                    {user?.firstName ?? ""} {user?.lastName ?? ""}
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
                👤{" "}
                <strong>
                  {
                    dataEntryUsers.find((u) => u?._id === selectedUser)
                      ?.firstName
                  }{" "}
                  {
                    dataEntryUsers.find((u) => u?._id === selectedUser)
                      ?.lastName
                  }
                </strong>
              </p>
            </div>
          )}

          {selectedUser && (
            <div className={styles.dailogcnt}>
              <div className={styles.mainlable}>Visit Information</div>

              <div className={styles.formControl}>
                <label>
                  <RequiredLabel
                    icon={<FaStar className={styles.iconcolor} />}
                    text="Visit Type"
                  />
                </label>

                <select
                  value={formData.visitType}
                  name="visitType"
                  onChange={onChangeField}
                >
                  <option value="">Select Visit Type</option>
                  <option value="visit">visit</option>
                  <option value="revisit">revisit</option>

                  <option value="virtual-meeting">virtual-meeting</option>
                </select>
                {errors.visitType && (
                  <p className={styles.errorMsg}>{errors.visitType}</p>
                )}
              </div>

              <div className={styles.card}>
                <div className={styles.card}>
                  <div className={styles.formControl}>
                    <label>
                      <RequiredLabel
                        icon={<FaLocationDot className={styles.iconcolor} />}
                        text="Location"
                      />
                    </label>
                    <select
                      value={formData.location}
                      name="location"
                      onChange={onChangeField}
                    >
                      <option value="">Select Location</option>

                      {/* Dynamically list projects */}
                      {projects.map((project: OurProject) => (
                        <option key={project?._id} value={project?._id ?? ""}>
                          {project.name}
                        </option>
                      ))}
                    </select>

                    {errors.location && (
                      <p className={styles.errorMsg}>{errors.location}</p>
                    )}
                  </div>
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<IoMdTime className={styles.iconcolor} />}
                      text="Date & Time"
                    />
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
                    <AiFillPicture className={styles.iconcolor} /> Virtual
                    Meeting Image
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
                    <RequiredLabel
                      icon={<IoPersonOutline className={styles.iconcolor} />}
                      text="First Name"
                    />
                  </label>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <div className={styles.formControl}>
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
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        type="text"
                        value={formData.firstName}
                        name="firstName"
                        onChange={onChangeField}
                        placeholder="First Name"
                        style={{ flex: 1 }}
                      />
                      {errors.firstName && (
                        <p className={styles.errorMsg}>{errors.firstName}</p>
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
                    value={formData.lastName}
                    name="lastName"
                    onChange={onChangeField}
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className={styles.errorMsg}>{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={
                        <MdOutlinePhoneInTalk className={styles.iconcolor} />
                      }
                      text="Phone Number"
                    />
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Enter 10-digit phone"
                    maxLength={10}
                  />
                  {errors.phoneNumber && (
                    <p className={styles.errorMsg}>{errors.phoneNumber}</p>
                  )}
                </div>
                <div className={styles.formControl}>
                  <label>
                    <MdLocalPhone className={styles.iconcolor} /> Alternate
                    Phone
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
                    <RequiredLabel
                      icon={<MdOutlineEmail className={styles.iconcolor} />}
                      text="Email"
                    />
                  </label>

                  <input
                    type="email"
                    value={formData.email}
                    name="email"
                    onChange={onChangeField}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className={styles.errorMsg}>{errors.email}</p>
                  )}
                </div>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={
                        <MdNotListedLocation className={styles.iconcolor} />
                      }
                      text="Residence"
                    />
                  </label>
                  <input
                    type="text"
                    value={formData.residence}
                    name="residence"
                    onChange={onChangeField}
                  />
                  {errors.residence && (
                    <p className={styles.errorMsg}>{errors.residence}</p>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className={styles.mainlable}>Project Details</div>
              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<BsBuildingFill className={styles.iconcolor} />}
                      text="Projects"
                    />
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
                  {errors.project && (
                    <p className={styles.errorMsg}>{errors.project}</p>
                  )}
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<BsBuildingFill className={styles.iconcolor} />}
                      text="Requirements"
                    />
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
                  {errors.requirement && (
                    <p className={styles.errorMsg}>{errors.requirement}</p>
                  )}
                </div>
              </div>

              <div className={styles.formControl}>
                <label>
                  <RequiredLabel
                    icon={<MdHomeWork className={styles.iconcolor} />}
                    text="Property Type"
                  />
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
                {errors.propertyType && (
                  <p className={styles.errorMsg}>{errors.propertyType}</p>
                )}
              </div>
              <div className={styles.mainlable}>Managment Information</div>
              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={
                        <SiOpensourcehardware className={styles.iconcolor} />
                      }
                      text="Source"
                    />
                  </label>
                  <select
                    value={formData.Source}
                    name="Source"
                    onChange={onChangeField}
                  >
                    <option value="">Select Source Type</option>
                    <option value="walk-in">walk-in</option>
                    <option value="cp">cp</option>
                    <option value="internal-lead">Internal-Lead</option>
                  </select>
                  {errors.Source && (
                    <p className={styles.errorMsg}>{errors.Source}</p>
                  )}
                </div>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaUserTie className={styles.iconcolor} />}
                      text=" Closing Manager"
                    />
                  </label>

                  <select
                    value={formData.closing}
                    name="closing"
                    onChange={onChangeField}
                  >
                    <option value="">Select Closing Manager</option>
                    {closingManagers.map((manager: Employee) => (
                      <option key={manager._id} value={manager?._id ?? ""}>
                        {manager.firstName} {manager.lastName} (Closing Manager)
                      </option>
                    ))}
                  </select>

                  {errors.closing && (
                    <p className={styles.errorMsg}>{errors.closing}</p>
                  )}
                </div>
              </div>

              {formData.Source === "cp" && (
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaUserTie className={styles.iconcolor} />}
                      text="Channel Partner"
                    />
                  </label>

                  <Select
                    options={channelPartners
                      .filter((cp: ChannelPartner) => cp._id)
                      .map((cp: ChannelPartner) => ({
                        value: cp._id!,
                        label: `${cp.firstName} ${cp.lastName} (${cp.firmName})`,
                      }))}
                    value={
                      formData.cp
                        ? {
                            value: formData.cp,
                            label: channelPartners.find(
                              (c) => c._id === formData.cp
                            )
                              ? `${
                                  channelPartners.find(
                                    (c) => c._id === formData.cp
                                  )?.firstName
                                } ${
                                  channelPartners.find(
                                    (c) => c._id === formData.cp
                                  )?.lastName
                                } (${
                                  channelPartners.find(
                                    (c) => c._id === formData.cp
                                  )?.firmName
                                })`
                              : "",
                          }
                        : null
                    }
                    onChange={(selected) => {
                      setFormData((prev) => ({
                        ...prev,
                        cp: (selected as OptionType).value,
                      }));
                    }}
                    placeholder="Select Channel Partner"
                    isSearchable={true}
                    styles={customSelectStyles(currentTheme)}
                  />

                  {errors.cp && <p className={styles.errorMsg}>{errors.cp}</p>}
                </div>
              )}

              <div className={styles.formControl}>
                <label>
                  <RequiredLabel
                    icon={<CgNotes className={styles.iconcolor} />}
                    text="Team Member"
                  />
                </label>

                <Select
                  isMulti
                  options={teamMemberOptions}
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

                {errors.teammember && (
                  <p className={styles.errorMsg}>{errors.teammember}</p>
                )}
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
                <button className={styles.submitBtn} onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {visit?.leadType?.toLowerCase() === "cp" && tagginOver && showConfirm && (
        <div className={styles.dialogOverlay}>
          <div className={styles.alertbox}>
            <h3 className={styles.dialogTitle} style={{ color: "#db5c49ff" }}>
              ⚠️ Tagging is Over
            </h3>
            <div className={styles.altertext}>
              <p>Confirm details before adding Visit</p>
              <p style={{ color: "#b4a32aff" }}>with Sourcing Manager</p>
            </div>

            <div className={styles.alertdailog}>
              <button
                className={styles.cancelBtn}
                onClick={handleCancelConfirm}
              >
                Cancel
              </button>
              <button
                className={styles.submitBtn}
                onClick={handleConfirmSubmit}
              >
                ⚠️ Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      // OTP dialog shows for everyone when showOTP is true
      {showOTP && (
        <div className={styles.dialogOverlay}>
          <div className={styles.alertbox}>
            <h3 className={styles.dialogTitle} style={{ color: "#007bff" }}>
              🔒 OTP Verification
            </h3>
            <div className={styles.altertext} style={{ gap: "5px" }}>
              <p>OTP sent to WhatsApp Number</p>
              <div className={styles.numberhide}>
                {maskPhoneNumber(
                  visit?.phoneNumber?.toString() ?? formData.phoneNumber
                )}
              </div>
            </div>

            <div className={styles.otpContainer}>
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otp[index] || ""}
                  ref={(el) => {
                    otpRefs.current[index] = el!;
                  }}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    const otpArray = otp.split("");
                    otpArray[index] = val;
                    setOTP(otpArray.join("").slice(0, 6));
                    if (val && index < 5) otpRefs.current[index + 1]?.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[index] && index > 0) {
                      otpRefs.current[index - 1]?.focus();
                    }
                  }}
                  style={{
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                    fontSize: "18px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </div>

            {otpError && <p className={styles.errorMsg}>{otpError}</p>}

            <div className={styles.alertdailog}>
              <button
                className={styles.cancelBtn}
                onClick={async () => {
                  setShowOTP(false);
                  await handleVerifiedOrSkipOtp(false); // Skip OTP verification
                }}
              >
                Skip
              </button>
              <button className={styles.submitBtn} onClick={handleVerifyOTP}>
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
      {showOTPSuccess && (
        <div className={styles.dialogOverlay}>
          <div className={styles.alertbox}>
            <div
              style={{
                textAlign: "center",
                marginBottom: "10px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <FcApproval size={50} />
            </div>

            <div
              className={styles.altertext}
              style={{ textAlign: "center", gap: "5px" }}
            >
              <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                Site Visit Sent for Verification
              </p>
              <p style={{ color: "#b4a32aff" }}>To Sourcing Manager</p>
              <p style={{ color: "#db5c49ff" }}>Contact them for approval</p>
            </div>

            <div
              className={styles.alertdailog}
              style={{ justifyContent: "center", marginTop: "15px" }}
            >
              <button
                className={styles.altersub}
                onClick={() => {
                  setShowOTPSuccess(false);
                  openclick(false);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default SiteVisit;
