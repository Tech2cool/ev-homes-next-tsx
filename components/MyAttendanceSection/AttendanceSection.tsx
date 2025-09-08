import React, { useState, useEffect } from "react";
import styles from "./attendancesection.module.css";
import { FiSearch } from "react-icons/fi";
import { IoCalendar } from "react-icons/io5";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMobileView from "./CalendarMobileView";
import { dateFormatOnly, timeFormatOnly } from "@/hooks/useDateFormat";
import moment from "moment-timezone";
import Imglog from "../../public/images/Banquet hall.png";
import Image from "next/image";

// Dummy attendance summary
interface SummaryItem {
  title: string;
  value: number;
}

const dummySummary: SummaryItem[] = [
  { title: "Present", value: 3 },
  { title: "Absent", value: 1 },
  { title: "On Leave", value: 1 },
  { title: "Week Off", value: 2 },
  { title: "Half Day", value: 0 },
  { title: "Pending", value: 1 },
  { title: "Present On WeekOff", value: 1 },
  { title: "Present On Holiday", value: 0 },
  { title: "Holiday", value: 0 },
];

interface LeaveInfo {
  shift: {
    timeIn: number;
    timeOut: number;
    workingHours: number;
  };
}

const dummyLeaveInfo: LeaveInfo = {
  shift: {
    timeIn: 9,
    timeOut: 18,
    workingHours: 9 * 60 * 60 * 1000,
  },
};

interface AttendanceItem {
  date: string;
  checkInTime: string;
  checkOutTime: string;
  status: string;
  wlStatus: string;
  checkInPhoto: string;
  checkOutPhoto: string;
}

const dummyAttendanceList: AttendanceItem[] = [
  {
    date: "2025-08-05",
    checkInTime: "2025-08-05T09:10:00",
    checkOutTime: "2025-08-05T18:15:00",
    status: "present",
    wlStatus: "",
    checkInPhoto: "",
    checkOutPhoto: "",
  },
  {
    date: "2025-08-06",
    checkInTime: "2025-08-06T09:45:00",
    checkOutTime: "2025-08-06T17:30:00",
    status: "present",
    wlStatus: "weekoff",
    checkInPhoto: "",
    checkOutPhoto: "",
  },
  {
    date: "2025-08-07",
    checkInTime: "",
    checkOutTime: "",
    status: "absent",
    wlStatus: "",
    checkInPhoto: "",
    checkOutPhoto: "",
  },
  {
    date: "2025-08-08",
    checkInTime: "",
    checkOutTime: "",
    status: "weekoff",
    wlStatus: "weekoff",
    checkInPhoto: "",
    checkOutPhoto: "",
  },
  {
    date: "2025-08-09",
    checkInTime: "",
    checkOutTime: "",
    status: "on-paid-leave",
    wlStatus: "",
    checkInPhoto: "",
    checkOutPhoto: "",
  },
];

// Hook for mobile detection
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 615);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

// Props for TimelineSection
interface TimelineSectionProps {
  data?: SummaryItem[];
  attendanceList?: AttendanceItem[];
}

const TimelineSection: React.FC<TimelineSectionProps> = ({
  data = dummySummary,
  attendanceList = dummyAttendanceList,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const isMobile = useIsMobile();
  const COLORS = ["#52bb58", "#e75656", "#b444c8", "#faca2d", "#ec3974", "#fbae3a"];

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {data.map((item, idx) => (
          <div className={styles.card} key={idx}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.value}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className={styles.mobilePieChart}>
        <div className={styles.pieContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="title" cx="50%" cy="50%"
                innerRadius={30} outerRadius={60} labelLine={false} label>
                {data.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.legend}>
          {data.map((item, i) => (
            <div className={styles.legendItem} key={i}>
              <span className={styles.colorDot} style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className={styles.legendText}>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Month Picker + Search */}
      <div className={styles.headerContainer}>
        <div className={styles.monthPicker}>
          <button className={`${styles.tab} ${styles.active}`}>Your Attendance</button>
          <div className={styles.monthPickerWrapper}>
            <IoCalendar className={styles.calendarIcon} />
            <DatePicker
              selected={selectedMonth}
              onChange={(d: Date | null) => d && setSelectedMonth(d)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className={styles.monthInput}
            />
          </div>
        </div>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search by Status" className={styles.searchInput} />
          <button className={styles.searchButton}><FiSearch size={18} /></button>
        </div>
      </div>

      {/* Attendance List */}
      {isMobile ? (
        <CalendarMobileView selectedMonth={selectedMonth} attendanceData={attendanceList} />
      ) : (
        <div className={styles.attList}>
          {attendanceList.map((item, index) => (
            <AttendanceSection key={index} item={item} leaveInfo={dummyLeaveInfo} />
          ))}
        </div>
      )}
    </div>
  );
};

// Attendance Section Component
interface AttendanceSectionProps {
  item: AttendanceItem;
  leaveInfo: LeaveInfo;
}

const AttendanceSection: React.FC<AttendanceSectionProps> = ({ item, leaveInfo }) => {
  const endTimeOut = timeFormatOnly(item?.checkOutTime);
  const checkIn = moment(item?.checkInTime);
  const checkOut = moment(item?.checkOutTime);
  const onLeave = ["on-paid-leave", "on-casual-leave", "on-compensation-off-leave"].includes(item?.status);

  const duration = moment.duration(checkOut.diff(checkIn));
  const diff = checkOut.diff(checkIn);
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.minutes());

  const total = `${isNaN(hours) ? "" : `${hours}hr`} ${isNaN(hours) ? "" : `${minutes}m`}`;
  const shiftStart = leaveInfo.shift.timeIn;
  const shiftEnd = leaveInfo.shift.timeOut;

  const lateDuration = diff - leaveInfo.shift.workingHours;
  const latePercent = (lateDuration / diff) * 100;
  const overtimeDuration = Math.max(0, (parseFloat(endTimeOut) || 0) - shiftEnd);

  const [showText, setShowText] = useState(false);
  const handleClick = () => setShowText(!showText);

  return (
    <div className={styles.timelineRow}>
      <div className={styles.dateSection}>
        <div className={styles.date}>{dateFormatOnly(item?.date)}</div>
        <div className={styles.clockText}>
          <div className={styles.time}>Time-in: {timeFormatOnly(item?.checkInTime)}</div>
        </div>
        <div className={styles.statusClockText}>
          <div>Status: {item?.status}</div>
        </div>
      </div>

      <div className={styles.timeInImage}>
        <Image src={Imglog} alt="Time In" width={100} height={100} className={styles.cardTimeImage} />
      </div>

      <div className={styles.barWrapper}>
        <div className={styles.barSection}>
          <div className={styles.bar} onClick={handleClick}>
            {!item.checkInTime && !item.checkOutTime && item.status === "absent" ? (
              <div className={styles.absentBar}><span className={styles.barLabel}>{item.status}</span></div>
            ) : item.status === "weekoff" ? (
              <div className={styles.weekOffBar}><span className={styles.barLabel}>Week off</span></div>
            ) : onLeave ? (
              <div className={styles.leaveBar}><span className={styles.barLabel}>On Leave</span></div>
            ) : item.status === "present" ? (
              <div className={styles.expectedWorkingTimeBar}><span className={styles.barLabel}>Present</span></div>
            ) : lateDuration > 0 && (
              <div className={styles.lateArrivalBar} style={{ width: `${latePercent}%` }}>
                {latePercent > 3 && <span className={styles.barLabel}>Late</span>}
              </div>
            )}
            {showText && (
              <div className={styles.tool}>
                Do you want to Regularize it ?
                <span><button>Regularize</button></span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.timeOutImage}>
        <Image src={Imglog} alt="Time Out" width={100} height={100} className={styles.cardTimeImage} />
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.clockText}><div>Time-out: {timeFormatOnly(item?.checkOutTime)}</div></div>
        <div className={styles.clockText}><div>Total: {total}</div></div>
        <div className={styles.clockText}><div>Overtime: {overtimeDuration.toFixed(2)} hrs</div></div>
      </div>
    </div>
  );
};

export default TimelineSection;
