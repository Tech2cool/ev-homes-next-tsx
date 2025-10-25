"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css"
import { IoLocation } from "react-icons/io5";

import ReactDOM from "react-dom";

interface CancelBookingProps {
    openclick: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormState {
 
    remark: string,
}

const CancelBooking: React.FC<CancelBookingProps> = ({ openclick }) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setformData] = useState<FormState>({
        remark: "",
    })
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
                openclick(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [openclick]);


    const handleCancel = () => {
        setformData({
         
            remark: "",
        })
        openclick(false);
    }
    const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setformData((prev) => ({ ...prev, [name]: value }));
    };
    const onSubmit = () => {
        const newErrors: { [key: string]: string } = {};

       

        if (!formData.remark.trim()) {
            newErrors.remark = "Please enter Remark";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        alert("Form submitted successfully: \n" + JSON.stringify(formData, null, 2));
        openclick(false);
    };
    const RequiredLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
        <label style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            {icon}
            <span>{text}</span>
            <span style={{ color: "red", fontSize: "15px", marginLeft: "-1px" }}>*</span>
        </label>
    );
    return ReactDOM.createPortal(

        <div className={styles.dialogOverlay}>
            <div ref={dialogRef} className={styles.dialogBox}>
                <h3 className={styles.dialogTitle}>🚫 Cancel Booking</h3>
                <p className={styles.dialogTitle} style={{fontSize:"15px",letterSpacing:"1px", color:"grey"}}>
                    Please Provide a season for Cancellation:   
                </p>

                <div className={styles.dailogcnt}>
                   

                
                    <div className={styles.formControl}>
                        <label>
                            <RequiredLabel icon={<IoLocation className={styles.iconcolor} />} text="Remark" />
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Reason for Cancellation"
                            value={formData.remark}
                            name="remark"
                            onChange={onChangeField}
                        />
                        {errors.remark && <p className={styles.errorMsg}>{errors.remark}</p>}
                    </div>


                    <div className={styles.dialogButtons}>
                        <button
                            className={styles.cancelBtn}
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.submitBtn}
                            onClick={onSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>



            </div>
        </div>,
        document.body
    );
};

export default CancelBooking;
