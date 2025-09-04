import React, { useRef, useState } from "react";
import styles from "./leaveform.module.css";
import { FaCalendarDay } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";
import { Calendar } from "lucide-react";

// Props Interface
interface AsstsFormProps {
  onCancel: () => void;
}

function AsstsForm({ onCancel }: AsstsFormProps) {
  const [assetDate, setAssetDate] = useState<string>("");
  const [remark, setRemark] = useState<string>("");
  const [assetType, setAssetType] = useState<string>("Mobile");
  const assetDateRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <div className={styles.formHeadline}>Apply Asset Request</div>

      <div className={styles.formControl} onClick={() => assetDateRef.current?.showPicker()}>
        <label htmlFor="assetdate">
          <FaCalendarDay /> Date <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          ref={assetDateRef}
          id="assetDate"
          value={assetDate}
          onChange={(e) => setAssetDate(e.target.value)}
        />
      </div>

      <div className={styles.formControl}>
        <label htmlFor="select">
          <Calendar /> Asset Type <span style={{ color: "red" }}>*</span>
        </label>
        <select id="select" value={assetType} onChange={(e) => setAssetType(e.target.value)}>
          <option value="Mobile">Mobile</option>
          <option value="Laptop">Laptop</option>
          <option value="SIM">SIM</option>
        </select>
      </div>

      <div className={styles.formControl}>
        <label htmlFor="remark">
          <MdOutlineFeedback /> Remark <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          id="remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter your Remark"
          rows={4}
        />
      </div>

      <div className={styles.buttonRow}>
        <button className={styles.cancelButton} onClick={onCancel} type="button">
          Cancel
        </button>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}

export default AsstsForm;
