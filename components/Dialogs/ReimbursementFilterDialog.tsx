import React, { useRef, useState, useEffect } from "react";
import reimstyles from "./reimbursementFilterDialog.module.css";
import styles from "../../components/MyAttendanceSection/Forms/leaveform.module.css";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { format } from "date-fns";
import { useClickOutside } from "../MyAttendanceSection/useClickOutside";
import DateFilter from "../DateFilter";
import { Range } from "react-date-range";

// ✅ Define filter options type
interface ReimbursementFilterOptions {
  dateRange: Range[];
  reimbursementType: "travel" | "phone" | "food" | "miscellaneous";
  paidBy: "company" | "emp";
  status: "pending" | "reject" | "approve";
}

interface ReimbursementFilterDialogProps {
  onClose: () => void;
  onApplyFilter: (option: ReimbursementFilterOptions) => void;
}

const ReimbursementFilterDialog: React.FC<ReimbursementFilterDialogProps> = ({
  onClose,
  onApplyFilter,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // ✅ State for date range
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // ✅ State for dropdowns
  const [reimbursementType, setReimbursementType] = useState<ReimbursementFilterOptions["reimbursementType"]>("travel");
  const [paidBy, setPaidBy] = useState<ReimbursementFilterOptions["paidBy"]>("company");
  const [status, setStatus] = useState<ReimbursementFilterOptions["status"]>("pending");

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  const formattedDateRange = `${dateRange[0].startDate ? format(dateRange[0].startDate, "dd-MM-yyyy") : ""} - ${dateRange[0].endDate ? format(dateRange[0].endDate, "dd-MM-yyyy") : ""}`;

  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  useClickOutside({
    refs: [dialogRef],
    handler: onClose,
    active: true,
  });

  // ✅ Apply Filter with real data
  const handleApplyFilter = () => {
    onApplyFilter({
      dateRange,
      reimbursementType,
      paidBy,
      status,
    });
  };

  return (
    <div className={reimstyles.overlay}>
      <div className={reimstyles.dialog} ref={dialogRef}>
        <button onClick={onClose} className={reimstyles.closeButton}>
          ×
        </button>

        <div className={reimstyles.customDropdown} onClick={toggleCalendar}>
          <div className={reimstyles.leftSide}>
            <FaCalendarAlt className={reimstyles.icon} />
            <span className={reimstyles.reimlabel}>{formattedDateRange}</span>
          </div>
          <FaChevronDown className={reimstyles.arrowIcon} />
        </div>

        {showCalendar && (
          <DateFilter dateRange={dateRange} setDateRange={setDateRange} onClose={() => setShowCalendar(false)} />
        )}

        <div className={styles.formControl}>
          <label htmlFor="select">Reimbursement Type </label>
          <select id="select" value={reimbursementType} onChange={(e) => setReimbursementType(e.target.value as ReimbursementFilterOptions["reimbursementType"])}>
            <option value="travel">Travel</option>
            <option value="phone">Phone</option>
            <option value="food">Food</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="selectPaidBy">Paid By</label>
          <select id="selectPaidBy" value={paidBy} onChange={(e) => setPaidBy(e.target.value as ReimbursementFilterOptions["paidBy"])}>
            <option value="company">Company</option>
            <option value="emp">Employee</option>
          </select>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="selectStatus">Status </label>
          <select id="selectStatus" value={status} onChange={(e) => setStatus(e.target.value as ReimbursementFilterOptions["status"])}>
            <option value="pending">Pending</option>
            <option value="reject">Rejected</option>
            <option value="approve">Approved</option>
          </select>
        </div>

        <button className={reimstyles.applyButton} onClick={handleApplyFilter}>
          Export
        </button>
      </div>
    </div>
  );
};

export default ReimbursementFilterDialog;
