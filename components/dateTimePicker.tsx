"use client";
import { useState, useEffect } from "react";
import styles from "./dateTime.module.css";
import { IoCalendar } from "react-icons/io5";

interface DateTimePickerProps {
  value: string;
  onChange: (val: string) => void;
}

export default function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(value?.split("T")[0] || "");
  const [time, setTime] = useState(value?.split("T")[1] || "");

  useEffect(() => {
    if (value) {
      const [d, t] = value.split("T");
      setDate(d);
      setTime(t);
    }
  }, [value]);

  const applyValue = () => {
    const final = `${date}T${time}`;
    onChange(final);
    setOpen(false);
  };

  // Clock Picker Logic
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmPm] = useState("AM");

  useEffect(() => {
    if (time) {
      const [h, m] = time.split(":");
      const hNum = parseInt(h);
      setHour(((hNum % 12) || 12).toString().padStart(2, "0"));
      setMinute(m);
      setAmPm(hNum >= 12 ? "PM" : "AM");
    }
  }, [time]);

  const applyTime = () => {
    let hNum = parseInt(hour);
    if (ampm === "PM" && hNum !== 12) hNum += 12;
    if (ampm === "AM" && hNum === 12) hNum = 0;
    const formatted = `${hNum.toString().padStart(2, "0")}:${minute}`;
    setTime(formatted);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputBox} onClick={() => setOpen(!open)}>
        <IoCalendar className={styles.icon} />
        <span>{value ? value.replace("T", " ") : "Select Date & Time"}</span>
      </div>

      {open && (
        <div className={styles.popup}>
          {/* Date Picker */}
          <div className={styles.pickerRow}>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Clock-style Time Picker */}
          <div className={styles.pickerRow}>
            <label>Time</label>
            <div className={styles.clockRow}>
              <input
                type="number"
                min={1}
                max={12}
                value={hour}
                onChange={(e) => setHour(e.target.value)}
              />
              :
              <input
                type="number"
                min={0}
                max={59}
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
              />
              <select value={ampm} onChange={(e) => setAmPm(e.target.value)}>
                <option>AM</option>
                <option>PM</option>
              </select>
              <button className={styles.timeApplyBtn} onClick={applyTime}>
                Set
              </button>
            </div>
          </div>

          <button className={styles.applyBtn} onClick={applyValue}>
            Apply All
          </button>
        </div>
      )}
    </div>
  );
}
