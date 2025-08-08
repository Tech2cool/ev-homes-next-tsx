import React, { useRef, useState } from "react";
import styles from "./leaveform.module.css";
import { FaCalendarDay, FaFileUpload, FaCheck } from "react-icons/fa";
import { MdOutlineFeedback, MdAttachMoney } from "react-icons/md";

const ReimbursementForm = ({oncencel}) => {
  const [date, setdate] = useState("");
  const [amount, setamount] = useState("");
  const [remark, setremark] = useState("");

  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const billInputRef = useRef(null);
  const [bill, setBill] = useState(null);

  const dateRef = useRef(null);

  return (
    <div>
      <div className={styles.formHeadline}>Reimbursement Application Form</div>

      <div
        className={` ${styles.formControl}`}
        onClick={() => dateRef.current?.showPicker()}
      >
        <label htmlFor="date">
          <FaCalendarDay /> Date <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          ref={dateRef}
          id="date"
          value={date}
          onChange={(e) => setdate(e.target.value)}
        />
      </div>

      <div className={styles.formControl}>
        <label htmlFor="select">
          <MdAttachMoney /> Reimbursement Type{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <select name="select" id="select">
          <option value="travel">Travel</option>
          <option value="phone">Phone</option>
          <option value="food">Food</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </div>

      <div className={styles.formControl}>
        <label htmlFor="amount">
          <MdAttachMoney /> Amount <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setamount(e.target.value)}
          placeholder="Enter Amount"
        />
      </div>

      <div className={styles.formControl}>
        <label htmlFor="select">
          <FaCheck /> Approval By <span style={{ color: "red" }}>*</span>
        </label>
        <select name="select" id="select">
          <option value="1">Deepak Karki</option>
          <option value="2">Ranjana Parmar</option>
          <option value="3">Satish Vanis</option>
          <option value="4">etc.</option>
        </select>
      </div>

      <div className={styles.formControl}>
        <label htmlFor="remark">
          <MdOutlineFeedback /> Remark <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          id="remark"
          value={remark}
          onChange={(e) => setremark(e.target.value)}
          placeholder=""
          rows={4}
        />
      </div>

      <div className={styles.attachmentContainer}>
        <div className={styles.formControlAttach}>
          <input
            type="file"
            id="attachment"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />

          <div
            className={styles.uploadBox}
            onClick={() => fileInputRef.current.click()}
          >
            <FaFileUpload className={styles.inputIcon} />
            <div>
              <span className={styles.uploadText}>Attach File</span>
            </div>
          </div>

          {file && <span className={styles.fileName}>{file.name}</span>}
        </div>
        <div className={styles.formControlAttach}>
          <input
            type="file"
            id="attachment"
            ref={billInputRef}
            onChange={(e) => setBill(e.target.files[0])}
            style={{ display: "none" }}
          />

          <div
            className={styles.uploadBox}
            onClick={() => billInputRef.current.click()}
          >
            <FaFileUpload className={styles.inputIcon} />
            <div>
              <span className={styles.uploadText}>Attach Bill Invoice</span>
            </div>
          </div>

          {bill && <span className={styles.fileName}>{bill.name}</span>}
        </div>
      </div>

      <div className={styles.buttonRow}>
        <button className={styles.cancelButton } onClick={oncencel} type="button">
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
