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
import { useData } from "@/providers/dataContext";
import { toast } from "react-toastify";

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

const FeedbackTwo: React.FC<FeedbackTwoProps> = ({ openclick, lead, task }) => {
   const {
       updateFeedbackWithTimer,
       getLeadById,
       getTaskById,
      } = useData();
  const currentTheme = document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
  const dialogRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
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

  // useEffect(() => {
  //   const initializeFeedback = async () => {
  //     try {
  //       const result = await updateFeedbackWithTimer();
  //       if (result.success) {
  //         console.log("Feedback timer updated successfully");
  //       } else {
  //         console.error("Failed to update feedback timer:", result.message);
  //       }
  //     } catch (error) {
  //       console.error("Error updating feedback timer:", error);
  //     }
  //   };

  //   initializeFeedback();
  // }, [updateFeedbackWithTimer]);

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

const onSubmit = async () => {
  // if (!formData.reminderDateTime) {
  //   toast("Please select Reminder Date & Time", { type: "error" });
  //   return;
  // }

  const reminderDate = formData.reminderDateTime? new Date(formData.reminderDateTime):null;
  const preferredVisitDate = formData.preferredVisitDate
    ? new Date(formData.preferredVisitDate)
    : null;

  const data = {
    taskCompleted: "completed",
    leadStage: formData.leadStage,
    callStatus: formData.callStatus,
    tag: formData.priorityTag,
    intrestedStatus: formData.clientInterest,
    feedback: formData.feedback,

    siteVisitInterested: formData.siteVisit,
    siteVisitInterestedDate: preferredVisitDate
      ? preferredVisitDate.toISOString()
      : null,

    reminderDate: reminderDate ? reminderDate.toISOString() : null,
    reminderType: formData.reminderType,

    task: task?._id ?? lead?.taskRef?._id??"",
    lead: lead?._id ?? task?.lead?._id,
  };

  try {
    setIsSubmitting(true);

    const response = await updateFeedbackWithTimer(data);

    if (response?.success) {
      toast("Feedback Updated", { type: "success" });

      // refresh data if available in your context
      if (lead?._id) {
        try {
          await getLeadById(lead._id);
        } catch (err) {
          console.warn("Error refreshing lead:", err);
        }
      }

      if (task?._id) {
        try {
          await getTaskById(task._id);
        } catch (err) {
          console.warn("Error refreshing task:", err);
        }
      }

      openclick(false);
    } else {
      toast(response?.message || "Failed to update feedback", { type: "error" });
    }
  } catch (error) {
    console.error("Error updating feedback:", error);
    toast("Something went wrong while saving feedback", { type: "error" });
  } finally {
    setIsSubmitting(false);
  }
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              >
                <option value="">Client Interest Level</option>
                <option value="notInterested">Not-interested</option>
                <option value="dnd">DND</option>
                <option value="moderate">Moderate</option>
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
              disabled={isSubmitting}
            >
              <option value="">Select Lead Stage</option>
              <option value="in-progress">In Progress</option>
              <option value="supposed-to-visit">Supposed To Visit</option>
              <option value="visit-done">Visit Done</option>
              <option value="revisit-done">Revisit Done</option>
              <option value="booked">Booked</option>
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    value={formData.preferredVisitDate || ""}
                    onChange={onChangeField}
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
            {errors.feedback && (
              <p className={styles.errorMsg}>{errors.feedback}</p>
            )}
          </div>

          {/* Buttons */}
          <div className={styles.dialogButtons}>
            <button 
              className={styles.cancelBtn} 
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              className={styles.submitBtn} 
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FeedbackTwo;