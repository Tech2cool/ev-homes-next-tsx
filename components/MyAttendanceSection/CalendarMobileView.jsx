import React, { useState } from "react";
import styles from "./calendarmobileview.module.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STATUS_COLORS = {
  present: "#52bb58",
  absent: "#e75656",
  weekoff: "#faca2d",
  holiday: "blue",
  halfday: "#ec3974",
  pending: "#9E9E9E",
  onleave: "#b444c8",
};

const dummyAttendance = {
  1: { status: "present" },
  2: { status: "absent" },
  3: { status: "onleave" },
  4: { status: "weekoff" },
  5: { status: "holiday" },
  6: { status: "halfday" },
  7: { status: "pending" },
};

const CalendarMobileView = () => {
  const [dialogData, setDialogData] = useState(null);

  const daysInMonth = 31;
  const firstDayWeekday = 4; // Assume month starts on Thursday

  const calendarCells = Array(firstDayWeekday).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const handleCellClick = (day) => {
    const entry = dummyAttendance[day];

    if (entry) {
      setDialogData({
        date: `2025-08-${day.toString().padStart(2, "0")}`,
        status: entry.status,
        color: STATUS_COLORS[entry.status],
        timeIn: "09:30 AM",
        timeOut: "06:00 PM",
        shiftTimeIn: "09:00 AM",
        shiftTimeOut: "06:00 PM",
        total: "8.5h",
        overtime: "0.5h",
      });
    } else {
      setDialogData({
        date: `2025-08-${day.toString().padStart(2, "0")}`,
        status: "No record",
        color: "#171717",
        timeIn: "-",
        timeOut: "-",
        shiftTimeIn: "-",
        shiftTimeOut: "-",
        total: "-",
        overtime: "-",
      });
    }
  };

  const closeDialog = () => setDialogData(null);

  return (
    <div className={styles.mobileView}>
      <div className={styles.calendarHeader}>
        {WEEKDAYS.map((d) => (
          <div key={d} className={styles.weekday}>
            {d}
          </div>
        ))}
      </div>

      <div className={styles.calendarGrid}>
        {calendarCells.map((day, idx) => {
          if (!day)
            return <div key={idx} className={styles.emptyCell}></div>;

          const entry = dummyAttendance[day];
          const markerColor = entry?.status
            ? STATUS_COLORS[entry.status]
            : null;

          return (
            <div
              key={idx}
              className={styles.calendarCell}
              onClick={() => handleCellClick(day)}
              style={{
                backgroundColor: markerColor || "#171717",
                color: markerColor ? "#fff" : "rgba(167, 167, 167, 0.5)",
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
          <div
            className={styles.dialogBox}
            onClick={(e) => e.stopPropagation()}
          >
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
