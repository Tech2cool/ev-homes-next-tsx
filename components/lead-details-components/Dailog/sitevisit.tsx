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
  } = useData();
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
      })) ||[],
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
    value: p?._id??"",
    label: p?.name??"",
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
    if (!formData.email.trim() )
      newErrors.email = "Enter a valid email.";
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

  const onSubmit = () => {
    if (!validateForm()) return;

    // alert(
    //   "✅ Form submitted successfully:\n" +
    //     JSON.stringify(
    //       {
    //         user: userOptions.find((u) => u.value === selectedUser)?.label,
    //         ...formData,
    //         photo: formData.photo ? formData.photo.name : "No file uploaded",
    //       },
    //       null,
    //       2
    //     )
    // );
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
                {dataEntryUsers.find((u) => u?._id === selectedUser)?.firstName}{" "}
                {dataEntryUsers.find((u) => u?._id === selectedUser)?.lastName}
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
                  <AiFillPicture className={styles.iconcolor} /> Virtual Meeting
                  Image
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
                    icon={<MdOutlinePhoneInTalk className={styles.iconcolor} />}
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
                    icon={<MdNotListedLocation className={styles.iconcolor} />}
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
                    icon={<SiOpensourcehardware className={styles.iconcolor} />}
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
                <select
                  value={formData.closing}
                  name="closing"
                  onChange={onChangeField}
                >
                  <option value="">Select Channel Partner </option>
                  {channelPartners.map((cp: ChannelPartner) => (
                    <option key={cp._id} value={cp?._id ?? ""}>
                      {cp?.firstName} {cp?.lastName} ({cp?.firmName})
                    </option>
                  ))}
                </select>
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
                options={teamMemberOptions} // 👈 Dynamic from reportingToEmps
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
