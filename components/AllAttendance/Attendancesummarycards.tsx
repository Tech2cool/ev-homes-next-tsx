// import React from "react";
// import styles from "./attendancesummarycards.module.css";
// import {
//   FaUserCheck,
//   FaUserTimes,
//   FaCalendarWeek,
//   FaUserClock,
//   FaSignInAlt,
//   FaSignOutAlt,
// } from "react-icons/fa";

// interface DailyAttendance {
//   presentCount?: number;
//   absentCount?: number;
//   weekOffCount?: number;
//   onLeaveCount?: number;
//   lateComersCount?: number;
//   earlyLeaversCount?: number;
// }

// interface AttendancesummarycardsProps {
//   dailyAttendance: DailyAttendance;
// }

// const Attendancesummarycards: React.FC<AttendancesummarycardsProps> = ({
//   dailyAttendance,
// }) => {
//   const data = [
//     {
//       title: "Present Summary",
//       items: [
//         { label: "Present", value: dailyAttendance?.presentCount ?? 0 },
//         { label: "Late Comers", value: dailyAttendance?.lateComersCount ?? 0 },
//         {
//           label: "Early Leavers",
//           value: dailyAttendance?.earlyLeaversCount ?? 0,
//         },
//       ],
//     },
//     {
//       title: "Absent Summary",
//       items: [
//         { label: "Absent", value: dailyAttendance?.absentCount ?? 0 },
//         { label: "Leave", value: dailyAttendance?.onLeaveCount ?? 0 },
//       ],
//     },
//     {
//       title: "Day Off Summary",
//       items: [{ label: "Week off", value: dailyAttendance?.weekOffCount ?? 0 }],
//     },
//   ];

//   const attendanceData = [
//     {
//       title: "Present",
//       count: dailyAttendance?.presentCount ?? 0,
//       icon: <FaUserCheck />,
//       color: "#4CAF50",
//     },
//     {
//       title: "Absent ",
//       count: dailyAttendance?.absentCount ?? 0,
//       icon: <FaUserTimes />,
//       color: "#F44336",
//     },
//     {
//       title: "Week Off",
//       count: dailyAttendance?.weekOffCount ?? 0,
//       icon: <FaCalendarWeek />,
//       color: "#FF9800",
//     },
//   ];

//   const attendanceDataLeave = [
//     {
//       title: "Leave",
//       count: dailyAttendance?.onLeaveCount ?? 0,
//       icon: <FaUserClock />,
//       color: "#FFC107",
//     },
//     {
//       title: "Late Comers",
//       count: dailyAttendance?.lateComersCount ?? 0,
//       icon: <FaSignInAlt />,
//       color: "#03A9F4",
//     },
//     {
//       title: "Early Leavers",
//       count: dailyAttendance?.earlyLeaversCount ?? 0,
//       icon: <FaSignOutAlt />,
//       color: "#9C27B0",
//     },
//   ];

//   return (
//     <div>
//       <div className={styles.container}>
//         {data.map((section, i) => (
//           <div key={i} className={styles.card}>
//             <div className={styles.title}>{section.title}</div>
//             <div className={styles.itemsRow}>
//               {section.items.map((item, idx) => (
//                 <React.Fragment key={idx}>
//                   <div className={styles.itemBox}>
//                     <div className={styles.label}>{item.label}</div>
//                     <div className={styles.value}>{item.value}</div>
//                   </div>
//                   {idx < section.items.length - 1 && (
//                     <div className={styles.divider}></div>
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* display only mobile */}
//       <div className={styles.nocontainer}>
//         {attendanceData.map((item, index) => (
//           <div
//             key={index}
//             className={styles.nocard}
//             style={{ borderColor: item.color }}
//           >
//             <div className={styles.data}>
//               <div className={styles.content}>
//                 <p>{item.count}</p>
//                 <div className={styles.icon} style={{ color: item.color }}>
//                   {item.icon}
//                 </div>
//               </div>
//               <div className={styles.item}>
//                 <p>{item.title}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className={styles.nocontainer}>
//         {attendanceDataLeave.map((item, index) => (
//           <div
//             key={index}
//             className={styles.nocard}
//             style={{ borderColor: item.color }}
//           >
//             <div className={styles.data}>
//               <div className={styles.content}>
//                 <p>{item.count}</p>
//                 <div className={styles.icon} style={{ color: item.color }}>
//                   {item.icon}
//                 </div>
//               </div>
//               <div className={styles.item}>
//                 <p>{item.title}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Attendancesummarycards;


import React from "react";
import styles from "./attendancesummarycards.module.css";
import {
  FaUserCheck,
  FaUserTimes,
  FaCalendarWeek,
  FaUserClock,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { icons } from "lucide-react";
interface DailyAttendance {
    presentCount?: number;
  absentCount?: number;
  weekOffCount?: number;
  onLeaveCount?: number;
  lateComersCount?: number;
  earlyLeaversCount?: number;
}
interface AttendancesummarycardsProps {
dailyAttendance: DailyAttendance
}

const Attendancesummarycards:React.FC<AttendancesummarycardsProps>=({dailyAttendance}) => {
  const data = [
    {
      title: "Present Summary",
      items: [
        { label: "Present", value: dailyAttendance?.presentCount ?? 0 },
        { label: "Late Comers", value: dailyAttendance?.lateComersCount ?? 0 },
        {
          label: "Early Leavers",
          value: dailyAttendance?.earlyLeaversCount ?? 0,
        },
      ],
    },
    {
      title: "Absent Summary",
      items: [
        { label: "Absent", value: dailyAttendance?.absentCount ?? 0 },
        { label: "Leave", value: dailyAttendance?.onLeaveCount ?? 0 },
      ],
    },
    {
      title: "Day Off Summary",
      items: [{ label: "Week off", value: dailyAttendance?.weekOffCount ?? 0 }],
    },
  ];
  const attendanceData = [
    {
      title: "Present",
      count: dailyAttendance?.presentCount ?? 0,
      icon: <FaUserCheck />,
      color: "#4CAF50",
    },
    {
      title: "Absent ",
      count: dailyAttendance?.absentCount ?? 0,
      icon: <FaUserTimes />,
      color: "#F44336",
    },
    {
      title: "Week Off",
      count: dailyAttendance?.weekOffCount ?? 0,
      icon: <FaCalendarWeek />,
      color: "#FF9800",
    },
  ];

  const attendanceDataLeave = [
    {
      title: "Leave",
      count: dailyAttendance?.onLeaveCount ?? 0,
      icon: <FaUserClock />,
      color: "#FFC107",
    },
    {
      title: "Late Comers",
      count: dailyAttendance?.lateComersCount ?? 0,
      icon: <FaSignInAlt />,
      color: "#03A9F4",
    },
    {
      title: "Early Leavers",
      count: dailyAttendance?.earlyLeaversCount ?? 0,
      icon: <FaSignOutAlt />,
      color: "#9C27B0",
    },
  ];
  return (
    <div>
      <div className={styles.container}>
        {data.map((section, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.title}>{section.title}</div>
            <div className={styles.itemsRow}>
              {section.items.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className={styles.itemBox}>
                    <div className={styles.label}>{item.label}</div>
                    <div className={styles.value}>{item.value}</div>
                  </div>
                  {idx < section.items.length - 1 && (
                    <div className={styles.divider}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* display only mobile */}
      <div className={styles.nocontainer}>
        {attendanceData.map((item, index) => (
          <div
            key={index}
            className={styles.nocard}
            style={{ borderColor: item.color }}
          >
            <div className={styles.data}>
              <div className={styles.content}>
                <p>{item.count}</p>
                <div className={styles.icon} style={{ color: item.color }}>
                  {item.icon}
                </div>
              </div>
              <div className={styles.item}>
                <p>{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.nocontainer}>
        {attendanceDataLeave.map((item, index) => (
          <div
            key={index}
            className={styles.nocard}
            style={{ borderColor: item.color }}
          >
            <div className={styles.data}>
              <div className={styles.content}>
                <p>{item.count}</p>
                <div className={styles.icon} style={{ color: item.color }}>
                  {item.icon}
                </div>
              </div>
              <div className={styles.item}>
                <p>{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendancesummarycards;

