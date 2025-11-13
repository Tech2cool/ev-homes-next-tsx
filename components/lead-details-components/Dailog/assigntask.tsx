"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css";
import { IoLocation } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import ReactDOM from "react-dom";
import { BiTask } from "react-icons/bi";
import Select, { components } from "react-select";
import { CgNotes } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useData } from "@/providers/dataContext";

interface AssignTaskProps {
    openclick: React.Dispatch<React.SetStateAction<boolean>>;
    task?: Task | null;
}
interface OptionType {
    value: string | null | undefined
    label: string;
    status?: string;
}

interface FormState {
    subject: string;
    assignTo: OptionType[];
    remark: string;
    deadline?: string;
}

const AssignTask: React.FC<AssignTaskProps> = ({ openclick, task }) => {
    const {
        closingManagers,
        getClosingManagers,
        reportingToEmps,
        fetchReportingToEmployees
    } = useData();
    const currentTheme = document.documentElement.classList.contains("light") ? "light" : "dark";
    const dialogRef = useRef<HTMLDivElement>(null);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState<FormState>({
        subject: "",
        assignTo: [],
        remark: "",
        deadline: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Transform reporting employees to options for Select component
    const employeeOptions: OptionType[] = closingManagers.map(emp => ({
        value: emp._id ?? "",
        label: `${emp.firstName} ${emp.lastName || 'Employee'}`,
        // status: emp.status || 'Present' 
    }));

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const cn = closingManagers.map((e)=>e?._id??"");

                // You might need to pass the current user's ID here
                // For now, using an empty string or get from context
                const result = await getClosingManagers();
                if (result.success) {
                    // Data is already set in the context, but we can also set it locally if needed
                    console.log("Employees fetched successfully");
                } else {
                    setError(result.message || "Failed to fetch employees");
                }
            } catch (err) {
                setError("Error fetching employees");
                console.error("Error fetching employees:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        if (task) {
            // Pre-fill form with existing task data
            const assignedEmployees: OptionType[] = task.assignTo ? [{
                value: task.assignTo._id || "",
                label: `${task.assignTo.firstName} (${task.assignTo.lastName || ''})`,
                status: "Present"
            }] : [];

            setFormData({
                subject: task.type || "",
                assignTo: assignedEmployees,
                remark: task.remark || "",
                deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ""
            });

            // Fetch reporting employees if you have user context
            if (task.assignBy?._id) {
                fetchReportingToEmployees(task.assignBy._id, "");
            }
        }
    }, [task, fetchReportingToEmployees]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form data:", formData);
    };

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
                openclick(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [openclick]);

    const handleCancel = () => {
        setFormData({
            subject: "",
            assignTo: [],
            remark: "",
            deadline: "",
        });
        setErrors({});
        openclick(false);
    };

    const formatDateForInput = (dateString: string | null | undefined) => {
        if (!dateString) return "";
        try {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        } catch (error) {
            return "";
        }
    };

    const onChangeField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.subject) newErrors.subject = "Please select Call Status";
        if (formData.assignTo.length === 0) newErrors.assignTo = "Please select Employee";
        if (!formData.remark.trim()) newErrors.remark = "Please enter remark";
        if (!formData.deadline)
            newErrors.deadline = "Please select Deadline";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        alert("Form submitted successfully:\n" + JSON.stringify(formData, null, 2));
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
                <h3 className={styles.dialogTitle}>📝 Assign Task</h3>
                <div className={styles.dailogcnt}>
                    {/* {loading && <div className={styles.loading}>Loading employees...</div>} */}
                    {error && <div className={styles.errorMsg}>{error}</div>}
                    
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<FaStar className={styles.iconcolor} />} text="Subject" />
                        </label>
                        <select
                            value={formData.subject}
                            name="subject"
                            onChange={onChangeField}
                        >
                            <option value="">Select Subject</option>
                            <option value="connected">Live Lead</option>
                            <option value="disconnected">Transfer Lead</option>
                        </select>
                        {errors.subject && <p className={styles.errorMsg}>{errors.subject}</p>}
                    </div>
                    
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<BiTask className={styles.iconcolor} />} text="Remarks" />
                        </label>
                        <textarea
                            rows={2}
                            placeholder="remark..."
                            name="remark"
                            value={formData.remark}
                            onChange={onChangeField}
                        />
                        {errors.remark && <p className={styles.errorMsg}>{errors.remark}</p>}
                    </div>
                    
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<CgNotes className={styles.iconcolor} />} text="Assign To" />
                        </label>
                        <Select
                            isMulti
                            options={employeeOptions}
                            value={formData.assignTo}
                            onChange={(selected) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    assignTo: selected as OptionType[],
                                }))
                            }
                            styles={customSelectStyles(currentTheme)}
                            components={{ Option: CustomOption }}
                            isLoading={loading}
                        />
                        {errors.assignTo && <p className={styles.errorMsg}>{errors.assignTo}</p>}
                    </div>

                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<FaCalendarAlt className={styles.iconcolor} />} text="Deadline" />
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline || ""}
                            onChange={onChangeField}
                        />
                        {errors.deadline && <p className={styles.errorMsg}>{errors.deadline}</p>}
                    </div>
                    
                    {/* Buttons */}
                    <div className={styles.dialogButtons}>
                        <button className={styles.cancelBtn} onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className={styles.submitBtn} onClick={onSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default AssignTask;