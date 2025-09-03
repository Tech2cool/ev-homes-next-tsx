import React, { useRef, useState } from "react";
import styles from "./leaveform.module.css";
import { FaCalendarDay, FaFileUpload, FaCheck } from "react-icons/fa";
import { MdOutlineFeedback, MdAttachMoney } from "react-icons/md";

interface ReimbursementFormProps {
  oncencel: () => void;
}

const ReimbursementForm: React.FC<ReimbursementFormProps> = ({ oncencel }) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const billInputRef = useRef<HTMLInputElement | null>(null);
  const [bill, setBill] = useState<File | null>(null);

  const dateRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <div className={styles.formHeadline}>Reimbursement Application Form</div>
      {/* Date Input */}
      <div className={styles.formControl} onClick={() => dateRef.current?.showPicker()}>
        <label htmlFor="date">
          <FaCalendarDay /> Date <span style={{ color: "red" }}>*</span>
        </label>
        <input type="date" ref={dateRef} id="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      {/* Reimbursement Type */}
      <div className={styles.formControl}>
        <label htmlFor="select">
          <MdAttachMoney /> Reimbursement Type <span style={{ color: "red" }}>*</span>
        </label>
        <select id="select">
          <option value="travel">Travel</option>
          <option value="phone">Phone</option>
          <option value="food">Food</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </div>

      {/* Amount */}
      <div className={styles.formControl}>
        <label htmlFor="amount">
          <MdAttachMoney /> Amount <span style={{ color: "red" }}>*</span>
        </label>
        <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount" />
      </div>

      {/* Approval By */}
      <div className={styles.formControl}>
        <label htmlFor="approval">
          <FaCheck /> Approval By <span style={{ color: "red" }}>*</span>
        </label>
        <select id="approval">
          <option value="1">Deepak Karki</option>
          <option value="2">Ranjana Parmar</option>
          <option value="3">Satish Vanis</option>
          <option value="4">etc.</option>
        </select>
      </div>

      {/* Remark */}
      <div className={styles.formControl}>
        <label htmlFor="remark">
          <MdOutlineFeedback /> Remark <span style={{ color: "red" }}>*</span>
        </label>
        <textarea id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} rows={4} />
      </div>

      {/* Attachments */}
      <div className={styles.attachmentContainer}>
        <div className={styles.formControlAttach}>
          <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ display: "none" }} />
          <div className={styles.uploadBox} onClick={() => fileInputRef.current?.click()}>
            <FaFileUpload className={styles.inputIcon} />
            <div>
              <span className={styles.uploadText}>Attach File</span>
            </div>
          </div>
          {file && <span className={styles.fileName}>{file.name}</span>}
        </div>

        <div className={styles.formControlAttach}>
          <input type="file" ref={billInputRef} onChange={(e) => setBill(e.target.files?.[0] || null)} style={{ display: "none" }} />
          <div className={styles.uploadBox} onClick={() => billInputRef.current?.click()}>
            <FaFileUpload className={styles.inputIcon} />
            <div>
              <span className={styles.uploadText}>Attach Bill Invoice</span>
            </div>
          </div>
          {bill && <span className={styles.fileName}>{bill.name}</span>}
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.buttonRow}>
        <button className={styles.cancelButton} onClick={oncencel} type="button">
          Cancel
        </button>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReimbursementForm;
