"use client";
import { useState, useEffect, useMemo } from "react";
import { X, Save, User, Building, Edit } from "lucide-react";
import styles from "./dialog.module.css";
import { useData } from "@/providers/dataContext";
import { BsBuildingFill } from "react-icons/bs";
import Select, { MultiValue } from "react-select";

// Assuming you have a DataContext - adjust the import path as needed
// import { DataContext } from '@/context/DataContext';

interface EditDialogProps {
  visit: Lead | null; // or use your Lead type
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditDialog = ({ visit, onClose, onSave }: EditDialogProps) => {
  const [formData, setFormData] = useState({
    firstName: visit?.firstName ?? "",
    lastName: visit?.lastName ?? "",
    project:
      visit?.project?.map((p: any) => ({
        value: p._id || p.value,
        label: p.name || p.projectName || p.label,
      })) || [],
    requirement:
      visit?.requirement?.map((r: any) => ({
        value: r._id || r.value || r,
        label: r.requirementName?.toUpperCase() || r.label || r.toUpperCase(),
      })) || [],

    nameRemark: "",
  });

  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const [errors, setErrors] = useState<any>({});
  const {
    getProjects,
    projects,
    getRequirements,
    requirements,
    // fetchingMoreVisits,
    // loadingVisits,
  } = useData();

  // Uncomment and adjust based on your context structure
  // const { projects, getProjects } = useContext(DataContext);

  // Mock projects data - replace with your actual context data
  //   const [projects, setProjects] = useState([])

  // Requirement options
  const requirementOptions =
    requirements.map((r: string) => ({
      value: r,
      label: r.toUpperCase(),
    })) ?? [];

  const projectOptions = projects.map((p: any) => ({
    value: p._id,
    label: p.name,
  }));

  useEffect(() => {
    getProjects();

    getRequirements();
  }, []);

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }
    // if (!formData.project) {
    //   newErrors.project = "Project is required";
    // }
    // if (!formData.requirement) {
    //   newErrors.requirement = "Requirement is required";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      project: formData?.project?.map((p) => p.value), // Extract IDs
      requirement: formData?.requirement.map((r) => r.value), // Extract requirement values
      nameRemark: formData.nameRemark,
    };

    onSave(payload);
  };

  const handleOverlayClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const customSelectStyles = useMemo(
    () => ({
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
    }),
    [currentTheme]
  );
  return (
    <div className={styles.dialogOverlay} onClick={handleOverlayClick}>
      <div className={styles.dialogContainer}>
        <div className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>
            <Edit className={styles.titleIcon} />
            Edit Visit Details
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.dialogContent}>
          {/* Personal Information Section */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              <User className={styles.sectionIcon} />
              Personal Information
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>First Name *</label>
                <input
                  type="text"
                  value={formData.firstName || ""}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={`${styles.formInput} ${
                    errors.firstName ? styles.formInputError : ""
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <span className={styles.errorText}>{errors.firstName}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName || ""}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={`${styles.formInput} ${
                    errors.lastName ? styles.formInputError : ""
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <span className={styles.errorText}>{errors.lastName}</span>
                )}
              </div>
            </div>
          </div>

          {/* Project Information Section */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              <Building className={styles.sectionIcon} />
              Project Information
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Project *</label>
                <Select
                  isMulti
                  options={projectOptions}
                  value={formData?.project}
                  onChange={(
                    selected: MultiValue<{ value: string; label: string }>
                  ) => {
                    setFormData((prev) => ({
                      ...prev,
                      projects: [...selected],
                    }));
                  }}
                  styles={customSelectStyles}
                />
                {errors.projects && (
                  <p className={styles.errorMsg}>{errors.projects}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  <label className={styles.formLabel}>Requirement *</label>
                </label>
                <Select
                  isMulti
                  options={requirementOptions}
                  value={formData?.requirement}
                  onChange={(
                    selected: MultiValue<{ value: string; label: string }>
                  ) => {
                    setFormData((prev) => ({
                      ...prev,
                      requirements: [...selected], // spread into a mutable array
                    }));
                  }}
                  styles={customSelectStyles}
                />
                {errors.requirements && (
                  <p className={styles.errorMsg}>{errors.requirements}</p>
                )}
              </div>
              <div
                className={styles.formGroup}
                style={{ gridColumn: "1 / -1" }}
              >
                <label className={styles.formLabel}>Additional Note</label>
                <textarea
                  value={formData.nameRemark || ""}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className={styles.formTextarea}
                  placeholder="Enter additional note"
                  rows={4}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.dialogFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            <Save className={styles.buttonIcon} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;
