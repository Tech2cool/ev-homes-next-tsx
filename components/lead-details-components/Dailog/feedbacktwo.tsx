"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css";
import { IoLocation } from "react-icons/io5";
import { FaClock, FaStar, FaTag } from "react-icons/fa6";
import ReactDOM from "react-dom";
import { IoMdCall } from "react-icons/io";
import { GiProgression } from "react-icons/gi";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { LuAlarmClock } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import { MdCancel, MdFeedback } from "react-icons/md";

interface FeedbackTwoProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
  lead?: Lead | null;
  task?: Task | null;
}

interface FormState {
  callStatus: string;
  clientInterest: string;
  leadStage: string;
  feedback: string;
  priorityTag: string;
  siteVisit: string;
  reminderDateTime: string;
  reminderType: string;
  preferredVisitDate?: string;
}

const FeedbackTwo: React.FC<FeedbackTwoProps> = ({ openclick }) => {
  const currentTheme = document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
  const dialogRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<FormState>({
    callStatus: "",
    clientInterest: "",
    leadStage: "",
    feedback: "",
    priorityTag: "",
    siteVisit: "",
    reminderDateTime: "",
    reminderType: "",
    preferredVisitDate: "",
  });

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        openclick(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openclick]);

  const handleCancel = () => {
    setFormData({
      callStatus: "",
      clientInterest: "",
      leadStage: "",
      feedback: "",
      priorityTag: "",
      siteVisit: "",
      reminderDateTime: "",
      reminderType: "",
      preferredVisitDate: "",
    });
    setErrors({});
    openclick(false);
  };

  const onChangeField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.callStatus)
      newErrors.callStatus = "Please select Call Status";
    if (!formData.clientInterest)
      newErrors.clientInterest = "Please select Client Interest Level";
    if (!formData.leadStage) newErrors.leadStage = "Please select Lead Stage";
    if (!formData.feedback.trim()) newErrors.feedback = "Please enter feedback";

    // If leadStage is selected, validate the extra fields
    if (formData.leadStage) {
      if (!formData.priorityTag)
        newErrors.priorityTag = "Please select Priority Tag";
      if (!formData.siteVisit)
        newErrors.siteVisit = "Please select Site Visit status";
      if (!formData.reminderDateTime)
        newErrors.reminderDateTime = "Please select Reminder Date & Time";
      if (!formData.reminderType)
        newErrors.reminderType = "Please select Reminder Type";

      if (!formData.preferredVisitDate)
        newErrors.preferredVisitDate = "Please select preferred Visit Date";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    alert("Form submitted successfully:\n" + JSON.stringify(formData, null, 2));
    openclick(false);
  };
  const RequiredLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({
    icon,
    text,
  }) => (
    <label style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {icon}
      <span>{text}</span>
      <span style={{ color: "red", fontSize: "15px", marginLeft: "-1px" }}>
        *
      </span>
    </label>
  );
  return ReactDOM.createPortal(
    <div className={styles.dialogOverlay}>
      <div ref={dialogRef} className={styles.dialogBox}>
        <h3 className={styles.dialogTitle}>📝 Update Feedback</h3>
        <MdCancel
          onClick={() => openclick(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "red",
            border: "none",
            borderRadius: "50%",
            width: "23px",
            height: "23px",
            cursor: "pointer",
            zIndex: "999",
          }}
        />
        <div className={styles.dailogcnt}>
          <div className={styles.card}>
            {/* Call Status */}
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<IoMdCall className={styles.iconcolor} />}
                  text="Call Status"
                />
              </label>
              <select
                value={formData.callStatus}
                name="callStatus"
                onChange={onChangeField}
              >
                <option value="">Call Status</option>
                <option value="connected">Call Connected</option>
                <option value="disconnected">Call Disconnected</option>
                <option value="notReceived">Call Not Received</option>
                <option value="notReachable">Call Not Reachable</option>
                <option value="busy">Call Busy</option>
                <option value="abrupt">Call Abrupt</option>
              </select>
              {errors.callStatus && (
                <p className={styles.errorMsg}>{errors.callStatus}</p>
              )}
            </div>

            {/* Client Interest Level */}
            {/* Client Interest Level */}
            <div className={styles.formControl}>
              <label>
                <RequiredLabel
                  icon={<FaStar className={styles.iconcolor} />}
                  text="Client Interest Level"
                />
              </label>

              <select
                value={formData.clientInterest}
                name="clientInterest"
                onChange={onChangeField}
              >
                <option value="">Client Interest Level</option>

                {/* Show options dynamically */}
                <option value="notInterested">Not-interested</option>
                <option value="dnd">DND</option>
                <option value="moderate">Moderate</option>

                {/* Only show Interested when Call Connected */}
                {formData.callStatus === "connected" && (
                  <option value="interested">Interested</option>
                )}
              </select>

              {errors.clientInterest && (
                <p className={styles.errorMsg}>{errors.clientInterest}</p>
              )}
            </div>
          </div>

          {/* Lead Stage */}
          <div className={styles.formControl}>
            <label>
              <RequiredLabel
                icon={<GiProgression className={styles.iconcolor} />}
                text="Lead Stage"
              />
            </label>
            <select
              value={formData.leadStage}
              name="leadStage"
              onChange={onChangeField}
            >
              <option value="">Select Lead Stage</option>
              <option value="progress">In Progress</option>
              <option value="supposedvisit">Supposed To Visit</option>
              <option value="visitDone">Visit Done</option>
              <option value="revisitDone">Revisit Done</option>
              <option value="booking">Booked</option>
              <option value="lost">Lost</option>
            </select>
            {errors.leadStage && (
              <p className={styles.errorMsg}>{errors.leadStage}</p>
            )}
          </div>

          {formData.leadStage && (
            <>
              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaTag className={styles.iconcolor} />}
                      text="Priority Tag"
                    />
                  </label>
                  <select
                    value={formData.priorityTag}
                    name="priorityTag"
                    onChange={onChangeField}
                  >
                    <option value="">Select Priority</option>
                    <option value="cold">Cold</option>
                    <option value="warm">Warm</option>

                    <option value="hot">Hot</option>
                  </select>
                  {errors.priorityTag && (
                    <p className={styles.errorMsg}>{errors.priorityTag}</p>
                  )}
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={
                        <BsFillPatchQuestionFill className={styles.iconcolor} />
                      }
                      text="Interested in Site Visit"
                    />
                  </label>
                  <select
                    value={formData.siteVisit}
                    name="siteVisit"
                    onChange={onChangeField}
                  >
                    <option value="">Select Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors.siteVisit && (
                    <p className={styles.errorMsg}>{errors.siteVisit}</p>
                  )}
                </div>
              </div>
              {formData.siteVisit === "yes" && (
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaCalendarAlt className={styles.iconcolor} />}
                      text="Preferred Visit Date"
                    />
                  </label>
                  <input
                    type="date"
                    name="preferredVisitDate"
                    value={(formData as any).preferredVisitDate || ""}
                    onChange={onChangeField}
                  />
                  {errors.preferredVisitDate && (
                    <p className={styles.errorMsg}>
                      {errors.preferredVisitDate}
                    </p>
                  )}
                </div>
              )}

              <div className={styles.card}>
                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<FaClock className={styles.iconcolor} />}
                      text="Reminder Date & Time"
                    />
                  </label>
                  <input
                    type="datetime-local"
                    name="reminderDateTime"
                    value={formData.reminderDateTime}
                    onChange={onChangeField}
                  />
                  {errors.reminderDateTime && (
                    <p className={styles.errorMsg}>{errors.reminderDateTime}</p>
                  )}
                </div>

                <div className={styles.formControl}>
                  <label>
                    <RequiredLabel
                      icon={<LuAlarmClock className={styles.iconcolor} />}
                      text="Reminder Type"
                    />
                  </label>
                  <select
                    value={formData.reminderType}
                    name="reminderType"
                    onChange={onChangeField}
                  >
                    <option value="">Select Type</option>
                    <option value="call">Call Reminder</option>
                    <option value="meeting">Schedule Meeting</option>
                    <option value="visit">Visit</option>
                  </select>
                  {errors.reminderType && (
                    <p className={styles.errorMsg}>{errors.reminderType}</p>
                  )}
                </div>
              </div>
            </>
          )}

          <div className={styles.formControl}>
            <label>
              <RequiredLabel
                icon={<MdFeedback className={styles.iconcolor} />}
                text="Feedback"
              />
            </label>
            <textarea
              rows={2}
              placeholder="Your Feedback"
              name="feedback"
              value={formData.feedback}
              onChange={onChangeField}
            />
            {errors.feedback && (
              <p className={styles.errorMsg}>{errors.feedback}</p>
            )}
          </div>

          {/* Buttons */}
          <div className={styles.dialogButtons}>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.submitBtn} onClick={onSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FeedbackTwo;
