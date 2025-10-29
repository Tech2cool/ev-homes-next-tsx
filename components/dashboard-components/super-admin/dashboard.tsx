// "use client";

// import {
//   Calendar,
//   Sun,
//   Moon,
//   Bell,
//   Truck,
//   TrendingUp,
//   Users,
//   TrendingDown,
//   Funnel,
//   Flag,
//   Home,
//   Trophy,
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Switch } from "@/components/ui/switch";
// import { useEffect, useRef, useState } from "react";
// import styles from "../closing-manager/dashboard.module.css";
// import target from "../closing-manager/target-section.module.css";
// import { MetricCard } from "../closing-manager/metric-card";
// import { FaCheck, FaCommentDots, FaFlag } from "react-icons/fa6";
// import { FaTasks } from "react-icons/fa";
// import { CircularProgress } from "../closing-manager/circular-progress";
// import TargetSection from "../closing-manager/target-section";
// import { GrGroup } from "react-icons/gr";
// import { PiChartLineUpLight } from "react-icons/pi";
// import { BsCardChecklist } from "react-icons/bs";
// import ConversionOverview from "../closing-manager/conversion-overview";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import React from "react";
// import { MdOutlinePendingActions } from "react-icons/md";
// import ProjectTargetsCarousel from "../closing-manager/project-targets-carousel";
// import { motion, AnimatePresence } from "framer-motion";

// interface SuperAdminDasboardProps {
//   userName?: string;
//   pendingText?: string;
//   lastSyncText?: string;
//   avatarUrl?: string;
//   className?: string;
//   onSyncNow?: () => void;
// }

// export function SuperAdminDasboard({
//   userName = "Deepak Karki",
//   pendingText,
//   lastSyncText = "07 Oct 25",
//   avatarUrl,
//   className,
//   onSyncNow,
// }: SuperAdminDasboardProps) {
//   // --------------------- Dummy Data ---------------------
//   const dashCount = {
//     name: "Deepak Karki",
//     task: { pending: 5 },
//     lead: {
//       total: 120,
//       visit1: 80,
//       visit2: 40,
//       booking: 25,
//       internalLeadCount: 10,
//       bulkCount: 5,
//       pending: 15,
//       bookingCp: 20,
//       bookingWalkIn: 5,
//     },
//   };

//   const teamOverview = [
//     {
//       teamName: "Team Alpha",
//       totalTasks: 120,
//       crew: [
//         { teamMember: { firstName: "Rahul", lastName: "Sharma" } },
//         { teamMember: { firstName: "Sneha", lastName: "Patil" } },
//       ],
//     },
//     {
//       teamName: "Team Beta",
//       totalTasks: 80,
//       crew: [
//         { teamMember: { firstName: "Anita", lastName: "Deshmukh" } },
//         { teamMember: { firstName: "Manoj", lastName: "Kumar" } },
//       ],
//     },
//   ];

//   const asssignFeedbackInfo = [
//     {
//       teamLeader: { firstName: "Suresh", lastName: "Patil" },
//       notFollowUpCount: 3,
//       notAssignedCount: 5,
//     },
//     {
//       teamLeader: { firstName: "Rohit", lastName: "Deshmukh" },
//       notFollowUpCount: 1,
//       notAssignedCount: 2,
//     },
//   ];

//   const myOverallTarget = {
//     target: 200,
//     projectWise: [
//       { projectName: "EV 9 SQUARE", booking: 50, registration: 30 },
//       { projectName: "EV10 Marina Bay", booking: 30, registration: 20 },
//       { projectName: "EV 23 Malibu West", booking: 20, registration: 10 },
//     ],
//   };
//   // ------------------------------------------------------

//   const displayName = dashCount?.name ?? "User";
//   const initials = React.useMemo(() => {
//     const parts = displayName.split(/\s+/).filter(Boolean);
//     if (parts.length === 0) return "U";
//     return parts.map((n) => n[0]).join("").slice(0, 2).toUpperCase();
//   }, [displayName]);

//   const [showDate, setshowDate] = useState(false);

//   const salesoverview = [
//     {
//       title: "Leads",
//       value: dashCount?.lead?.total ?? 0,
//       isPositive: true,
//       icon: <Users className="h-6 w-6" />,
//       iconColor: "text-blue-600",
//       iconBg: "bg-blue-100",
//       gradientFrom: "from-blue-50",
//       gradientTo: "to-white",
//     },
//     {
//       title: "CP Visits",
//       value: dashCount?.lead?.visit1 ?? 0,
//       isPositive: true,
//       icon: <Calendar className="h-6 w-6" />,
//       iconColor: "text-green-600",
//       iconBg: "bg-green-100",
//       gradientFrom: "from-green-50",
//       gradientTo: "to-white",
//     },
//     {
//       title: "Walk In Visits",
//       value: dashCount?.lead?.visit2 ?? 0,
//       isPositive: true,
//       icon: <Truck className="h-6 w-6" />,
//       iconColor: "text-purple-600",
//       iconBg: "bg-purple-100",
//       gradientFrom: "from-purple-50",
//       gradientTo: "to-white",
//     },
//     {
//       title: "Booking",
//       value: dashCount?.lead?.booking ?? 0,
//       isPositive: true,
//       icon: <TrendingUp className="h-6 w-6" />,
//       iconColor: "text-orange-600",
//       iconBg: "bg-orange-100",
//       gradientFrom: "from-orange-50",
//       gradientTo: "to-white",
//     },
//     {
//       title: "Internal Leads",
//       value: dashCount?.lead?.internalLeadCount ?? 0,
//       isPositive: true,
//       icon: <TrendingUp className="h-6 w-6" />,
//       iconColor: "text-teal-600",
//       iconBg: "bg-teal-100",
//       gradientFrom: "from-teal-50",
//       gradientTo: "to-white",
//     },
//     {
//       title: "Bulk Leads",
//       value: dashCount?.lead?.bulkCount ?? 0,
//       isPositive: true,
//       icon: <TrendingUp className="h-6 w-6" />,
//       iconColor: "text-pink-600",
//       iconBg: "bg-pink-100",
//       gradientFrom: "from-pink-50",
//       gradientTo: "to-white",
//     },
//     {
//       title: "Pending",
//       value: dashCount?.lead?.pending ?? 0,
//       isPositive: false,
//       icon: <TrendingDown className="h-6 w-6" />,
//       iconColor: "text-red-600",
//       iconBg: "bg-red-100",
//       gradientFrom: "from-red-50",
//       gradientTo: "to-white",
//     },
//   ];

//   const [activeCard, setActiveCard] = useState<number | null>(null);
//   const [activeCard2, setActiveCard2] = useState<number | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const assignPendingRef = useRef<HTMLDivElement>(null);
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const months = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
//   const [showMonths, setShowMonths] = useState(false);
//   const filterRef = useRef<HTMLDivElement>(null);
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [open, setOpen] = useState(false);
//   const [bookingCount, setBookingCount] = useState(
//     myOverallTarget.projectWise.reduce((acc, p) => acc + p.booking, 0)
//   );
//   const [registrationCount, setRegistrationCount] = useState(
//     myOverallTarget.projectWise.reduce((acc, p) => acc + p.registration, 0)
//   );

//   type QuickAction = {
//     label: string;
//     color: "blue" | "amber" | "green";
//     Icon: React.ElementType;
//   };

//   const quickActions: QuickAction[] = [
//     { label: "Follow Up", color: "blue", Icon: BsCardChecklist },
//     { label: "Line Up", color: "amber", Icon: PiChartLineUpLight },
//     { label: "Team Performance", color: "green", Icon: GrGroup },
//   ];

//   const leads = dashCount?.lead?.total ?? 0;
//   const bookings = dashCount?.lead?.booking ?? 0;
//   const visits =
//     (dashCount?.lead?.visit1 ?? 0) + (dashCount?.lead?.visit2 ?? 0);

//   let totalBookings = bookingCount;
//   let totalRegistrations = registrationCount;
//   const projects = myOverallTarget.projectWise ?? [];
//   const targetValue = myOverallTarget.target ?? 0;

//   const bookingPercentage =
//     targetValue > 0 ? Math.min(100, Math.round((totalBookings / targetValue) * 100)) : 0;
//   const registrationPercentage =
//     targetValue > 0 ? Math.min(100, Math.round((totalRegistrations / targetValue) * 100)) : 0;

//   const data = [
//     {
//       label: "Target",
//       value: 22,
//       actualValue: targetValue,
//       color1: "#ff7e5f",
//       color2: "#feb47b",
//       icon: Flag,
//       iconColor: "#ff7e5f",
//     },
//     {
//       label: "Booking",
//       value: bookingCount,
//       actualValue: bookingCount,
//       color1: "#00b09b",
//       color2: "#96c93d",
//       icon: Home,
//       iconColor: "#00b09b",
//     },
//     {
//       label: "Registration",
//       value: registrationCount,
//       actualValue: registrationCount,
//       color1: "#4facfe",
//       color2: "#00f2fe",
//       icon: Trophy,
//       iconColor: "#4facfe",
//     },
//   ];

//   const colors = ["#4A90E2", "#50E3C2", "#F5A623", "#BD10E0", "#9013FE"];

//   const cards =
//     teamOverview.length > 0
//       ? teamOverview.map((team, index) => ({
//           name: team.teamName ?? `Team ${index + 1}`,
//           tasks: team.totalTasks ?? 0,
//           borderColor: colors[index % colors.length],
//           members:
//             team.crew?.map(
//               (c) =>
//                 `${c?.teamMember?.firstName || ""} ${
//                   c?.teamMember?.lastName || ""
//                 }`.trim() || "Unnamed Member"
//             ) ?? [],
//         }))
//       : [
//           {
//             name: "No Teams Available",
//             tasks: 0,
//             borderColor: "#CCCCCC",
//             members: ["Add teams to see overview"],
//           },
//         ];

//   const assignFeedbackcard = Array.isArray(asssignFeedbackInfo)
//     ? asssignFeedbackInfo.map((item, index) => ({
//         name: `${item.teamLeader?.firstName ?? "Team"} ${
//           item.teamLeader?.lastName ?? "Leader"
//         }`,
//         feedback: item.notFollowUpCount ?? 0,
//         tasks: item.notAssignedCount ?? 0,
//         border: ["#87CEEB", "#FF6B6B", "#4ECDC4", "#FFE66D"][index % 4],
//       }))
//     : [];

//   const safeDivision = (numerator: number, denominator: number): number => {
//     if (!denominator || denominator === 0) return 0;
//     return +(numerator / denominator).toFixed(1);
//   };

//   const metrics = [
//     {
//       title: "Lead to CP",
//       percentage: safeDivision((dashCount?.lead?.visit1 ?? 0) * 100, dashCount?.lead?.total ?? 0),
//       count1: dashCount?.lead?.total ?? 0,
//       count2: dashCount?.lead?.visit1 ?? 0,
//       label1: "Lead",
//       label2: "CP",
//       color: "#ec4899",
//     },
//     {
//       title: "Lead to Walk In",
//       percentage: safeDivision((dashCount?.lead?.visit2 ?? 0) * 100, dashCount?.lead?.total ?? 0),
//       count1: dashCount?.lead?.total ?? 0,
//       count2: dashCount?.lead?.visit2 ?? 0,
//       label1: "Lead",
//       label2: "Visit",
//       color: "#10b981",
//     },
//     {
//       title: "CP to Booking",
//       percentage: safeDivision((dashCount?.lead?.bookingCp ?? 0) * 100, dashCount?.lead?.visit1 ?? 0),
//       count1: dashCount?.lead?.visit1 ?? 0,
//       count2: dashCount?.lead?.bookingCp ?? 0,
//       label1: "Visit",
//       label2: "Booking",
//       color: "#3b82f6",
//     },
//     {
//       title: "Walk In to Booking",
//       percentage: safeDivision((dashCount?.lead?.bookingWalkIn ?? 0) * 100, dashCount?.lead?.visit2 ?? 0),
//       count1: dashCount?.lead?.visit2 ?? 0,
//       count2: dashCount?.lead?.bookingWalkIn ?? 0,
//       label1: "Visit",
//       label2: "Booking",
//       color: "#f97316",
//     },
//   ];

//   const toggleBottomSheet = (index: number) => {
//     setActiveCard(activeCard === index ? null : index);
//   };

//   const toggleBottomSheet2 = (index: number) => {
//     setActiveCard2(activeCard2 === index ? null : index);
//   };

//   const handleMonthSelect = (month: string) => {
//     setSelectedMonth(month);
//     setShowMonths(false);
//   };

//   const years = Array.from({ length: 2125 - 1925 + 1 }, (_, i) => 1925 + i);

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;

//     const handleScroll = () => {
//       const cardWidth = 150 + 16;
//       const index = Math.round(el.scrollLeft / cardWidth);
//       setActiveIndex(index);
//     };

//     el.addEventListener("scroll", handleScroll, { passive: true });
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//         setActiveCard(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   });

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (assignPendingRef.current && !assignPendingRef.current.contains(event.target as Node)) {
//         setActiveCard2(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className={styles.container}>
//       <header
//         role="banner"
//         className={cn(
//           "w-full border-b bg-gradient-to-b from-background to-secondary/50 backdrop-blur supports-[backdrop-filter]:to-secondary/40",
//           className
//         )}
//       >
//         <div className="mx-auto max-w-screen-2xl px-4">
//           <div className="flex items-center justify-between py-2">
//             {/* Left Side - Avatar & Info */}
//             <div className="flex items-center gap-3">
//               <Avatar className="h-8 w-8 ring-2 ring-border">
//                 <AvatarImage
//                   src={
//                     avatarUrl ||
//                     "/placeholder.svg?height=32&width=32&query=user%20avatar"
//                   }
//                   alt={`${dashCount?.name ?? "test"} avatar`}
//                 />
//                 <AvatarFallback className="text-xs">{initials}</AvatarFallback>
//               </Avatar>

//               <div className="flex flex-col">
//                 <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
//                   {dashCount?.name ?? "test"}
//                 </span>
//                 <span className="text-[11px] leading-4 text-muted-foreground">
//                   {/* dynamically show pending tasks from dashCount */}
//                   {`You have ${dashCount?.task?.pending ?? 0} pending tasks`}
//                 </span>
//               </div>
//             </div>

//             {/* Right Side - Sync Info */}
//             <div className="flex flex-col items-end">
//               <p className="text-[11px] leading-4 text-muted-foreground mb-1">
//                 Last sync was:{" "}
//                 <span className="font-small text-foreground">
//                   {lastSyncText}
//                 </span>
//               </p>
//               <div className="flex items-center gap-2">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   className="rounded-full px-2 py-1 text-xs bg-transparent"
//                   onClick={onSyncNow}
//                   aria-label="Sync now"
//                 >
//                   Sync now
//                 </Button>
//                 <span className="text-[11px] text-muted-foreground">19:00</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="p-6">
//         <h2 className="text-xl font-semibold text-foreground">
//           Sales Overview
//         </h2>

//         {/* Desktop & Tablet ≥768px → Grid */}
//         <div
//           ref={scrollRef}
//           className="flex overflow-x-auto gap-0 no-scrollbar scroll-smooth snap-x snap-mandatory"
//           style={{
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//           }}
//         >
//           {salesoverview.map((metric, index) => (
//             <div
//               key={index}
//               className={`${styles.metricCardWrapper} flex-shrink-0 snap-center`}
//               style={{
//                 minWidth: "173px", // adjust card width as needed
//               }}
//             >
//               <div className={styles.metricCardContent}>
//                 <MetricCard {...metric} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center mt-3 gap-2 max-[1300px]:flex hidden">
//           {salesoverview.map((_, idx) => (
//             <span
//               key={idx}
//               className={`h-2 w-2 rounded-full transition-all ${
//                 activeIndex === idx ? "bg-blue-600 w-2" : "bg-gray-300"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       <div className={styles.mainContainer}>
//        <div className="p-6 pt-0">
//   <h2 className="text-xl font-semibold text-foreground mb-6">
//     Team Overview
//   </h2>

// <div className={styles.Monthlytarget} ref={containerRef}>
//   {cards.map((card, index) => (
//     <div key={index} className={styles.cardWrapper}>
//       <div
//         className={cn(
//           `${styles.cardtarget} ${activeCard === index ? styles.cardActive : ""}`,
//           "bg-card text-card-foreground rounded-xl shadow-sm"
//         )}
//         style={{ border: `2px solid ${card.borderColor}` }}
//         onClick={() => toggleBottomSheet(index)}
//       >
//        <div className={styles.cardHeader}>
//   <h3 className="teamName">{card.name}</h3>
//   <div
//     className={styles.assignpendibg}
//     style={{
//       borderLeftColor: card.borderColor,
//       "--hover-color": card.borderColor,
//     } as React.CSSProperties}
//   >
//     <FaTasks style={{ marginRight: "6px" }} /> 
//     {card.tasks} Tasks
//   </div>
// </div>

//       </div>

//       <div
//         className={`${styles.bottomSheet} ${activeCard === index ? styles.show : ""}`}
//         style={{ border: `2px solid ${card.borderColor}` }}
//       >
//         {card.members.map((member, mIndex) => (
//           <div
//             key={mIndex}
//             className={styles.sheetItem}
//             style={{
//               border: `0.5px solid ${card.borderColor}`,
//               background: `${card.borderColor}10`,
//             }}
//           >
//             <p className={styles.sheetLabel}>{member}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   ))}
// </div>
// </div>

//         {/* assign */}
//         <div className="p-6 pt-0">
//           <h2 className="text-xl font-semibold text-foreground mb-6">
//             Assign/Feedback Pending
//           </h2>
//           <div className={styles.Monthtarget} ref={assignPendingRef}>
//             {assignFeedbackcard.map((card, index) => (
//               <div key={index} className={styles.cardWrap}>
//                 <div
//                   className={cn(
//                     `${styles.cardassignFeedback} ${
//                       activeCard2 === index ? styles.cardActive : ""
//                     }`,
//                     "bg-card text-card-foreground rounded-xl shadow-sm" // ✅ same look as others
//                   )}
//                   style={{ border: `2px solid ${card.border}` }}
//                   onClick={() => toggleBottomSheet2(index)}
//                 >
//                   <h3>{card.name}</h3>
//                   <div className={styles.btnGroup}>
//                     <div className={styles.feedbackpending}>
//                       <FaCommentDots style={{ marginRight: "6px" }} />{" "}
//                       {card.feedback}
//                     </div>
//                     <div className={styles.assignpending}>
//                       <FaTasks style={{ marginRight: "6px" }} /> {card.tasks}
//                     </div>
//                   </div>
//                 </div>

//                 <div
//                   className={`${styles.bottomSheet2} ${
//                     activeCard2 === index ? styles.show2 : ""
//                   }`}
//                   style={{ border: `2px solid  ${card.border}` }}
//                 >
//                   <div className={styles.sheetItem2}>
//                     <p className={styles.sheetLabel2}>Feedback Pending</p>
//                     <p className={`${styles.sheetValue2} ${styles.red}`}>
//                       {card.feedback}
//                     </p>
//                   </div>
//                   <div className={`${styles.sheetItem2} ${styles.sheetgreen} `}>
//                     <p className={styles.sheetLabel2}>Assign Pending</p>
//                     <p className={`${styles.sheetValue2} ${styles.blue}`}>
//                       {card.tasks}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* overview */}
//         <div className="p-6 pt-0">
//           <h2 className="text-xl font-semibold text-foreground mb-6">
//             Quick Actions
//           </h2>

//           <div className={target.quick}>
//             {quickActions.map((action, idx) => (
//               <div
//                 key={idx}
//                 className={`${target.rowItem} ${target[action.color]}`}
//               >
//                 <action.Icon className={target[`icon${action.color}`]} />
//                 <span className={target[`label${action.color}`]}>
//                   {action.label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* <TargetSection /> */}
//       <div className="p-6 pt-0">
//         <h2 className="text-xl font-semibold text-foreground mb-6">Target</h2>
//         <div className={styles.graf}>
//           <div className={styles.grafcontainer}>
//             {data.map((item, index) => {
//               const IconComponent = item.icon;
//               return (
//                 <div className={styles.mytr} key={index}>
//                   <div
//                     className={styles.donut}
//                     style={{
//                       background: `conic-gradient(from 0deg, ${item.color1} 0%, ${item.color2} ${item.value}%, #e0e0e0 ${item.value}% 100%)`,
//                     }}
//                   >
//                     <div
//                       className={styles.iconBg}
//                       style={{ color: item.iconColor }}
//                     >
//                       <IconComponent size={40} />
//                     </div>
//                     <div className={styles.centerNumber}>{item.value}</div>
//                   </div>
//                   <div className={styles.label}>{item.label}</div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className={styles.targetcontainer}>
//             <div className={styles.texttarget}>
//               <div className={styles.progressHeader}>
//                 <p className={styles.title}>Progress</p>
//                 <span className={styles.percentage}>0% Completed</span>
//               </div>
//               <div className={styles.description}>
//                 <ProjectTargetsCarousel
//                   showDate={showDate}
//                   setShowDate={setshowDate}
//                   projects={[
//                     {
//                       projectName: "EV 9 SQUARE",
//                       metrics: [
//                         { label: "Target", count: targetValue },
//                         { label: "Booking", count: bookingCount },
//                         { label: "Registration", count: registrationCount },
//                       ],
//                     },
//                     {
//                       projectName: "EV10 Marina Bay",
//                       metrics: [
//                         { label: "Target", count: targetValue },
//                         { label: "Booking", count: bookingCount },
//                         { label: "Registration", count: registrationCount },
//                       ],
//                     },
//                     {
//                       projectName: "EV 23 Malibu West",
//                       metrics: [
//                         { label: "Target", count: targetValue },
//                         { label: "Booking", count: bookingCount },
//                         { label: "Registration", count: registrationCount },
//                       ],
//                     },
//                     {
//                       projectName: "Heart City",
//                       metrics: [
//                         { label: "Target", count: targetValue },
//                         { label: "Booking", count: bookingCount },
//                         { label: "Registration", count: registrationCount },
//                       ],
//                     },
//                   ]}
//                 />
//               </div>
//             </div>
//             {/* calender */}
//             <AnimatePresence>
//               {showDate && ( // render when the button is clicked
//                 <motion.div
//                   key="calendar"
//                   initial={{ opacity: 0, x: -50, scale: 0.95 }}
//                   animate={{ opacity: 1, x: 0, scale: 1 }}
//                   exit={{ opacity: 0, x: -50, scale: 0.95 }}
//                   transition={{ duration: 0.5, ease: "easeInOut" }}
//                   className={styles.filter}
//                 >
//                   {/* Year Selector */}
//                   <div className={styles.customSelect}>
//                     <div
//                       className={styles.selected}
//                       onClick={() => setOpen(!open)}
//                     >
//                       {year}
//                       <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
//                     </div>
//                     {open && (
//                       <div className={styles.optionsGrid}>
//                         {years.map((y) => (
//                           <div
//                             key={y}
//                             className={styles.optionMain}
//                             onClick={() => {
//                               setYear(y);
//                               setOpen(false);
//                             }}
//                           >
//                             {y}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* Month Grid */}
//                   <div className={styles.monthGrid}>
//                     {months.map((month, index) => (
//                       <div key={index} className={styles.monthItem}>
//                         {month}
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         <div className={styles.grafMobile}>
//           <div className={styles.progressCard}>
//             <div className={styles.targetsWrapper}>
//               {[
//                 { label: "Target", value: 10, color: "#ffb347" },
//                 { label: "Achieved", value: 5, color: "#4caf50" },
//                 { label: "Pending", value: 5, color: "#ef5350" },
//               ].map((item, index) => (
//                 <div className={styles.targetCard} key={index}>
//                   <div
//                     className={styles.targetNumber}
//                     style={{ backgroundColor: item.color }}
//                   >
//                     {item.value}
//                   </div>
//                   <div className={styles.targetLabel}>{item.label}</div>
//                 </div>
//               ))}
//             </div>
//             <div className={styles.texttarget}>
//               <div className={styles.filterIconContainer} ref={filterRef}>
//                 <button
//                   className={styles.filterButton}
//                   onClick={() => setShowMonths(!showMonths)}
//                 >
//                   {selectedMonth ? selectedMonth : ""} <Funnel size={15} />
//                 </button>

//                 {showMonths && (
//                   <div className={styles.monthDropdown}>
//                     <div className={styles.yearSelector}>
//                       <select
//                         value={year}
//                         onChange={(e) => setYear(Number(e.target.value))}
//                       >
//                         {years.map((y) => (
//                           <option key={y} value={y}>
//                             {y}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className={styles.monthGrid}>
//                       {months.map((month, index) => (
//                         <div
//                           key={index}
//                           className={styles.monthItemMobile}
//                           onClick={() => handleMonthSelect(month)}
//                         >
//                           {month}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className={styles.progressHeader}>
//                 <p className={styles.title}>Progress</p>
//                 <span className={styles.percentage}>0% Completed</span>
//               </div>
//               <div className={styles.description}>
//                 <ProjectTargetsCarousel
//                   showDate={showDate}
//                   setShowDate={setshowDate}
//                   projects={[
//                     {
//                       projectName: "EV 9 SQUARE",
//                       metrics: [
//                         { label: "Target", count: 120 },
//                         { label: "Booking", count: 75 },
//                         { label: "Registration", count: 58 },
//                       ],
//                     },
//                     {
//                       projectName: "EV10 Marina Bay",
//                       metrics: [
//                         { label: "Target", count: 9 },
//                         { label: "Booking", count: 0 },
//                         { label: "Registration", count: 0 },
//                       ],
//                     },
//                     {
//                       projectName: "EV 23 Malibu West",
//                       metrics: [
//                         { label: "Target", count: 6 },
//                         { label: "Booking", count: 0 },
//                         { label: "Registration", count: 0 },
//                       ],
//                     },
//                     {
//                       projectName: "Heart City",
//                       metrics: [
//                         { label: "Target", count: 7 },
//                         { label: "Booking", count: 0 },
//                         { label: "Registration", count: 0 },
//                       ],
//                     },
//                   ]}
//                 />
//               </div>
//               {/* <div className={styles.description}>
//                 You have <strong>2 days</strong> remaining to complete{" "}
//                 <strong>5 more CP's Onboarding</strong>.
//               </div> */}
//             </div>

//             {/* Month Filter Icon */}
//           </div>
//         </div>
//       </div>

//       <div className="p-4 sm:p-6 pt-0">
//         <div className="flex flex-col lg:flex-row gap-4">
//           {/* Left - Conversion Metrics */}
//           <div className="flex-1">
//             {/* Title for left */}
//             <h2 className="text-xl sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
//               Conversion Metrics
//             </h2>

//             <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border text-card-foreground">
//               <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {metrics.map((kpi, index) => (
//                   <CircularProgress
//                     key={index}
//                     title={kpi.title}
//                     percentage={kpi.percentage}
//                     count1={kpi.count1}
//                     count2={kpi.count2}
//                     label1={kpi.label1}
//                     label2={kpi.label2}
//                     color={kpi.color}
//                     size={100}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           <ConversionOverview
//             leads={leads}
//             bookings={bookings}
//             visits={visits}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../data-analyzer-dashboard/overview.module.css"
import superstayle from "./dashboard.module.css"
import { FaCommentDots, FaTasks, FaUserFriends } from "react-icons/fa";
import { FaUsers, FaCheck, FaTimes, FaClock, FaBoxes, FaArrowRight } from "react-icons/fa";
import { Flag, Funnel } from "lucide-react";
import { FaArrowLeft, FaCarSide, FaFlag, FaUserTie } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import Report from "../data-analyzer-dashboard/Report"
import { IoMdKey } from "react-icons/io";
import ConversionOverview from "../closing-manager/conversion-overview";
import { CircularProgress } from "../closing-manager/circular-progress";

const cardsData = [
    { label: "Total Leads", value: 10000, icon: <FaUsers />, color: "#ad82f2e1", bgcolor: "#7c2ff706" },
    { label: "Visit 1", value: 7500, icon: <FaUserTie />, color: "#88c08aa8", bgcolor: "#4caf4f09" },
    { label: "Visit 2", value: 1200, icon: <FaCarSide />, color: "#ce676082", bgcolor: "#f4433609" },
    { label: "Booking", value: 800, icon: <IoMdKey />, color: "#c0a24aa7", bgcolor: "#ffc10709" },
    { label: "Internal leads", value: 500, icon: <FaUserFriends />, color: "#bd58959c", bgcolor: "#d4006a09" },
    { label: "Bulk Leads", value: 500, icon: <FaBoxes />, color: "#58b1bd9c", bgcolor: "#00bbd409" }
];


const SuperAdminDasboard = () => {

    const [activeCard, setActiveCard] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [year, setYear] = useState(new Date().getFullYear());
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [showMonths, setShowMonths] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("");
    const filterRef = useRef<HTMLDivElement>(null);
    const visitscrollRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const starRef = useRef<HTMLSpanElement>(null);
    const starvisitRef = useRef<HTMLSpanElement>(null);

    const dashCount = {
        name: "Deepak Karki",
        task: { pending: 5 },
        lead: {
            total: 120,
            visit1: 80,
            visit2: 40,
            booking: 25,
            internalLeadCount: 10,
            bulkCount: 5,
            pending: 15,
            bookingCp: 20,
            bookingWalkIn: 5,
        },
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollEl = scrollRef.current;
            const starEl = starRef.current;
            const hintContainer = document.querySelector(`.${styles.hintcontainer}`) as HTMLDivElement;

            if (!scrollEl || !starEl || !hintContainer) return;

            const scrollPercent = scrollEl.scrollLeft / (scrollEl.scrollWidth - scrollEl.clientWidth);
            const hintWidth = hintContainer.offsetWidth;
            const wrapper = starEl.parentElement as HTMLElement;
            wrapper.style.left = `${scrollPercent * (hintWidth - wrapper.offsetWidth)}px`;
            starEl.style.transform = `rotate(${scrollPercent * 360 * 3}deg)`;
        };

        scrollRef.current?.addEventListener("scroll", handleScroll);
        return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
    }, []);
    useEffect(() => {
        const visitScroll = () => {
            const scrollEl = visitscrollRef.current;
            const starEl = starvisitRef.current;
            const hintContainer = document.querySelector(`.${styles.hintcontainer}`) as HTMLDivElement;

            if (!scrollEl || !starEl || !hintContainer) return;

            const scrollPercent = scrollEl.scrollLeft / (scrollEl.scrollWidth - scrollEl.clientWidth);
            const hintWidth = hintContainer.offsetWidth;
            const wrapper = starEl.parentElement as HTMLElement;
            wrapper.style.left = `${scrollPercent * (hintWidth - wrapper.offsetWidth)}px`;
            starEl.style.transform = `rotate(${scrollPercent * 360 * 3}deg)`;
        };

        visitscrollRef.current?.addEventListener("scroll", visitScroll);
        return () => visitscrollRef.current?.removeEventListener("scroll", visitScroll);
    }, []);

    const handleMonthSelect = (month: string) => {
        setSelectedMonth(month);
        setShowMonths(false);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setShowMonths(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filterRef]);
    const years = Array.from({ length: 10 }, (_, i) => year - 5 + i);
    const cards = [
        { name: "Deepak Karki", feedback: 100, tasks: 300 },
        { name: "Jasprit Arora", feedback: 210, tasks: 320 },
        { name: "Janhana Gumpta", feedback: 150, tasks: 310 },
    ];


    const toggleBottomSheet = (index: number) => {
        setActiveCard(activeCard === index ? null : index);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setActiveCard(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const data = [
        {
            label: "Target",
            value: 65,
            color1: "#ff7e5f",
            color2: "#feb47b",
            icon: FaFlag,
            iconColor: "#ff7e5f",
        },
        {
            label: "Achieved",
            value: 20,
            color1: "#00b09b",
            color2: "#96c93d",
            icon: FaCheck,
            iconColor: "#00b09b",
        },
        {
            label: "Pending",
            value: 10,
            color1: "#4facfe",
            color2: "#00f2fe",
            icon: MdOutlinePendingActions,
            iconColor: "#4facfe",
        },
    ];
    const safeDivision = (numerator: number, denominator: number): number => {
        if (!denominator || denominator === 0) return 0;
        return +(numerator / denominator).toFixed(1);
    };
    const metrics = [
        {
            title: "Lead to CP Visit",
            percentage: safeDivision((dashCount?.lead?.visit1 ?? 0) * 100, dashCount?.lead?.total ?? 0),
            count1: dashCount?.lead?.total ?? 0,
            count2: dashCount?.lead?.visit1 ?? 0,
            label1: "Lead",
            label2: "CP Visit",
            color: "#ec4899",
        },
        {
            title: "CP Visit to Booking",
            percentage: safeDivision((dashCount?.lead?.visit2 ?? 0) * 100, dashCount?.lead?.total ?? 0),
            count1: dashCount?.lead?.total ?? 0,
            count2: dashCount?.lead?.visit2 ?? 0,
            label1: "CP Visit",
            label2: "Booking",
            color: "#10b981",
        },
        {
            title: "Lead to Booking",
            percentage: safeDivision((dashCount?.lead?.bookingCp ?? 0) * 100, dashCount?.lead?.visit1 ?? 0),
            count1: dashCount?.lead?.visit1 ?? 0,
            count2: dashCount?.lead?.bookingCp ?? 0,
            label1: "Lead",
            label2: "Booking",
            color: "#3b82f6",
        },
        {
            title: "Walk In to Booking",
            percentage: safeDivision((dashCount?.lead?.bookingWalkIn ?? 0) * 100, dashCount?.lead?.visit2 ?? 0),
            count1: dashCount?.lead?.visit2 ?? 0,
            count2: dashCount?.lead?.bookingWalkIn ?? 0,
            label1: "Visit",
            label2: "Booking",
            color: "#f97316",
        },
    ];
    return (
        <div className={styles.tabcontainer}>

            <div className={styles.headtitle}>
                <div className={styles.ding} >
                    Leads Overview
                </div>
            </div>
            <div className={styles.leadsection}>

                {/* Horizontal scrollable cards */}
                <div className={superstayle.tapsection} ref={scrollRef}>
                    {cardsData.map((card, index) => (
                        <div className={superstayle.card} key={index}>
                            <div className={styles.bgIcon} style={{ color: card.bgcolor }}>
                                {card.icon}
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.topRow}>
                                    <div className={styles.iconContainer} style={{ color: card.color }}>
                                        {card.icon}
                                    </div>
                                    <div className={styles.arrowContainer} style={{ color: card.color }}>
                                        <FaArrowRight />
                                    </div>
                                </div>
                                <p className={styles.label}>{card.label}</p>
                                <p className={styles.value}>{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.hint}>
                    <div className={styles.hintcontainer}>
                        <span className={styles.starWrapper}>
                            «<span className={styles.star} ref={starRef}>✦︎</span>»
                        </span>
                    </div>
                </div>



            </div>

            <div className={styles.headtitle}>
                <div className={styles.ding} >
                    Visit Overview
                </div>
            </div>
            <div className={styles.visitsection}>
                <div className={styles.viewrow} ref={visitscrollRef}>
                    <div className={styles.viewcontainer}>
                        <div className={styles.numsec}>2335</div>
                        <p><i className="fas fa-check-circle"></i>Total Visit</p>
                    </div>
                    <div className={styles.viewcontainer}>
                        <div className={styles.numsec}>1180</div>
                        <p> Visit Approved</p>

                    </div>
                    <div className={styles.viewcontainer}>
                        <div className={styles.numsec}>0</div>
                        <p> Visit Rejected</p>

                    </div>
                    <div className={styles.viewcontainer}>
                        <div className={styles.numsec}>2</div>
                        <p> Visit Pending</p>

                    </div>

                </div>
                <div className={styles.hint}>
                    <div className={styles.hintcontainer}>
                        <span className={styles.starWrapper}>
                            «<span className={styles.star} ref={starvisitRef}>✦︎</span>»
                        </span>
                    </div>
                </div>

            </div>




            <div className={styles.headtitle}>
                <div className={styles.ding} >
                    Assign/Feedback Pending
                </div>
            </div>
            <div className={styles.Monthlytarget} ref={containerRef}>
                {cards.map((card, index) => (
                    <div key={index} className={styles.cardWrapper}>
                        <div
                            className={`${styles.cardtarget} ${activeCard === index ? styles.cardActive : ""
                                }`}
                            onClick={() => toggleBottomSheet(index)}
                        >
                            <h3>{card.name}</h3>
                            <div className={styles.btnGroup}>
                                <div className={styles.feedbackpendibg}>
                                    <FaCommentDots style={{ marginRight: "6px" }} /> {card.feedback}
                                </div>
                                <div className={styles.assignpendibg}>
                                    <FaTasks style={{ marginRight: "6px" }} /> {card.tasks}
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${styles.bottomSheet} ${activeCard === index ? styles.show : ""
                                }`}
                        >
                            <div className={styles.sheetItem}>
                                <p className={styles.sheetLabel}>Feedback Pending</p>
                                <p className={`${styles.sheetValue} ${styles.red}`}>1000</p>
                            </div>
                            <div className={`${styles.sheetItem} ${styles.sheetgreen} `}>
                                <p className={styles.sheetLabel}>Assign Pending</p>
                                <p className={`${styles.sheetValue} ${styles.blue}`}>200</p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <div className={styles.headtitle}>
                <div className={styles.ding} >
                    Rank
                </div>
            </div>
            
            <div className={styles.headtitle}>
                <div className={styles.ding} >
                    Conversion Metrics
                </div>
            </div>
            <div className="p-4 sm:p-6 pt-0">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">


                        <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border text-card-foreground">
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {metrics.map((kpi, index) => (
                                    <CircularProgress
                                        key={index}
                                        title={kpi.title}
                                        percentage={kpi.percentage}
                                        count1={kpi.count1}
                                        count2={kpi.count2}
                                        label1={kpi.label1}
                                        label2={kpi.label2}
                                        color={kpi.color}
                                        size={100}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
};

export default SuperAdminDasboard;
