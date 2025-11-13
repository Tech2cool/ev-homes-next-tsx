import React, { useState } from "react";
import styles from "./calendarmobileview.module.css";
import { useTheme } from "next-themes";
import Image from "next/image";
import Imglog from "../../public/images/Banquet hall.png";
import { useData } from "@/providers/dataContext";


const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STATUS_COLORS: Record<string, string> = {
  present: "#52bb58",
  absent: "#e75656",
  weekoff: "#faca2d",
  holiday: "blue",
  halfday: "#ec3974",
  pending: "#9E9E9E",
  onleave: "#b444c8",
};

interface DialogData {
  date: string;
  status: string;
  color: string;
  timeIn: string;
  timeOut: string;
  shiftTimeIn: string;
  shiftTimeOut: string;
  total: string;
  overtime: string;
  checkInPhoto: string | null;
  checkOutPhoto: string | null;
}

interface CalendarMobileViewProps {
  selectedMonth: Date;
  attendanceData: Attendance[];
}

const CalendarMobileView: React.FC<CalendarMobileViewProps> = ({
  selectedMonth,
  attendanceData,
}) => {
  const [dialogData, setDialogData] = useState<DialogData | null>(null);
  const { theme } = useTheme();
  const { leaveCount } = useData();

  // ====== DATE CALCULATIONS ======
  const year = selectedMonth.getFullYear();
  const month = selectedMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayWeekday = new Date(year, month, 1).getDay();

  // ====== MAP ATTENDANCE BY DAY ======
  const attendanceMap: Record<number, Attendance> = {};
  attendanceData.forEach((att) => {
    if (att.day) attendanceMap[att.day] = att;
  });

  // ====== CALENDAR CELLS ======
  const calendarCells = Array(firstDayWeekday)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  // ====== OPEN CELL DIALOG ======
  const handleCellClick = (day: number | string) => {
    const entry = attendanceMap[Number(day)];

    setDialogData({
      date: `${year}-${month + 1}-${day.toString().padStart(2, "0")}`,
      status: entry?.status || "No record",
      color: STATUS_COLORS[entry?.status || ""] || "#171717",
      timeIn: entry?.checkInTime
        ? new Date(entry.checkInTime).toLocaleTimeString("en-IN")
        : "-",
      timeOut: entry?.checkOutTime
        ? new Date(entry.checkOutTime).toLocaleTimeString("en-IN")
        : "-",
      shiftTimeIn: "09:00 AM",
      shiftTimeOut: "06:00 PM",
      total: entry?.totalActiveSeconds
        ? (entry.totalActiveSeconds / 3600).toFixed(1) + "h"
        : "-",
      overtime: entry?.overtimeMinutes
        ? (entry.overtimeMinutes / 60).toFixed(1) + "h"
        : "-",
      checkInPhoto: entry.checkInPhoto,
      checkOutPhoto: entry.checkOutPhoto,
    });
  };

  const closeDialog = () => setDialogData(null);

  return (
    <div className={styles.mobileView}>
      {/* WEEKDAY HEADER */}
      <div className={styles.calendarHeader}>
        {WEEKDAYS.map((d) => (
          <div key={d} className={styles.weekday}>
            {d}
          </div>
        ))}
      </div>

      {/* CALENDAR GRID */}
      <div className={styles.calendarGrid}>
        {calendarCells.map((day, idx) => {
          if (!day) return <div key={idx} className={styles.emptyCell}></div>;

          const entry = attendanceMap[day];
          const markerColor = entry?.status
            ? STATUS_COLORS[entry.status]
            : null;

          return (
            <div
              key={idx}
              className={styles.calendarCell}
              onClick={() => handleCellClick(day)}
              style={{
                backgroundColor: markerColor
                  ? markerColor
                  : theme === "dark"
                  ? "#000"
                  : "#ecececa7",
                color: markerColor
                  ? "#fff"
                  : theme === "dark"
                  ? "#a7a7a7"
                  : "#333",
              }}
              title={entry?.status || "No record"}
            >
              <span className={styles.dayText}>{day}</span>
            </div>
          );
        })}
      </div>

      {/* POPUP DIALOG */}
      {dialogData && (
        <div className={styles.dialogOverlay} onClick={closeDialog}>
          <div
            className={styles.dialogBox}
            onClick={(e) => e.stopPropagation()}
          >
            <div>{dialogData.date}</div>
            <div>{dialogData.status}</div>

            <div className={styles.timeInOutSection}>
              <div className={styles.timeBox}>
                <div className={styles.timeInImage}><Image alt="checkout-photo"  src={dialogData?.checkInPhoto ?? Imglog} width={100} height={100}/></div>
                <div className={styles.label}>Time In</div>
                <div className={styles.value}>{dialogData.timeIn}</div>
              </div>

              <div className={styles.timeBox}>
                <div className={styles.timeOutImage}><Image alt="checkout-photo"  src={dialogData?.checkOutPhoto ?? Imglog} width={100} height={100}/></div>
                <div className={styles.label}>Time Out</div>
                <div className={styles.value}>{dialogData.timeOut}</div>
              </div>
            </div>

            <div className={styles.shiftTiming}>
              Shift: {leaveCount?.shift?.shiftName ?? "NA"}
              <div>Total: {dialogData.total}</div>
              <div>Overtime: {dialogData.overtime}</div>
            </div>

            <div className={styles.buttonCol}>
              <button onClick={closeDialog} className={styles.closeBtn}>
                Close
              </button>
              <button className={styles.reguBtn}>Regularize Now!</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarMobileView;
