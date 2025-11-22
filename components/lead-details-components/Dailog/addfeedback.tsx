"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css";
import { IoLocation, IoPersonOutline } from "react-icons/io5";
import { BsBuildingFill, BsLinkedin } from "react-icons/bs";
import Select, { components } from "react-select";
import { FaStar } from "react-icons/fa6";
import { PiBagFill } from "react-icons/pi";
import { AiFillPicture } from "react-icons/ai";
import ReactDOM from "react-dom";
import { MdCancel } from "react-icons/md";
import { useData } from "@/providers/dataContext";
import FeedbackTwo from "./feedbacktwo";
import axios from "axios";

interface AddFeedBaackProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
  lead?: Lead | null;
  task?: Task | null;
  onSave: (payload: any) => void;
}

interface FileResp {
    token: string;
    filename: string;
    downloadUrl: string;
}

interface OptionType {
  value: string;
  label: string;
}
interface FormState {
  firstName: string;
  lastName: string;
  project: OptionType[];
  requirement: OptionType[];
  propertyType: string;
  nameRemark: string;
  occupation: string;
  link: string;
  uploadedLinkedinUrl: string | File | null;
  additionalLinRremark: string;
}

const AddFeedBaack: React.FC<AddFeedBaackProps> =  ({
  openclick,
  lead,
  onSave,
}) => {
  const { getRequirements, requirements, projects, getProjects } = useData();
  const currentTheme = document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
  const dialogRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showfb, setshowfb] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadedFileData, setUploadedFileData] = useState<FileResp | null>(null);
  

  const [formData, setformData] = useState<FormState>({
    firstName: "",
    lastName: "",
    project: [],
    requirement: [],
    propertyType: "",
    nameRemark: "",
    occupation: "",
    link: "",
    uploadedLinkedinUrl: "",
    additionalLinRremark: "",
  });

  const { updateLeadDetails } = useData();
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        openclick(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openclick]);

  useEffect(() => {
    if (lead) {
      setformData({
        firstName: lead.firstName || "",
        lastName: lead.lastName || "",
        project:
          lead.project?.map((p: any) => ({
            value: p._id || p.value,
            label: p.name || p.projectName || p.label,
          })) || [],
        requirement:
          lead.requirement?.map((r: any) => ({
            value: r._id || r.value || r,
            label:
              r.requirementName?.toUpperCase() || r.label || r.toUpperCase(),
          })) || [],
        propertyType: lead.propertyType || "",
        occupation: lead.occupation || "",
        link: lead.linkedIn || "",
        uploadedLinkedinUrl: lead.uploadedLinkedIn ?? "",
        nameRemark: lead.nameRemark || "",
        additionalLinRremark: lead.additionLinRemark ?? "",
      });
    }
  }, [lead, openclick]);

  useEffect(() => {
    getRequirements();
    getProjects();
  }, []);

  const requirementOptions =
    requirements.map((r: string) => ({
      value: r,
      label: r.toUpperCase(),
    })) ?? [];

  const projectOptions = projects.map((p: any) => ({
    value: p._id,
    label: p.name,
  }));
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

  const handleFileUpload = async (file: File): Promise<string | null> => {
        if (!file) return null;

        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "linkedin-profiles");

        try {
            const url = "https://api.evhomes.tech/upload?path=linkedin-profiles";

            const response = await axios.post<FileResp>(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-platform": "web",
                },
                onUploadProgress: (progressEvent: any) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentCompleted);
                    }
                },
            });

            setUploadedFileData(response.data);
            return response.data.downloadUrl;
        } catch (error) {
            console.error("Upload error:", error);
            return null;
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        
        if (file) {
            // For immediate preview
            setformData((prev) => ({ ...prev, uploadedLinkedinUrl: file }));
            
            // Upload the file and get the URL
            const downloadUrl = await handleFileUpload(file);
            if (downloadUrl) {
                // Update form data with the download URL instead of the File object
                setformData((prev) => ({ ...prev, uploadedLinkedinUrl: downloadUrl }));
            } else {
                // Handle upload failure
                setErrors(prev => ({ ...prev, uploadedLinkedinUrl: "Failed to upload file. Please try again." }));
                setformData((prev) => ({ ...prev, uploadedLinkedinUrl: "" }));
            }
        } else {
            setformData((prev) => ({ ...prev, uploadedLinkedinUrl: "" }));
        }
    };


  const handleCancel = () => {
    setformData({
      firstName: "",
      lastName: "",
      project: [],
      requirement: [],
      propertyType: "",
      nameRemark: "",
      occupation: "",
      link: "",
      uploadedLinkedinUrl: "",
      additionalLinRremark: "",
    });
    openclick(false);
  };
  const onChangeField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };


  const onSubmit = async () => {
    const newErrors: { [key: string]: string } = {};

      // ✅ Client Details validation
  if (!formData.firstName.trim())
    newErrors.firstName = "Please enter First Name";
  if (!formData.lastName.trim())
    newErrors.lastName = "Please enter Last Name";

  // ✅ Project Details validation
  if (!formData.project || formData.project.length === 0)
    newErrors.project = "Please select at least one Project";
  if (!formData.requirement || formData.requirement.length === 0)
    newErrors.requirement = "Please select at least one Requirement";

  // ✅ Property Type validatio
  if (!formData.propertyType)
    newErrors.propertyType = "Please select Property Type";
 

  // ✅ Set errors and prevent submission if any
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  let finalUploadedUrl = formData.uploadedLinkedinUrl;
        
        // If it's still a File object (upload might be in progress), wait for upload to complete
        if (formData.uploadedLinkedinUrl instanceof File) {
            if (isUploading) {
                setErrors(prev => ({ ...prev, uploadedLinkedinUrl: "File upload in progress. Please wait." }));
                return;
            }
            // If upload failed or hasn't started, try to upload now
            const downloadUrl = await handleFileUpload(formData.uploadedLinkedinUrl);
            if (downloadUrl) {
                finalUploadedUrl = downloadUrl;
            } else {
                setErrors(prev => ({ ...prev, uploadedLinkedinUrl: "File upload failed. Please try again." }));
                return;
            }
        }
        
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      project: formData?.project?.map((p) => p.value), // Extract IDs
      requirement: formData?.requirement.map((r) => r.value), // Extract requirement values

      propertyType: formData.propertyType,
      occupation: formData.occupation,
      linkedIn: formData.link,
      uploadedLinkedIn: finalUploadedUrl,
      nameRemark: formData.nameRemark,
      additionLinRemark: formData.additionalLinRremark,
    };

    onSave(payload);
    alert("Form submitted successfully:");
    openclick(false);
    //  <FeedbackTwo openclick={setshowfb} lead={lead} task={lead.taskRef} />
     setshowfb(true);

  };

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

  const getPreviewUrl = (): string => {
        if (typeof formData.uploadedLinkedinUrl === "string") {
            return formData.uploadedLinkedinUrl;
        } else if (formData.uploadedLinkedinUrl instanceof File) {
            return URL.createObjectURL(formData.uploadedLinkedinUrl);
        }
        return "";
    };
const ClearIndicator = (props: any) => {
    return (
      <components.ClearIndicator
        {...props}
        innerProps={{
          ...props.innerProps,
          onMouseDown: (e: any) => {
            e.stopPropagation();
            props.clearValue();
          },
        }}
      />
    );
  };

  return ReactDOM.createPortal(
    <div className={styles.dialogOverlay}>
      <div ref={dialogRef} className={styles.dialogBox}>
        <h3 className={styles.dialogTitle}>📝 Edit Lead Details</h3>
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
        <div className={styles.dailogcnt}>
          <div className={styles.mainlable}>Client Details</div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<IoPersonOutline className={styles.iconcolor} />}
                  text="Client First Name"
                />
              </label>
              <input
                type="text"
                value={formData.firstName}
                name="firstName"
                placeholder="first name...."
                onChange={onChangeField}
              />
              {errors.firstName && (
                <p className={styles.errorMsg}>{errors.firstName}</p>
              )}
            </div>
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<IoPersonOutline className={styles.iconcolor} />}
                  text="Client Last Name"
                />
              </label>
              <input
                type="text"
                value={formData.lastName}
                name="lastName"
                placeholder=" last name...."
                onChange={onChangeField}
              />
              {errors.lastName && (
                <p className={styles.errorMsg}>{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className={styles.mainlable}>Project Deatis</div>
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
                onChange={(selected) => {
                  setformData((prev) => ({
                    ...prev,
                    project: [...selected],
                  }));
                }}
                  components={{ ClearIndicator }}
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
                styles={customSelectStyles(currentTheme)}
                  components={{ ClearIndicator }}
                value={formData.requirement}
                onChange={(selected) => {
                  setformData((prev) => ({
                    ...prev,
                    requirement: [...selected],
                  }));
                }}
              />
              {errors.requirement && (
                <p className={styles.errorMsg}>{errors.requirement}</p>
              )}
            </div>
          </div>

          <div className={styles.formControl}>
            <label>
              <RequiredLabel
                icon={<FaStar className={styles.iconcolor} />}
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
          <div className={styles.formControl}>
            <label>
              <IoLocation className={styles.iconcolor} /> Additional Notes
            </label>
            <textarea
              rows={2}
              placeholder="Enter notes"
              name="nameRemark"
              value={formData.nameRemark}
              onChange={onChangeField}
            />
          </div>
          <div className={styles.mainlable}>Work Information</div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label>
                <PiBagFill className={styles.iconcolor} /> Occupation
              </label>
              <input
                type="text"
                name="occupation"
                placeholder="Enter occupation...."
                value={formData.occupation}
                onChange={onChangeField}
              />
            </div>
            <div className={styles.formControl}>
              <label>
                <BsLinkedin className={styles.iconcolor} /> LinkedIn Profile
              </label>
              <input
                type="text"
                name="link"
                placeholder=" Enter Link...."
                value={formData.link}
                onChange={onChangeField}
              />
            </div>
          </div>


           <div className={styles.formControl}>
                        <label>
                            <RequiredLabel
                                icon={<AiFillPicture className={styles.iconcolor} />}
                                text="Upload LinkedIn Profile"
                            />
                        </label>

                        <div className={styles.uploadBox}>
                            <input
                                type="file"
                                id="fileUpload"
                                accept="image/*"
                                className={styles.fileInput}
                                onChange={handleFileChange}
                                disabled={isUploading}
                            />

                            <label htmlFor="fileUpload" className={styles.uploadLabel}>
                                {!formData.uploadedLinkedinUrl ? (
                                    <>
                                        <div className={styles.uploadIcon}>
                                            <AiFillPicture size={30} />
                                        </div>
                                        <p>
                                            {isUploading 
                                                ? `Uploading... ${uploadProgress}%` 
                                                : "Click to upload or drag & drop"
                                            }
                                        </p>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            marginTop: "10px",
                                            textAlign: "center",
                                            width: "100%",
                                            height: "170px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            overflow: "hidden",
                                            borderRadius: "8px",
                                            position: "relative",
                                        }}
                                    >
                                        <img
                                            src={getPreviewUrl()}
                                            alt="Preview"
                                            style={{
                                                width: "auto",
                                                height: "100%",
                                                borderRadius: "8px",
                                                objectFit: "cover",
                                            }}
                                        />
                                        {isUploading && (
                                            <div style={{
                                                position: "absolute",
                                                top: "0",
                                                left: "0",
                                                right: "0",
                                                bottom: "0",
                                                backgroundColor: "rgba(0,0,0,0.5)",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "white",
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                            }}>
                                                Uploading... {uploadProgress}%
                                            </div>
                                        )}
                                    </div>
                                )}
                            </label>
                        </div>

                        {errors.uploadedLinkedinUrl && <p className={styles.errorMsg}>{errors.uploadedLinkedinUrl}</p>}
                    </div>

          <div className={styles.formControl}>
            <label>
              <RequiredLabel
                icon={<IoLocation className={styles.iconcolor} />}
                text="Remark"
              />
            </label>
            <textarea
              rows={2}
              placeholder="Enter remark"
              value={formData.additionalLinRremark}
              name="additionalLinRremark"
              onChange={onChangeField}
            />
            {errors.remark && (
              <p className={styles.errorMsg}>{errors.remark}</p>
            )}
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
      </div>
     {showfb && (
  <FeedbackTwo openclick={setshowfb} lead={lead} task={lead?.taskRef} />
)}

    </div>,
    document.body
  );
};
export default AddFeedBaack;
