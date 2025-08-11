import React, { useEffect, useState } from "react";
import styles from "./approvalsection.module.css";
import { FiSearch, FiPlus } from "react-icons/fi";
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
import ApplicationsData from "./ApplicationsData";

import {
  dummyLeaveData,
  dummyWeekOffData,
  dummyAssetData,
  dummyReguData,
  dummyReimData,
  dummyShiftData,
} from "./approvalsectiondummydata";

const optionsList = [
  "All",
  "Leave",
  "WeekOff",
  "Regularization",
  "Reimbursement",
  "Asset",
  "Shift Requests",
];

const ApprovalSection = ({ onPendingCountChange }) => {
  const [activeSection, setActiveSection] = useState("pending");

  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [openWeekOffDialog, setOpenWeekOffDialog] = useState(false);
  const [openAssetDialog, setOpenAssetDialog] = useState(false);
  const [openReguDialog, setOpenReguDialog] = useState(false);
  const [openReimDialog, setOpenReimDialog] = useState(false);
  const [openShiftDialog, setOpenShiftDialog] = useState(false);

  const [selectedLeave, setSelectedLeave] = useState(null);
  const [selectedWeekOff, setSelectedWeekOff] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedRegu, setSelectedRegu] = useState(null);
  const [selectedReim, setSelectedReim] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);

  const handleLeaveCardClick = (leave) => {
    setSelectedLeave(leave);
    setOpenLeaveDialog(true);
  };

  const handleWeekOffCardClick = (weekoff) => {
    setSelectedWeekOff(weekoff);
    setOpenWeekOffDialog(true);
  };

  const handleAssetCardClick = (asset) => {
    setSelectedAsset(asset);
    setOpenAssetDialog(true);
  };

  const handleReguCardClick = (regu) => {
    setSelectedRegu(regu);
    setOpenReguDialog(true);
  };

  const handleReimCardClick = (reim) => {
    setSelectedReim(reim);
    setOpenReimDialog(true);
  };

  const handleShiftCardClick = (shift) => {
    setSelectedShift(shift);
    setOpenShiftDialog(true);
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(["All"]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSelectOption = (option) => {
    setSelectedOptions((prev) => {
      if (option === "All") return ["All"];
      if (prev.includes("All")) return [option];
      if (!prev.includes(option)) return [...prev, option];
      return prev;
    });
    setShowDropdown(false);
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== option));
  };

  const pendingLeaveCount = dummyLeaveData.filter((leave) => leave.status?.toLowerCase() === activeSection)
.length;
  const pendingWeekOffCount = dummyWeekOffData.filter(
    (item) => item.status?.toLowerCase() === activeSection
  ).length;
  
  const pendingAssetCount = dummyAssetData.filter(
    (item) => item.status?.toLowerCase() === activeSection
  ).length;
  const pendingReguCount = dummyReguData.filter(
    (item) => item.status?.toLowerCase() === activeSection
  ).length;
  const pendingReimCount = dummyReimData.filter(
    (item) => item.status?.toLowerCase() === activeSection
  ).length;
  const pendingShiftCount = dummyShiftData.filter(
    (item) => item.status?.toLowerCase() === activeSection
  ).length;

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
          <div
            className={styles.pendingDataButton}
            onClick={() => setActiveSection("pending")}
          >
            Pending Applications
          </div>
          <div
            className={styles.approveDataButton}
            onClick={() => setActiveSection("approved")}
          >
            Approved Applications
          </div>
          <div
            className={styles.rejectDataButton}
            onClick={() => setActiveSection("rejected")}
          >
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
            {openLeaveDialog && (
              <LeaveDialog
                leaveSelect={selectedLeave}
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
              <WeekOffDialog
                weekoffSelect={selectedWeekOff}
                onClose={() => setOpenWeekOffDialog(false)}
              />
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
                  <AssetCard pendingAsset={asset} />
                </div>
              ))}
            {openAssetDialog && (
              <AssetDialog
                asset={selectedAsset}
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
            {openReguDialog && (
              <RegularizationDialog
                reguSelect={selectedRegu}
                onClose={() => setOpenReguDialog(false)}
              />
            )}
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
                <div key={index} onClick={() => handleReimCardClick(reim)}>
                  <ReimbursementCard pendingReim={reim} />
                </div>
              ))}
            {openReimDialog && (
              <ReimbursementDialog
                reim={selectedReim}
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
                <div key={index} onClick={() => handleShiftCardClick(shift)}>
                  <ShiftRequestCard pendingShift={shift} />
                </div>
              ))}
            {openShiftDialog && (
              <ShiftRequestDialog
                shift={selectedShift}
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
