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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css";
import target from "./target-section.module.css";
import { MetricCard } from "./metric-card";
import { FaCommentDots } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { Conversion } from "./conversion";
import { CircularProgress } from "./circular-progress";
import TargetSection from "./target-section";
import { GrGroup } from "react-icons/gr";
import { PiChartLineUpLight } from "react-icons/pi";
import { BsCardChecklist } from "react-icons/bs";
import ConversionOverview from "./conversion-overview";

interface ClosingManagerDashboardHeaderProps {
  title?: string;
  dateRange?: string;
  userName?: string;
  userAvatar?: string;
}

export function ClosingManagerDashboardHeader({
  title = "Dashboard",
  dateRange = "You have 369 pending tasks",
  userName = "Deepak Karki",
  userAvatar,
}: ClosingManagerDashboardHeaderProps) {
  const salesoverview = [
    {
      title: "Leads",
      value: "12065",
      isPositive: true,
      icon: <Users className="h-6 w-6" />,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      gradientFrom: "from-blue-50",
      gradientTo: "to-white",
    },
    {
      title: "CP Visits",
      value: "347",
      isPositive: true,
      icon: <Calendar className="h-6 w-6" />,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      gradientFrom: "from-green-50",
      gradientTo: "to-white",
    },
    {
      title: "Walk In Visits",
      value: "162",
      isPositive: true,
      icon: <Truck className="h-6 w-6" />,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      gradientFrom: "from-purple-50",
      gradientTo: "to-white",
    },
    {
      title: "Booking",
      value: "31",
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      gradientFrom: "from-orange-50",
      gradientTo: "to-white",
    },
    {
      title: "Internal Leads",
      value: "209",
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-100",
      gradientFrom: "from-teal-50",
      gradientTo: "to-white",
    },
    {
      title: "Bulk Leads",
      value: "306",
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      iconColor: "text-pink-600",
      iconBg: "bg-pink-100",
      gradientFrom: "from-pink-50",
      gradientTo: "to-white",
    },
    {
      title: "Pending",
      value: "11779",
      isPositive: false,
      icon: <TrendingDown className="h-6 w-6" />,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      gradientFrom: "from-red-50",
      gradientTo: "to-white",
    },
  ];

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeCard2, setActiveCard2] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const assignPendingRef = useRef<HTMLDivElement>(null);

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

  const leads = 11608;
  const bookings = 59;
  const visits = 432;

  const cards = [
    {
      name: "Closing Crew",
      tasks: "3890 tasks",
      borderColor: " #4A90E2",
      members: ["Deepak", "Muthuswami Venugopal Iyer", "Priya"],
    },
    {
      name: "Shree Ganesh",
      tasks: "2634 tasks",
      borderColor: " #91082A",

      members: ["Rahul", "Sneha", "Kiran"],
    },
    {
      name: "Deal Maker",
      tasks: "3724 tasks",
      borderColor: "#1F1F1F",

      members: ["Suresh", "Anita", "Manoj"],
    },
  ];

  const assignFeedbackcard = [
    { name: "Deepak Karki", feedback: 100, tasks: 300, border: "#87CEEB" },
    { name: "Jaspreet Arora", feedback: 210, tasks: 320, border: "#BA1A42" },
    { name: "Ranjna Gupta", feedback: 150, tasks: 310, border: "#546E86" },
  ];

  const metrics = [
    {
      title: "Lead to CP",
      percentage: 2.3,
      count1: 11534,
      count2: 267,
      label1: "Lead",
      label2: "CP",
      color: "#ec4899", // pink
    },
    {
      title: "Lead to Walk In",
      percentage: 1.3,
      count1: 11534,
      count2: 154,
      label1: "Lead",
      label2: "Walk In",
      color: "#10b981", // green
    },
    {
      title: "Lead to Booking",
      percentage: 17.2,
      count1: 267,
      count2: 46,
      label1: "Visit",
      label2: "Booking",
      color: "#3b82f6", // blue
    },
    {
      title: "Walk-in to Booking",
      percentage: 6.5,
      count1: 154,
      count2: 10,
      label1: "Visit",
      label2: "Booking",
      color: "#f97316", // orange
    },
  ];

  const overview = [
    {
      title: "VISIT RATE",
      percentage: 5.9,
      count1: 4588,
      count2: 12175,
      label1: "Visits",
      label2: "Total Leads",
      color: "#3b82f6", // Blue
    },
    {
      title: "BOOKING RATE",
      percentage: 5.9,
      count1: 235,
      count2: 12175,
      label1: "Bookings",
      label2: "Total Leads",
      color: "#8b5cf6", // Purple
    },
    {
      title: "OVERALL CONVERSION",
      percentage: 5.9,
      count1: 235,
      count2: 4588,
      label1: "Bookings",
      label2: "Visits",
      color: "#06b6d4", // Cyan
    },
  ];

  const toggleBottomSheet = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const toggleBottomSheet2 = (index: number) => {
    setActiveCard2(activeCard2 === index ? null : index);
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
      <div className={styles.dashboardHeader}>
        {/* Title */}
        <h1 className={styles.headerTitle}>{title}</h1>

        {/* Date Range */}

        {/* User Profile */}
        <div className={styles.headerRight}>
          <div className={styles.userProfile}>
            <Avatar className={styles.userAvatar}>
              <AvatarImage
                src={userAvatar || "/placeholder.svg"}
                alt={userName}
              />
              <AvatarFallback className={styles.userAvatarFallback}>
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className={styles.userName}>{userName}</span>
            <div className={styles.dateRangeContainer}>
              <Calendar className={styles.calendarIcon} />
              <span className={styles.dateRangeText}>{dateRange}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold text-foreground">
          Sales Overview
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-7 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {salesoverview.map((metric, index) => (
            <div key={index} className={styles.metricCardWrapper}>
              <div className={styles.metricCardContent}>
                <MetricCard {...metric} />
              </div>
            </div>
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
                  className={`${styles.cardtarget} ${
                    activeCard === index ? styles.cardActive : ""
                  }`}
                  style={{ border: `2px solid ${card.borderColor}` }}
                  onClick={() => toggleBottomSheet(index)}
                >
                  <h3 className="teamName">{card.name}</h3>
                  <div
                    className={styles.assignpendibg}
                    style={
                      {
                        borderLeftColor: card.borderColor,
                        "--hover-color": card.borderColor, // ✅ plain string works
                      } as React.CSSProperties
                    } // cast entire style object
                  >
                    <FaTasks style={{ marginRight: "6px" }} /> {card.tasks}
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
          <div className={styles.Monthtarget} ref={containerRef}>
            {assignFeedbackcard.map((card, index) => (
              <div key={index} className={styles.cardWrap}>
                <div
                  className={`${styles.cardassignFeedback} ${
                    activeCard2 === index ? styles.cardActive : ""
                  }`}
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
                      1000
                    </p>
                  </div>
                  <div className={`${styles.sheetItem2} ${styles.sheetgreen} `}>
                    <p className={styles.sheetLabel2}>Assign Pending</p>
                    <p className={`${styles.sheetValue2} ${styles.blue}`}>
                      200
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

            <TargetSection />

      <div className="p-6 pt-0">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left - Conversion Metrics */}
          <div className="">
            {/* Title for left */}
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Conversion Metrics
            </h2>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
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
