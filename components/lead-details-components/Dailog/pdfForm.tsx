import React, { useState, useEffect } from "react";
import styles from "./pdfForm.module.css";
import { IoClose } from "react-icons/io5";

interface PdfFormsProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const PdfForm: React.FC<PdfFormsProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    floor: "",
    unit: "",
    sqmtrs: "",
    amount: "",
    secondAmount: "",
    paymentDate: "",
    TransactionNo:""
  });

 
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      paymentDate: new Date().toISOString().split("T")[0],
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      !formData.floor ||
      !formData.unit ||
      !formData.sqmtrs ||
      !formData.amount ||
      !formData.secondAmount ||
      !formData.paymentDate
    ) {
      alert("⚠️ Please fill all the fields before submitting.");
      return;
    }
    console.log("✅ Form submitted with data:", formData);
    onSubmit(formData);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <button className={styles.cancelbtn} onClick={onClose}>
          <IoClose />
        </button>

        <p className={styles.Heading}>PAYMENT DETAILS</p>
        <p className={styles.Instruction}>
          Please enter the details before generating the PDF
        </p>

        <div className={styles.formVertical}>
          <div className={styles.formgroupFull}>
            <label>Floor</label>
            <input
              type="text"
              name="floor"
              placeholder="Enter Floor No."
              onChange={handleChange}
              value={formData.floor}
            />
          </div>

          <div className={styles.formgroupFull}>
            <label>Unit</label>
            <input
              type="text"
              name="unit"
              placeholder="Enter Unit No."
              onChange={handleChange}
              value={formData.unit}
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
            <label>Amount</label>
            <input
              type="text"
              name="amount"
              placeholder="Enter the Amount"
              onChange={handleChange}
              value={formData.amount}
            />
          </div>

          <div className={styles.formgroupFull}>
            <label>Second Amount</label>
            <input
              type="text"
              name="secondAmount"
              placeholder="Enter the Second Amount"
              onChange={handleChange}
              value={formData.secondAmount}
            />
          </div>

          <div className={styles.formgroupFull}>
            <label>Payment Date</label>
            <input
              type="date"
              name="paymentDate"
              onChange={handleChange}
              value={formData.paymentDate}
            />
          </div>
          
          <div className={styles.formgroupFull}>
            <label>Transaction Number</label>
            <input
              type="text"
              name="TransactionNo"
              onChange={handleChange}
              value={formData.TransactionNo}
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

export default PdfForm;
