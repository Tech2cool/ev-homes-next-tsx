"use client";
import { useState, useEffect } from "react";
import styles from "./dateTime.module.css";
import { IoCalendar } from "react-icons/io5";

interface DateTimePickerProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  disabled?: boolean;
}

export default function DateTimePicker({ name, value, onChange, disabled }: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(value?.split("T")[0] || "");
  const [time, setTime] = useState(value?.split("T")[1] || "");

  // timeSet → SET दबाया गया या नहीं
  const [timeSet, setTimeSet] = useState(false);

  useEffect(() => {
    if (value) {
      const [d, t] = value.split("T");
      setDate(d);
      setTime(t);
    }
  }, [value]);

  // Apply All
  const applyValue = () => {
    const final = `${date}T${time}`;
    onChange({
      target: { name, value: final },
    } as any);
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
      setTimeSet(true); // जब भी time change externally हो
    }
  }, [time]);

  // SET TIME BUTTON
  const applyTime = () => {
    let hNum = parseInt(hour);

    if (ampm === "PM" && hNum !== 12) hNum += 12;
    if (ampm === "AM" && hNum === 12) hNum = 0;

    const formatted = `${hNum.toString().padStart(2, "0")}:${minute}`;
    setTime(formatted);
    setTimeSet(true); // SET दबा दिया
  };

  // Conditions to enable APPLY
  const canApply = date && timeSet;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputBox} onClick={() => !disabled && setOpen(!open)}>
        <IoCalendar className={styles.icon} />
        <span>
          {value
            ? `${value.split("T")[0].split("-")[2]}-${value.split("T")[0].split("-")[1]}-${value.split("T")[0].split("-")[0]} ${value.split("T")[1] || "--:--"}`
            : "dd-mm-yyyy  --:--"}
        </span>

      </div>

      {open && (
        <div className={styles.popup}>
          {/* DATE PICKER */}
          <div className={styles.pickerRow}>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>

          {/* TIME PICKER */}
          <div className={styles.pickerRow}>
            <label>Time</label>
            <div className={styles.clockRow}>
              <input
                type="number"
                min={1}
                max={12}
                value={hour}
                onChange={(e) => {
                  setHour(e.target.value);
                  setTimeSet(false); // जब तक SET न दबाया जाए
                }}
              />

              :

              <input
                type="number"
                min={0}
                max={59}
                value={minute}
                onChange={(e) => {
                  setMinute(e.target.value);
                  setTimeSet(false);
                }}
              />

              <select
                value={ampm}
                onChange={(e) => {
                  setAmPm(e.target.value);
                  setTimeSet(false);
                }}
              >
                <option>AM</option>
                <option>PM</option>
              </select>

              <button className={styles.timeApplyBtn} onClick={applyTime}>
                Set
              </button>
            </div>
          </div>

          {/* APPLY ALL BUTTON */}
          <button
            className={styles.applyBtn}
            onClick={applyValue}
            disabled={!canApply}
          >
            Apply All
          </button>
        </div>
      )}
    </div>
  );
}
