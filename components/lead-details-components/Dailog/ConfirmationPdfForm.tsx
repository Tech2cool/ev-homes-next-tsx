"use client";
import React, { useState, useEffect } from "react";
import styles from "./ConfirmationPdfForm.module.css";
import { IoClose } from "react-icons/io5";

interface  ConfirmationPdfFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const ConfirmationPdfForm: React.FC<ConfirmationPdfFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    unitNo: "",
    sqmtrs: "",
    floor: "",
    buildingNo: "",
    amount: "",
    transactionNo: "",
    date: "",
    bankName: "",
    branch: "",
    dateOfTransaction: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      date: new Date().toISOString().split("T")[0],
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const missing = Object.entries(formData).find(([_, v]) => !v.trim());
    if (missing) {
      alert("⚠️ Please fill all the fields before submitting.");
      return;
    }

    console.log("✅ Receipt Form submitted with data:", formData);
    onSubmit(formData);

  };

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <button className={styles.cancelbtn} onClick={onClose}>
          <IoClose />
        </button>

        <p className={styles.Heading}>RECEIPT DETAILS</p>
        <p className={styles.Instruction}>
          Please enter all details before generating the PDF
        </p>

        <div className={styles.formVertical}>
          <div className={styles.formgroupFull}>
            <label>Unit No</label>
            <input  
              type="text"
              name="unitNo"
              placeholder="Enter Unit No."
              onChange={handleChange}
              value={formData.unitNo}
            />
          </div>

          <div className={styles.formgroupFull}>
            <label>Sqmtrs</label>
            <input
              type="text"
              name="sqmtrs"
              placeholder="Enter Sqmtrs"
              onChange={handleChange}
              value={formData.sqmtrs}
            />
          </div>

          <div className={styles.formgroupFull}>
            <label>Floor</label>
            <input
              type="text"
              name="floor"
              placeholder="Enter Floor"
              onChange={handleChange}
              value={formData.floor}
            />
          </div>

          <div className={styles.formgroupFull}>
            <label>Building No</label>
            <input
              type="text"
              name="buildingNo"
              placeholder="Enter Building No."
              onChange={handleChange}
              value={formData.buildingNo}
            />
          </div>

          <div className={styles.formgroupFull}>
            <label>Amount</label>
            <input
              type="text"
              name="amount"
              placeholder="Enter Amount"
              onChange={handleChange}
              value={formData.amount}
            />
          </div>

          <div className={styles.formgroupFull}>
            <label>Transaction No</label>
            <input
              type="text"
              name="transactionNo"
              placeholder="Enter Transaction No."
              onChange={handleChange}
              value={formData.transactionNo}
            />
          </div>

          <div className={styles.formgroupFull}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={formData.date}
            />
          </div>

          <div className={styles.formgroupFull}>
            <label>Bank</label>
            <input
              type="text"
              name="bankName"
              placeholder="Enter Bank Name"
              onChange={handleChange}
              value={formData.bankName}
            />
          </div>

          <div className={styles.formgroupFull}>
            <label>Branch</label>
            <input
              type="text"
              name="branch"
              placeholder="Enter Branch Name"
              onChange={handleChange}
              value={formData.branch}
            />
          </div>

          <div className={styles.formgroupFull}>
            <label>Date of Transaction</label>
            <input
              type="date"
              name="dateOfTransaction"
              onChange={handleChange}
              value={formData.dateOfTransaction}
            />
          </div>
        </div>

        <button className={styles.SubmitFrom} onClick={handleSubmit}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPdfForm;
