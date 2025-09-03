import React, { useEffect, useState } from "react";
import styles from "./approvalsection.module.css";
import { FiPlus } from "react-icons/fi";
import LeaveCard from "./LeaveCard";
import WeekOffCard from "./WeekOffCard";
import LeaveDialog from "./LeaveDialog";
import WeekOffDialog from "./WeekOffDialog";
import AssetCard from "./AssetCard";
import AssetDialog from "./AssetDialog";
import RegularizationCard from "./RegularizationCard";
import RegularizationDialog from "./RegularizationDialog";
import ReimbursementCard from "./ReimbursementCard";
import ReimbursementDialog from "./ReimbursementDialog";
import ShiftRequestCard from "./ShiftRequestCard";
import ShiftRequestDialog from "./ShiftRequestDialog";

import {
  dummyLeaveData,
  dummyWeekOffData,
  dummyAssetData,
  dummyReguData,
  dummyReimData,
  dummyShiftData,
} from "./approvalsectiondummydata";

// ✅ Types
interface ApprovalSectionProps {
  onPendingCountChange?: (count: number) => void;
}

interface LeaveData {
  status?: string;
  [key: string]: any;
}

type SectionOptions =
  | "All"
  | "Leave"
  | "WeekOff"
  | "Regularization"
  | "Reimbursement"
  | "Asset"
  | "Shift Requests";

const optionsList: SectionOptions[] = [
  "All",
  "Leave",
  "WeekOff",
  "Regularization",
  "Reimbursement",
  "Asset",
  "Shift Requests",
];

const ApprovalSection: React.FC<ApprovalSectionProps> = ({ onPendingCountChange }) => {
  const [activeSection, setActiveSection] = useState<string>("pending");

  // Dialog states
  const [openLeaveDialog, setOpenLeaveDialog] = useState<boolean>(false);
  const [openWeekOffDialog, setOpenWeekOffDialog] = useState<boolean>(false);
  const [openAssetDialog, setOpenAssetDialog] = useState<boolean>(false);
  const [openReguDialog, setOpenReguDialog] = useState<boolean>(false);
  const [openReimDialog, setOpenReimDialog] = useState<boolean>(false);
  const [openShiftDialog, setOpenShiftDialog] = useState<boolean>(false);

  // Selected Data States
  const [selectedLeave, setSelectedLeave] = useState<LeaveData | null>(null);
  const [selectedWeekOff, setSelectedWeekOff] = useState<LeaveData | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<LeaveData | null>(null);
  const [selectedRegu, setSelectedRegu] = useState<LeaveData | null>(null);
  const [selectedReim, setSelectedReim] = useState<LeaveData | null>(null);
  const [selectedShift, setSelectedShift] = useState<LeaveData | null>(null);

  // Dialog Handlers
  const handleLeaveCardClick = (leave: LeaveData) => {
    setSelectedLeave(leave);
    setOpenLeaveDialog(true);
  };

  const handleWeekOffCardClick = (weekoff: LeaveData) => {
    setSelectedWeekOff(weekoff);
    setOpenWeekOffDialog(true);
  };

  const handleAssetCardClick = (asset: LeaveData) => {
    setSelectedAsset(asset);
    setOpenAssetDialog(true);
  };

  const handleReguCardClick = (regu: LeaveData) => {
    setSelectedRegu(regu);
    setOpenReguDialog(true);
  };

  const handleReimCardClick = (reim: LeaveData) => {
    setSelectedReim(reim);
    setOpenReimDialog(true);
  };

  const handleShiftCardClick = (shift: LeaveData) => {
    setSelectedShift(shift);
    setOpenShiftDialog(true);
  };

  // Dropdown states
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<SectionOptions[]>(["All"]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSelectOption = (option: SectionOptions) => {
    setSelectedOptions((prev) => {
      if (option === "All") return ["All"];
      if (prev.includes("All")) return [option];
      if (!prev.includes(option)) return [...prev, option];
      return prev;
    });
    setShowDropdown(false);
  };

  const handleRemoveOption = (option: SectionOptions) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== option));
  };

  // Pending counts
  const getCount = (data: LeaveData[]) =>
    data.filter((item) => item.status?.toLowerCase() === activeSection).length;

  const pendingLeaveCount = getCount(dummyLeaveData);
  const pendingWeekOffCount = getCount(dummyWeekOffData);
  const pendingAssetCount = getCount(dummyAssetData);
  const pendingReguCount = getCount(dummyReguData);
  const pendingReimCount = getCount(dummyReimData);
  const pendingShiftCount = getCount(dummyShiftData);

  const totalPendingCount =
    pendingLeaveCount +
    pendingWeekOffCount +
    pendingAssetCount +
    pendingReguCount +
    pendingReimCount +
    pendingShiftCount;

  useEffect(() => {
    if (onPendingCountChange) {
      onPendingCountChange(totalPendingCount);
    }
  }, [totalPendingCount, onPendingCountChange]);

  return (
    <div className={styles.wholeContainer}>
      {/* --- UI Header with Filters --- */}
      <div className={styles.firstSection}>
        <div className={styles.filterText}>Filter out your data...</div>
        <div className={styles.filterSection}>
          <div className={styles.iconContainer}>
            <div onClick={toggleDropdown} className={styles.plusIcon}>
              <FiPlus size={18} />
            </div>
          </div>
          <div className={styles.optionRendering}>
            {selectedOptions.map((option) => (
              <div key={option} className={styles.options}>
                <div>{option}</div>
                <div
                  style={{ marginLeft: "8px", cursor: "pointer", color: "grey" }}
                  onClick={() => handleRemoveOption(option)}
                >
                  x
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filteringDataSection}>
          <div className={styles.pendingDataButton} onClick={() => setActiveSection("pending")}>
            Pending Applications
          </div>
          <div className={styles.approveDataButton} onClick={() => setActiveSection("approved")}>
            Approved Applications
          </div>
          <div className={styles.rejectDataButton} onClick={() => setActiveSection("rejected")}>
            Rejected Applications
          </div>
        </div>

        {showDropdown && (
          <div className={styles.dropdown}>
            {optionsList.map((option) => {
              const isSelected = selectedOptions.includes(option);
              return (
                <div
                  key={option}
                  className={`${styles.dropdownItem} ${isSelected ? styles.disabledItem : ""}`}
                  onClick={() => {
                    if (!isSelected) handleSelectOption(option);
                  }}
                  style={{
                    cursor: isSelected ? "not-allowed" : "pointer",
                    opacity: isSelected ? 0.5 : 1,
                  }}
                >
                  {option}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* --- Main Section --- */}
      <div className={styles.secondSection}>
        {(selectedOptions.includes("All") || selectedOptions.includes("Leave")) && (
          <div className={styles.leaveSection}>
            <div className={styles.sectionHeader}>
              <span>Leave</span>
              <div className={styles.pendingCircle}>{pendingLeaveCount}</div>
            </div>
            {dummyLeaveData
              .filter((leave) => leave.status?.toLowerCase() === activeSection)
              .map((leave, index) => (
                <div key={index} onClick={() => handleLeaveCardClick(leave)}>
                  <LeaveCard pendingLeave={leave} />
                </div>
              ))}
            {openLeaveDialog && selectedLeave && (
              <LeaveDialog
                leaveSelect={{
                  appliedOn: selectedLeave.appliedOn ?? new Date(),
                  startDate: selectedLeave.startDate ?? new Date(),
                  endDate: selectedLeave.endDate ?? new Date(),
                  numberOfDays: selectedLeave.numberOfDays ?? 0,
                  employeeName: selectedLeave.employeeName ?? "",
                  status: selectedLeave.status ?? "Pending",
                  leaveType: selectedLeave.leaveType ?? "Other",
                  reason: selectedLeave.reason ?? "No reason provided"
                }}
                onClose={() => setOpenLeaveDialog(false)}
              />
            )}

          </div>
        )}

        {(selectedOptions.includes("All") || selectedOptions.includes("WeekOff")) && (
          <div className={styles.weekoffSection}>
            <div className={styles.sectionHeader}>
              <span>Week Off</span>
              <div className={styles.pendingCircle}>{pendingWeekOffCount}</div>
            </div>
            {dummyWeekOffData
              .filter((item) => item.status?.toLowerCase() === activeSection)
              .map((weekoff, index) => (
                <div key={index} onClick={() => handleWeekOffCardClick(weekoff)}>
                  <WeekOffCard pendingWeekoff={weekoff} />
                </div>
              ))}
            {openWeekOffDialog && (
              <WeekOffDialog weekoffSelect={selectedWeekOff} onClose={() => setOpenWeekOffDialog(false)} />
            )}
          </div>
        )}

        {(selectedOptions.includes("All") || selectedOptions.includes("Asset")) && (
          <div className={styles.assetSection}>
            <div className={styles.sectionHeader}>
              <span>Asset</span>
              <div className={styles.pendingCircle}>{pendingAssetCount}</div>
            </div>
            {dummyAssetData
              .filter((item) => item.status?.toLowerCase() === activeSection)
              .map((asset, index) => (
                <div key={index} onClick={() => handleAssetCardClick(asset)}>
                  <AssetCard pendingAsset={{ ...asset, quantity: Number(asset.quantity) }} />
                </div>
              ))}
            {openAssetDialog && selectedAsset && (
              <AssetDialog
                asset={{
                  employeeName: selectedAsset.employeeName || "",
                  appliedOn: selectedAsset.appliedOn || new Date(),
                  assetDate: selectedAsset.assetDate || new Date(),
                  assetType: selectedAsset.assetType || "Other",
                  quantity: Number(selectedAsset.quantity) || 0,
                  status: selectedAsset.status,
                  remark: selectedAsset.reason || "",
                  attachment: selectedAsset.attachment
                }}
                onClose={() => setOpenAssetDialog(false)}
              />

            )}
          </div>
        )}

        {(selectedOptions.includes("All") || selectedOptions.includes("Regularization")) && (
          <div className={styles.regularizationSection}>
            <div className={styles.sectionHeader}>
              <span>Regularization</span>
              <div className={styles.pendingCircle}>{pendingReguCount}</div>
            </div>
            {dummyReguData
              .filter((item) => item.status?.toLowerCase() === activeSection)
              .map((regu, index) => (
                <div key={index} onClick={() => handleReguCardClick(regu)}>
                  <RegularizationCard pendingRegu={regu} />
                </div>
              ))}
            {openReguDialog && selectedRegu && (<RegularizationDialog
              reguSelect={{
                employeeName: selectedRegu.employeeName || "",
                appliedOn: selectedRegu.appliedOn || new Date(),
                checkIn: selectedRegu.checkIn || new Date(),
                checkOut: selectedRegu.checkOut || new Date(),
                regularizeDate: selectedRegu.regularizeDate || new Date(),
                reguType: selectedRegu.reguType || "Other",
                reason: selectedRegu.reason || "No reason",
                status: selectedRegu.status || "Pending"
              }}
              onClose={() => setOpenReguDialog(false)}
            />)}



          </div>
        )}

        {(selectedOptions.includes("All") || selectedOptions.includes("Reimbursement")) && (
          <div className={styles.reimbursementSection}>
            <div className={styles.sectionHeader}>
              <span>Reimbursement</span>
              <div className={styles.pendingCircle}>{pendingReimCount}</div>
            </div>
            {dummyReimData
              .filter((item) => item.status?.toLowerCase() === activeSection)
              .map((reim, index) => (
                <div key={index} onClick={() => handleReimCardClick({
                  ...reim,
                  reimDate: new Date(reim.reimDate),
                  appliedOn: new Date(reim.appliedOn),
                  amount: Number(reim.amount), // if amount is string
                })}>
                  <ReimbursementCard
                    pendingReim={{
                      ...reim,
                      reimDate: new Date(reim.reimDate),
                      amount: Number(reim.amount),
                    }}
                  />
                </div>
              ))}
            {openReimDialog && selectedReim && (
              <ReimbursementDialog
                reim={{
                  employeeName: selectedReim.employeeName || "",
                  appliedOn: selectedReim.appliedOn || new Date(),
                  reimDate: selectedReim.reimDate || new Date(),
                  reimburseType: selectedReim.reimburseType || "Other",
                  amount: Number(selectedReim.amount) || 0,
                  approvalBy: selectedReim.approvalBy || "",
                  remark: selectedReim.reason || "",
                  attachFile: selectedReim.attachFile,
                  attachBillInvoice: selectedReim.attachBillInvoice,
                  status: selectedReim.status || "Pending",
                }}
                onClose={() => setOpenReimDialog(false)}
              />
            )}
          </div>
        )}

        {(selectedOptions.includes("All") || selectedOptions.includes("Shift Requests")) && (
          <div className={styles.shiftRequestsSection}>
            <div className={styles.sectionHeader}>
              <span>Shift Requests</span>
              <div className={styles.pendingCircle}>{pendingShiftCount}</div>
            </div>
            {dummyShiftData
              .filter((item) => item.status?.toLowerCase() === activeSection)
              .map((shift, index) => (
                <div key={index} onClick={() => handleShiftCardClick({
                  ...shift,
                  appliedOn: new Date(shift.appliedOn),
                  shiftrequestdate: new Date(shift.shiftrequestdate),
                })}>
                  <ShiftRequestCard
                    pendingShift={{
                      ...shift,
                      shiftrequestdate: new Date(shift.shiftrequestdate),
                    }}
                  />
                </div>
              ))}
            {openShiftDialog && selectedShift && (
              <ShiftRequestDialog
                shift={{
                  employeeName: selectedShift.employeeName || "",
                  appliedOn: selectedShift.appliedOn || new Date(),
                  shiftrequestdate: selectedShift.shiftrequestdate || new Date(),
                  shift: selectedShift.shift || "Morning",
                  reason: selectedShift.reason || "",
                  status: selectedShift.status || "Pending",
                }}
                onClose={() => setOpenShiftDialog(false)}
              />
            )}


          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalSection;
