import React from "react";
import { DateRange, DefinedRange } from "react-date-range";
import { format } from "date-fns";
import styles from "./datefilter.module.css"

const DateFilter = ({ dateRange, setDateRange, onClose }) => {
  const handleSelect = (ranges) => {
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
          showSelectionPreview={true}
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
