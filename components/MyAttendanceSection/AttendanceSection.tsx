import React, { useState, useEffect } from "react";
import styles from "./attendancesection.module.css";
import { FiSearch } from "react-icons/fi";
import { IoCalendar } from "react-icons/io5";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import CalendarMobileView from "./CalendarMobileView";
import { dateFormatOnly, timeFormatOnly } from "@/hooks/useDateFormat";
import moment from "moment-timezone";
import Imglog from "../../public/images/Banquet hall.png";
import Image from "next/image";
import { tr } from "date-fns/locale";




// Dummy attendance summary
interface SummaryItem {
  title: string;
  value: number;
}

// const dummySummary: SummaryItem[] = [
//   { title: "Present", value: 3 },
//   { title: "Absent", value: 1 },
//   { title: "On Leave", value: 1 },
//   { title: "Week Off", value: 2 },
//   { title: "Half Day", value: 0 },
//   { title: "Pending", value: 1 },
//   { title: "Present On WeekOff", value: 1 },
//   { title: "Present On Holiday", value: 0 },
//   { title: "Holiday", value: 0 },
// ];

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
    status: "Half Day",
    wlStatus: "Half Day",
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
  // data = dummySummary,
  attendanceList = dummyAttendanceList,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const isMobile = useIsMobile();
  const COLORS = ["#52bb58", "#e75656", "#b444c8", "#faca2d", "#ec3974", "#fbae3a"];

  const totalHours = 234;
  const presentHours = 210;

  const [percent, setpercent] = useState(0);
  const targetPercent = Math.round((presentHours / totalHours) * 100);



  const overtimeHours = presentHours > totalHours ? presentHours - totalHours : 0;
  const remainingOvertime = overtimeHours > 0 ? Math.max(0, 20 - overtimeHours) : 20;

  const Colors = ["green", "grey"];

  const overtimeData =
    presentHours >= totalHours
      ? [
        { name: "Overtime Completed", value: overtimeHours },
        { name: "Remaining", value: remainingOvertime },
      ]
      : [
        { name: "Overtime Completed", value: 0 },
        { name: "Remaining", value: 20 },
      ];

  useEffect(() => {
    const timer = setTimeout(() => setpercent(targetPercent), 200);
    return () => clearTimeout(timer);
  }, [targetPercent]);




  return (
    <div className={styles.main}>

      {/* <div className={styles.container}>

        {data.map((item, idx) => (
          <div className={styles.card} key={idx}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.value}>{item.value}</div>
          </div>
        ))}
      </div> */}




      {/* Pie Chart */}
      {/* <div className={styles.mobilePieChart}>
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
      </div> */}

      <div className={styles.horizontalLayout}>
        <div className={styles.headerandTableContainer}>
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
                  calendarClassName={styles.customCalendar}
                  renderCustomHeader={({
                    date,
                    decreaseYear,
                    increaseYear,
                  }) => (
                    <div className={styles.customHeader}>
                      <button onClick={decreaseYear} className={styles.navButton}>
                        Previous Year
                      </button>
                      <span className={styles.currentYear}>{date.getFullYear()}</span>
                      <button onClick={increaseYear} className={styles.navButton}>
                        Next Year
                      </button>
                    </div>
                  )}
                />
              </div>
            </div>



            <div className={styles.searchContainer}>
              <input type="text" placeholder="Search by Status" className={styles.searchInput} />
              <button className={styles.searchButton}><FiSearch size={18} /></button>
            </div>
          </div>

          <div className={styles.tableSection}>
            <div className={styles.attList}>
              <AttendanceSection
                item={attendanceList[0]}
                leaveInfo={dummyLeaveInfo}
                attendanceData={attendanceList}
              />
            </div>
          </div>

        </div>

        <div className={styles.OvertimeMaindesk}>
          <h2 className={styles.deskHeading}>Monthly Attendance</h2>


          <div className={styles.chartdesk}>
            <p className={styles.deskovertimeText}>Overtime</p>

            <div className={styles.deskPie}>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overtimeData}
                    cx="50%"
                    cy="50%"
                    innerRadius="75%"
                    outerRadius="90%"
                    dataKey="value"
                    stroke="none"
                    labelLine={false}
                    label={({ cx, cy }) => (
                      <text
                        x={cx}
                        y={cy}
                        fill="#658C58"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={styles.overtimeHrs}
                        fontWeight="bold"
                      >
                        {overtimeData[0].value} hr
                      </text>
                    )}
                  >
                    {overtimeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={Colors[index % Colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

            </div>
            <div className={styles.deskAttandanceLine}>
              <p className={styles.deskHrsInfo}>
                {presentHours} Hrs / {totalHours} Hrs <span> ({percent}%)</span>
              </p>
              <div className={styles.deskLineBackground}
              >
                <div
                  className={styles.deskLineFill}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <div className={styles.detailsContainer}>
                <div className={styles.infoContainerWO}>
                  <span className={styles.numContainerWO}>10</span>
                  <p className={styles.daydetails}>Week Off</p>
                </div>

                <div className={styles.infoContainerP}>
                  <span className={styles.numContainerP}>10</span>
                  <p>Present</p>
                </div>

                <div className={styles.infoContainerHD}>
                  <span className={styles.numContainerHD}>10</span>
                  <p>Half Day</p>
                </div>

                <div className={styles.infoContainerL}>
                  <span className={styles.numContainerL}>10</span>
                  <p>Leave</p>
                </div>
              </div>




            </div>


          </div>

        </div>






      </div>


      {/* mobile attendance chart */}
      <div className={styles.OvertimeMainMob}>
        <div className={styles.Container}>
          <h2 className={styles.Heading}>Monthly Attendance</h2>

          <div className={styles.ChartMain}>

            <div className={styles.AttendanceLineSec}>
              <p className={styles.HrsInfo}>
                {presentHours} Hrs / {totalHours} Hrs <span> ({percent}%)</span>
              </p>
              <div className={styles.LineBackground}>
                <div
                  className={styles.LineFill}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <div className={styles.workingDetails}><p>WO : <span style={{ color: "#476EAE" }}>4</span></p>
                <p>P : <span style={{ color: "green" }} >26</span></p>
                <p>HD : <span style={{ color: "orange" }}>3</span></p>
                <p>L : <span style={{ color: "red" }}>5</span></p>


              </div>


            </div>

            <div className={styles.piebox}>
              <ResponsiveContainer width={150} height={130}>
                <PieChart>
                  <Pie
                    data={overtimeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={65}
                    dataKey="value"
                    stroke="none"
                    labelLine={false}
                    label={({ cx, cy }) => (
                      <text
                        x={cx}
                        y={cy}
                        fill="#658C58"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={15}
                        fontWeight="bold"
                      >
                        {overtimeData[0].value} hr
                      </text>
                    )}
                  >
                    {overtimeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={Colors[index % Colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <p className={styles.overtimeText}>Overtime</p>



            </div>
          </div>

        </div>
      </div>







      {/* Attendance List */}
      {isMobile && (
        <CalendarMobileView selectedMonth={selectedMonth} attendanceData={attendanceList} />

      )
      }

    </div>
  );

};

// Attendance Section Component
interface AttendanceSectionProps {
  item: AttendanceItem;
  leaveInfo: LeaveInfo;
  attendanceData?: AttendanceItem[];
}

const AttendanceSection: React.FC<AttendanceSectionProps> = ({ item, leaveInfo, attendanceData = [] }) => {
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

    const [theme, setTheme] = useState<"light" | "dark">("light");

    
useEffect(() => {
  if (typeof window !== "undefined") {
    const isDark =
      document.documentElement.classList.contains("dark") ||
      document.body.classList.contains("dark");

    setTheme(isDark ? "dark" : "light");
  }
}, []);



  const lateDuration = diff - leaveInfo.shift.workingHours;
  const latePercent = (lateDuration / diff) * 100;
  const overtimeDuration = Math.max(0, (parseFloat(endTimeOut) || 0) - shiftEnd);

  const [showText, setShowText] = useState(false);

  const handleClick = () => setShowText(!showText);

  const getStatusStyle = (status: string, theme: "light" | "dark") => {
    const isLight = theme === "light";
    switch (status.toLowerCase()) {
      case "present":
        return isLight
          ? {
            backgroundColor: "rgba(9, 161, 9, 0.12)",
            border: "1px solid rgb(9, 161, 9)",
            color: "#0b6a0b",
          }
          : {
            backgroundColor: "rgba(9, 161, 9, 0.2)",
            border: "1px solid rgb(4, 134, 4)",
            color: "white",
          };

      case "absent":
        return isLight
          ? {
            backgroundColor: "rgba(240, 53, 53, 0.12)",
            border: "1px solid rgb(240, 53, 53)",
            color: "#a30000",
          }
          : {
            backgroundColor: "rgba(240, 53, 53, 0.2)",
            border: "1px solid rgb(240, 53, 53)",
            color: "white",
          };

      case "weekoff":
        return isLight
          ? {
            backgroundColor: "rgba(76, 76, 243, 0.12)",
            border: "1px solid rgb(76, 76, 243)",
            color: "#1e24a8",
          }
          : {
            backgroundColor: "rgba(76, 76, 243, 0.2)",
            border: "1px solid rgb(76, 76, 243)",
            color: "white",
          };

      case "half day":
        return isLight
          ? {
            backgroundColor: "rgba(240, 173, 49, 0.15)",
            border: "1px solid rgb(240, 173, 49)",
            color: "#a46f00",
          }
          : {
            backgroundColor: "rgba(240, 173, 49, 0.2)",
            border: "1px solid rgb(240, 173, 49)",
            color: "white",
          };

      case "on-paid-leave":
      case "on-casual-leave":
      case "on-compensation-off-leave":
        return isLight
          ? {
            backgroundColor: "rgba(88, 205, 240, 0.15)",
            border: "1px solid #58cdf0",
            color: "#0b5f77",
          }
          : {
            backgroundColor: "#58cdf062",
            border: "1px solid #58cdf0ff",
            color: "white",
          };

      default:
        return isLight
          ? {
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "1px solid #ddd",
          }
          : {
            backgroundColor: "#333",
            color: "#fff",
            border: "1px solid #444",
          };
    }
  };



  return (
    // <div className={styles.timelineRow}>
    //   <div className={styles.dateSection}>
    //     <div className={styles.date}>{dateFormatOnly(item?.date)}</div>
    //     <div className={styles.clockText}>
    //       <div className={styles.time}>Time-in: {timeFormatOnly(item?.checkInTime)}</div>
    //     </div>
    //     <div className={styles.statusClockText}>
    //       <div>Status: {item?.status}</div>
    //     </div>
    //   </div>

    //   <div className={styles.timeInImage}>
    //     <Image src={Imglog} alt="Time In" width={100} height={100} className={styles.cardTimeImage} />
    //   </div>

    //   <div className={styles.barWrapper}>
    //     <div className={styles.barSection}>
    //       <div className={styles.bar} onClick={handleClick}>
    //         {!item.checkInTime && !item.checkOutTime && item.status === "absent" ? (
    //           <div className={styles.absentBar}><span className={styles.barLabel}>{item.status}</span></div>
    //         ) : item.status === "weekoff" ? (
    //           <div className={styles.weekOffBar}><span className={styles.barLabel}>Week off</span></div>
    //         ) : onLeave ? (
    //           <div className={styles.leaveBar}><span className={styles.barLabel}>On Leave</span></div>
    //         ) : item.status === "present" ? (
    //           <div className={styles.expectedWorkingTimeBar}><span className={styles.barLabel}>Present</span></div>
    //         ) : lateDuration > 0 && (
    //           <div className={styles.lateArrivalBar} style={{ width: `${latePercent}%` }}>
    //             {latePercent > 3 && <span className={styles.barLabel}>Late</span>}
    //           </div>
    //         )}
    //         {showText && (
    //           <div className={styles.tool}>
    //             Do you want to Regularize it ?
    //             <span><button>Regularize</button></span>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   <div className={styles.timeOutImage}>
    //     <Image src={Imglog} alt="Time Out" width={100} height={100} className={styles.cardTimeImage} />
    //   </div>

    //   <div className={styles.detailsSection}>
    //     <div className={styles.clockText}><div>Time-out: {timeFormatOnly(item?.checkOutTime)}</div></div>
    //     <div className={styles.clockText}><div>Total: {total}</div></div>
    //     <div className={styles.clockText}><div>Overtime: {overtimeDuration.toFixed(2)} hrs</div></div>
    //   </div>
    // </div>

    // table code
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time-In</th>
            <th>Check-in Image</th>
            <th>Status</th>
            <th>Check-out Image</th>
            <th> Time-Out</th>
            <th>Total</th>

          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record, index) => (
            <tr key={index} >
              <td>{dateFormatOnly(record.date)}</td>
              <td>{timeFormatOnly(record.checkInTime) || "NA"}</td>
              <td style={{
                display: "flex", alignItems: "center", justifyContent: "center"
              }}><Image src={Imglog} alt="Time In" width={100} height={100} className={styles.cardTimeImage} /></td>
              <td style={{ textTransform: "capitalize" }}>
                <span className={styles.statusBadge} style={getStatusStyle(record.status, theme)}>
                  {record.status || "NA"}
                </span>
              </td>
              <td style={{
                display: "flex", alignItems: "center", justifyContent: "center"
              }}><Image src={Imglog} alt="Time Out" width={100} height={100} className={styles.cardTimeImage} /></td>
              <td>{timeFormatOnly(record.checkOutTime) || "-"}</td>
              <td>
                {record.checkInTime && record.checkOutTime
                  ? `${Math.floor(
                    moment
                      .duration(moment(record.checkOutTime).diff(moment(record.checkInTime)))
                      .asHours()
                  )} hr ${moment
                    .duration(moment(record.checkOutTime).diff(moment(record.checkInTime)))
                    .minutes()} m`
                  : "-"}
              </td>




            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
};

export default TimelineSection;
