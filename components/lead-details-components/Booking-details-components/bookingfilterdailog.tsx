import React, { useEffect, useState } from "react";
import styles from "@/components/visit-components/filterDialog.module.css";
import { useData } from "@/providers/dataContext";
import loading from "@/app/dashboard/loading";
import { useUser } from "@/providers/userContext";

// const PROJECTS = ["Project A", "Project B", "Project C"];
// const MANAGERS = ["Manager 1", "Manager 2", "Manager 3"];
// const STATUSES = ["Pending", "Confirmed", "Cancelled"];
// const DATE_OPTIONS = [
//   "Today",
//   "Yesterday",
//   "Last 7 Days",
//   "Last 30 Days",
//   "Custom",
// ];
const BOOKING_STATUS_MAP: { [key: string]: string } = {
  All: "All",
  "Registration Done": "registrationDone",
  "EOI Received": "EOI Received",
  Cancelled: "Cancelled",
};

interface Employee {
  _id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

interface OurProject {
  _id?: string | null;
  name?: string | null;
}

interface LeadbookingfilterProps {
  open: boolean;
  onClose: () => void;
  projects: OurProject[];
  closingManagers: Employee[];
  onApplyFilters: (filters: {
    project?: string | null;
    closingManager?: string | null;
    status?: string | null;
    date?: string | null;
    startDate?: string | null;
    endDate?: string | null;
  }) => void;
}

export function Leadbookingfilter({
  open,
  onClose,
  onApplyFilters,
}: LeadbookingfilterProps) {
  const {
    projects,
    getProjects,
    employees,
    getClosingManagers,
    fetchPostSaleLeads,
  } = useData();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedManager, setSelectedManager] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [selectproject, setSelectproject] = useState<{ project: string }>({
    project: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { user, loading } = useUser();

useEffect(() => {
  if (user && !loading) {
    console.log("Fetching managers & projects...");
    getClosingManagers();
    getProjects();
  }
}, [user, loading]);


  const DATE_OPTIONS = [
    "Today",
    "Yesterday",
    "Last 7 days",
    "Last 30 days",
    "Custom",
  ];

  const handleDatePresetChange = (preset: string) => {
    setDateFilter(preset);
    setShowDatePicker(false);

    const today = new Date();
    let startDate = "";
    let endDate = "";

    switch (preset) {
      case "Today":
        startDate = today.toISOString().split("T")[0];
        endDate = today.toISOString().split("T")[0];
        break;
      case "Yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        startDate = yesterday.toISOString().split("T")[0];
        endDate = yesterday.toISOString().split("T")[0];
        break;
      case "Last 7 days":
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        startDate = weekAgo.toISOString().split("T")[0];
        endDate = today.toISOString().split("T")[0];
        break;
      case "Last 30 days":
        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);
        startDate = monthAgo.toISOString().split("T")[0];
        endDate = today.toISOString().split("T")[0];
        break;
      case "Custom":
        setShowDatePicker(true);
        return;
      default:
        break;
    }

    if (preset !== "Custom") {
      setSelectedDateRange({ start: startDate, end: endDate });
    }
  };

  const handleCustomDateChange = (type: "start" | "end", value: string) => {
    setSelectedDateRange((prev) => ({
      start: type === "start" ? value : prev?.start || "",
      end: type === "end" ? value : prev?.end || "",
    }));
  };

  const applyFilters = () => {
    const apiFilters = {
      project: selectproject.project,
      closingManager: selectedManager,
      status: selectedStatus ? BOOKING_STATUS_MAP[selectedStatus] : null,
      date:
        dateFilter && dateFilter !== "Custom"
          ? dateFilter.toLowerCase().replace(/\s+/g, "-")
          : null,
      startDate: selectedDateRange?.start || null,
      endDate: selectedDateRange?.end || null,
    };

    onApplyFilters(apiFilters);
    onClose();
  };

  const clearAllFilters = () => {
    setSelectedProject(null);
    setSelectedManager(null);
    setSelectedStatus(null);
    setDateFilter(null);
    setSelectedDateRange(null);
    setShowDatePicker(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  const isCustomDate = dateFilter === "Custom";

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h2>Filter Bookings</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.fieldGroup}>
            <label>Project</label>
            <select
              value={selectproject.project}
              onChange={(e) => {
                setSelectproject((prev) => ({
                  ...prev,
                  project: e.target.value,
                }));
              }}
              className={styles.select}
            >
              <option value="">All Projects</option>
              {projects.map((option: OurProject, index: number) => (
                <option key={index} value={option._id ?? ""}>
                  {option.name ?? ""}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Closing Manager</label>
            <select
              value={selectedManager || ""}
              onChange={(e) => setSelectedManager(e.target.value || null)}
              className={styles.select}
            >
              <option value="">All Managers</option>

              {employees && employees.length > 0 ? (
                employees.map((mgr: Employee) => (
                  <option key={mgr._id ?? ""} value={mgr._id ?? ""}>
                    {`${mgr.firstName ?? ""} ${mgr.lastName ?? ""}`}
                  </option>
                ))
              ) : (
                <option disabled>Loading...</option>
              )}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Booking Status</label>
            <select
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
              className={styles.select}
            >
              {/* <option value="">All Statuses</option> */}
              {Object.keys(BOOKING_STATUS_MAP).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Select Date</label>
            <select
              value={dateFilter || ""}
              onChange={(e) => handleDatePresetChange(e.target.value)}
              className={styles.select}
            >
              {DATE_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {isCustomDate && (
              <div className={styles.dateRange}>
                <input
                  type="date"
                  value={selectedDateRange?.start || ""}
                  onChange={(e) =>
                    handleCustomDateChange("start", e.target.value)
                  }
                  className={styles.dateInput}
                />
                <span>to</span>
                <input
                  type="date"
                  value={selectedDateRange?.end || ""}
                  onChange={(e) =>
                    handleCustomDateChange("end", e.target.value)
                  }
                  className={styles.dateInput}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={clearAllFilters} className={styles.clearBtn}>
            Clear All
          </button>
          <button onClick={applyFilters} className={styles.applyBtn}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
