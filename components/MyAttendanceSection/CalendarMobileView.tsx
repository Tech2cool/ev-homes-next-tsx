import React, { useState } from "react";
import styles from "./calendarmobileview.module.css";
import { useTheme } from "next-themes";

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

interface AttendanceData {
  date: string;
  checkInTime: string;
  checkOutTime: string;
  status: string;
  wlStatus: string;
  checkInPhoto: string;
  checkOutPhoto: string;
}
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
}
interface CalendarMobileViewProps {
  selectedMonth: Date;
  attendanceData: AttendanceData[];
}

type AttendanceEntry = { status: string };

const dummyAttendance: Record<number, AttendanceEntry> = {
  1: { status: "present" },
  2: { status: "absent" },
  3: { status: "onleave" },
  4: { status: "weekoff" },
  5: { status: "holiday" },
  6: { status: "halfday" },
  7: { status: "pending" },
};

const CalendarMobileView: React.FC<CalendarMobileViewProps> = ({
  selectedMonth,
  
}) => {
const [dialogData, setDialogData] = useState<DialogData | null>(null);
  const { theme } = useTheme();

  const daysInMonth = 31;
  const firstDayWeekday = 4;

  const calendarCells = Array(firstDayWeekday).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const handleCellClick = (day: number | string) => {
    const entry = dummyAttendance[Number(day)];
    setDialogData({
      date: `${selectedMonth.getFullYear()}-${selectedMonth.getMonth() + 1}-${day.toString().padStart(2, "0")}`,
      status: entry?.status || "No record",
      color: STATUS_COLORS[entry?.status || ""] || "#171717",
      timeIn: entry ? "09:30 AM" : "-",
      timeOut: entry ? "06:00 PM" : "-",
      shiftTimeIn: entry ? "09:00 AM" : "-",
      shiftTimeOut: entry ? "06:00 PM" : "-",
      total: entry ? "8.5h" : "-",
      overtime: entry ? "0.5h" : "-",
    });
  };

  const closeDialog = () => setDialogData(null);

  return (
    <div className={styles.mobileView}>
      <div className={styles.calendarHeader}>
        {WEEKDAYS.map((d) => (
          <div key={d} className={styles.weekday}>{d}</div>
        ))}
      </div>

      <div className={styles.calendarGrid}>
        {calendarCells.map((day, idx) => {
          if (!day) return <div key={idx} className={styles.emptyCell}></div>;

          const entry = dummyAttendance[day];
          const markerColor = entry?.status ? STATUS_COLORS[entry.status] : null;

          return (
            <div
              key={idx}
              className={styles.calendarCell}
              onClick={() => handleCellClick(day)}
              style={{
                backgroundColor: markerColor
                  ? markerColor
                  : theme === "dark"
                  ? "#000000"
                  : "#ecececa7",
                color: markerColor
                  ? "#fff"
                  : theme === "dark"
                  ? "#a7a7a7"
                  : "#333333",
              }}
              title={entry?.status || "No record"}
            >
              <span className={styles.dayText}>{day}</span>
            </div>
          );
        })}
      </div>

      {dialogData && (
        <div className={styles.dialogOverlay} onClick={closeDialog}>
          <div className={styles.dialogBox} onClick={(e) => e.stopPropagation()}>
            <div>{dialogData.date}</div>
            <div>{dialogData.status}</div>
            <div className={styles.timeInOutSection}>
              <div className={styles.timeBox}>
                <div className={styles.timeInImage}></div>
                <div className={styles.label}>Time In</div>
                <div className={styles.value}>{dialogData.timeIn}</div>
              </div>
              <div className={styles.timeBox}>
                <div className={styles.timeOutImage}></div>
                <div className={styles.label}>Time Out</div>
                <div className={styles.value}>{dialogData.timeOut}</div>
              </div>
            </div>
            <div className={styles.shiftTiming}>
              Shift: {dialogData.shiftTimeIn} to {dialogData.shiftTimeOut}
              <div>Total: {dialogData.total}</div>
              <div>Overtime: {dialogData.overtime}</div>
            </div>
            <div className={styles.buttonCol}>
              <button onClick={closeDialog} className={styles.closeBtn}>Close</button>
              <button className={styles.reguBtn}>Regularize Now!</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarMobileView;
