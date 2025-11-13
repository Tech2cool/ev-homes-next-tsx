// "use client";
// import React, { useState, useEffect } from "react";
// import styles from "./Overtime.module.css";
// import {
//     PieChart,
//     Pie,
//     Cell,
//     ResponsiveContainer,
// } from "recharts";

// const Overtime: React.FC = () => {

//     const totalHours = 234;
//     const presentHours = 280;

//     const [percent, setpercent] = useState(0);
//     const targetPercent = Math.round((presentHours / totalHours) * 100);


//     const overtimeHours = presentHours > totalHours ? presentHours - totalHours : 0;
//     const remainingOvertime = overtimeHours > 0 ? Math.max(0, 20 - overtimeHours) : 20;

//     const Colors = ["green", "#2e2e2eff"];

//     const overtimeData =
//         presentHours >= totalHours
//             ? [
//                 { name: "Overtime Completed", value: overtimeHours },
//                 { name: "Remaining", value: remainingOvertime },
//             ]
//             : [
//                 { name: "Overtime Completed", value: 0 },
//                 { name: "Remaining", value: 20 },
//             ];

//     useEffect(() => {
//         const timer = setTimeout(() => setpercent(targetPercent), 200);
//         return () => clearTimeout(timer);
//     }, [targetPercent]);

//     return (
//         <>
//             <div className={styles.OvertimeMain}>
//                 <div className={styles.Container}>
//                     <h2 className={styles.Heading}>Monthly Attendance</h2>

//                     <div className={styles.ChartMain}>

//                         <div className={styles.AttendanceLineSec}>
//                             <p className={styles.HrsInfo}>
//                                 {presentHours} Hrs / {totalHours} Hrs <span> ({percent}%)</span> </p>
//                             <div className={styles.LineBackground}>
//                                 <div
//                                     className={styles.LineFill}
//                                     style={{ width: `${percent}%` }}
//                                 ></div>
//                             </div>

//                             <div className={styles.workingDetails}><p>WO : <span style={{ color: "#476EAE" }}>20</span></p>
//                                 <p>P : <span style={{ color: "green" }} >2</span></p>
//                                 <p>HD : <span style={{ color: "orange" }}>8</span></p>
//                                 <p>L : <span style={{ color: "red" }}>10</span></p>

//                             </div>
//                         </div>

//                         <div className={styles.piebox}>
//                             <ResponsiveContainer width={200} height={170}>
//                                 <PieChart>
//                                     <Pie
//                                         data={overtimeData}
//                                         cx="50%"
//                                         cy="50%"
//                                         innerRadius={60}
//                                         outerRadius={80}
//                                         dataKey="value"
//                                         stroke="none"
//                                         labelLine={false}
//                                         label={({ cx, cy }) => (
//                                             <text
//                                                 x={cx}
//                                                 y={cy}
//                                                 fill="#658C58"
//                                                 textAnchor="middle"
//                                                 dominantBaseline="middle"
//                                                 fontSize={15}
//                                                 fontWeight="bold"
//                                             >
//                                                 {overtimeData[0].value} hr
//                                             </text>
//                                         )}
//                                     >
//                                         {overtimeData.map((entry, index) => (
//                                             <Cell
//                                                 key={`cell-${index}`}
//                                                 fill={Colors[index % Colors.length]}
//                                             />
//                                         ))}
//                                     </Pie>
//                                 </PieChart>
//                             </ResponsiveContainer>

//                             <p>Overtime</p>



//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Overtime;
