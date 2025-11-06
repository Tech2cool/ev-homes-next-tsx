"use client";
import React from "react";
import styles from "@/app/super-admin/lead-details/lead-details.module.css";
import { Building, Calendar, CheckCircle, Clock, FileText, MessageSquare, User } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import { FaPhoneAlt, FaTasks } from "react-icons/fa";
import { MdAddCall, MdAssignment, MdEmail } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { PiBuildingApartmentBold } from "react-icons/pi";
import { BsFillBuildingFill } from "react-icons/bs";
import { LuSendToBack } from "react-icons/lu";
import { BiTransferAlt } from "react-icons/bi";

interface TaskOverviewProps {
  task?:  Task | null;
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ task }) => {
  const formatDateTime = (dateString: string) => {
    if (!dateString) return "NA";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const formatDateOnly = (dateString: string | null | undefined) => {
    if (!dateString) return "NA";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const getAssignedToName = () => {
    if (!task?.assignTo) return "NA";
    return `${task.assignTo.firstName || ''} ${task.assignTo.lastName || ''}`.trim() || "NA";
  };

  const getAssignedByName = () => {
    if (!task?.assignBy) return "NA";
    return `${task.assignBy.firstName || ''} ${task.assignBy.lastName || ''}`.trim() || "NA";
  };

  const getTaskType = () => {
    return task?.type || "NA";
  };

  if (!task) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div className={styles.noTask}>No task information available</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div className={styles.cardrow}>
        <div className={styles.detailsCard}>
          <div className={styles.cardTitle}>
            <FaTasks className={styles.titleIcon} />
            Task Information
          </div>
          <div className={styles.cardContent}>
            <div className={styles.infoGridtask}>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <Calendar size={11} color="#4a84ff" />Assigned
                </label>
                <p className={styles.infoValue}>
                  {formatDateTime(task.assignDate ?? "")}
                </p>
              </div>

              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <Clock size={11} color="#4a84ff" />Deadline
                </label>
                <p className={styles.infoValue}>
                  {formatDateOnly(task.deadline)}
                </p>
              </div>

              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <LuSendToBack size={11} color="#4a84ff" />Task Type
                </label>
                <p className={styles.infoValue}>
                  {getTaskType()}
                </p>
              </div>

              {task.completedDate && (
                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>
                    <CheckCircle size={11} color="#4a84ff" />Completed
                  </label>
                  <p className={styles.infoValue}>
                    {formatDateTime(task.completedDate)}
                  </p>
                </div>
              )}

              {task.remark && (
                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>
                    <MessageSquare size={11} color="#4a84ff" />Remarks
                  </label>
                  <p className={styles.infoValue}>
                    {task.remark}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {task.remindMe && (
        <div className={styles.cardrow}>
          <div className={styles.detailsCard}>
            <div className={styles.cardTitle}>
              <Clock className={styles.titleIcon} />
              Reminder Information
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>
                    <IoIosPerson size={12} color="#4a84ff" />Reminder Date
                  </label>
                  <p className={styles.infoValue}>
                    {formatDateOnly(task.reminderDate || task.reminderDueDate)}
                  </p>
                </div>
                
                {task.reminderDescription && (
                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>
                      <IoIosPerson size={12} color="#4a84ff" />Reminder Note
                    </label>
                    <p className={styles.infoValue}>
                      {task.reminderDescription}
                    </p>
                  </div>
                )}

                {task.reminderType && (
                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>
                      <IoIosPerson size={12} color="#4a84ff" />Reminder Type
                    </label>
                    <p className={styles.infoValue}>
                      {task.reminderType}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.cardrow}>
        <div className={styles.detailsCard}>
          <div className={styles.cardTitle}>
            <MdAssignment className={styles.titleIcon} />
            Assignment Information
          </div>
          <div className={styles.cardContent}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <Calendar size={11} color="#4a84ff" />Assigned To
                </label>
                <p className={styles.infoValue}>
                  {getAssignedToName()}
                </p>
              </div>

              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <Clock size={11} color="#4a84ff" />Assigned By
                </label>
                <p className={styles.infoValue}>
                  {getAssignedByName()}
                </p>
              </div>

              {task.transferTaskFrom && (
                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>
                    <BiTransferAlt size={11} color="#4a84ff" />Transferred From
                  </label>
                  <p className={styles.infoValue}>
                    {`${task.transferTaskFrom.firstName || ''} ${task.transferTaskFrom.lastName || ''}`.trim()}
                  </p>
                </div>
              )}

              {task.transferReason && (
                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>
                    <MessageSquare size={11} color="#4a84ff" />Transfer Reason
                  </label>
                  <p className={styles.infoValue}>
                    {task.transferReason}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {task.details && (
        <div className={styles.cardrow}>
          <div className={styles.detailsCard}>
            <div className={styles.cardTitle}>
              <FileText className={styles.titleIcon} />
              Task Details
            </div>
            <div className={styles.cardContent}>
              <p className={styles.taskDetails}>
                {task.details}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskOverview;