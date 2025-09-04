"use client";
import React from "react";
import { DateRange, DefinedRange } from "react-date-range";
import { RangeKeyDict, Range } from "react-date-range";
import styles from "./datefilter.module.css";

interface DateFilterProps {
  dateRange: Range[];
  setDateRange: React.Dispatch<React.SetStateAction<Range[]>>;
  onClose: () => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ dateRange, setDateRange, onClose }) => {
  const handleSelect = (ranges: RangeKeyDict) => {
    setDateRange([ranges.selection]);
  };

  return (
    <div className={styles.calendarWrapper}>
      <div>
        <DefinedRange
          ranges={dateRange}
          onChange={handleSelect}
          rangeColors={["#007bff"]}
        />
      </div>

      <div>
        <DateRange
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          rangeColors={["#007bff"]}
          months={1}
          direction="horizontal"
          editableDateInputs={true}
        />
        <button
          onClick={onClose}
          className={styles.okButton}
          style={{ marginTop: "1rem" }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default DateFilter;
