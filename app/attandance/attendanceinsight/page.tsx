
// "use client";
// import React, { useState } from "react";
// import Attendanceheader from "@/components/AllAttendance/Attendanceheader";
// import Attendancesummarycards from "@/components/AllAttendance/Attendancesummarycards";
// import Attendancefiltersection from "@/components/AllAttendance/Attendancefiltersection";

// const Attendanceinsight = () => {
//     const [selectedDate, setSelectedDate] = useState(new Date());

//     const dailyAttendance = {
//     presentCount: 12,
//     absentCount: 3,
//     weekOffCount: 2,
//     onLeaveCount: 1,
//     lateComersCount: 2,
//     earlyLeaversCount: 1,}
    

//   return (
//     <div>
//       <Attendanceheader
//               selectedDate={selectedDate}
//         setSelectedDate={setSelectedDate}
//       />
//       <Attendancesummarycards dailyAttendance={dailyAttendance}/>
//       <Attendancefiltersection />
//     </div>
//   );
// };

// export default Attendanceinsight;


"use client";
import React, { useEffect, useState } from "react";
import Attendanceheader from "@/components/AllAttendance/Attendanceheader";
import Attendancesummarycards from "@/components/AllAttendance/Attendancesummarycards";
import Attendancefiltersection from "@/components/AllAttendance/Attendancefiltersection";


const Attendanceinsight = () => {

 const [selectedDate, setSelectedDate] = useState(new Date());

      const dailyAttendance = {
    presentCount: 12,
    absentCount: 3,
    weekOffCount: 2,
    onLeaveCount: 1,
    lateComersCount: 2,
    earlyLeaversCount: 1,}
  return (
    <div>
      <Attendanceheader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Attendancesummarycards dailyAttendance={dailyAttendance} />
      <Attendancefiltersection  />
    </div>
  );
};

export default Attendanceinsight;
