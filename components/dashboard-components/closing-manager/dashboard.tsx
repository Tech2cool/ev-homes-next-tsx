"use client";

import {
  Calendar,
  Sun,
  Moon,
  Bell,
  Truck,
  TrendingUp,
  Users,
  TrendingDown,
  Funnel,
  Flag,
  Home,
  Trophy,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css";
import target from "./target-section.module.css";
import { MetricCard } from "./metric-card";
import { FaCheck, FaCommentDots, FaFlag } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { CircularProgress } from "./circular-progress";
import TargetSection from "./target-section";
import { GrGroup } from "react-icons/gr";
import { PiChartLineUpLight } from "react-icons/pi";
import { BsCardChecklist } from "react-icons/bs";
import ConversionOverview from "./conversion-overview";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import ProjectTargetsCarousel from "./project-targets-carousel";
import { createContext } from "vm";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "@/providers/dataContext";
import { useUser } from "@/providers/userContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ClosingManagerDashboardHeaderProps {
  userName: string;
  pendingText?: string;
  lastSyncText?: string;
  avatarUrl?: string;
  className?: string;
  onSyncNow?: () => void;
}

export function ClosingManagerDashboardHeader({
  userName ,
  pendingText,
  lastSyncText = "07 Oct 25",
  avatarUrl,
  className,
  onSyncNow,
}: ClosingManagerDashboardHeaderProps) {
  const {
    teamOverview,
    dashCount,
    asssignFeedbackInfo,
    myOverallTarget,
    getClosingManagerDashBoardCount,
    fetchAssignFeedbackLeadsCount,
    getQuarterWiseTarget,
    getTeamOverview,
  } = useData();
  const { user, loading } = useUser();
  const router = useRouter();

  // const teamMembers =
  //   teamOverview?.crew
  //     ?.map((member: any) => member.teamMember)
  //     .filter(Boolean) || [];

  useEffect(() => {
    const fetchTeamOverview = async () => {
      if (user?._id) {
        console.log("👤 Fetching team overview for user:", user._id);
        await getTeamOverview(user._id);
      }
    };

    fetchTeamOverview();
  }, [user?._id]);

  useEffect(() => {
    if (user && !loading) {
      console.log("use effect dashboard");
      getClosingManagerDashBoardCount({ id: user?._id ?? "" });
      fetchAssignFeedbackLeadsCount({
        query: "",
        page: 1,
        limit: 10,
      });

      const currentYear = new Date().getFullYear();
      const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3);
      getQuarterWiseTarget(user?._id ?? "", currentQuarter, currentYear);
    }
  }, [user, loading]);

  // This runs when the state is actually updated
  useEffect(() => {
    if (asssignFeedbackInfo) {
      console.log("assignFeedbackInfo updated:", asssignFeedbackInfo);
    }
  }, [asssignFeedbackInfo]);

  useEffect(() => {
    if (myOverallTarget) {
      console.log("=== TARGET DATA DEBUG ===");
      console.log("Target:", myOverallTarget.target);
      console.log("Projects:", myOverallTarget.projectWise);

      let debugBookings = 0;
      let debugRegistrations = 0;

      myOverallTarget.projectWise?.forEach((proj, idx) => {
        console.log(`Project ${idx}:`, proj);
        debugBookings += proj?.booking ?? 0;
        debugRegistrations += proj?.registration ?? 0;
      });

      console.log("Total Bookings:", debugBookings);
      console.log("Total Registrations:", debugRegistrations);
      console.log("=== END DEBUG ===");

      setBookingCount(debugBookings);
      setRegistrationCount(debugRegistrations);
    }
  }, [myOverallTarget]);

  const displayName = (dashCount?.name ?? "").trim() || "User";
  const initials = React.useMemo(() => {
    const parts = displayName.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    return parts
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [displayName]);

  const handleCardClick = async (status?: String) => {
    const apiStatus = status === "all" ? null : status;
    // Pass the filtered data via router state
    router.push(`/lead-details?status=${apiStatus}`);
  };

  const [showDate, setshowDate] = useState(false);

  const salesoverview = [
    {
      title: "Leads",
      value: dashCount?.lead?.total ?? 0,
      isPositive: true,
      icon: <Users className="h-6 w-6" />,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      gradientFrom: "from-blue-50",
      gradientTo: "to-white",
      status: "all",
      // linkHref: "/lead-details?status=all",
      // onClick: () => router.push("/closing-manager-lead-details"),
    },
    {
      title: "CP Visits",
      value: dashCount?.lead?.visit1 ?? 0,
      isPositive: true,
      icon: <Calendar className="h-6 w-6" />,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      gradientFrom: "from-green-50",
      gradientTo: "to-white",
      status: "visit-done",
      // linkHref: "/lead-details?status=all",
    },
    {
      title: "Walk In Visits",
      value: dashCount?.lead?.visit2 ?? 0,
      isPositive: true,
      icon: <Truck className="h-6 w-6" />,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      gradientFrom: "from-purple-50",
      gradientTo: "to-white",
      status: "visit2",
      // linkHref: "/lead-details?status=all",
    },
    {
      title: "Booking",
      value: dashCount?.lead?.booking ?? 0,
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      gradientFrom: "from-orange-50",
      gradientTo: "to-white",
      status: "booking-done",
      // linkHref: "/lead-details?status=all",
    },
    {
      title: "Internal Leads",
      value: dashCount?.lead?.internalLeadCount ?? 0,
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-100",
      gradientFrom: "from-teal-50",
      gradientTo: "to-white",
      status: "internal-lead",
      // linkHref: "/lead-details?status=all",
    },
    {
      title: "Bulk Leads",
      value: dashCount?.lead?.bulkCount ?? 0,
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      iconColor: "text-pink-600",
      iconBg: "bg-pink-100",
      gradientFrom: "from-pink-50",
      gradientTo: "to-white",
      status: "bulk-lead",     
      // linkHref: "/lead-details?status=all",
    },
    {
      title: "Pending",
      value: dashCount?.lead?.pending ?? 0,
      isPositive: false,
      icon: <TrendingDown className="h-6 w-6" />,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      gradientFrom: "from-red-50",
      gradientTo: "to-white",
      status: "pending",
      // linkHref: "/lead-details?status=all",
    },
  ];

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeCard2, setActiveCard2] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const assignPendingRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const months = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
  const [showMonths, setShowMonths] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [open, setOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const [registrationCount, setRegistrationCount] = useState(0);

  type QuickAction = {
    label: string;
    color: "blue" | "amber" | "green";
    Icon: React.ElementType;
  };

  const quickActions: QuickAction[] = [
    { label: "Follow Up", color: "blue", Icon: BsCardChecklist },
    { label: "Line Up", color: "amber", Icon: PiChartLineUpLight },
    { label: "Team Performance", color: "green", Icon: GrGroup },
  ];

  const leads = dashCount?.lead?.total ?? 0;
  const bookings = dashCount?.lead?.booking ?? 0;
  const visits =
    (dashCount?.lead?.visit1 ?? 0) + (dashCount?.lead?.visit2 ?? 0);

  let totalBookings = 0;
  let totalRegistrations = 0;
  const projects = myOverallTarget?.projectWise ?? [];

  for (const project of projects) {
    totalBookings += project?.booking ?? 0;
    totalRegistrations += project?.registration ?? 0;
  }

  const targetValue = myOverallTarget?.target ?? 0;
  const bookingPercentage =
    targetValue > 0
      ? Math.min(100, Math.round((totalBookings / targetValue) * 100))
      : 0;
  const registrationPercentage =
    targetValue > 0
      ? Math.min(100, Math.round((totalRegistrations / targetValue) * 100))
      : 0;

  const data = [
    {
      label: "Target",
      value: 22,
      actualValue: targetValue,
      color1: "#ff7e5f",
      color2: "#feb47b",
      icon: Flag,
      iconColor: "#ff7e5f",
    },
    {
      label: "Booking",
      value: bookingCount,
      actualValue: bookingCount,
      color1: "#00b09b",
      color2: "#96c93d",
      icon: Home,
      iconColor: "#00b09b",
    },
    {
      label: "Registration",
      value: registrationCount,
      actualValue: registrationCount,
      color1: "#4facfe",
      color2: "#00f2fe",
      icon: Trophy,
      iconColor: "#4facfe",
    },
  ];

  const colors = ["#4A90E2", "#50E3C2", "#F5A623", "#BD10E0", "#9013FE"];

  const cards =
    teamOverview.length > 0
      ? teamOverview.map((team, index) => ({
          name: team.teamName ?? `Team ${index + 1}`,
          tasks: team.totalTasks ?? 0,
          borderColor: colors[index % colors.length],
          members:
            team.crew?.map(
              (c) =>
                `${c?.teamMember?.firstName || ""} ${
                  c?.teamMember?.lastName || ""
                }`.trim() || "Unnamed Member"
            ) ?? [],
        }))
      : [
          {
            name: "No Teams Available",
            tasks: 0,
            borderColor: "#CCCCCC",
            members: ["Add teams to see overview"],
          },
        ];
  // {
  //   name: "Shree Ganesh",
  //   tasks: "2634 tasks",
  //   borderColor: " #91082A",

  //   members: ["Rahul", "Sneha", "Kiran"],
  // },
  // {
  //   name: "Deal Maker",
  //   tasks: "3724 tasks",
  //   borderColor: "#1F1F1F",

  //   members: ["Suresh", "Anita", "Manoj"],
  // },

  const assignFeedbackcard = Array.isArray(asssignFeedbackInfo)
    ? asssignFeedbackInfo.map((item, index) => ({
        name: `${item.teamLeader?.firstName ?? "Team"} ${
          item.teamLeader?.lastName ?? "Leader"
        }`,
        feedback: item.notFollowUpCount ?? 0,
        tasks: item.notAssignedCount ?? 0,
        border: ["#87CEEB", "#FF6B6B", "#4ECDC4", "#FFE66D"][index % 4],
      }))
    : [];

  const safeDivision = (numerator: number, denominator: number): number => {
    if (!denominator || denominator === 0) return 0;
    return +(numerator / denominator).toFixed(1);
  };

  const metrics = [
    {
      title: "Lead to CP",
      percentage: safeDivision(
        (dashCount?.lead?.visit1 ?? 0) * 100,
        dashCount?.lead?.total ?? 0
      ),
      count1: dashCount?.lead?.total ?? 0,
      count2: dashCount?.lead?.visit1 ?? 0,
      label1: "Lead",
      label2: "CP",
      color: "#ec4899",
    },
    {
      title: "Lead to Walk In",
      percentage: safeDivision(
        (dashCount?.lead?.visit2 ?? 0) * 100,
        dashCount?.lead?.total ?? 0
      ),
      count1: dashCount?.lead?.total ?? 0,
      count2: dashCount?.lead?.visit2 ?? 0,
      label1: "Lead",
      label2: "Visit",
      color: "#10b981",
    },
    {
      title: "CP to Booking",
      percentage: safeDivision(
        (dashCount?.lead?.bookingCp ?? 0) * 100,
        dashCount?.lead?.visit1 ?? 0
      ),
      count1: dashCount?.lead?.visit1 ?? 0,
      count2: dashCount?.lead?.bookingCp ?? 0,
      label1: "Visit",
      label2: "Booking",
      color: "#3b82f6",
    },
    {
      title: "Walk In to Booking",
      percentage: safeDivision(
        (dashCount?.lead?.bookingWalkIn ?? 0) * 100,
        dashCount?.lead?.visit2 ?? 0
      ),
      count1: dashCount?.lead?.visit2 ?? 0,
      count2: dashCount?.lead?.bookingWalkIn ?? 0,
      label1: "Visit",
      label2: "Booking",
      color: "#f97316",
    },
  ];

  const toggleBottomSheet = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const toggleBottomSheet2 = (index: number) => {
    setActiveCard2(activeCard2 === index ? null : index);
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setShowMonths(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowMonths(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);
  const years = Array.from({ length: 2125 - 1925 + 1 }, (_, i) => 1925 + i);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = 150 + 16; // minWidth + gap (adjust if needed)
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

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
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        assignPendingRef.current &&
        !assignPendingRef.current.contains(event.target as Node)
      ) {
        setActiveCard2(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container}>
      <header
        role="banner"
        className={cn(
          "w-full border-b bg-gradient-to-b from-background to-secondary/50 backdrop-blur supports-[backdrop-filter]:to-secondary/40",
          className
        )}
      >
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="flex items-center justify-between py-2">
            {/* Left Side - Avatar & Info */}
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 ring-2 ring-border">
                <AvatarImage
                  src={
                    avatarUrl ||
                    "/placeholder.svg?height=32&width=32&query=user%20avatar"
                  }
                  alt={`${dashCount?.name ?? "test"} avatar`}
                />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
                  {dashCount?.name ?? "test"}
                </span>
                <span className="text-[11px] leading-4 text-muted-foreground">
                  {/* dynamically show pending tasks from dashCount */}
                  {`You have ${dashCount?.task?.pending ?? 0} pending tasks`}
                </span>
              </div>
            </div>

            {/* Right Side - Sync Info */}
            <div className="flex flex-col items-end">
              <p className="text-[11px] leading-4 text-muted-foreground mb-1">
                Last sync was:{" "}
                <span className="font-small text-foreground">
                  {lastSyncText}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full px-2 py-1 text-xs bg-transparent"
                  onClick={onSyncNow}
                  aria-label="Sync now"
                >
                  Sync now
                </Button>
                <span className="text-[11px] text-muted-foreground">19:00</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <h2 className="text-xl font-semibold text-foreground">
          Sales Overview
        </h2>

        {/* Desktop & Tablet ≥768px → Grid */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-0 no-scrollbar scroll-smooth snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {salesoverview.map((metric, index) => (

             <div
              key={index}
              className={`${styles.metricCardWrapper} flex-shrink-0 snap-center`}
               onClick={() => handleCardClick(metric.status)}
              style={{ cursor: "pointer", minWidth: "173px" }} // ✅ Makes card clickable UI
            >
             
               <div className={styles.metricCardContent}>
                <MetricCard {...metric} />
              </div>
              
             
            </div>

          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-3 gap-2 max-[1300px]:flex hidden">
          {salesoverview.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full transition-all ${
                activeIndex === idx ? "bg-blue-600 w-2" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className={styles.mainContainer}>
        <div className="p-6 pt-0">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Team Overview
          </h2>

          <div className={styles.Monthlytarget} ref={containerRef}>
            {cards.map((card, index) => (
              <div key={index} className={styles.cardWrapper}>
                <div
                  className={cn(
                    `${styles.cardtarget} ${
                      activeCard === index ? styles.cardActive : ""
                    }`,
                    "bg-card text-card-foreground rounded-xl shadow-sm"
                  )}
                  style={{ border: `2px solid ${card.borderColor}` }}
                  onClick={() => toggleBottomSheet(index)}
                >
                  <div className={styles.cardHeader}>
                    <h3 className="teamName">{card.name}</h3>
                    <div
                      className={styles.assignpendibg}
                      style={
                        {
                          borderLeftColor: card.borderColor,
                          "--hover-color": card.borderColor,
                        } as React.CSSProperties
                      }
                    >
                      <FaTasks style={{ marginRight: "6px" }} />
                      {card.tasks} Tasks
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.bottomSheet} ${
                    activeCard === index ? styles.show : ""
                  }`}
                  style={{ border: `2px solid ${card.borderColor}` }}
                >
                  {card.members.map((member, mIndex) => (
                    <div
                      key={mIndex}
                      className={styles.sheetItem}
                      style={{
                        border: `0.5px solid ${card.borderColor}`,
                        background: `${card.borderColor}10`,
                      }}
                    >
                      <p className={styles.sheetLabel}>{member}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* assign */}
        <div className="p-6 pt-0">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Assign/Feedback Pending
          </h2>
          <div className={styles.Monthtarget} ref={assignPendingRef}>
            {assignFeedbackcard.map((card, index) => (
              <div key={index} className={styles.cardWrap}>
                <div
                  className={cn(
                    `${styles.cardassignFeedback} ${
                      activeCard2 === index ? styles.cardActive : ""
                    }`,
                    "bg-card text-card-foreground rounded-xl shadow-sm" // ✅ same look as others
                  )}
                  style={{ border: `2px solid ${card.border}` }}
                  onClick={() => toggleBottomSheet2(index)}
                >
                  <h3>{card.name}</h3>
                  <div className={styles.btnGroup}>
                    <div className={styles.feedbackpending}>
                      <FaCommentDots style={{ marginRight: "6px" }} />{" "}
                      {card.feedback}
                    </div>
                    <div className={styles.assignpending}>
                      <FaTasks style={{ marginRight: "6px" }} /> {card.tasks}
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.bottomSheet2} ${
                    activeCard2 === index ? styles.show2 : ""
                  }`}
                  style={{ border: `2px solid  ${card.border}` }}
                >
                  <div className={styles.sheetItem2}>
                    <p className={styles.sheetLabel2}>Feedback Pending</p>
                    <p className={`${styles.sheetValue2} ${styles.red}`}>
                      {card.feedback}
                    </p>
                  </div>
                  <div className={`${styles.sheetItem2} ${styles.sheetgreen} `}>
                    <p className={styles.sheetLabel2}>Assign Pending</p>
                    <p className={`${styles.sheetValue2} ${styles.blue}`}>
                      {card.tasks}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* overview */}
        <div className="p-6 pt-0">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Quick Actions
          </h2>

          <div className={target.quick}>
            {quickActions.map((action, idx) => (
              <div
                key={idx}
                className={`${target.rowItem} ${target[action.color]}`}
              >
                <action.Icon className={target[`icon${action.color}`]} />
                <span className={target[`label${action.color}`]}>
                  {action.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <TargetSection /> */}
      <div className="p-6 pt-0">
        <h2 className="text-xl font-semibold text-foreground mb-6">Target</h2>
        <div className={styles.graf}>
          <div className={styles.grafcontainer}>
            {data.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div className={styles.mytr} key={index}>
                  <div
                    className={styles.donut}
                    style={{
                      background: `conic-gradient(from 0deg, ${item.color1} 0%, ${item.color2} ${item.value}%, #e0e0e0 ${item.value}% 100%)`,
                    }}
                  >
                    <div
                      className={styles.iconBg}
                      style={{ color: item.iconColor }}
                    >
                      <IconComponent size={40} />
                    </div>
                    <div className={styles.centerNumber}>{item.value}</div>
                  </div>
                  <div className={styles.label}>{item.label}</div>
                </div>
              );
            })}
          </div>
          <div className={styles.targetcontainer}>
            <div className={styles.texttarget}>
              <div className={styles.progressHeader}>
                <p className={styles.title}>Progress</p>
                <span className={styles.percentage}>0% Completed</span>
              </div>
              <div className={styles.description}>
                <ProjectTargetsCarousel
                  showDate={showDate}
                  setShowDate={setshowDate}
                  projects={[
                    {
                      projectName: "EV 9 SQUARE",
                      metrics: [
                        { label: "Target", count: targetValue },
                        { label: "Booking", count: bookingCount },
                        { label: "Registration", count: registrationCount },
                      ],
                    },
                    {
                      projectName: "EV10 Marina Bay",
                      metrics: [
                        { label: "Target", count: targetValue },
                        { label: "Booking", count: bookingCount },
                        { label: "Registration", count: registrationCount },
                      ],
                    },
                    {
                      projectName: "EV 23 Malibu West",
                      metrics: [
                        { label: "Target", count: targetValue },
                        { label: "Booking", count: bookingCount },
                        { label: "Registration", count: registrationCount },
                      ],
                    },
                    {
                      projectName: "Heart City",
                      metrics: [
                        { label: "Target", count: targetValue },
                        { label: "Booking", count: bookingCount },
                        { label: "Registration", count: registrationCount },
                      ],
                    },
                  ]}
                />
              </div>
            </div>
            {/* calender */}
            <AnimatePresence>
              {showDate && ( // render when the button is clicked
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={styles.filter}
                >
                  {/* Year Selector */}
                  <div className={styles.customSelect}>
                    <div
                      className={styles.selected}
                      onClick={() => setOpen(!open)}
                    >
                      {year}
                      <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
                    </div>
                    {open && (
                      <div className={styles.optionsGrid}>
                        {years.map((y) => (
                          <div
                            key={y}
                            className={styles.optionMain}
                            onClick={() => {
                              setYear(y);
                              setOpen(false);
                            }}
                          >
                            {y}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Month Grid */}
                  <div className={styles.monthGrid}>
                    {months.map((month, index) => (
                      <div key={index} className={styles.monthItem}>
                        {month}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.grafMobile}>
          <div className={styles.progressCard}>
            <div className={styles.targetsWrapper}>
              {[
                { label: "Target", value: 10, color: "#ffb347" },
                { label: "Achieved", value: 5, color: "#4caf50" },
                { label: "Pending", value: 5, color: "#ef5350" },
              ].map((item, index) => (
                <div className={styles.targetCard} key={index}>
                  <div
                    className={styles.targetNumber}
                    style={{ backgroundColor: item.color }}
                  >
                    {item.value}
                  </div>
                  <div className={styles.targetLabel}>{item.label}</div>
                </div>
              ))}
            </div>
            <div className={styles.texttarget}>
              <div className={styles.filterIconContainer} ref={filterRef}>
                <button
                  className={styles.filterButton}
                  onClick={() => setShowMonths(!showMonths)}
                >
                  {selectedMonth ? selectedMonth : ""} <Funnel size={15} />
                </button>

                {showMonths && (
                  <div className={styles.monthDropdown}>
                    <div className={styles.yearSelector}>
                      <select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                      >
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.monthGrid}>
                      {months.map((month, index) => (
                        <div
                          key={index}
                          className={styles.monthItemMobile}
                          onClick={() => handleMonthSelect(month)}
                        >
                          {month}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.progressHeader}>
                <p className={styles.title}>Progress</p>
                <span className={styles.percentage}>0% Completed</span>
              </div>
              <div className={styles.description}>
                <ProjectTargetsCarousel
                  showDate={showDate}
                  setShowDate={setshowDate}
                  projects={[
                    {
                      projectName: "EV 9 SQUARE",
                      metrics: [
                        { label: "Target", count: 120 },
                        { label: "Booking", count: 75 },
                        { label: "Registration", count: 58 },
                      ],
                    },
                    {
                      projectName: "EV10 Marina Bay",
                      metrics: [
                        { label: "Target", count: 9 },
                        { label: "Booking", count: 0 },
                        { label: "Registration", count: 0 },
                      ],
                    },
                    {
                      projectName: "EV 23 Malibu West",
                      metrics: [
                        { label: "Target", count: 6 },
                        { label: "Booking", count: 0 },
                        { label: "Registration", count: 0 },
                      ],
                    },
                    {
                      projectName: "Heart City",
                      metrics: [
                        { label: "Target", count: 7 },
                        { label: "Booking", count: 0 },
                        { label: "Registration", count: 0 },
                      ],
                    },
                  ]}
                />
              </div>
              {/* <div className={styles.description}>
                You have <strong>2 days</strong> remaining to complete{" "}
                <strong>5 more CP's Onboarding</strong>.
              </div> */}
            </div>

            {/* Month Filter Icon */}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 pt-0">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left - Conversion Metrics */}
          <div className="flex-1">
            {/* Title for left */}
            <h2 className="text-xl sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
              Conversion Metrics
            </h2>

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

          <ConversionOverview
            leads={leads}
            bookings={bookings}
            visits={visits}
          />
        </div>
      </div>
    </div>
  );
}
