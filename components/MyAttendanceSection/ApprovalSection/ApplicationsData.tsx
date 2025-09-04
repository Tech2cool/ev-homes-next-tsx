import React from "react";
import styles from "./approvedapplicationsdata.module.css";

import { dateFormatOnly, timeFormatOnly } from "@/hooks/useDateFormat";

// Define types for each data structure
interface Applicant {
  firstName: string;
  lastName: string;
}

interface LeaveData {
  id?: string | number;
  applicant?: Applicant;
  appliedOn?: string;
  startDate?: string;
  endDate?: string;
  numberOfDays?: number;
  leaveType?: { leave: string };
  leaveReason?: string;
  attachedFile?: string;
  leaveStatus?: string;
}

interface WeekOffData {
  id?: string | number;
  applyBy?: Applicant;
  appliedOn?: string;
  weekoffDate?: string;
  reason?: string;
  weekoffStatus?: string;
}

interface ReguData {
  id?: string | number;
  applyBy?: Applicant;
  appliedOn?: string;
  regularizationDate?: string;
  checkInTime?: string;
  checkOutTime?: string;
  type?: string;
  reason?: string;
  regularizationStatus?: string;
}

interface ReimData {
  id?: string | number;
  applyBy?: Applicant;
  appliedOn?: string;
  reimbursementDate?: string;
  type?: string;
  amount?: number;
  reason?: string;
  attachment?: string;
  attachment2?: string;
  reimbursementStatus?: string;
}

interface AssetData {
  id?: string | number;
  applyBy?: Applicant;
  appliedOn?: string;
  assetRequestDate?: string;
  accessory?: { accessory: string };
  reason?: string;
  assetRequestStatus?: string;
}

interface ShiftData {
  id?: string | number;
  appliedBy?: Applicant;
  appliedDate?: string;
  requestedShift?: { shiftName: string };
  requestedShiftDate?: string;
  reason?: string;
  requestStatus?: string;
}

// Props type for the component
interface ApplicationsDataProps {
  statusFilter: string;
  selectedOptions: string[];
  approvalLeaveData: { data: LeaveData[] };
  approvalWeekOffData: { data: WeekOffData[] };
  approvalReguData: { data: ReguData[] };
  approvalShiftData: { data: ShiftData[] };
  approvalAssetData: { data: AssetData[] };
  approvalReimData: { data: ReimData[] };
}

const ApplicationsData: React.FC<ApplicationsDataProps> = ({
  statusFilter,
  selectedOptions,
  approvalLeaveData,
  approvalWeekOffData,
  approvalReguData,
  approvalShiftData,
  approvalAssetData,
  approvalReimData,
}) => {
  const getStatusClass = () => {
    return statusFilter === "approved"
      ? styles.approvedStatus
      : styles.rejectedStatus;
  };

  return (
    <div className={styles.container}>
      {/* LEAVE Section */}
      {(selectedOptions.includes("All") || selectedOptions.includes("Leave")) &&
        Array.isArray(approvalLeaveData?.data) &&
        approvalLeaveData.data.filter((leave) => leave?.leaveStatus === statusFilter).length > 0 && (
          <div className={styles.section}>
            <div className={styles.headline}>Leave</div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Applied On</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Days</th>
                  <th>Type</th>
                  <th>Reason</th>
                  <th>Attachment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvalLeaveData.data
                  .filter((leave) => leave?.leaveStatus === statusFilter)
                  .map((l, index) => (
                    <tr key={`${l.id || index}`}>
                      <td>{l?.applicant?.firstName} {l?.applicant?.lastName}</td>
                      <td>{dateFormatOnly(l?.appliedOn)}</td>
                      <td>{dateFormatOnly(l?.startDate)}</td>
                      <td>{dateFormatOnly(l?.endDate)}</td>
                      <td>{l?.numberOfDays}</td>
                      <td>{l?.leaveType?.leave}</td>
                      <td>{l?.leaveReason}</td>
                      <td>{l?.attachedFile ?? "-"}</td>
                      <td><span className={getStatusClass()}>{l.leaveStatus}</span></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

      {/* WEEKOFF Section */}
      {(selectedOptions.includes("All") || selectedOptions.includes("WeekOff")) &&
        Array.isArray(approvalWeekOffData?.data) &&
        approvalWeekOffData.data.filter((weekoff) => weekoff?.weekoffStatus === statusFilter).length > 0 && (
          <div className={styles.section}>
            <div className={styles.headline}>WeekOff</div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Applied On</th>
                  <th>WeekOff Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvalWeekOffData.data
                  .filter((weekoff) => weekoff.weekoffStatus === statusFilter)
                  .map((weekoff, index) => (
                    <tr key={`${weekoff.id || index}`}>
                      <td>{weekoff?.applyBy?.firstName} {weekoff?.applyBy?.lastName}</td>
                      <td>{dateFormatOnly(weekoff?.appliedOn)}</td>
                      <td>{dateFormatOnly(weekoff?.weekoffDate)}</td>
                      <td>{weekoff?.reason}</td>
                      <td><span className={getStatusClass()}>{weekoff?.weekoffStatus}</span></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

      {/* REGULARIZATION Section */}
      {(selectedOptions.includes("All") || selectedOptions.includes("Regularization")) &&
        Array.isArray(approvalReguData?.data) &&
        approvalReguData.data.filter((regu) => regu?.regularizationStatus === statusFilter).length > 0 && (
          <div className={styles.section}>
            <div className={styles.headline}>Regularization</div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Applied On</th>
                  <th>Regularize Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Type</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvalReguData.data
                  .filter((regu) => regu.regularizationStatus === statusFilter)
                  .map((regu, index) => (
                    <tr key={`${regu.id || index}`}>
                      <td>{regu?.applyBy?.firstName} {regu?.applyBy?.lastName}</td>
                      <td>{dateFormatOnly(regu?.appliedOn)}</td>
                      <td>{dateFormatOnly(regu?.regularizationDate)}</td>
                      <td>{timeFormatOnly(regu?.checkInTime)}</td>
                      <td>{timeFormatOnly(regu?.checkOutTime)}</td>
                      <td>{regu?.type}</td>
                      <td>{regu?.reason}</td>
                      <td><span className={getStatusClass()}>{regu?.regularizationStatus}</span></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

      {/* REIMBURSEMENT Section */}
      {(selectedOptions.includes("All") || selectedOptions.includes("Reimbursement")) &&
        Array.isArray(approvalReimData?.data) &&
        approvalReimData.data.filter((reim) => reim?.reimbursementStatus === statusFilter).length > 0 && (
          <div className={styles.section}>
            <div className={styles.headline}>Reimbursement</div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Applied On</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Remark</th>
                  <th>Attach File</th>
                  <th>Bill Invoice</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvalReimData.data
                  .filter((reim) => reim.reimbursementStatus === statusFilter)
                  .map((reim, index) => (
                    <tr key={`${reim.id || index}`}>
                      <td>{reim?.applyBy?.firstName} {reim?.applyBy?.lastName}</td>
                      <td>{dateFormatOnly(reim?.appliedOn)}</td>
                      <td>{dateFormatOnly(reim?.reimbursementDate)}</td>
                      <td>{reim?.type}</td>
                      <td>{reim?.amount}</td>
                      <td>{reim?.reason}</td>
                      <td>{reim?.attachment}</td>
                      <td>{reim?.attachment2}</td>
                      <td><span className={getStatusClass()}>{reim?.reimbursementStatus}</span></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

      {/* ASSET Section */}
      {(selectedOptions.includes("All") || selectedOptions.includes("Asset")) &&
        Array.isArray(approvalAssetData?.data) &&
        approvalAssetData.data.filter((asset) => asset?.assetRequestStatus === statusFilter).length > 0 && (
          <div className={styles.section}>
            <div className={styles.headline}>Asset</div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Applied On</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Remark</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvalAssetData?.data
                  .filter((asset) => asset?.assetRequestStatus === statusFilter)
                  .map((asset, index) => (
                    <tr key={`${asset.id || index}`}>
                      <td>{asset?.applyBy?.firstName} {asset?.applyBy?.lastName}</td>
                      <td>{dateFormatOnly(asset?.appliedOn)}</td>
                      <td>{dateFormatOnly(asset.assetRequestDate)}</td>
                      <td>{asset?.accessory?.accessory}</td>
                      <td>{asset?.reason}</td>
                      <td><span className={getStatusClass()}>{asset?.assetRequestStatus}</span></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

      {/* SHIFT REQUEST Section */}
      {(selectedOptions.includes("All") || selectedOptions.includes("Shift Requests")) &&
        Array.isArray(approvalShiftData?.data) &&
        approvalShiftData.data.filter((shift) => shift?.requestStatus === statusFilter).length > 0 && (
          <div className={styles.section}>
            <div className={styles.headline}>Shift Requests</div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Applied On</th>
                  <th>Shift</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvalShiftData.data
                  .filter((shift) => shift.requestStatus === statusFilter)
                  .map((shift, index) => (
                    <tr key={`${shift.id || index}`}>
                      <td>{shift?.appliedBy?.firstName} {shift?.appliedBy?.lastName}</td>
                      <td>{dateFormatOnly(shift?.appliedDate)}</td>
                      <td>{shift?.requestedShift?.shiftName}</td>
                      <td>{dateFormatOnly(shift?.requestedShiftDate)}</td>
                      <td>{shift?.reason}</td>
                      <td><span className={getStatusClass()}>{shift?.requestStatus}</span></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default ApplicationsData;
