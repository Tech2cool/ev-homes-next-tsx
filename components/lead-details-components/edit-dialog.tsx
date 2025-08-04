"use client";
import { useState, useEffect } from "react";
import { X, Save, User, Building, Edit } from "lucide-react";
import styles from "./dialog.module.css";
import { useData } from "@/providers/dataContext";

// Assuming you have a DataContext - adjust the import path as needed
// import { DataContext } from '@/context/DataContext';

const EditDialog = ({ visit, onClose, onSave }: any) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    project: "",
    requirement: "",
    notes: "",
    // ...visit,
  });

  const [errors, setErrors] = useState<any>({});
  const {
    getProjects,
    projects,

    // fetchingMoreVisits,
    // loadingVisits,
  } = useData();

  // Uncomment and adjust based on your context structure
  // const { projects, getProjects } = useContext(DataContext);

  // Mock projects data - replace with your actual context data
  //   const [projects, setProjects] = useState([])

  // Requirement options
  const requirementOptions = [
    { value: "1bhk", label: "1 BHK" },
    { value: "1rk", label: "1 RK" },
    { value: "2bhk", label: "2 BHK" },
    { value: "3bhk", label: "3 BHK" },
    { value: "4bhk", label: "4 BHK" },
    { value: "jodi", label: "Jodi" },


  ];

  useEffect(() => {
    // Fetch projects when component mounts
    // If you have getProjects in context, call it here
    getProjects();

    // Mock API call - replace with your actual implementation
    // const fetchProjects = async () => {
    //   try {
    //     const response = await fetch("/api/getProjects")
    //     const data = await response.json()
    //     setProjects(data)
    //   } catch (error) {
    //     console.error("Error fetching projects:", error)
    //   }
    // }

    // fetchProjects()
  }, []);

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
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
    if (!formData.project) {
      newErrors.project = "Project is required";
    }
    if (!formData.requirement) {
      newErrors.requirement = "Requirement is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleOverlayClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
                <select
                  value={formData.project || ""}
                  onChange={(e) => handleInputChange("project", e.target.value)}
                  className={`${styles.formSelect} ${errors.project ? styles.formInputError : ""}`}
                >
                  {/* <option value="">Select project</option> */}
                  {projects.map((project: any) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
                {errors.project && (
                  <span className={styles.errorText}>{errors.project}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Requirement *</label>
                <select
                  id="requirements"
                  value={formData.requirement || ""}
                  onChange={(e) =>
                    handleInputChange("requirement", e.target.value)
                  }
                  className={`${styles.formSelect} ${
                    errors.requirement ? styles.formInputError : ""
                  }`}
                >
                  {/* <option value="">Select requirement</option> */}
                  {requirementOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.requirement && (
                  <span className={styles.errorText}>{errors.requirement}</span>
                )}
              </div>

              <div
                className={styles.formGroup}
                style={{ gridColumn: "1 / -1" }}
              >
                <label className={styles.formLabel}>Notes</label>
                <textarea
                  value={formData.notes || ""}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className={styles.formTextarea}
                  placeholder="Enter additional notes"
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
